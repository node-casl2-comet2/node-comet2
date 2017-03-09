"use strict";

import { Comet2, Comet2Option, Comet2State } from "@maxfield/node-comet2-core";
import { sys } from "@maxfield/node-casl2-comet2-common";
import { defaultComet2Option } from "./settings";
import { printComet2State } from "./ui/print";
const readlineSync = require("readline-sync");
import * as _ from "lodash";

let lastComet2State: Comet2State;

export function interactiveRun(inputFile: string, option: Comet2Option = defaultComet2Option) {
    const comet2 = new Comet2(option);
    comet2.init(inputFile);

    while (true) {
        const state = comet2.getState();
        printState(state, lastComet2State);

        // 命令を受け取る
        const command = getCommand();

        switch (command) {
            case InteractiveCommand.Step:
                const end = comet2.run();

                lastComet2State = state;
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
                printInteractiveModeCommandsHelp();
                break;
        }
    }
}

function printState(state: Comet2State, lastComet2State?: Comet2State): void {
    const s = printComet2State(state, lastComet2State);
    s.forEach(x => sys.stdout.writeLine(x));
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

function printInteractiveModeCommandsHelp() {
    const output: Array<string> = [];

    const command: Array<string> = [];
    const descriptionColumn: Array<string> = [];
    let marginLength = 0;

    const sortedCommands = interactiveModeCommands.sort((a, b) => {
        const c = a.name.toLowerCase() > b.name.toLowerCase();
        return c ? 1 : -1;
    });

    const makeSpace = (spaceLength: number) => Array(spaceLength + 1).join(" ");

    for (const cmd of sortedCommands) {
        command.push(cmd.name);
        descriptionColumn.push(cmd.description);

        marginLength = Math.max(cmd.name.length, marginLength);
    }

    if (command.length !== descriptionColumn.length) throw new Error();

    const zip = _.zip(command, descriptionColumn);
    for (const l of zip) {
        const [cmd, description] = l;
        // e.g. s [スペース] [説明]
        const format = cmd + makeSpace(marginLength - cmd.length + 4) + description;
        output.push(format);
    }

    for (const out of output) {
        sys.stdout.writeLine(out);
    }
}

enum InteractiveCommand {
    Step,
    Quit,
    Run,
    Help,

    Unknown
};

interface InteractiveModeCommand {
    name: string;
    description: string;
}

export const interactiveModeCommands: Array<InteractiveModeCommand> = [
    {
        name: "s",
        description: "命令を1つ実行します(ステップ実行)。"
    },
    {
        name: "q",
        description: "プログラムの実行を終了します。"
    },
    {
        name: "r",
        description: "対話モードを終了してプログラムを実行します。"
    },
    {
        name: "h",
        description: "対話モードのヘルプを表示します"
    }
];
