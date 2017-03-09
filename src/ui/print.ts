"use strict";

import * as Immutable from "immutable";
import * as _ from "lodash";
import { sys } from "@maxfield/node-casl2-comet2-common";
import { Comet2State } from "@maxfield/node-comet2-core";
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

    const pr = printRegister("PR", state.PR);
    const inst = printInstruction(state.nextInstruction.name, state.nextInstruction.args);
    const step = printStep(state.step);
    const line1 = [pr, inst, step].join(" ");
    output.push(line1);

    const sp = printRegister("SP", state.SP);
    const of = printFlag("OF", state.FR.OF);
    const sf = printFlag("SF", state.FR.SF);
    const zf = printFlag("ZF", state.FR.ZF);
    const fr = [of, sf, zf].join(" ");

    const line2 = [sp, fr].join(" ");
    output.push(line2);

    function applyColor(changed: boolean, s: string) {
        return changed ? colors.green(s) : s;
    }

    function printColorRegister(n: number) {
        const grName = "GR" + n;
        const changed = lastState !== undefined && state.GR[grName] !== lastState.GR[grName];
        return applyColor(changed, printRegister(grName, state.GR[grName]));
    }

    const line3 = Immutable.Range(0, 4).map(printColorRegister).toArray().join(" ");
    const line4 = Immutable.Range(4, 8).map(printColorRegister).toArray().join(" ");
    output.push(line3);
    output.push(line4);

    return output;
}
