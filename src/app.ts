#!/usr/bin/env node

"use strict";

import { Comet2, Comet2Option, Register16bit, Flag } from "@maxfield/node-comet2-core";
import { parseCommandLine, CLI, sys, ExitStatus, isValidInputSource } from "@maxfield/node-casl2-comet2-common";
import { commandLineOptions, Comet2CommandLineOptions } from "./options";
import { getVersion } from "./util/version";

function execute(args: Array<string>) {
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

    const option: Comet2Option = {
        useGR8AsSP: options.useGR8AsSP
    };

    run(comFilePath, option);
}

const defaultOption: Comet2Option = {
    useGR8AsSP: true
};

function run(inputFile: string, option: Comet2Option = defaultOption) {
    const comet2 = new Comet2(option);

    comet2.start(inputFile);
}

const args = process.argv.slice(2);
execute(args);
