/**
 * This script generates `common.d.ts` from Typescript `lib.webworker.d.ts` types and `@types/node` types.
 *
 * 1. It finds all global variables that exist in both `lib.webworker.d.ts` and `@types/node`.
 * 2. It uses TypeScript's type checker to resolve all types needed by those globals.
 * 3. It emits the complete type definitions using TypeScript's printer API.
 * 4. It performs some additional processing to correct non-deterministic issues with the output
 */

import { readFileSync, writeFileSync } from "node:fs";
import ts from "typescript";

/** Path to the ambient definitions for Web Workers. */
const pathToWebDts = new URL(import.meta.resolve("typescript/lib/lib.webworker.d.ts"));

/** Path to the ambient definitions for NodeJS. */
const pathToNjsDts = new URL(import.meta.resolve("@types/node/index.d.ts"));

/** Path to the generated ambient definitions for common types. */
const pathToOutput = new URL(import.meta.resolve("./common.d.ts"));

// #region Non-Deterministic Processing

/** Globals that are available in Node.js at runtime but not declared as global vars in @types/node. */
const ADDITIONAL_NODE_GLOBALS = new Set(["Crypto", "CryptoKey", "Performance", "SubtleCrypto", "atob", "btoa"]);

/** Globals to exclude from the output even if they appear to exist in both environments. */
const EXCLUDED_GLOBALS = new Set(["CacheStorage"]);

/**
 * Interfaces to exclude from the output and remove from extends clauses.
 * Dependencies of excluded interfaces will also be excluded.
 */
const EXCLUDED_INTERFACES = new Set([
	"CookieStoreManager",
	"MediaCapabilities",
	"NavigatorBadge",
	"NavigatorLocks",
	"NavigatorOnLine",
	"NavigationPreloadManager",
	"NavigatorStorage",
	"ServiceWorker",
	"ServiceWorkerContainer",
]);

/** Match any non-newline whitespace characters followed by a JSDoc comment, followed by `readonly`, an identifier, and then a colon. */
const MATCH_HEAD = /[^\S\r\n]*\/\*\*([^*]|\*[^/])*\*\/\s+readonly\s+\w+\s*:\s*/gm.source;

/** Match any whitespace characters followed by an optional `| null` and then a semicolon. */
const MATCH_TAIL = /\s*(\|\s*null\s*)?;/gm.source;

const MATCH_PROP_INTERFACES = new RegExp(`${MATCH_HEAD}(${[...EXCLUDED_INTERFACES].join("|")})${MATCH_TAIL}`, "gm");

const MATCH_TYPE_INTERFACES = new RegExp(`(=|\\|)\\s*(${[...EXCLUDED_INTERFACES].join("|")})\\s*(;|\\|)`, "gm");

const MATCH_TYPE_INTERFACES_REPLACER: Replacer = (_0, $1, _2, $3) => `${$3 === ";" && $1 === "|" ? "" : $1}${$3}`;

type Replacer = (substring: string, ...args: any[]) => string;

const EXCLUDED_STRINGS = [
	// remove excluded interfaces
	[MATCH_PROP_INTERFACES, ""],

	// remove ServiceWorker from MessageEventSource
	[MATCH_TYPE_INTERFACES, MATCH_TYPE_INTERFACES_REPLACER],

	// replace WorkerNavigator with Navigator
	[/\bWorkerNavigator\b/gm, "Navigator"],

	// use Navigator URL in JSDoc comments
	[/\/API\/WorkerGlobalScope\/navigator/g, "/API/Navigator"],

	// use MessagePort URL in JSDoc comments
	[/\/API\/DedicatedWorkerGlobalScope\/message/g, "/API/MessagePort/message"],

	// update the Navigator interface description
	[
		"a subset of the Navigator interface allowed to be accessed from a Worker",
		"the state and the identity of the user agent",
	],

	// update the navigator var description
	[
		"of the WorkerGlobalScope interface returns the Navigator associated with the worker",
		"returns a reference to the Navigator object",
	],
] as const;

// #endregion

// #region Processing

interface TypeDeclaration {
	name: string;
	text: string;
	kind: string;
}

/**
 * Create a TypeScript program to parse Node.js types with all references resolved
 */
function createNodeTypesProgram(): ts.Program {
	const compilerOptions: ts.CompilerOptions = {
		target: ts.ScriptTarget.Latest,
		module: ts.ModuleKind.CommonJS,
		lib: ["lib.esnext.d.ts"],
		types: ["node"],
		moduleResolution: ts.ModuleResolutionKind.NodeJs,
		skipLibCheck: true,
	};

	const host = ts.createCompilerHost(compilerOptions);
	const program = ts.createProgram([pathToNjsDts.pathname], compilerOptions, host);

	return program;
}

/**
 * Extract all global variable/function declarations from Node.js type files
 * These represent the constructors/functions available in the global scope
 */
function extractNodeGlobalDeclarations(program: ts.Program): Set<string> {
	const globalNames = new Set<string>();

	// Visit all source files in the program
	for (const sourceFile of program.getSourceFiles()) {
		// Skip lib files and files outside node_modules/@types/node
		if (
			sourceFile.fileName.includes("node_modules/typescript/lib") ||
			(!sourceFile.fileName.includes("node_modules/@types/node") &&
				!sourceFile.fileName.includes("node_modules/undici-types"))
		) {
			continue;
		}

		function visit(node: ts.Node, insideModule: boolean = false, insideGlobal: boolean = false) {
			// Check if this node is a module/namespace declaration
			const isGlobal =
				ts.isModuleDeclaration(node) && (node as ts.ModuleDeclaration).name.getText(sourceFile) === "global";
			const isModule = ts.isModuleDeclaration(node) && !isGlobal;
			const currentInsideModule = insideModule || isModule;
			const currentInsideGlobal = insideGlobal || isGlobal;

			// Look for global declarations (not inside modules, OR inside `declare global`)
			// Exclude exported declarations as they are module-scoped, not global
			const hasExportModifier =
				ts.canHaveModifiers(node) &&
				ts.getModifiers(node)?.some((mod: ts.Modifier) => mod.kind === ts.SyntaxKind.ExportKeyword);

			if (ts.isVariableStatement(node) && !hasExportModifier) {
				const declaration = node.declarationList.declarations[0];

				if (declaration && ts.isIdentifier(declaration.name)) {
					const name = declaration.name.getText(sourceFile);
					// Include if: not inside a module, OR inside a `declare global` block
					// Exclude EventSource as it's not actually available in Node.js runtime
					if ((!currentInsideModule || currentInsideGlobal) && name !== "EventSource") {
						globalNames.add(name);
					}
				}
			} else if (ts.isFunctionDeclaration(node) && node.name && !hasExportModifier) {
				if (!currentInsideModule || currentInsideGlobal) {
					globalNames.add(node.name.getText(sourceFile));
				}
			}

			ts.forEachChild(node, (child) => visit(child, currentInsideModule, currentInsideGlobal));
		}

		visit(sourceFile);
	}

	return globalNames;
}

/**
 * Extract all type names (interfaces, type aliases, classes, enums) from a source file
 * Only extracts types that are in the global scope (not inside module declarations)
 */
function extractAllTypeNames(sourceFile: ts.SourceFile): Set<string> {
	const typeNames = new Set<string>();

	function visit(node: ts.Node) {
		if (
			ts.isInterfaceDeclaration(node) ||
			ts.isTypeAliasDeclaration(node) ||
			ts.isClassDeclaration(node) ||
			ts.isEnumDeclaration(node)
		) {
			// Collect ALL type names from Node.js type files
			// We'll filter later based on whether they match global vars or are referenced by included types
			if (node.name) {
				typeNames.add(node.name.getText(sourceFile));
			}
		}

		ts.forEachChild(node, visit);
	}

	visit(sourceFile);

	return typeNames;
}

/**
 * Collect all type names referenced in Node.js type files
 * This includes types used in global declarations and all referenced files
 */
function collectNodeTypeNames(program: ts.Program): Set<string> {
	const allTypeNames = new Set<string>();

	// Visit all source files in the program
	for (const sourceFile of program.getSourceFiles()) {
		// Skip lib files and files outside node_modules/@types/node
		// Note: We skip undici-types here because it's a module with exports, not global types
		// Global types from undici are declared in @types/node files that reference undici
		if (
			sourceFile.fileName.includes("node_modules/typescript/lib") ||
			sourceFile.fileName.includes("node_modules/undici-types") ||
			!sourceFile.fileName.includes("node_modules/@types/node")
		) {
			continue;
		}

		const types = extractAllTypeNames(sourceFile);

		for (const name of types) {
			allTypeNames.add(name);
		}
	}

	return allTypeNames;
}

/**
 * Extract all type references from a TypeScript node using the TS API
 */
function extractTypeReferences(node: ts.Node, sourceFile: ts.SourceFile): Set<string> {
	const references = new Set<string>();

	function visit(n: ts.Node) {
		// Type references (includes parameter types, return types, property types, etc.)
		if (ts.isTypeReferenceNode(n) && ts.isIdentifier(n.typeName)) {
			const typeName = n.typeName.getText(sourceFile);
			references.add(typeName);
		}

		// Qualified names (e.g., Foo.Bar)
		else if (ts.isTypeReferenceNode(n) && ts.isQualifiedName(n.typeName)) {
			// Get the leftmost identifier
			let current: ts.EntityName = n.typeName;

			while (ts.isQualifiedName(current)) {
				current = current.left;
			}

			if (ts.isIdentifier(current)) {
				references.add(current.getText(sourceFile));
			}
		}

		// Heritage clauses (extends, implements)
		else if (ts.isHeritageClause(n)) {
			for (const type of n.types) {
				if (ts.isIdentifier(type.expression)) {
					references.add(type.expression.getText(sourceFile));
				}
			}
		}

		// Recursively visit all children to find type references in:
		// - Parameter types
		// - Return types
		// - Property types
		// - Union/intersection types
		// - etc.
		ts.forEachChild(n, visit);
	}

	visit(node);

	return references;
}

/**
 * Find all types that are referenced by a given set of type declarations
 * This recursively finds dependencies using the TypeScript API
 *
 * Strategy:
 * - Start with common global var/function declarations
 * - Recursively include all types they reference (interfaces, classes, etc.) from Web Workers
 * - Do NOT recursively process type aliases (they're just aliases, we include them but don't process their members)
 * - Do NOT include other var/function declarations (those must be explicitly common)
 * - Interface/type dependencies don't need to exist in Node.js - we use Web Worker types as source of truth
 */
function findReferencedTypes(
	sourceFile: ts.SourceFile,
	initialTypes: Set<string>,
	allWebWorkerTypes: Map<string, ts.Node>,
	declarationsMap: Map<string, TypeDeclaration>,
): Set<string> {
	const referenced = new Set<string>();
	const toProcess = new Set(initialTypes);
	const processed = new Set<string>();

	while (toProcess.size > 0) {
		const typeName = toProcess.values().next().value as string;
		toProcess.delete(typeName);

		if (processed.has(typeName)) continue;

		processed.add(typeName);
		referenced.add(typeName);

		const node = allWebWorkerTypes.get(typeName);

		if (!node) continue;

		// Don't recursively process type aliases - they're just aliases
		// We include them in the output, but we don't want to pull in all the types they reference
		// (e.g., Transferable = OffscreenCanvas | ImageBitmap | ... shouldn't pull in OffscreenCanvas)
		const decl = declarationsMap.get(typeName);
		if (decl?.kind === "type") {
			continue;
		}

		// Extract all type references from this node
		const refs = extractTypeReferences(node, sourceFile);

		for (const refName of refs) {
			// Include the referenced type if:
			// 1. It exists in the web worker types
			// 2. We haven't processed it yet
			// 3. It's NOT a declare var/function (only interfaces, types, etc. should be pulled in as dependencies)
			//    Declare vars/functions must be explicitly in both Node.js and Web Workers to be included
			// 4. It's NOT in the excluded interfaces list
			const refDecl = declarationsMap.get(refName);
			const isVarOrFunction = refDecl?.kind === "var" || refDecl?.kind === "function";
			const isExcluded = EXCLUDED_INTERFACES.has(refName);

			if (allWebWorkerTypes.has(refName) && !processed.has(refName) && !isVarOrFunction && !isExcluded) {
				toProcess.add(refName);
			}
		}
	}

	return referenced;
}

function getDeclarationName(node: ts.Node): string | null {
	if (
		ts.isInterfaceDeclaration(node) ||
		ts.isTypeAliasDeclaration(node) ||
		ts.isClassDeclaration(node) ||
		ts.isEnumDeclaration(node) ||
		ts.isFunctionDeclaration(node)
	) {
		return node.name?.getText() || null;
	}

	if (ts.isVariableStatement(node)) {
		// For declare var statements
		const declaration = node.declarationList.declarations[0];

		if (declaration && ts.isIdentifier(declaration.name)) {
			return declaration.name.getText();
		}
	}

	return null;
}

function getDeclarationKind(node: ts.Node): string {
	if (ts.isInterfaceDeclaration(node)) return "interface";
	if (ts.isTypeAliasDeclaration(node)) return "type";
	if (ts.isClassDeclaration(node)) return "class";
	if (ts.isEnumDeclaration(node)) return "enum";
	if (ts.isVariableStatement(node)) return "var";
	if (ts.isFunctionDeclaration(node)) return "function";

	return "unknown";
}

function extractTypeDeclarations(sourceFile: ts.SourceFile): {
	declarations: TypeDeclaration[];
	nodesMap: Map<string, ts.Node>;
} {
	const declarations: TypeDeclaration[] = [];
	const nodesMap = new Map<string, ts.Node>();
	const sourceText = sourceFile.getFullText();

	function visit(node: ts.Node) {
		const name = getDeclarationName(node);

		if (name) {
			const kind = getDeclarationKind(node);

			// Get the text of the node, including JSDoc comments but not leading trivia
			const start = node.getStart(sourceFile, false);
			const end = node.getEnd();

			let text = sourceText.substring(start, end);

			// Check if there's a JSDoc comment immediately before this node
			const fullStart = node.getFullStart();

			if (fullStart < start) {
				const leadingText = sourceText.substring(fullStart, start);

				// Only include JSDoc comments (/** ... */), not regular comments or triple-slash directives
				// Match the LAST JSDoc comment in the leading text (the one immediately before the declaration)
				const jsdocMatches = leadingText.matchAll(/\/\*\*[\s\S]*?\*\//g);
				const matches = Array.from(jsdocMatches);

				if (matches.length > 0) {
					const lastMatch = matches[matches.length - 1];
					// Only include if there's only whitespace between the JSDoc and the declaration
					const afterJsdoc = leadingText.substring(lastMatch.index! + lastMatch[0].length);
					if (/^\s*$/.test(afterJsdoc)) {
						text = lastMatch[0] + "\n" + text;
					}
				}
			}

			declarations.push({
				name,
				text,
				kind,
			});

			// For nodesMap, prefer interface/type/class declarations over var declarations
			// This ensures we get the full type definition for dependency resolution
			const existingNode = nodesMap.get(name);
			if (!existingNode || (ts.isVariableStatement(existingNode) && !ts.isVariableStatement(node))) {
				nodesMap.set(name, node);
			}
		}

		ts.forEachChild(node, visit);
	}

	visit(sourceFile);

	return { declarations, nodesMap };
}

/**
 * Remove excluded interfaces from extends clauses in interface declarations using string manipulation
 */
function removeExcludedFromExtends(originalText: string): string {
	// Match: interface Name extends A, B, C {
	// or: interface Name<T> extends A, B, C {
	const extendsMatch = originalText.match(
		/^([\s\S]*?interface\s+\w+(?:<[^>]+>)?)\s+extends\s+([^{]+)(\s*\{[\s\S]*)$/,
	);

	if (!extendsMatch) {
		return originalText;
	}

	const [, beforeExtends, extendsClause, afterExtends] = extendsMatch;

	// Split the extends clause by commas, trim each, and filter out excluded interfaces
	const extendsList = extendsClause
		.split(",")
		.map((s) => s.trim())
		.filter((name) => {
			// Extract just the interface name (before any generic parameters)
			const baseName = name.split("<")[0].trim();
			return !EXCLUDED_INTERFACES.has(baseName);
		});

	// If no interfaces left in extends clause, remove it entirely
	if (extendsList.length === 0) {
		return beforeExtends + afterExtends;
	}

	// Otherwise, reconstruct with filtered extends clause
	return beforeExtends + " extends " + extendsList.join(", ") + afterExtends;
}

function processWebWorkerFile(): string {
	console.log("Step 1: Creating TypeScript program for Node.js types...");
	const nodeProgram = createNodeTypesProgram();
	console.log("Node.js types program created");
	console.log("");

	console.log("Step 2: Extracting Node.js global declarations...");
	const nodeGlobals = extractNodeGlobalDeclarations(nodeProgram);
	console.log(`Found ${nodeGlobals.size} global declarations in Node.js`);
	console.log(`Examples: ${Array.from(nodeGlobals).slice(0, 10).join(", ")}...`);
	console.log("");

	console.log("Step 3: Collecting all type names from Node.js type files...");
	const nodeTypeNames = collectNodeTypeNames(nodeProgram);
	console.log(`Found ${nodeTypeNames.size} type names in Node.js`);
	console.log(`Examples: ${Array.from(nodeTypeNames).slice(0, 10).join(", ")}...`);
	console.log("");

	console.log("Step 4: Parsing lib.webworker.ts...");
	const content = readFileSync(pathToWebDts, "utf-8");
	const sourceFile = ts.createSourceFile("lib.webworker.ts", content, ts.ScriptTarget.Latest, true);

	// Extract all type declarations from webworker
	const { declarations: allDeclarations, nodesMap } = extractTypeDeclarations(sourceFile);
	console.log(`Found ${allDeclarations.length} total declarations in lib.webworker.ts`);

	// Create a map for quick lookup of declarations
	// Prefer interface/type/class/enum declarations over var/function declarations
	const declarationsMap = new Map<string, TypeDeclaration>();
	for (const decl of allDeclarations) {
		const existing = declarationsMap.get(decl.name);
		if (!existing) {
			declarationsMap.set(decl.name, decl);
		} else {
			// Prefer non-var/function declarations
			const existingIsVarOrFunc = existing.kind === "var" || existing.kind === "function";
			const declIsVarOrFunc = decl.kind === "var" || decl.kind === "function";
			if (existingIsVarOrFunc && !declIsVarOrFunc) {
				declarationsMap.set(decl.name, decl);
			}
		}
	}
	console.log("");

	console.log("Step 5: Finding global vars/functions that exist in both Node.js and Web Workers...");
	// Only include types that have a declare var/function in BOTH environments
	// This ensures we only get truly common globals, not browser-only APIs
	const commonGlobalNames = new Set<string>();
	for (const decl of allDeclarations) {
		// Only consider declare var/function statements from web worker types
		if (decl.kind === "var" || decl.kind === "function") {
			// Skip excluded globals
			if (EXCLUDED_GLOBALS.has(decl.name)) {
				continue;
			}

			// Check if this global var/function also exists in Node.js (exact match only)
			// Also include additional globals that are available in Node.js but not declared as such
			if (nodeGlobals.has(decl.name) || ADDITIONAL_NODE_GLOBALS.has(decl.name)) {
				commonGlobalNames.add(decl.name);
			}
		}
	}
	console.log(`Found ${commonGlobalNames.size} common global vars/functions`);
	console.log(`Examples: ${Array.from(commonGlobalNames).slice(0, 10).join(", ")}...`);
	console.log("");

	console.log("Step 6: Finding all referenced types (dependencies)...");
	// Start with just the common global var/function names
	// TypeScript will automatically pull in all types they reference from Web Workers
	// We don't check if dependencies exist in Node.js - Web Worker types are the source of truth
	const allReferencedTypes = findReferencedTypes(sourceFile, commonGlobalNames, nodesMap, declarationsMap);
	console.log(`Found ${allReferencedTypes.size} total types (including dependencies)`);

	// Get final list of declarations to include
	// IMPORTANT: Only include var/function declarations that are in the common globals
	// All other var/function declarations should be excluded (only interfaces/types/classes can be dependencies)
	const includedDeclarations = allDeclarations.filter((decl) => {
		if (!allReferencedTypes.has(decl.name)) {
			return false;
		}
		// If it's a var or function, it must be in the common globals
		if (decl.kind === "var" || decl.kind === "function") {
			return commonGlobalNames.has(decl.name);
		}
		// Interfaces, types, classes, enums can be included as dependencies
		return true;
	});
	console.log("");

	console.log(`Final: Including ${includedDeclarations.length} type declarations`);
	console.log(
		`Examples: ${includedDeclarations
			.map((d) => d.name)
			.slice(0, 20)
			.join(", ")}...`,
	);

	const output: string[] = [];

	// Add header
	output.push("/*! *****************************************************************************");
	output.push("This file contains type definitions derived from multiple sources:");
	output.push("- TypeScript's lib.webworker.d.ts (Microsoft Corporation)");
	output.push("- @types/node (DefinitelyTyped contributors)");
	output.push("- undici-types (Undici contributors)");
	output.push("");
	output.push("Original TypeScript definitions:");
	output.push("Copyright (c) Microsoft Corporation. All rights reserved.");
	output.push("Licensed under the Apache License, Version 2.0.");
	output.push("");
	output.push("@types/node definitions:");
	output.push("Definitions by DefinitelyTyped contributors");
	output.push("Licensed under the MIT License.");
	output.push("");
	output.push("This derivative work is licensed under MIT-0.");
	output.push("See individual source files for complete license terms.");
	output.push("***************************************************************************** */");
	output.push("");
	output.push("");
	output.push('/// <reference no-default-lib="true"/>');
	output.push("");
	output.push("/////////////////////////////");
	output.push("/// Common APIs");
	output.push("/////////////////////////////");
	output.push("");

	// Add all included declarations, removing excluded interfaces from extends clauses
	for (const decl of includedDeclarations) {
		let text: string;

		// Trim leading/trailing whitespace but preserve internal formatting
		text = decl.text.trim();

		// Remove excluded interfaces from extends clauses
		if (decl.kind === "interface" && EXCLUDED_INTERFACES.size > 0) {
			text = removeExcludedFromExtends(text);
		}

		output.push(text);
		output.push("");
	}

	return output
		.map((line) => {
			for (const [replacee, replacer] of EXCLUDED_STRINGS) {
				line = line.replace(replacee, replacer as string);
			}

			return line;
		})
		.join("\n");
}

try {
	console.log("Generating common.ts...");
	console.log(`Reading from: ${pathToWebDts}`);

	const result = processWebWorkerFile();

	writeFileSync(pathToOutput, result, "utf-8");

	console.log(`Successfully wrote to: ${pathToOutput}`);
	console.log(`Total lines: ${result.split("\n").length}`);
} catch (error) {
	console.error("Error generating common.ts:", error);

	process.exit(1);
}
