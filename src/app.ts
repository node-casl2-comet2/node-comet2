#!/usr/bin/env node

"use strict";

import { Comet2, Comet2Option, Register16bit, Flag, RuntimeError } from "@maxfield/node-comet2-core";
import { parseCommandLine, CLI, sys, ExitStatus, isValidInputSource } from "@maxfield/node-casl2-comet2-common";
import { commandLineOptions, Comet2CommandLineOptions } from "./options";
import { getVersion } from "./util/version";
import { interactiveRun } from "./interactive";
import { defaultComet2Option } from "./settings";
import { printRuntimeError } from "./ui/print";

function execute(args: string[]) {
    const parsed = parseCommandLine<Comet2CommandLineOptions>(args, commandLineOptions);
    const { options, fileNames, errors } = parsed;
    if (errors.length > 0) {
        for (const err of errors) {
            sys.stderr.writeLine(err);
        }
        return sys.exit(ExitStatus.Fail);
    }

    if (options.help) {
        CLI.printHelp(commandLineOptions);
        return sys.exit(ExitStatus.Success);
    }

    if (options.version) {
        CLI.printVersion(getVersion());
        return sys.exit(ExitStatus.Success);
    }

    if (fileNames.length === 0) {
        CLI.printAppInfo("node-comet2", getVersion());
        sys.stdout.newLine();
        CLI.printHelp(commandLineOptions);
        return sys.exit(ExitStatus.Success);
    }

    const comFilePath = fileNames[0];
    if (!isValidInputSource(comFilePath, ".com")) {
        sys.stderr.writeLine("入力プログラムの拡張子は '.com' である必要があります。");
        return sys.exit(ExitStatus.Fail);
    }

    const interactiveMode = options.run !== true;
    const option: Comet2Option = {
        useGR8AsSP: options.useGR8AsSP,
        allowSelfModifying: options.allowSelfModifying
    };

    if (interactiveMode) {
        interactiveRun(comFilePath, option);
    } else {
        autoRun(comFilePath, option);
    }
}

function autoRun(inputFile: string, option: Comet2Option = defaultComet2Option) {
    const comet2 = new Comet2(option);
    comet2.init(inputFile);

    while (true) {
        try {
            // 一つ命令を進める
            const end = comet2.stepInto();
            if (end) break;
        } catch (error) {
            if (error instanceof RuntimeError) {
                sys.stderr.writeLine(printRuntimeError(error));
            }
            return;
        }
    }
}

const args = process.argv.slice(2);
execute(args);
