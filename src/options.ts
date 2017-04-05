"use strict";

import { CommandLineOption, CommandLineOptions } from "@maxfield/node-casl2-comet2-common";

export const commandLineOptions: CommandLineOption[] = [
    {
        name: "useGR8AsSP",
        type: "boolean",
        description: "GR8をスタックポインタとして使用します。"
    },
    {
        name: "allowSelfModifying",
        type: "boolean",
        description: "自己書き換えを許可します。"
    },
    {
        name: "version",
        shortName: "v",
        type: "boolean",
        description: "バージョンを表示します。"
    },
    {
        name: "help",
        shortName: "h",
        type: "boolean",
        description: "ヘルプを表示します。"
    },
    {
        name: "run",
        shortName: "r",
        type: "boolean",
        description: "プログラムを実行します。"
    },
    {
        name: "interactive",
        shortName: "i",
        type: "boolean",
        description: "対話モードでプログラムを実行します。"
    }
];

export interface Comet2CommandLineOptions extends CommandLineOptions {
    useGR8AsSP?: boolean;
    allowSelfModifying?: boolean;
    version?: boolean;
    help?: boolean;
    run?: boolean;
    interactive?: boolean;
}
