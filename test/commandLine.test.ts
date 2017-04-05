"use strict";

import * as assert from "assert";
import { commandLineOptions, Comet2CommandLineOptions } from "../src/options";
import { parseCommandLine, ParsedCommandLine } from "@maxfield/node-casl2-comet2-common";

function parse(cl: string[]) {
    return parseCommandLine<Comet2CommandLineOptions>(cl, commandLineOptions);
}

suite("parse command line test", () => {
    test("useGR8AsSP option", () => {
        const cl = ["--useGR8AsSP"];
        const result = parse(cl);
        assert(result.options.useGR8AsSP);
    });

    test("allowSelfModifying option", () => {
        const cl = ["--allowSelfModifying"];
        const result = parse(cl);
        assert(result.options.allowSelfModifying);
    });

    test("version option", () => {
        const cl = ["--version"];
        const result = parse(cl);
        assert(result.options.version);
    });

    test("short version option", () => {
        const cl = ["-v"];
        const result = parse(cl);
        assert(result.options.version);
    });

    test("help option", () => {
        const cl = ["--help"];
        const result = parse(cl);
        assert(result.options.help);
    });

    test("short help option", () => {
        const cl = ["-h"];
        const result = parse(cl);
        assert(result.options.help);
    });
});
