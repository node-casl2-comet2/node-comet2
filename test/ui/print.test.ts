"use strict";

import { printComet2State } from "../../src/ui/print";
import { sys } from "@maxfield/node-casl2-comet2-common";
import { Comet2State } from "@maxfield/node-comet2-core";

suite("ui", () => {
    test("printComet2State", () => {
        const state: Comet2State = {
            PR: 0x0000,
            nextInstruction: {
                name: "LAD",
                args: ["GR0", 0x0100, "GR1"]
            },
            step: 3,
            SP: 0xFFFF,
            FR: {
                OF: false,
                SF: false,
                ZF: true
            },
            GR: {
                GR0: 0x0000, GR1: 0x0100, GR2: 0x0200, GR3: 0x0300,
                GR4: 0x0400, GR5: 0x0500, GR6: 0x0600, GR7: 0x0700
            }
        };

        const s = printComet2State(state);
        s.forEach(x => console.log(x));
    });
});
