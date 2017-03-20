"use strict";

import * as Immutable from "immutable";
import * as _ from "lodash";
import { sys } from "@maxfield/node-casl2-comet2-common";
import { Comet2State, RuntimeError } from "@maxfield/node-comet2-core";
const colors = require("colors/safe");

export function printRegister(name: string, value: number) {
    if (value < 0 || value > 65535) throw new Error();

    const registerName = _.pad(name, 3, " ");
    const hex = printHex(value);
    const decimal = `(${("      " + value).slice(-6)})`;
    return [registerName, hex, decimal].join(" ");
}

export function printFlag(name: string, value: boolean) {
    const v = value ? "↑" : "↓";
    return `${name}: ${v}`;
}

export function printStep(step: number) {
    return `STEP ${step}`;
}

function printHex(n: number) {
    const h = n.toString(16).toUpperCase();
    const hex = _.padStart(h, 4, "0");
    return `#${hex}`;
}

export function printInstruction(instruction: string, args: Array<string | number>) {
    const inst = _.padEnd(instruction, 6, " ");
    const operands = _.padEnd(args.map(x => {
        if (typeof x === "number") {
            return printHex(x);
        } else {
            return x;
        }
    }).join(", "), 20, " ");

    return `[${inst} ${operands}]`;
}

export function printComet2State(state: Comet2State, lastState?: Comet2State): Array<string> {
    const output: Array<string> = [];
    function applyColor(changed: boolean, s: string) {
        return changed ? colors.green(s) : s;
    }

    const pr = printRegister("PR", state.PR);
    const inst = state.nextInstruction
        ? printInstruction(state.nextInstruction.name, state.nextInstruction.args)
        : undefined;

    const step = printStep(state.step);
    const line1 = (inst === undefined ? [pr, step] : [pr, inst, step]).join(" ");
    output.push(line1);

    const sp = applyColor(lastState !== undefined && state.SP !== lastState.SP, printRegister("SP", state.SP));

    function printColorFlag(name: string) {
        const changed = lastState !== undefined && state.FR[name] !== lastState.FR[name];
        return applyColor(changed, printFlag(name, state.FR[name]));
    }

    const of = printColorFlag("OF");
    const sf = printColorFlag("SF");
    const zf = printColorFlag("ZF");
    const fr = [of, sf, zf].join(" ");

    const line2 = [sp, fr].join(" ");
    output.push(line2);

    function printColorGR(n: number) {
        const grName = "GR" + n;
        const changed = lastState !== undefined && state.GR[grName] !== lastState.GR[grName];
        return applyColor(changed, printRegister(grName, state.GR[grName]));
    }

    const line3 = Immutable.Range(0, 4).map(printColorGR).toArray().join(" ");
    const line4 = Immutable.Range(4, 8).map(printColorGR).toArray().join(" ");
    output.push(line3);
    output.push(line4);

    return output;
}

export function printRuntimeError(error: RuntimeError): string {
    return colors.red(error.toString());
}
