"use strict";

import { Comet2, Comet2Option, Comet2State } from "@maxfield/node-comet2-core";
import { sys } from "@maxfield/node-casl2-comet2-common";
import { defaultComet2Option } from "./settings";
const readlineSync = require("readline-sync");


export function interactiveRun(inputFile: string, option: Comet2Option = defaultComet2Option) {
    const comet2 = new Comet2(option);
    comet2.init(inputFile);

    while (true) {
        const state = comet2.getState();
        printComet2State(state);

        // 命令を受け取る
        const command = getCommand();

        switch (command) {
            case InteractiveCommand.Step:
                const end = comet2.run();
                break;
            case InteractiveCommand.Quit:
                return;
            case InteractiveCommand.Run:
                while (true) {
                    const end = comet2.run();
                    if (end) break;
                }
                return;
            case InteractiveCommand.Help:
            default:
                printInteractiveCommandHelp();
                break;
        }
    }
}

function printComet2State(state: Comet2State) {
    console.log(state);
}

function getCommand(): InteractiveCommand {
    const line = readlineSync.prompt() as string;
    switch (line) {
        case "s":
            return InteractiveCommand.Step;
        case "q":
            return InteractiveCommand.Quit;
        case "r":
            return InteractiveCommand.Run;
        case "h":
            return InteractiveCommand.Help;
        default:
            return InteractiveCommand.Unknown;
    }
}

function printInteractiveCommandHelp() {
    sys.stdout.writeLine("interactive command help");
}

enum InteractiveCommand {
    Step,
    Quit,
    Run,
    Help,

    Unknown
};
