"use strict";

import * as Immutable from "immutable";
import * as _ from "lodash";
import { sys } from "@maxfield/node-casl2-comet2-common";
import { Comet2State } from "@maxfield/node-comet2-core";

export function printRegister(name: string, value: number) {
    if (value < 0 || value > 65535) throw new Error();

    const hex = printHex(value);
    const decimal = `(${("      " + value).slice(-6)})`;
    return [name, hex, decimal].join(" ");
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

export function printComet2State(state: Comet2State): Array<string> {
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

    const gr0 = printRegister("GR0", state.GR.GR0);
    const gr1 = printRegister("GR1", state.GR.GR1);
    const gr2 = printRegister("GR2", state.GR.GR2);
    const gr3 = printRegister("GR3", state.GR.GR3);
    const gr4 = printRegister("GR4", state.GR.GR4);
    const gr5 = printRegister("GR5", state.GR.GR5);
    const gr6 = printRegister("GR6", state.GR.GR6);
    const gr7 = printRegister("GR7", state.GR.GR7);

    const line3 = [gr0, gr1, gr2, gr3].join(" ");
    output.push(line3);
    const line4 = [gr4, gr5, gr6, gr7].join(" ");
    output.push(line4);

    return output;
}
