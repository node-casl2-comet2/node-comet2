"use strict";

import { CommandLineOption, CommandLineOptions } from "@maxfield/node-casl2-comet2-common";

export const commandLineOptions: Array<CommandLineOption> = [
    {
        name: "useGR8AsSP",
        type: "boolean",
        description: "GR8をスタックポインタとして使用します。"
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
        description: "対話モードでログラムを実行します。"
    }
];

export interface Comet2CommandLineOptions extends CommandLineOptions {
    useGR8AsSP?: boolean;
    version?: boolean;
    help?: boolean;
    run?: boolean;
    interactive?: boolean
}
