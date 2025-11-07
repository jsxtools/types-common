# Types Common

**Automatically generated TypeScript type definitions for APIs that work in both Node.js and Web Workers.**

This package provides `common.d.ts`, an ambient type definitions file containing only the types that are available in both Node.js and Web Worker environments. This enables you to write truly cross-platform TypeScript code without type conflicts.

```shell
npm install @jsxtools/types-common
```

Alternatively,
install the package as a [lib replacement](https://www.typescriptlang.org/tsconfig/#libReplacement):

```shell
pnpm add @jsxtools/types-common@npm:@types/common --save-dev

npm install @jsxtools/types-common@npm:@types/common --save-dev

yarn add @jsxtools/types-common@npm:@types/common --dev
```

## Why Use This?

When writing code that needs to run in both Node.js and browser environments (like Web Workers), you face a dilemma:

- Using `lib: ["dom"]` gives you browser types but causes conflicts with Node.js types
- Using `lib: ["esnext"]` with `@types/node` gives you Node.js types but no browser types
- Using both creates type conflicts for globals that exist in both but have different signatures

**This package solves that problem** by providing only the types that are guaranteed to work in both environments.

## What's Included?

The package includes types for common cross-platform APIs like:

- **Crypto APIs**: `crypto`, `Crypto`, `CryptoKey`, `SubtleCrypto`
- **Encoding**: `atob`, `btoa`, `TextEncoder`, `TextDecoder`
- **Timers**: `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`
- **Performance**: `performance`, `Performance`, `PerformanceEntry`
- **Events**: `EventTarget`, `Event`, `CustomEvent`, `MessageEvent`
- **Streams**: `ReadableStream`, `WritableStream`, `TransformStream`
- **Abort**: `AbortController`, `AbortSignal`
- **URL**: `URL`, `URLSearchParams`
- **Console**: `console`, `Console`
- And many more...

---

### Example: Cross-Platform Crypto

```typescript
// This code works in both Node.js and Web Workers!
async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

### Example: Cross-Platform Event Handling

```typescript
// Works in both environments
class DataProcessor extends EventTarget {
  async process(data: ArrayBuffer) {
    const event = new CustomEvent('progress', {
      detail: { processed: data.byteLength }
    });

    this.dispatchEvent(event);
  }
}

const processor = new DataProcessor();

processor.addEventListener('progress', (e) => {
  console.log('Processed:', e.detail.processed, 'bytes');
});
```

### Example: Cross-Platform Streams

```typescript
// Stream processing that works everywhere
async function transformData(input: ReadableStream<Uint8Array>) {
  const transformer = new TransformStream({
    transform(chunk, controller) {
      // Process chunk
      controller.enqueue(chunk);
    }
  });

  return input.pipeThrough(transformer);
}
```

## How It Works

The package uses a sophisticated build process that runs **on installation**:

1. **Discovers Common Globals**: Finds all global variables/functions that exist in both TypeScript's `lib.webworker.d.ts` and `@types/node`
2. **Resolves Dependencies**: Uses TypeScript's type checker to recursively resolve all types needed by those globals
3. **Generates Definitions**: Emits complete type definitions using TypeScript's printer API
4. **Post-Processing**: Cleans up non-deterministic output and removes environment-specific APIs

This means the generated types automatically stay in sync with your installed versions of TypeScript and `@types/node` — no manual maintenance required!

### Why Generate on Install?

By generating types during `postinstall`, the package ensures compatibility with your specific versions of TypeScript and Node.js types. This prevents version mismatches and ensures the types accurately reflect what's available in your environment.

## Development

### Regenerate Types

To manually regenerate the `common.d.ts` file:

```shell
npm run build
```

### Run Tests

The package includes tests that verify all declared globals actually exist in Node.js:

```shell
npm test
```

### Project Structure

- `generate.ts` - The generator script that creates `common.d.ts`
- `common.d.ts` - The generated type definitions (created on install)
- `generate-nodejs.test.ts` - Tests to verify types match runtime

## Requirements

- **Node.js**: Version with `--experimental-strip-types` support (Node.js 22.6.0+)
- **TypeScript**: 5.0.0 or higher
- **@types/node**: Any version (specified as peer dependency)

## Compatibility

The generated types are compatible with:
- Node.js (all versions with the required globals)
- Web Workers
- Service Workers
- Any environment that implements the common Web APIs

## License

This file contains type definitions derived from multiple sources:
- TypeScript's lib.webworker.d.ts (Microsoft Corporation)
- @types/node (DefinitelyTyped contributors)
- undici-types (Undici contributors)

Original TypeScript definitions:
- lib.webworker.d.ts: Apache-2.0
- @types/node: MIT
- undici-types: MIT

This derivative work is licensed under MIT-0.

## Contributing

Issues and pull requests are welcome! Please note that the type definitions are automatically generated, so most changes should be made to the generator script (`generate.ts`) rather than the output file.
