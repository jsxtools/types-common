// @ts-check

import * as assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, test } from "node:test";

const types = readFileSync(new URL(import.meta.resolve("../common.d.ts")), "utf-8");

const match = /declare (var|function) (\w+)/g;

const matches = [...types.matchAll(match)].map((m) => m[2]);

/** @type {Set<keyof typeof globalThis>} */
const globalVars = new Set(/** @type {any[]} */ (matches));

describe("match", () => {
	describe("literal patterns (no metacharacters)", () => {
		test("should match exact literal paths", () => {
			for (const globalVar of globalVars) {
				assert.ok(
					globalThis[globalVar],
					`Expected globalThis to have property ${globalVar}`,
				);
			}
		});
	});
});
