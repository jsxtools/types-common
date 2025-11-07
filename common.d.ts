/*! *****************************************************************************
This file contains type definitions derived from multiple sources:
- TypeScript's lib.webworker.d.ts (Microsoft Corporation)
- @types/node (DefinitelyTyped contributors)
- undici-types (Undici contributors)

Original TypeScript definitions:
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0.

@types/node definitions:
Definitions by DefinitelyTyped contributors
Licensed under the MIT License.

This derivative work is licensed under MIT-0.
See individual source files for complete license terms.
***************************************************************************** */

/// <reference no-default-lib="true"/>

/////////////////////////////
/// Common APIs
/////////////////////////////

interface AddEventListenerOptions extends EventListenerOptions {
	once?: boolean;
	passive?: boolean;
	signal?: AbortSignal;
}

interface AesCbcParams extends Algorithm {
	iv: BufferSource;
}

interface AesCtrParams extends Algorithm {
	counter: BufferSource;
	length: number;
}

interface AesDerivedKeyParams extends Algorithm {
	length: number;
}

interface AesGcmParams extends Algorithm {
	additionalData?: BufferSource;
	iv: BufferSource;
	tagLength?: number;
}

interface AesKeyAlgorithm extends KeyAlgorithm {
	length: number;
}

interface AesKeyGenParams extends Algorithm {
	length: number;
}

interface Algorithm {
	name: string;
}

interface CryptoKeyPair {
	privateKey: CryptoKey;
	publicKey: CryptoKey;
}

interface EcKeyGenParams extends Algorithm {
	namedCurve: NamedCurve;
}

interface EcKeyImportParams extends Algorithm {
	namedCurve: NamedCurve;
}

interface EcdhKeyDeriveParams extends Algorithm {
	public: CryptoKey;
}

interface EcdsaParams extends Algorithm {
	hash: HashAlgorithmIdentifier;
}

interface EventListenerOptions {
	capture?: boolean;
}

interface HkdfParams extends Algorithm {
	hash: HashAlgorithmIdentifier;
	info: BufferSource;
	salt: BufferSource;
}

interface HmacImportParams extends Algorithm {
	hash: HashAlgorithmIdentifier;
	length?: number;
}

interface HmacKeyGenParams extends Algorithm {
	hash: HashAlgorithmIdentifier;
	length?: number;
}

interface JsonWebKey {
	alg?: string;
	crv?: string;
	d?: string;
	dp?: string;
	dq?: string;
	e?: string;
	ext?: boolean;
	k?: string;
	key_ops?: string[];
	kty?: string;
	n?: string;
	oth?: RsaOtherPrimesInfo[];
	p?: string;
	q?: string;
	qi?: string;
	use?: string;
	x?: string;
	y?: string;
}

interface KeyAlgorithm {
	name: string;
}

interface Pbkdf2Params extends Algorithm {
	hash: HashAlgorithmIdentifier;
	iterations: number;
	salt: BufferSource;
}

interface PerformanceMarkOptions {
	detail?: any;
	startTime?: DOMHighResTimeStamp;
}

interface PerformanceMeasureOptions {
	detail?: any;
	duration?: DOMHighResTimeStamp;
	end?: string | DOMHighResTimeStamp;
	start?: string | DOMHighResTimeStamp;
}

interface PerformanceObserverInit {
	buffered?: boolean;
	entryTypes?: string[];
	type?: string;
}

interface PermissionDescriptor {
	name: PermissionName;
}

interface QueuingStrategy<T = any> {
	highWaterMark?: number;
	size?: QueuingStrategySize<T>;
}

interface ReadableStreamGetReaderOptions {
	/**
	 * Creates a ReadableStreamBYOBReader and locks the stream to the new reader.
	 *
	 * This call behaves the same way as the no-argument variant, except that it only works on readable byte streams, i.e. streams which were constructed specifically with the ability to handle "bring your own buffer" reading. The returned BYOB reader provides the ability to directly read individual chunks from the stream via its read() method, into developer-supplied buffers, allowing more precise control over allocation.
	 */
	mode?: ReadableStreamReaderMode;
}

interface ReadableWritablePair<R = any, W = any> {
	readable: ReadableStream<R>;
	/**
	 * Provides a convenient, chainable way of piping this readable stream through a transform stream (or any other { writable, readable } pair). It simply pipes the stream into the writable side of the supplied pair, and returns the readable side for further use.
	 *
	 * Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader.
	 */
	writable: WritableStream<W>;
}

interface RequestInit {
	/** A BodyInit object or null to set request's body. */
	body?: BodyInit | null;
	/** A string indicating how the request will interact with the browser's cache to set request's cache. */
	cache?: RequestCache;
	/** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
	credentials?: RequestCredentials;
	/** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
	headers?: HeadersInit;
	/** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
	integrity?: string;
	/** A boolean to set request's keepalive. */
	keepalive?: boolean;
	/** A string to set request's method. */
	method?: string;
	/** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
	mode?: RequestMode;
	priority?: RequestPriority;
	/** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
	redirect?: RequestRedirect;
	/** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
	referrer?: string;
	/** A referrer policy to set request's referrerPolicy. */
	referrerPolicy?: ReferrerPolicy;
	/** An AbortSignal to set request's signal. */
	signal?: AbortSignal | null;
	/** Can only be null. Used to disassociate request from any Window. */
	window?: null;
}

interface RsaHashedImportParams extends Algorithm {
	hash: HashAlgorithmIdentifier;
}

interface RsaHashedKeyGenParams extends RsaKeyGenParams {
	hash: HashAlgorithmIdentifier;
}

interface RsaKeyGenParams extends Algorithm {
	modulusLength: number;
	publicExponent: BigInteger;
}

interface RsaOaepParams extends Algorithm {
	label?: BufferSource;
}

interface RsaOtherPrimesInfo {
	d?: string;
	r?: string;
	t?: string;
}

interface RsaPssParams extends Algorithm {
	saltLength: number;
}

interface StreamPipeOptions {
	preventAbort?: boolean;
	preventCancel?: boolean;
	/**
	 * Pipes this readable stream to a given writable stream destination. The way in which the piping process behaves under various error conditions can be customized with a number of passed options. It returns a promise that fulfills when the piping process completes successfully, or rejects if any errors were encountered.
	 *
	 * Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader.
	 *
	 * Errors and closures of the source and destination streams propagate as follows:
	 *
	 * An error in this source readable stream will abort destination, unless preventAbort is truthy. The returned promise will be rejected with the source's error, or with any error that occurs during aborting the destination.
	 *
	 * An error in destination will cancel this source readable stream, unless preventCancel is truthy. The returned promise will be rejected with the destination's error, or with any error that occurs during canceling the source.
	 *
	 * When this source readable stream closes, destination will be closed, unless preventClose is truthy. The returned promise will be fulfilled once this process completes, unless an error is encountered while closing the destination, in which case it will be rejected with that error.
	 *
	 * If destination starts out closed or closing, this source readable stream will be canceled, unless preventCancel is true. The returned promise will be rejected with an error indicating piping to a closed stream failed, or with any error that occurs during canceling the source.
	 *
	 * The signal option can be set to an AbortSignal to allow aborting an ongoing pipe operation via the corresponding AbortController. In this case, this source readable stream will be canceled, and destination aborted, unless the respective options preventCancel or preventAbort are set.
	 */
	preventClose?: boolean;
	signal?: AbortSignal;
}

interface StructuredSerializeOptions {
	transfer?: Transferable[];
}

interface TextDecodeOptions {
	stream?: boolean;
}

interface TextEncoderEncodeIntoResult {
	read: number;
	written: number;
}

/**
 * The **`AbortController`** interface represents a controller object that allows you to abort one or more Web requests as and when desired.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortController)
 */
interface AbortController {
	/**
	 * The **`signal`** read-only property of the AbortController interface returns an AbortSignal object instance, which can be used to communicate with/abort an asynchronous operation as desired.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortController/signal)
	 */
	readonly signal: AbortSignal;
	/**
	 * The **`abort()`** method of the AbortController interface aborts an asynchronous operation before it has completed.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortController/abort)
	 */
	abort(reason?: any): void;
}

declare var AbortController: {
	prototype: AbortController;
	new (): AbortController;
};

interface AbortSignalEventMap {
	abort: Event;
}

/**
 * The **`AbortSignal`** interface represents a signal object that allows you to communicate with an asynchronous operation (such as a fetch request) and abort it if required via an AbortController object.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal)
 */
interface AbortSignal extends EventTarget {
	/**
	 * The **`aborted`** read-only property returns a value that indicates whether the asynchronous operations the signal is communicating with are aborted (`true`) or not (`false`).
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/aborted)
	 */
	readonly aborted: boolean;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/abort_event) */
	onabort: ((this: AbortSignal, ev: Event) => any) | null;
	/**
	 * The **`reason`** read-only property returns a JavaScript value that indicates the abort reason.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/reason)
	 */
	readonly reason: any;
	/**
	 * The **`throwIfAborted()`** method throws the signal's abort AbortSignal.reason if the signal has been aborted; otherwise it does nothing.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/throwIfAborted)
	 */
	throwIfAborted(): void;
	addEventListener<K extends keyof AbortSignalEventMap>(
		type: K,
		listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions,
	): void;
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions,
	): void;
	removeEventListener<K extends keyof AbortSignalEventMap>(
		type: K,
		listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
		options?: boolean | EventListenerOptions,
	): void;
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions,
	): void;
}

declare var AbortSignal: {
	prototype: AbortSignal;
	new (): AbortSignal;
	/**
	 * The **`AbortSignal.abort()`** static method returns an AbortSignal that is already set as aborted (and which does not trigger an AbortSignal/abort_event event).
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/abort_static)
	 */
	abort(reason?: any): AbortSignal;
	/**
	 * The **`AbortSignal.any()`** static method takes an iterable of abort signals and returns an AbortSignal.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/any_static)
	 */
	any(signals: AbortSignal[]): AbortSignal;
	/**
	 * The **`AbortSignal.timeout()`** static method returns an AbortSignal that will automatically abort after a specified time.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/timeout_static)
	 */
	timeout(milliseconds: number): AbortSignal;
};

/**
 * The **`Blob`** interface represents a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data, or converted into a ReadableStream so its methods can be used for processing the data.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob)
 */
interface Blob {
	/**
	 * The **`size`** read-only property of the Blob interface returns the size of the Blob or File in bytes.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/size)
	 */
	readonly size: number;
	/**
	 * The **`type`** read-only property of the Blob interface returns the MIME type of the file.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/type)
	 */
	readonly type: string;
	/**
	 * The **`arrayBuffer()`** method of the Blob interface returns a Promise that resolves with the contents of the blob as binary data contained in an ArrayBuffer.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/arrayBuffer)
	 */
	arrayBuffer(): Promise<ArrayBuffer>;
	/**
	 * The **`bytes()`** method of the Blob interface returns a Promise that resolves with a Uint8Array containing the contents of the blob as an array of bytes.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/bytes)
	 */
	bytes(): Promise<Uint8Array<ArrayBuffer>>;
	/**
	 * The **`slice()`** method of the Blob interface creates and returns a new `Blob` object which contains data from a subset of the blob on which it's called.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/slice)
	 */
	slice(start?: number, end?: number, contentType?: string): Blob;
	/**
	 * The **`stream()`** method of the Blob interface returns a ReadableStream which upon reading returns the data contained within the `Blob`.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/stream)
	 */
	stream(): ReadableStream<Uint8Array<ArrayBuffer>>;
	/**
	 * The **`text()`** method of the string containing the contents of the blob, interpreted as UTF-8.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/text)
	 */
	text(): Promise<string>;
}

declare var Blob: {
	prototype: Blob;
	new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
};

interface Body {
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/body) */
	readonly body: ReadableStream<Uint8Array<ArrayBuffer>> | null;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/bodyUsed) */
	readonly bodyUsed: boolean;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/arrayBuffer) */
	arrayBuffer(): Promise<ArrayBuffer>;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/blob) */
	blob(): Promise<Blob>;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/bytes) */
	bytes(): Promise<Uint8Array<ArrayBuffer>>;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/formData) */
	formData(): Promise<FormData>;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/json) */
	json(): Promise<any>;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/text) */
	text(): Promise<string>;
}

interface BroadcastChannelEventMap {
	message: MessageEvent;
	messageerror: MessageEvent;
}

/**
 * The **`BroadcastChannel`** interface represents a named channel that any browsing context of a given origin can subscribe to.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/BroadcastChannel)
 */
interface BroadcastChannel extends EventTarget {
	/**
	 * The **`name`** read-only property of the BroadcastChannel interface returns a string, which uniquely identifies the given channel with its name.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/BroadcastChannel/name)
	 */
	readonly name: string;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/BroadcastChannel/message_event) */
	onmessage: ((this: BroadcastChannel, ev: MessageEvent) => any) | null;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/BroadcastChannel/messageerror_event) */
	onmessageerror: ((this: BroadcastChannel, ev: MessageEvent) => any) | null;
	/**
	 * The **`close()`** method of the BroadcastChannel interface terminates the connection to the underlying channel, allowing the object to be garbage collected.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/BroadcastChannel/close)
	 */
	close(): void;
	/**
	 * The **`postMessage()`** method of the BroadcastChannel interface sends a message, which can be of any kind of Object, to each listener in any browsing context with the same origin.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/BroadcastChannel/postMessage)
	 */
	postMessage(message: any): void;
	addEventListener<K extends keyof BroadcastChannelEventMap>(
		type: K,
		listener: (this: BroadcastChannel, ev: BroadcastChannelEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions,
	): void;
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions,
	): void;
	removeEventListener<K extends keyof BroadcastChannelEventMap>(
		type: K,
		listener: (this: BroadcastChannel, ev: BroadcastChannelEventMap[K]) => any,
		options?: boolean | EventListenerOptions,
	): void;
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions,
	): void;
}

declare var BroadcastChannel: {
	prototype: BroadcastChannel;
	new (name: string): BroadcastChannel;
};

/**
 * The **`ByteLengthQueuingStrategy`** interface of the Streams API provides a built-in byte length queuing strategy that can be used when constructing streams.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ByteLengthQueuingStrategy)
 */
interface ByteLengthQueuingStrategy extends QueuingStrategy<ArrayBufferView> {
	/**
	 * The read-only **`ByteLengthQueuingStrategy.highWaterMark`** property returns the total number of bytes that can be contained in the internal queue before backpressure is applied.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ByteLengthQueuingStrategy/highWaterMark)
	 */
	readonly highWaterMark: number;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ByteLengthQueuingStrategy/size) */
	readonly size: QueuingStrategySize<ArrayBufferView>;
}

declare var ByteLengthQueuingStrategy: {
	prototype: ByteLengthQueuingStrategy;
	new (init: QueuingStrategyInit): ByteLengthQueuingStrategy;
};

/**
 * A `CloseEvent` is sent to clients using WebSockets when the connection is closed.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CloseEvent)
 */
interface CloseEvent extends Event {
	/**
	 * The **`code`** read-only property of the CloseEvent interface returns a WebSocket connection close code indicating the reason the connection was closed.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CloseEvent/code)
	 */
	readonly code: number;
	/**
	 * The **`reason`** read-only property of the CloseEvent interface returns the WebSocket connection close reason the server gave for closing the connection; that is, a concise human-readable prose explanation for the closure.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CloseEvent/reason)
	 */
	readonly reason: string;
	/**
	 * The **`wasClean`** read-only property of the CloseEvent interface returns `true` if the connection closed cleanly.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CloseEvent/wasClean)
	 */
	readonly wasClean: boolean;
}

/**
 * The **`CompressionStream`** interface of the Compression Streams API is an API for compressing a stream of data.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CompressionStream)
 */
interface CompressionStream extends GenericTransformStream {
	readonly readable: ReadableStream<Uint8Array<ArrayBuffer>>;
	readonly writable: WritableStream<BufferSource>;
}

declare var CompressionStream: {
	prototype: CompressionStream;
	new (format: CompressionFormat): CompressionStream;
};

/**
 * The **`CountQueuingStrategy`** interface of the Streams API provides a built-in chunk counting queuing strategy that can be used when constructing streams.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CountQueuingStrategy)
 */
interface CountQueuingStrategy extends QueuingStrategy {
	/**
	 * The read-only **`CountQueuingStrategy.highWaterMark`** property returns the total number of chunks that can be contained in the internal queue before backpressure is applied.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CountQueuingStrategy/highWaterMark)
	 */
	readonly highWaterMark: number;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/CountQueuingStrategy/size) */
	readonly size: QueuingStrategySize;
}

declare var CountQueuingStrategy: {
	prototype: CountQueuingStrategy;
	new (init: QueuingStrategyInit): CountQueuingStrategy;
};

/**
 * The **`Crypto`** interface represents basic cryptography features available in the current context.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Crypto)
 */
interface Crypto {
	/**
	 * The **`Crypto.subtle`** read-only property returns a cryptographic operations.
	 * Available only in secure contexts.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Crypto/subtle)
	 */
	readonly subtle: SubtleCrypto;
	/**
	 * The **`Crypto.getRandomValues()`** method lets you get cryptographically strong random values.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Crypto/getRandomValues)
	 */
	getRandomValues<T extends ArrayBufferView>(array: T): T;
	/**
	 * The **`randomUUID()`** method of the Crypto interface is used to generate a v4 UUID using a cryptographically secure random number generator.
	 * Available only in secure contexts.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Crypto/randomUUID)
	 */
	randomUUID(): `${string}-${string}-${string}-${string}-${string}`;
}

declare var Crypto: {
	prototype: Crypto;
	new (): Crypto;
};

/**
 * The **`CryptoKey`** interface of the Web Crypto API represents a cryptographic key obtained from one of the SubtleCrypto methods SubtleCrypto.generateKey, SubtleCrypto.deriveKey, SubtleCrypto.importKey, or SubtleCrypto.unwrapKey.
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey)
 */
interface CryptoKey {
	/**
	 * The read-only **`algorithm`** property of the CryptoKey interface returns an object describing the algorithm for which this key can be used, and any associated extra parameters.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/algorithm)
	 */
	readonly algorithm: KeyAlgorithm;
	/**
	 * The read-only **`extractable`** property of the CryptoKey interface indicates whether or not the key may be extracted using `SubtleCrypto.exportKey()` or `SubtleCrypto.wrapKey()`.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/extractable)
	 */
	readonly extractable: boolean;
	/**
	 * The read-only **`type`** property of the CryptoKey interface indicates which kind of key is represented by the object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/type)
	 */
	readonly type: KeyType;
	/**
	 * The read-only **`usages`** property of the CryptoKey interface indicates what can be done with the key.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/usages)
	 */
	readonly usages: KeyUsage[];
}

declare var CryptoKey: {
	prototype: CryptoKey;
	new (): CryptoKey;
};

/**
 * The **`CustomEvent`** interface represents events initialized by an application for any purpose.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CustomEvent)
 */
interface CustomEvent<T = any> extends Event {
	/**
	 * The read-only **`detail`** property of the CustomEvent interface returns any data passed when initializing the event.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CustomEvent/detail)
	 */
	readonly detail: T;
	/**
	 * The **`CustomEvent.initCustomEvent()`** method initializes a CustomEvent object.
	 * @deprecated
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CustomEvent/initCustomEvent)
	 */
	initCustomEvent(type: string, bubbles?: boolean, cancelable?: boolean, detail?: T): void;
}

declare var CustomEvent: {
	prototype: CustomEvent;
	new <T>(type: string, eventInitDict?: CustomEventInit<T>): CustomEvent<T>;
};

/**
 * The **`DOMException`** interface represents an abnormal event (called an **exception**) that occurs as a result of calling a method or accessing a property of a web API.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMException)
 */
interface DOMException extends Error {
	/**
	 * The **`code`** read-only property of the DOMException interface returns one of the legacy error code constants, or `0` if none match.
	 * @deprecated
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMException/code)
	 */
	readonly code: number;
	/**
	 * The **`message`** read-only property of the a message or description associated with the given error name.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMException/message)
	 */
	readonly message: string;
	/**
	 * The **`name`** read-only property of the one of the strings associated with an error name.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMException/name)
	 */
	readonly name: string;
	readonly INDEX_SIZE_ERR: 1;
	readonly DOMSTRING_SIZE_ERR: 2;
	readonly HIERARCHY_REQUEST_ERR: 3;
	readonly WRONG_DOCUMENT_ERR: 4;
	readonly INVALID_CHARACTER_ERR: 5;
	readonly NO_DATA_ALLOWED_ERR: 6;
	readonly NO_MODIFICATION_ALLOWED_ERR: 7;
	readonly NOT_FOUND_ERR: 8;
	readonly NOT_SUPPORTED_ERR: 9;
	readonly INUSE_ATTRIBUTE_ERR: 10;
	readonly INVALID_STATE_ERR: 11;
	readonly SYNTAX_ERR: 12;
	readonly INVALID_MODIFICATION_ERR: 13;
	readonly NAMESPACE_ERR: 14;
	readonly INVALID_ACCESS_ERR: 15;
	readonly VALIDATION_ERR: 16;
	readonly TYPE_MISMATCH_ERR: 17;
	readonly SECURITY_ERR: 18;
	readonly NETWORK_ERR: 19;
	readonly ABORT_ERR: 20;
	readonly URL_MISMATCH_ERR: 21;
	readonly QUOTA_EXCEEDED_ERR: 22;
	readonly TIMEOUT_ERR: 23;
	readonly INVALID_NODE_TYPE_ERR: 24;
	readonly DATA_CLONE_ERR: 25;
}

declare var DOMException: {
	prototype: DOMException;
	new (message?: string, name?: string): DOMException;
	readonly INDEX_SIZE_ERR: 1;
	readonly DOMSTRING_SIZE_ERR: 2;
	readonly HIERARCHY_REQUEST_ERR: 3;
	readonly WRONG_DOCUMENT_ERR: 4;
	readonly INVALID_CHARACTER_ERR: 5;
	readonly NO_DATA_ALLOWED_ERR: 6;
	readonly NO_MODIFICATION_ALLOWED_ERR: 7;
	readonly NOT_FOUND_ERR: 8;
	readonly NOT_SUPPORTED_ERR: 9;
	readonly INUSE_ATTRIBUTE_ERR: 10;
	readonly INVALID_STATE_ERR: 11;
	readonly SYNTAX_ERR: 12;
	readonly INVALID_MODIFICATION_ERR: 13;
	readonly NAMESPACE_ERR: 14;
	readonly INVALID_ACCESS_ERR: 15;
	readonly VALIDATION_ERR: 16;
	readonly TYPE_MISMATCH_ERR: 17;
	readonly SECURITY_ERR: 18;
	readonly NETWORK_ERR: 19;
	readonly ABORT_ERR: 20;
	readonly URL_MISMATCH_ERR: 21;
	readonly QUOTA_EXCEEDED_ERR: 22;
	readonly TIMEOUT_ERR: 23;
	readonly INVALID_NODE_TYPE_ERR: 24;
	readonly DATA_CLONE_ERR: 25;
};

/**
 * The **`DecompressionStream`** interface of the Compression Streams API is an API for decompressing a stream of data.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DecompressionStream)
 */
interface DecompressionStream extends GenericTransformStream {
	readonly readable: ReadableStream<Uint8Array<ArrayBuffer>>;
	readonly writable: WritableStream<BufferSource>;
}

declare var DecompressionStream: {
	prototype: DecompressionStream;
	new (format: CompressionFormat): DecompressionStream;
};

/**
 * The **`Event`** interface represents an event which takes place on an `EventTarget`.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event)
 */
interface Event {
	/**
	 * The **`bubbles`** read-only property of the Event interface indicates whether the event bubbles up through the DOM tree or not.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/bubbles)
	 */
	readonly bubbles: boolean;
	/**
	 * The **`cancelBubble`** property of the Event interface is deprecated.
	 * @deprecated
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelBubble)
	 */
	cancelBubble: boolean;
	/**
	 * The **`cancelable`** read-only property of the Event interface indicates whether the event can be canceled, and therefore prevented as if the event never happened.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelable)
	 */
	readonly cancelable: boolean;
	/**
	 * The read-only **`composed`** property of the or not the event will propagate across the shadow DOM boundary into the standard DOM.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composed)
	 */
	readonly composed: boolean;
	/**
	 * The **`currentTarget`** read-only property of the Event interface identifies the element to which the event handler has been attached.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/currentTarget)
	 */
	readonly currentTarget: EventTarget | null;
	/**
	 * The **`defaultPrevented`** read-only property of the Event interface returns a boolean value indicating whether or not the call to Event.preventDefault() canceled the event.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/defaultPrevented)
	 */
	readonly defaultPrevented: boolean;
	/**
	 * The **`eventPhase`** read-only property of the being evaluated.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/eventPhase)
	 */
	readonly eventPhase: number;
	/**
	 * The **`isTrusted`** read-only property of the when the event was generated by the user agent (including via user actions and programmatic methods such as HTMLElement.focus()), and `false` when the event was dispatched via The only exception is the `click` event, which initializes the `isTrusted` property to `false` in user agents.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/isTrusted)
	 */
	readonly isTrusted: boolean;
	/**
	 * The Event property **`returnValue`** indicates whether the default action for this event has been prevented or not.
	 * @deprecated
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/returnValue)
	 */
	returnValue: boolean;
	/**
	 * The deprecated **`Event.srcElement`** is an alias for the Event.target property.
	 * @deprecated
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/srcElement)
	 */
	readonly srcElement: EventTarget | null;
	/**
	 * The read-only **`target`** property of the dispatched.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/target)
	 */
	readonly target: EventTarget | null;
	/**
	 * The **`timeStamp`** read-only property of the Event interface returns the time (in milliseconds) at which the event was created.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/timeStamp)
	 */
	readonly timeStamp: DOMHighResTimeStamp;
	/**
	 * The **`type`** read-only property of the Event interface returns a string containing the event's type.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/type)
	 */
	readonly type: string;
	/**
	 * The **`composedPath()`** method of the Event interface returns the event's path which is an array of the objects on which listeners will be invoked.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composedPath)
	 */
	composedPath(): EventTarget[];
	/**
	 * The **`Event.initEvent()`** method is used to initialize the value of an event created using Document.createEvent().
	 * @deprecated
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/initEvent)
	 */
	initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void;
	/**
	 * The **`preventDefault()`** method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/preventDefault)
	 */
	preventDefault(): void;
	/**
	 * The **`stopImmediatePropagation()`** method of the If several listeners are attached to the same element for the same event type, they are called in the order in which they were added.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopImmediatePropagation)
	 */
	stopImmediatePropagation(): void;
	/**
	 * The **`stopPropagation()`** method of the Event interface prevents further propagation of the current event in the capturing and bubbling phases.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation)
	 */
	stopPropagation(): void;
	readonly NONE: 0;
	readonly CAPTURING_PHASE: 1;
	readonly AT_TARGET: 2;
	readonly BUBBLING_PHASE: 3;
}

declare var Event: {
	prototype: Event;
	new (type: string, eventInitDict?: EventInit): Event;
	readonly NONE: 0;
	readonly CAPTURING_PHASE: 1;
	readonly AT_TARGET: 2;
	readonly BUBBLING_PHASE: 3;
};

/**
 * The **`EventTarget`** interface is implemented by objects that can receive events and may have listeners for them.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget)
 */
interface EventTarget {
	/**
	 * The **`addEventListener()`** method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)
	 */
	addEventListener(
		type: string,
		callback: EventListenerOrEventListenerObject | null,
		options?: AddEventListenerOptions | boolean,
	): void;
	/**
	 * The **`dispatchEvent()`** method of the EventTarget sends an Event to the object, (synchronously) invoking the affected event listeners in the appropriate order.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)
	 */
	dispatchEvent(event: Event): boolean;
	/**
	 * The **`removeEventListener()`** method of the EventTarget interface removes an event listener previously registered with EventTarget.addEventListener() from the target.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener)
	 */
	removeEventListener(
		type: string,
		callback: EventListenerOrEventListenerObject | null,
		options?: EventListenerOptions | boolean,
	): void;
}

declare var EventTarget: {
	prototype: EventTarget;
	new (): EventTarget;
};

/**
 * The **`File`** interface provides information about files and allows JavaScript in a web page to access their content.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/File)
 */
interface File extends Blob {
	/**
	 * The **`lastModified`** read-only property of the File interface provides the last modified date of the file as the number of milliseconds since the Unix epoch (January 1, 1970 at midnight).
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/lastModified)
	 */
	readonly lastModified: number;
	/**
	 * The **`name`** read-only property of the File interface returns the name of the file represented by a File object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/name)
	 */
	readonly name: string;
	/**
	 * The **`webkitRelativePath`** read-only property of the File interface contains a string which specifies the file's path relative to the directory selected by the user in an input element with its `webkitdirectory` attribute set.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/webkitRelativePath)
	 */
	readonly webkitRelativePath: string;
}

declare var File: {
	prototype: File;
	new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
};

/**
 * The **`FormData`** interface provides a way to construct a set of key/value pairs representing form fields and their values, which can be sent using the Window/fetch, XMLHttpRequest.send() or navigator.sendBeacon() methods.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData)
 */
interface FormData {
	/**
	 * The **`append()`** method of the FormData interface appends a new value onto an existing key inside a `FormData` object, or adds the key if it does not already exist.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/append)
	 */
	append(name: string, value: string | Blob): void;
	append(name: string, value: string): void;
	append(name: string, blobValue: Blob, filename?: string): void;
	/**
	 * The **`delete()`** method of the FormData interface deletes a key and its value(s) from a `FormData` object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/delete)
	 */
	delete(name: string): void;
	/**
	 * The **`get()`** method of the FormData interface returns the first value associated with a given key from within a `FormData` object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/get)
	 */
	get(name: string): FormDataEntryValue | null;
	/**
	 * The **`getAll()`** method of the FormData interface returns all the values associated with a given key from within a `FormData` object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/getAll)
	 */
	getAll(name: string): FormDataEntryValue[];
	/**
	 * The **`has()`** method of the FormData interface returns whether a `FormData` object contains a certain key.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/has)
	 */
	has(name: string): boolean;
	/**
	 * The **`set()`** method of the FormData interface sets a new value for an existing key inside a `FormData` object, or adds the key/value if it does not already exist.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/set)
	 */
	set(name: string, value: string | Blob): void;
	set(name: string, value: string): void;
	set(name: string, blobValue: Blob, filename?: string): void;
	forEach(callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void;
}

declare var FormData: {
	prototype: FormData;
	new (): FormData;
};

interface GenericTransformStream {
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/CompressionStream/readable) */
	readonly readable: ReadableStream;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/CompressionStream/writable) */
	readonly writable: WritableStream;
}

/**
 * The **`Headers`** interface of the Fetch API allows you to perform various actions on HTTP request and response headers.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers)
 */
interface Headers {
	/**
	 * The **`append()`** method of the Headers interface appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/append)
	 */
	append(name: string, value: string): void;
	/**
	 * The **`delete()`** method of the Headers interface deletes a header from the current `Headers` object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/delete)
	 */
	delete(name: string): void;
	/**
	 * The **`get()`** method of the Headers interface returns a byte string of all the values of a header within a `Headers` object with a given name.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/get)
	 */
	get(name: string): string | null;
	/**
	 * The **`getSetCookie()`** method of the Headers interface returns an array containing the values of all Set-Cookie headers associated with a response.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/getSetCookie)
	 */
	getSetCookie(): string[];
	/**
	 * The **`has()`** method of the Headers interface returns a boolean stating whether a `Headers` object contains a certain header.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/has)
	 */
	has(name: string): boolean;
	/**
	 * The **`set()`** method of the Headers interface sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/set)
	 */
	set(name: string, value: string): void;
	forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
}

declare var Headers: {
	prototype: Headers;
	new (init?: HeadersInit): Headers;
};

/**
 * The **`MessageChannel`** interface of the Channel Messaging API allows us to create a new message channel and send data through it via its two MessagePort properties.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageChannel)
 */
interface MessageChannel {
	/**
	 * The **`port1`** read-only property of the the port attached to the context that originated the channel.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageChannel/port1)
	 */
	readonly port1: MessagePort;
	/**
	 * The **`port2`** read-only property of the the port attached to the context at the other end of the channel, which the message is initially sent to.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageChannel/port2)
	 */
	readonly port2: MessagePort;
}

declare var MessageChannel: {
	prototype: MessageChannel;
	new (): MessageChannel;
};

/**
 * The **`MessageEvent`** interface represents a message received by a target object.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent)
 */
interface MessageEvent<T = any> extends Event {
	/**
	 * The **`data`** read-only property of the The data sent by the message emitter; this can be any data type, depending on what originated this event.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/data)
	 */
	readonly data: T;
	/**
	 * The **`lastEventId`** read-only property of the unique ID for the event.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/lastEventId)
	 */
	readonly lastEventId: string;
	/**
	 * The **`origin`** read-only property of the origin of the message emitter.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/origin)
	 */
	readonly origin: string;
	/**
	 * The **`ports`** read-only property of the containing all MessagePort objects sent with the message, in order.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/ports)
	 */
	readonly ports: ReadonlyArray<MessagePort>;
	/**
	 * The **`source`** read-only property of the a WindowProxy, MessagePort, or a `MessageEventSource` (which can be a WindowProxy, message emitter.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/source)
	 */
	readonly source: MessageEventSource | null;
	/** @deprecated */
	initMessageEvent(
		type: string,
		bubbles?: boolean,
		cancelable?: boolean,
		data?: any,
		origin?: string,
		lastEventId?: string,
		source?: MessageEventSource | null,
		ports?: MessagePort[],
	): void;
}

declare var MessageEvent: {
	prototype: MessageEvent;
	new <T>(type: string, eventInitDict?: MessageEventInit<T>): MessageEvent<T>;
};

interface MessageEventTargetEventMap {
	message: MessageEvent;
	messageerror: MessageEvent;
}

interface MessageEventTarget<T> {
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessagePort/message_event) */
	onmessage: ((this: T, ev: MessageEvent) => any) | null;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessagePort/messageerror_event) */
	onmessageerror: ((this: T, ev: MessageEvent) => any) | null;
	addEventListener<K extends keyof MessageEventTargetEventMap>(
		type: K,
		listener: (this: T, ev: MessageEventTargetEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions,
	): void;
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions,
	): void;
	removeEventListener<K extends keyof MessageEventTargetEventMap>(
		type: K,
		listener: (this: T, ev: MessageEventTargetEventMap[K]) => any,
		options?: boolean | EventListenerOptions,
	): void;
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions,
	): void;
}

interface MessagePortEventMap extends MessageEventTargetEventMap {
	message: MessageEvent;
	messageerror: MessageEvent;
}

/**
 * The **`MessagePort`** interface of the Channel Messaging API represents one of the two ports of a MessageChannel, allowing messages to be sent from one port and listening out for them arriving at the other.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessagePort)
 */
interface MessagePort extends EventTarget, MessageEventTarget<MessagePort> {
	/**
	 * The **`close()`** method of the MessagePort interface disconnects the port, so it is no longer active.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessagePort/close)
	 */
	close(): void;
	/**
	 * The **`postMessage()`** method of the transfers ownership of objects to other browsing contexts.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessagePort/postMessage)
	 */
	postMessage(message: any, transfer: Transferable[]): void;
	postMessage(message: any, options?: StructuredSerializeOptions): void;
	/**
	 * The **`start()`** method of the MessagePort interface starts the sending of messages queued on the port.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessagePort/start)
	 */
	start(): void;
	addEventListener<K extends keyof MessagePortEventMap>(
		type: K,
		listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions,
	): void;
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions,
	): void;
	removeEventListener<K extends keyof MessagePortEventMap>(
		type: K,
		listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any,
		options?: boolean | EventListenerOptions,
	): void;
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions,
	): void;
}

declare var MessagePort: {
	prototype: MessagePort;
	new (): MessagePort;
};

interface NavigatorConcurrentHardware {
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/hardwareConcurrency) */
	readonly hardwareConcurrency: number;
}

interface NavigatorID {
	/**
	 * @deprecated
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/appCodeName)
	 */
	readonly appCodeName: string;
	/**
	 * @deprecated
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/appName)
	 */
	readonly appName: string;
	/**
	 * @deprecated
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/appVersion)
	 */
	readonly appVersion: string;
	/**
	 * @deprecated
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/platform)
	 */
	readonly platform: string;
	/**
	 * @deprecated
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/product)
	 */
	readonly product: string;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/userAgent) */
	readonly userAgent: string;
}

interface NavigatorLanguage {
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/language) */
	readonly language: string;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/languages) */
	readonly languages: ReadonlyArray<string>;
}

interface PerformanceEventMap {
	resourcetimingbufferfull: Event;
}

/**
 * The **`Performance`** interface provides access to performance-related information for the current page.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Performance)
 */
interface Performance extends EventTarget {
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Performance/resourcetimingbufferfull_event) */
	onresourcetimingbufferfull: ((this: Performance, ev: Event) => any) | null;
	/**
	 * The **`timeOrigin`** read-only property of the Performance interface returns the high resolution timestamp that is used as the baseline for performance-related timestamps.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Performance/timeOrigin)
	 */
	readonly timeOrigin: DOMHighResTimeStamp;
	/**
	 * The **`clearMarks()`** method removes all or specific PerformanceMark objects from the browser's performance timeline.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Performance/clearMarks)
	 */
	clearMarks(markName?: string): void;
	/**
	 * The **`clearMeasures()`** method removes all or specific PerformanceMeasure objects from the browser's performance timeline.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Performance/clearMeasures)
	 */
	clearMeasures(measureName?: string): void;
	/**
	 * The **`clearResourceTimings()`** method removes all performance entries with an PerformanceEntry.entryType of `'resource'` from the browser's performance timeline and sets the size of the performance resource data buffer to zero.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Performance/clearResourceTimings)
	 */
	clearResourceTimings(): void;
	/**
	 * The **`getEntries()`** method returns an array of all PerformanceEntry objects currently present in the performance timeline.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Performance/getEntries)
	 */
	getEntries(): PerformanceEntryList;
	/**
	 * The **`getEntriesByName()`** method returns an array of PerformanceEntry objects currently present in the performance timeline with the given _name_ and _type_.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Performance/getEntriesByName)
	 */
	getEntriesByName(name: string, type?: string): PerformanceEntryList;
	/**
	 * The **`getEntriesByType()`** method returns an array of PerformanceEntry objects currently present in the performance timeline for a given _type_.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Performance/getEntriesByType)
	 */
	getEntriesByType(type: string): PerformanceEntryList;
	/**
	 * The **`mark()`** method creates a named PerformanceMark object representing a high resolution timestamp marker in the browser's performance timeline.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Performance/mark)
	 */
	mark(markName: string, markOptions?: PerformanceMarkOptions): PerformanceMark;
	/**
	 * The **`measure()`** method creates a named PerformanceMeasure object representing a time measurement between two marks in the browser's performance timeline.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Performance/measure)
	 */
	measure(
		measureName: string,
		startOrMeasureOptions?: string | PerformanceMeasureOptions,
		endMark?: string,
	): PerformanceMeasure;
	/**
	 * The **`performance.now()`** method returns a high resolution timestamp in milliseconds.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Performance/now)
	 */
	now(): DOMHighResTimeStamp;
	/**
	 * The **`setResourceTimingBufferSize()`** method sets the desired size of the browser's resource timing buffer which stores the `'resource'` performance entries.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Performance/setResourceTimingBufferSize)
	 */
	setResourceTimingBufferSize(maxSize: number): void;
	/**
	 * The **`toJSON()`** method of the Performance interface is a Serialization; it returns a JSON representation of the Performance object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Performance/toJSON)
	 */
	toJSON(): any;
	addEventListener<K extends keyof PerformanceEventMap>(
		type: K,
		listener: (this: Performance, ev: PerformanceEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions,
	): void;
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions,
	): void;
	removeEventListener<K extends keyof PerformanceEventMap>(
		type: K,
		listener: (this: Performance, ev: PerformanceEventMap[K]) => any,
		options?: boolean | EventListenerOptions,
	): void;
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions,
	): void;
}

declare var Performance: {
	prototype: Performance;
	new (): Performance;
};

/**
 * The **`PerformanceEntry`** object encapsulates a single performance metric that is part of the browser's performance timeline.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceEntry)
 */
interface PerformanceEntry {
	/**
	 * The read-only **`duration`** property returns a DOMHighResTimeStamp that is the duration of the PerformanceEntry.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceEntry/duration)
	 */
	readonly duration: DOMHighResTimeStamp;
	/**
	 * The read-only **`entryType`** property returns a string representing the type of performance metric that this entry represents.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceEntry/entryType)
	 */
	readonly entryType: string;
	/**
	 * The read-only **`name`** property of the PerformanceEntry interface is a string representing the name for a performance entry.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceEntry/name)
	 */
	readonly name: string;
	/**
	 * The read-only **`startTime`** property returns the first DOMHighResTimeStamp recorded for this PerformanceEntry.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceEntry/startTime)
	 */
	readonly startTime: DOMHighResTimeStamp;
	/**
	 * The **`toJSON()`** method is a Serialization; it returns a JSON representation of the PerformanceEntry object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceEntry/toJSON)
	 */
	toJSON(): any;
}

declare var PerformanceEntry: {
	prototype: PerformanceEntry;
	new (): PerformanceEntry;
};

/**
 * **`PerformanceMark`** is an interface for PerformanceEntry objects with an PerformanceEntry.entryType of `'mark'`.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceMark)
 */
interface PerformanceMark extends PerformanceEntry {
	/**
	 * The read-only **`detail`** property returns arbitrary metadata that was included in the mark upon construction (either when using Performance.mark or the PerformanceMark.PerformanceMark constructor).
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceMark/detail)
	 */
	readonly detail: any;
}

declare var PerformanceMark: {
	prototype: PerformanceMark;
	new (markName: string, markOptions?: PerformanceMarkOptions): PerformanceMark;
};

/**
 * **`PerformanceMeasure`** is an _abstract_ interface for PerformanceEntry objects with an PerformanceEntry.entryType of `'measure'`.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceMeasure)
 */
interface PerformanceMeasure extends PerformanceEntry {
	/**
	 * The read-only **`detail`** property returns arbitrary metadata that was included in the mark upon construction (when using Performance.measure.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceMeasure/detail)
	 */
	readonly detail: any;
}

declare var PerformanceMeasure: {
	prototype: PerformanceMeasure;
	new (): PerformanceMeasure;
};

/**
 * The **`PerformanceObserver`** interface is used to observe performance measurement events and be notified of new PerformanceEntry as they are recorded in the browser's _performance timeline_.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceObserver)
 */
interface PerformanceObserver {
	/**
	 * The **`disconnect()`** method of the PerformanceObserver interface is used to stop the performance observer from receiving any PerformanceEntry events.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceObserver/disconnect)
	 */
	disconnect(): void;
	/**
	 * The **`observe()`** method of the **PerformanceObserver** interface is used to specify the set of performance entry types to observe.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceObserver/observe)
	 */
	observe(options?: PerformanceObserverInit): void;
	/**
	 * The **`takeRecords()`** method of the PerformanceObserver interface returns the current list of PerformanceEntry objects stored in the performance observer, emptying it out.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceObserver/takeRecords)
	 */
	takeRecords(): PerformanceEntryList;
}

declare var PerformanceObserver: {
	prototype: PerformanceObserver;
	new (callback: PerformanceObserverCallback): PerformanceObserver;
	/**
	 * The static **`supportedEntryTypes`** read-only property of the PerformanceObserver interface returns an array of the PerformanceEntry.entryType values supported by the user agent.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceObserver/supportedEntryTypes_static)
	 */
	readonly supportedEntryTypes: ReadonlyArray<string>;
};

/**
 * The **`PerformanceObserverEntryList`** interface is a list of PerformanceEntry that were explicitly observed via the PerformanceObserver.observe method.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceObserverEntryList)
 */
interface PerformanceObserverEntryList {
	/**
	 * The **`getEntries()`** method of the PerformanceObserverEntryList interface returns a list of explicitly observed PerformanceEntry objects.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceObserverEntryList/getEntries)
	 */
	getEntries(): PerformanceEntryList;
	/**
	 * The **`getEntriesByName()`** method of the PerformanceObserverEntryList interface returns a list of explicitly observed PerformanceEntry objects for a given PerformanceEntry.name and PerformanceEntry.entryType.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceObserverEntryList/getEntriesByName)
	 */
	getEntriesByName(name: string, type?: string): PerformanceEntryList;
	/**
	 * The **`getEntriesByType()`** method of the PerformanceObserverEntryList returns a list of explicitly _observed_ PerformanceEntry objects for a given PerformanceEntry.entryType.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceObserverEntryList/getEntriesByType)
	 */
	getEntriesByType(type: string): PerformanceEntryList;
}

declare var PerformanceObserverEntryList: {
	prototype: PerformanceObserverEntryList;
	new (): PerformanceObserverEntryList;
};

/**
 * The **`PerformanceResourceTiming`** interface enables retrieval and analysis of detailed network timing data regarding the loading of an application's resources.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming)
 */
interface PerformanceResourceTiming extends PerformanceEntry {
	/**
	 * The **`connectEnd`** read-only property returns the DOMHighResTimeStamp immediately after the browser finishes establishing the connection to the server to retrieve the resource.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/connectEnd)
	 */
	readonly connectEnd: DOMHighResTimeStamp;
	/**
	 * The **`connectStart`** read-only property returns the DOMHighResTimeStamp immediately before the user agent starts establishing the connection to the server to retrieve the resource.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/connectStart)
	 */
	readonly connectStart: DOMHighResTimeStamp;
	/**
	 * The **`decodedBodySize`** read-only property returns the size (in octets) received from the fetch (HTTP or cache) of the message body after removing any applied content encoding (like gzip or Brotli).
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/decodedBodySize)
	 */
	readonly decodedBodySize: number;
	/**
	 * The **`domainLookupEnd`** read-only property returns the DOMHighResTimeStamp immediately after the browser finishes the domain-name lookup for the resource.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/domainLookupEnd)
	 */
	readonly domainLookupEnd: DOMHighResTimeStamp;
	/**
	 * The **`domainLookupStart`** read-only property returns the DOMHighResTimeStamp immediately before the browser starts the domain name lookup for the resource.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/domainLookupStart)
	 */
	readonly domainLookupStart: DOMHighResTimeStamp;
	/**
	 * The **`encodedBodySize`** read-only property represents the size (in octets) received from the fetch (HTTP or cache) of the payload body before removing any applied content encodings (like gzip or Brotli).
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/encodedBodySize)
	 */
	readonly encodedBodySize: number;
	/**
	 * The **`fetchStart`** read-only property represents a DOMHighResTimeStamp immediately before the browser starts to fetch the resource.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/fetchStart)
	 */
	readonly fetchStart: DOMHighResTimeStamp;
	/**
	 * The **`initiatorType`** read-only property is a string representing web platform feature that initiated the resource load.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/initiatorType)
	 */
	readonly initiatorType: string;
	/**
	 * The **`nextHopProtocol`** read-only property is a string representing the network protocol used to fetch the resource, as identified by the ALPN Protocol ID (RFC7301).
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/nextHopProtocol)
	 */
	readonly nextHopProtocol: string;
	/**
	 * The **`redirectEnd`** read-only property returns a DOMHighResTimeStamp immediately after receiving the last byte of the response of the last redirect.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/redirectEnd)
	 */
	readonly redirectEnd: DOMHighResTimeStamp;
	/**
	 * The **`redirectStart`** read-only property returns a DOMHighResTimeStamp representing the start time of the fetch which that initiates the redirect.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/redirectStart)
	 */
	readonly redirectStart: DOMHighResTimeStamp;
	/**
	 * The **`requestStart`** read-only property returns a DOMHighResTimeStamp of the time immediately before the browser starts requesting the resource from the server, cache, or local resource.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/requestStart)
	 */
	readonly requestStart: DOMHighResTimeStamp;
	/**
	 * The **`responseEnd`** read-only property returns a DOMHighResTimeStamp immediately after the browser receives the last byte of the resource or immediately before the transport connection is closed, whichever comes first.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/responseEnd)
	 */
	readonly responseEnd: DOMHighResTimeStamp;
	/**
	 * The **`responseStart`** read-only property returns a DOMHighResTimeStamp immediately after the browser receives the first byte of the response from the server, cache, or local resource.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/responseStart)
	 */
	readonly responseStart: DOMHighResTimeStamp;
	/**
	 * The **`responseStatus`** read-only property represents the HTTP response status code returned when fetching the resource.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/responseStatus)
	 */
	readonly responseStatus: number;
	/**
	 * The **`secureConnectionStart`** read-only property returns a DOMHighResTimeStamp immediately before the browser starts the handshake process to secure the current connection.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/secureConnectionStart)
	 */
	readonly secureConnectionStart: DOMHighResTimeStamp;
	/**
	 * The **`serverTiming`** read-only property returns an array of PerformanceServerTiming entries containing server timing metrics.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/serverTiming)
	 */
	readonly serverTiming: ReadonlyArray<PerformanceServerTiming>;
	/**
	 * The **`transferSize`** read-only property represents the size (in octets) of the fetched resource.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/transferSize)
	 */
	readonly transferSize: number;
	/**
	 * The **`workerStart`** read-only property of the PerformanceResourceTiming interface returns a The `workerStart` property can have the following values: - A DOMHighResTimeStamp.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/workerStart)
	 */
	readonly workerStart: DOMHighResTimeStamp;
	/**
	 * The **`toJSON()`** method of the PerformanceResourceTiming interface is a Serialization; it returns a JSON representation of the PerformanceResourceTiming object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/toJSON)
	 */
	toJSON(): any;
}

declare var PerformanceResourceTiming: {
	prototype: PerformanceResourceTiming;
	new (): PerformanceResourceTiming;
};

/**
 * The **`PerformanceServerTiming`** interface surfaces server metrics that are sent with the response in the Server-Timing HTTP header.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceServerTiming)
 */
interface PerformanceServerTiming {
	/**
	 * The **`description`** read-only property returns a string value of the server-specified metric description, or an empty string.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceServerTiming/description)
	 */
	readonly description: string;
	/**
	 * The **`duration`** read-only property returns a double that contains the server-specified metric duration, or the value `0.0`.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceServerTiming/duration)
	 */
	readonly duration: DOMHighResTimeStamp;
	/**
	 * The **`name`** read-only property returns a string value of the server-specified metric name.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceServerTiming/name)
	 */
	readonly name: string;
	/**
	 * The **`toJSON()`** method of the PerformanceServerTiming interface is a Serialization; it returns a JSON representation of the PerformanceServerTiming object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PerformanceServerTiming/toJSON)
	 */
	toJSON(): any;
}

interface PermissionStatusEventMap {
	change: Event;
}

/**
 * The **`PermissionStatus`** interface of the Permissions API provides the state of an object and an event handler for monitoring changes to said state.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PermissionStatus)
 */
interface PermissionStatus extends EventTarget {
	/**
	 * The **`name`** read-only property of the PermissionStatus interface returns the name of a requested permission.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PermissionStatus/name)
	 */
	readonly name: string;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/PermissionStatus/change_event) */
	onchange: ((this: PermissionStatus, ev: Event) => any) | null;
	/**
	 * The **`state`** read-only property of the This property returns one of `'granted'`, `'denied'`, or `'prompt'`.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/PermissionStatus/state)
	 */
	readonly state: PermissionState;
	addEventListener<K extends keyof PermissionStatusEventMap>(
		type: K,
		listener: (this: PermissionStatus, ev: PermissionStatusEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions,
	): void;
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions,
	): void;
	removeEventListener<K extends keyof PermissionStatusEventMap>(
		type: K,
		listener: (this: PermissionStatus, ev: PermissionStatusEventMap[K]) => any,
		options?: boolean | EventListenerOptions,
	): void;
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions,
	): void;
}

/**
 * The **`Permissions`** interface of the Permissions API provides the core Permission API functionality, such as methods for querying and revoking permissions - Permissions.query - : Returns the user permission status for a given API.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Permissions)
 */
interface Permissions {
	/**
	 * The **`query()`** method of the Permissions interface returns the state of a user permission on the global scope.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Permissions/query)
	 */
	query(permissionDesc: PermissionDescriptor): Promise<PermissionStatus>;
}

/**
 * The **`ReadableByteStreamController`** interface of the Streams API represents a controller for a readable byte stream.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController)
 */
interface ReadableByteStreamController {
	/**
	 * The **`byobRequest`** read-only property of the ReadableByteStreamController interface returns the current BYOB request, or `null` if there are no pending requests.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/byobRequest)
	 */
	readonly byobRequest: ReadableStreamBYOBRequest | null;
	/**
	 * The **`desiredSize`** read-only property of the ReadableByteStreamController interface returns the number of bytes required to fill the stream's internal queue to its 'desired size'.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/desiredSize)
	 */
	readonly desiredSize: number | null;
	/**
	 * The **`close()`** method of the ReadableByteStreamController interface closes the associated stream.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/close)
	 */
	close(): void;
	/**
	 * The **`enqueue()`** method of the ReadableByteStreamController interface enqueues a given chunk on the associated readable byte stream (the chunk is copied into the stream's internal queues).
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/enqueue)
	 */
	enqueue(chunk: ArrayBufferView<ArrayBuffer>): void;
	/**
	 * The **`error()`** method of the ReadableByteStreamController interface causes any future interactions with the associated stream to error with the specified reason.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/error)
	 */
	error(e?: any): void;
}

declare var ReadableByteStreamController: {
	prototype: ReadableByteStreamController;
	new (): ReadableByteStreamController;
};

/**
 * The `ReadableStream` interface of the Streams API represents a readable stream of byte data.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream)
 */
interface ReadableStream<R = any> {
	/**
	 * The **`locked`** read-only property of the ReadableStream interface returns whether or not the readable stream is locked to a reader.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/locked)
	 */
	readonly locked: boolean;
	/**
	 * The **`cancel()`** method of the ReadableStream interface returns a Promise that resolves when the stream is canceled.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/cancel)
	 */
	cancel(reason?: any): Promise<void>;
	/**
	 * The **`getReader()`** method of the ReadableStream interface creates a reader and locks the stream to it.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/getReader)
	 */
	getReader(options: { mode: "byob" }): ReadableStreamBYOBReader;
	getReader(): ReadableStreamDefaultReader<R>;
	getReader(options?: ReadableStreamGetReaderOptions): ReadableStreamReader<R>;
	/**
	 * The **`pipeThrough()`** method of the ReadableStream interface provides a chainable way of piping the current stream through a transform stream or any other writable/readable pair.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/pipeThrough)
	 */
	pipeThrough<T>(transform: ReadableWritablePair<T, R>, options?: StreamPipeOptions): ReadableStream<T>;
	/**
	 * The **`pipeTo()`** method of the ReadableStream interface pipes the current `ReadableStream` to a given WritableStream and returns a Promise that fulfills when the piping process completes successfully, or rejects if any errors were encountered.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/pipeTo)
	 */
	pipeTo(destination: WritableStream<R>, options?: StreamPipeOptions): Promise<void>;
	/**
	 * The **`tee()`** method of the two-element array containing the two resulting branches as new ReadableStream instances.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/tee)
	 */
	tee(): [ReadableStream<R>, ReadableStream<R>];
}

declare var ReadableStream: {
	prototype: ReadableStream;
	new (
		underlyingSource: UnderlyingByteSource,
		strategy?: { highWaterMark?: number },
	): ReadableStream<Uint8Array<ArrayBuffer>>;
	new <R = any>(underlyingSource: UnderlyingDefaultSource<R>, strategy?: QueuingStrategy<R>): ReadableStream<R>;
	new <R = any>(underlyingSource?: UnderlyingSource<R>, strategy?: QueuingStrategy<R>): ReadableStream<R>;
};

/**
 * The `ReadableStreamBYOBReader` interface of the Streams API defines a reader for a ReadableStream that supports zero-copy reading from an underlying byte source.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader)
 */
interface ReadableStreamBYOBReader extends ReadableStreamGenericReader {
	/**
	 * The **`read()`** method of the ReadableStreamBYOBReader interface is used to read data into a view on a user-supplied buffer from an associated readable byte stream.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader/read)
	 */
	read<T extends ArrayBufferView>(view: T): Promise<ReadableStreamReadResult<T>>;
	/**
	 * The **`releaseLock()`** method of the ReadableStreamBYOBReader interface releases the reader's lock on the stream.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader/releaseLock)
	 */
	releaseLock(): void;
}

declare var ReadableStreamBYOBReader: {
	prototype: ReadableStreamBYOBReader;
	new (stream: ReadableStream<Uint8Array<ArrayBuffer>>): ReadableStreamBYOBReader;
};

/**
 * The **`ReadableStreamBYOBRequest`** interface of the Streams API represents a 'pull request' for data from an underlying source that will made as a zero-copy transfer to a consumer (bypassing the stream's internal queues).
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest)
 */
interface ReadableStreamBYOBRequest {
	/**
	 * The **`view`** getter property of the ReadableStreamBYOBRequest interface returns the current view.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/view)
	 */
	readonly view: ArrayBufferView<ArrayBuffer> | null;
	/**
	 * The **`respond()`** method of the ReadableStreamBYOBRequest interface is used to signal to the associated readable byte stream that the specified number of bytes were written into the ReadableStreamBYOBRequest.view.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/respond)
	 */
	respond(bytesWritten: number): void;
	/**
	 * The **`respondWithNewView()`** method of the ReadableStreamBYOBRequest interface specifies a new view that the consumer of the associated readable byte stream should write to instead of ReadableStreamBYOBRequest.view.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/respondWithNewView)
	 */
	respondWithNewView(view: ArrayBufferView<ArrayBuffer>): void;
}

declare var ReadableStreamBYOBRequest: {
	prototype: ReadableStreamBYOBRequest;
	new (): ReadableStreamBYOBRequest;
};

/**
 * The **`ReadableStreamDefaultController`** interface of the Streams API represents a controller allowing control of a ReadableStream's state and internal queue.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController)
 */
interface ReadableStreamDefaultController<R = any> {
	/**
	 * The **`desiredSize`** read-only property of the required to fill the stream's internal queue.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController/desiredSize)
	 */
	readonly desiredSize: number | null;
	/**
	 * The **`close()`** method of the ReadableStreamDefaultController interface closes the associated stream.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController/close)
	 */
	close(): void;
	/**
	 * The **`enqueue()`** method of the ```js-nolint enqueue(chunk) ``` - `chunk` - : The chunk to enqueue.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController/enqueue)
	 */
	enqueue(chunk?: R): void;
	/**
	 * The **`error()`** method of the with the associated stream to error.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController/error)
	 */
	error(e?: any): void;
}

declare var ReadableStreamDefaultController: {
	prototype: ReadableStreamDefaultController;
	new (): ReadableStreamDefaultController;
};

/**
 * The **`ReadableStreamDefaultReader`** interface of the Streams API represents a default reader that can be used to read stream data supplied from a network (such as a fetch request).
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultReader)
 */
interface ReadableStreamDefaultReader<R = any> extends ReadableStreamGenericReader {
	/**
	 * The **`read()`** method of the ReadableStreamDefaultReader interface returns a Promise providing access to the next chunk in the stream's internal queue.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultReader/read)
	 */
	read(): Promise<ReadableStreamReadResult<R>>;
	/**
	 * The **`releaseLock()`** method of the ReadableStreamDefaultReader interface releases the reader's lock on the stream.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultReader/releaseLock)
	 */
	releaseLock(): void;
}

declare var ReadableStreamDefaultReader: {
	prototype: ReadableStreamDefaultReader;
	new <R = any>(stream: ReadableStream<R>): ReadableStreamDefaultReader<R>;
};

interface ReadableStreamGenericReader {
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader/closed) */
	readonly closed: Promise<void>;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader/cancel) */
	cancel(reason?: any): Promise<void>;
}

/**
 * The **`Request`** interface of the Fetch API represents a resource request.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request)
 */
interface Request extends Body {
	/**
	 * The **`cache`** read-only property of the Request interface contains the cache mode of the request.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/cache)
	 */
	readonly cache: RequestCache;
	/**
	 * The **`credentials`** read-only property of the Request interface reflects the value given to the Request.Request() constructor in the `credentials` option.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/credentials)
	 */
	readonly credentials: RequestCredentials;
	/**
	 * The **`destination`** read-only property of the **Request** interface returns a string describing the type of content being requested.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/destination)
	 */
	readonly destination: RequestDestination;
	/**
	 * The **`headers`** read-only property of the with the request.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/headers)
	 */
	readonly headers: Headers;
	/**
	 * The **`integrity`** read-only property of the Request interface contains the subresource integrity value of the request.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/integrity)
	 */
	readonly integrity: string;
	/**
	 * The **`keepalive`** read-only property of the Request interface contains the request's `keepalive` setting (`true` or `false`), which indicates whether the browser will keep the associated request alive if the page that initiated it is unloaded before the request is complete.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/keepalive)
	 */
	readonly keepalive: boolean;
	/**
	 * The **`method`** read-only property of the `POST`, etc.) A String indicating the method of the request.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/method)
	 */
	readonly method: string;
	/**
	 * The **`mode`** read-only property of the Request interface contains the mode of the request (e.g., `cors`, `no-cors`, `same-origin`, or `navigate`.) This is used to determine if cross-origin requests lead to valid responses, and which properties of the response are readable.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/mode)
	 */
	readonly mode: RequestMode;
	/**
	 * The **`redirect`** read-only property of the Request interface contains the mode for how redirects are handled.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/redirect)
	 */
	readonly redirect: RequestRedirect;
	/**
	 * The **`referrer`** read-only property of the Request.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/referrer)
	 */
	readonly referrer: string;
	/**
	 * The **`referrerPolicy`** read-only property of the referrer information, sent in the Referer header, should be included with the request.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/referrerPolicy)
	 */
	readonly referrerPolicy: ReferrerPolicy;
	/**
	 * The read-only **`signal`** property of the Request interface returns the AbortSignal associated with the request.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/signal)
	 */
	readonly signal: AbortSignal;
	/**
	 * The **`url`** read-only property of the Request interface contains the URL of the request.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/url)
	 */
	readonly url: string;
	/**
	 * The **`clone()`** method of the Request interface creates a copy of the current `Request` object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/clone)
	 */
	clone(): Request;
}

declare var Request: {
	prototype: Request;
	new (input: RequestInfo | URL, init?: RequestInit): Request;
};

/**
 * The **`Response`** interface of the Fetch API represents the response to a request.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response)
 */
interface Response extends Body {
	/**
	 * The **`headers`** read-only property of the with the response.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/headers)
	 */
	readonly headers: Headers;
	/**
	 * The **`ok`** read-only property of the Response interface contains a Boolean stating whether the response was successful (status in the range 200-299) or not.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/ok)
	 */
	readonly ok: boolean;
	/**
	 * The **`redirected`** read-only property of the Response interface indicates whether or not the response is the result of a request you made which was redirected.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/redirected)
	 */
	readonly redirected: boolean;
	/**
	 * The **`status`** read-only property of the Response interface contains the HTTP status codes of the response.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/status)
	 */
	readonly status: number;
	/**
	 * The **`statusText`** read-only property of the Response interface contains the status message corresponding to the HTTP status code in Response.status.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/statusText)
	 */
	readonly statusText: string;
	/**
	 * The **`type`** read-only property of the Response interface contains the type of the response.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/type)
	 */
	readonly type: ResponseType;
	/**
	 * The **`url`** read-only property of the Response interface contains the URL of the response.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/url)
	 */
	readonly url: string;
	/**
	 * The **`clone()`** method of the Response interface creates a clone of a response object, identical in every way, but stored in a different variable.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/clone)
	 */
	clone(): Response;
}

declare var Response: {
	prototype: Response;
	new (body?: BodyInit | null, init?: ResponseInit): Response;
	/**
	 * The **`error()`** static method of the Response interface returns a new `Response` object associated with a network error.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/error_static)
	 */
	error(): Response;
	/**
	 * The **`json()`** static method of the Response interface returns a `Response` that contains the provided JSON data as body, and a Content-Type header which is set to `application/json`.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/json_static)
	 */
	json(data: any, init?: ResponseInit): Response;
	/**
	 * The **`redirect()`** static method of the Response interface returns a `Response` resulting in a redirect to the specified URL.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/redirect_static)
	 */
	redirect(url: string | URL, status?: number): Response;
};

/**
 * The **`SubtleCrypto`** interface of the Web Crypto API provides a number of low-level cryptographic functions.
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto)
 */
interface SubtleCrypto {
	/**
	 * The **`decrypt()`** method of the SubtleCrypto interface decrypts some encrypted data.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/decrypt)
	 */
	decrypt(
		algorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams,
		key: CryptoKey,
		data: BufferSource,
	): Promise<ArrayBuffer>;
	/**
	 * The **`deriveBits()`** method of the key.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/deriveBits)
	 */
	deriveBits(
		algorithm: AlgorithmIdentifier | EcdhKeyDeriveParams | HkdfParams | Pbkdf2Params,
		baseKey: CryptoKey,
		length?: number | null,
	): Promise<ArrayBuffer>;
	/**
	 * The **`deriveKey()`** method of the SubtleCrypto interface can be used to derive a secret key from a master key.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/deriveKey)
	 */
	deriveKey(
		algorithm: AlgorithmIdentifier | EcdhKeyDeriveParams | HkdfParams | Pbkdf2Params,
		baseKey: CryptoKey,
		derivedKeyType: AlgorithmIdentifier | AesDerivedKeyParams | HmacImportParams | HkdfParams | Pbkdf2Params,
		extractable: boolean,
		keyUsages: KeyUsage[],
	): Promise<CryptoKey>;
	/**
	 * The **`digest()`** method of the SubtleCrypto interface generates a _digest_ of the given data, using the specified hash function.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/digest)
	 */
	digest(algorithm: AlgorithmIdentifier, data: BufferSource): Promise<ArrayBuffer>;
	/**
	 * The **`encrypt()`** method of the SubtleCrypto interface encrypts data.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/encrypt)
	 */
	encrypt(
		algorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams,
		key: CryptoKey,
		data: BufferSource,
	): Promise<ArrayBuffer>;
	/**
	 * The **`exportKey()`** method of the SubtleCrypto interface exports a key: that is, it takes as input a CryptoKey object and gives you the key in an external, portable format.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/exportKey)
	 */
	exportKey(format: "jwk", key: CryptoKey): Promise<JsonWebKey>;
	exportKey(format: Exclude<KeyFormat, "jwk">, key: CryptoKey): Promise<ArrayBuffer>;
	exportKey(format: KeyFormat, key: CryptoKey): Promise<ArrayBuffer | JsonWebKey>;
	/**
	 * The **`generateKey()`** method of the SubtleCrypto interface is used to generate a new key (for symmetric algorithms) or key pair (for public-key algorithms).
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/generateKey)
	 */
	generateKey(
		algorithm: "Ed25519" | { name: "Ed25519" },
		extractable: boolean,
		keyUsages: ReadonlyArray<"sign" | "verify">,
	): Promise<CryptoKeyPair>;
	generateKey(
		algorithm: RsaHashedKeyGenParams | EcKeyGenParams,
		extractable: boolean,
		keyUsages: ReadonlyArray<KeyUsage>,
	): Promise<CryptoKeyPair>;
	generateKey(
		algorithm: AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params,
		extractable: boolean,
		keyUsages: ReadonlyArray<KeyUsage>,
	): Promise<CryptoKey>;
	generateKey(
		algorithm: AlgorithmIdentifier,
		extractable: boolean,
		keyUsages: KeyUsage[],
	): Promise<CryptoKeyPair | CryptoKey>;
	/**
	 * The **`importKey()`** method of the SubtleCrypto interface imports a key: that is, it takes as input a key in an external, portable format and gives you a CryptoKey object that you can use in the Web Crypto API.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/importKey)
	 */
	importKey(
		format: "jwk",
		keyData: JsonWebKey,
		algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm,
		extractable: boolean,
		keyUsages: ReadonlyArray<KeyUsage>,
	): Promise<CryptoKey>;
	importKey(
		format: Exclude<KeyFormat, "jwk">,
		keyData: BufferSource,
		algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm,
		extractable: boolean,
		keyUsages: KeyUsage[],
	): Promise<CryptoKey>;
	/**
	 * The **`sign()`** method of the SubtleCrypto interface generates a digital signature.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/sign)
	 */
	sign(
		algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams,
		key: CryptoKey,
		data: BufferSource,
	): Promise<ArrayBuffer>;
	/**
	 * The **`unwrapKey()`** method of the SubtleCrypto interface 'unwraps' a key.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/unwrapKey)
	 */
	unwrapKey(
		format: KeyFormat,
		wrappedKey: BufferSource,
		unwrappingKey: CryptoKey,
		unwrapAlgorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams,
		unwrappedKeyAlgorithm:
			| AlgorithmIdentifier
			| RsaHashedImportParams
			| EcKeyImportParams
			| HmacImportParams
			| AesKeyAlgorithm,
		extractable: boolean,
		keyUsages: KeyUsage[],
	): Promise<CryptoKey>;
	/**
	 * The **`verify()`** method of the SubtleCrypto interface verifies a digital signature.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/verify)
	 */
	verify(
		algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams,
		key: CryptoKey,
		signature: BufferSource,
		data: BufferSource,
	): Promise<boolean>;
	/**
	 * The **`wrapKey()`** method of the SubtleCrypto interface 'wraps' a key.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/wrapKey)
	 */
	wrapKey(
		format: KeyFormat,
		key: CryptoKey,
		wrappingKey: CryptoKey,
		wrapAlgorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams,
	): Promise<ArrayBuffer>;
}

declare var SubtleCrypto: {
	prototype: SubtleCrypto;
	new (): SubtleCrypto;
};

/**
 * The **`TextDecoder`** interface represents a decoder for a specific text encoding, such as `UTF-8`, `ISO-8859-2`, `KOI8-R`, `GBK`, etc.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextDecoder)
 */
interface TextDecoder extends TextDecoderCommon {
	/**
	 * The **`TextDecoder.decode()`** method returns a string containing text decoded from the buffer passed as a parameter.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextDecoder/decode)
	 */
	decode(input?: AllowSharedBufferSource, options?: TextDecodeOptions): string;
}

declare var TextDecoder: {
	prototype: TextDecoder;
	new (label?: string, options?: TextDecoderOptions): TextDecoder;
};

interface TextDecoderCommon {
	/**
	 * Returns encoding's name, lowercased.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextDecoder/encoding)
	 */
	readonly encoding: string;
	/**
	 * Returns true if error mode is "fatal", otherwise false.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextDecoder/fatal)
	 */
	readonly fatal: boolean;
	/**
	 * Returns the value of ignore BOM.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextDecoder/ignoreBOM)
	 */
	readonly ignoreBOM: boolean;
}

/**
 * The **`TextDecoderStream`** interface of the Encoding API converts a stream of text in a binary encoding, such as UTF-8 etc., to a stream of strings.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextDecoderStream)
 */
interface TextDecoderStream extends GenericTransformStream, TextDecoderCommon {
	readonly readable: ReadableStream<string>;
	readonly writable: WritableStream<BufferSource>;
}

declare var TextDecoderStream: {
	prototype: TextDecoderStream;
	new (label?: string, options?: TextDecoderOptions): TextDecoderStream;
};

/**
 * The **`TextEncoder`** interface takes a stream of code points as input and emits a stream of UTF-8 bytes.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder)
 */
interface TextEncoder extends TextEncoderCommon {
	/**
	 * The **`TextEncoder.encode()`** method takes a string as input, and returns a Global_Objects/Uint8Array containing the text given in parameters encoded with the specific method for that TextEncoder object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder/encode)
	 */
	encode(input?: string): Uint8Array<ArrayBuffer>;
	/**
	 * The **`TextEncoder.encodeInto()`** method takes a string to encode and a destination Uint8Array to put resulting UTF-8 encoded text into, and returns a dictionary object indicating the progress of the encoding.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder/encodeInto)
	 */
	encodeInto(source: string, destination: Uint8Array<ArrayBufferLike>): TextEncoderEncodeIntoResult;
}

declare var TextEncoder: {
	prototype: TextEncoder;
	new (): TextEncoder;
};

interface TextEncoderCommon {
	/**
	 * Returns "utf-8".
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder/encoding)
	 */
	readonly encoding: string;
}

/**
 * The **`TextEncoderStream`** interface of the Encoding API converts a stream of strings into bytes in the UTF-8 encoding.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoderStream)
 */
interface TextEncoderStream extends GenericTransformStream, TextEncoderCommon {
	readonly readable: ReadableStream<Uint8Array<ArrayBuffer>>;
	readonly writable: WritableStream<string>;
}

declare var TextEncoderStream: {
	prototype: TextEncoderStream;
	new (): TextEncoderStream;
};

/**
 * The **`TransformStream`** interface of the Streams API represents a concrete implementation of the pipe chain _transform stream_ concept.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStream)
 */
interface TransformStream<I = any, O = any> {
	/**
	 * The **`readable`** read-only property of the TransformStream interface returns the ReadableStream instance controlled by this `TransformStream`.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStream/readable)
	 */
	readonly readable: ReadableStream<O>;
	/**
	 * The **`writable`** read-only property of the TransformStream interface returns the WritableStream instance controlled by this `TransformStream`.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStream/writable)
	 */
	readonly writable: WritableStream<I>;
}

declare var TransformStream: {
	prototype: TransformStream;
	new <I = any, O = any>(
		transformer?: Transformer<I, O>,
		writableStrategy?: QueuingStrategy<I>,
		readableStrategy?: QueuingStrategy<O>,
	): TransformStream<I, O>;
};

/**
 * The **`TransformStreamDefaultController`** interface of the Streams API provides methods to manipulate the associated ReadableStream and WritableStream.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController)
 */
interface TransformStreamDefaultController<O = any> {
	/**
	 * The **`desiredSize`** read-only property of the TransformStreamDefaultController interface returns the desired size to fill the queue of the associated ReadableStream.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController/desiredSize)
	 */
	readonly desiredSize: number | null;
	/**
	 * The **`enqueue()`** method of the TransformStreamDefaultController interface enqueues the given chunk in the readable side of the stream.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController/enqueue)
	 */
	enqueue(chunk?: O): void;
	/**
	 * The **`error()`** method of the TransformStreamDefaultController interface errors both sides of the stream.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController/error)
	 */
	error(reason?: any): void;
	/**
	 * The **`terminate()`** method of the TransformStreamDefaultController interface closes the readable side and errors the writable side of the stream.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController/terminate)
	 */
	terminate(): void;
}

declare var TransformStreamDefaultController: {
	prototype: TransformStreamDefaultController;
	new (): TransformStreamDefaultController;
};

/**
 * The **`URL`** interface is used to parse, construct, normalize, and encode URL.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL)
 */
interface URL {
	/**
	 * The **`hash`** property of the URL interface is a string containing a `'#'` followed by the fragment identifier of the URL.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/hash)
	 */
	hash: string;
	/**
	 * The **`host`** property of the URL interface is a string containing the host, which is the URL.hostname, and then, if the port of the URL is nonempty, a `':'`, followed by the URL.port of the URL.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/host)
	 */
	host: string;
	/**
	 * The **`hostname`** property of the URL interface is a string containing either the domain name or IP address of the URL.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/hostname)
	 */
	hostname: string;
	/**
	 * The **`href`** property of the URL interface is a string containing the whole URL.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/href)
	 */
	href: string;
	toString(): string;
	/**
	 * The **`origin`** read-only property of the URL interface returns a string containing the Unicode serialization of the origin of the represented URL.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/origin)
	 */
	readonly origin: string;
	/**
	 * The **`password`** property of the URL interface is a string containing the password component of the URL.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/password)
	 */
	password: string;
	/**
	 * The **`pathname`** property of the URL interface represents a location in a hierarchical structure.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/pathname)
	 */
	pathname: string;
	/**
	 * The **`port`** property of the URL interface is a string containing the port number of the URL.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/port)
	 */
	port: string;
	/**
	 * The **`protocol`** property of the URL interface is a string containing the protocol or scheme of the URL, including the final `':'`.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/protocol)
	 */
	protocol: string;
	/**
	 * The **`search`** property of the URL interface is a search string, also called a _query string_, that is a string containing a `'?'` followed by the parameters of the URL.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/search)
	 */
	search: string;
	/**
	 * The **`searchParams`** read-only property of the access to the [MISSING: httpmethod('GET')] decoded query arguments contained in the URL.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/searchParams)
	 */
	readonly searchParams: URLSearchParams;
	/**
	 * The **`username`** property of the URL interface is a string containing the username component of the URL.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/username)
	 */
	username: string;
	/**
	 * The **`toJSON()`** method of the URL interface returns a string containing a serialized version of the URL, although in practice it seems to have the same effect as ```js-nolint toJSON() ``` None.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/toJSON)
	 */
	toJSON(): string;
}

declare var URL: {
	prototype: URL;
	new (url: string | URL, base?: string | URL): URL;
	/**
	 * The **`URL.canParse()`** static method of the URL interface returns a boolean indicating whether or not an absolute URL, or a relative URL combined with a base URL, are parsable and valid.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/canParse_static)
	 */
	canParse(url: string | URL, base?: string | URL): boolean;
	/**
	 * The **`createObjectURL()`** static method of the URL interface creates a string containing a URL representing the object given in the parameter.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/createObjectURL_static)
	 */
	createObjectURL(obj: Blob): string;
	/**
	 * The **`URL.parse()`** static method of the URL interface returns a newly created URL object representing the URL defined by the parameters.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/parse_static)
	 */
	parse(url: string | URL, base?: string | URL): URL | null;
	/**
	 * The **`revokeObjectURL()`** static method of the URL interface releases an existing object URL which was previously created by calling Call this method when you've finished using an object URL to let the browser know not to keep the reference to the file any longer.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/revokeObjectURL_static)
	 */
	revokeObjectURL(url: string): void;
};

/**
 * The **`URLSearchParams`** interface defines utility methods to work with the query string of a URL.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams)
 */
interface URLSearchParams {
	/**
	 * The **`size`** read-only property of the URLSearchParams interface indicates the total number of search parameter entries.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/size)
	 */
	readonly size: number;
	/**
	 * The **`append()`** method of the URLSearchParams interface appends a specified key/value pair as a new search parameter.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/append)
	 */
	append(name: string, value: string): void;
	/**
	 * The **`delete()`** method of the URLSearchParams interface deletes specified parameters and their associated value(s) from the list of all search parameters.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/delete)
	 */
	delete(name: string, value?: string): void;
	/**
	 * The **`get()`** method of the URLSearchParams interface returns the first value associated to the given search parameter.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/get)
	 */
	get(name: string): string | null;
	/**
	 * The **`getAll()`** method of the URLSearchParams interface returns all the values associated with a given search parameter as an array.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/getAll)
	 */
	getAll(name: string): string[];
	/**
	 * The **`has()`** method of the URLSearchParams interface returns a boolean value that indicates whether the specified parameter is in the search parameters.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/has)
	 */
	has(name: string, value?: string): boolean;
	/**
	 * The **`set()`** method of the URLSearchParams interface sets the value associated with a given search parameter to the given value.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/set)
	 */
	set(name: string, value: string): void;
	/**
	 * The **`URLSearchParams.sort()`** method sorts all key/value pairs contained in this object in place and returns `undefined`.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/sort)
	 */
	sort(): void;
	toString(): string;
	forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void;
}

declare var URLSearchParams: {
	prototype: URLSearchParams;
	new (init?: string[][] | Record<string, string> | string | URLSearchParams): URLSearchParams;
};

interface WebSocketEventMap {
	close: CloseEvent;
	error: Event;
	message: MessageEvent;
	open: Event;
}

/**
 * The `WebSocket` object provides the API for creating and managing a WebSocket connection to a server, as well as for sending and receiving data on the connection.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket)
 */
interface WebSocket extends EventTarget {
	/**
	 * The **`WebSocket.binaryType`** property controls the type of binary data being received over the WebSocket connection.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/binaryType)
	 */
	binaryType: BinaryType;
	/**
	 * The **`WebSocket.bufferedAmount`** read-only property returns the number of bytes of data that have been queued using calls to `send()` but not yet transmitted to the network.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/bufferedAmount)
	 */
	readonly bufferedAmount: number;
	/**
	 * The **`WebSocket.extensions`** read-only property returns the extensions selected by the server.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/extensions)
	 */
	readonly extensions: string;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/close_event) */
	onclose: ((this: WebSocket, ev: CloseEvent) => any) | null;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/error_event) */
	onerror: ((this: WebSocket, ev: Event) => any) | null;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/message_event) */
	onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/open_event) */
	onopen: ((this: WebSocket, ev: Event) => any) | null;
	/**
	 * The **`WebSocket.protocol`** read-only property returns the name of the sub-protocol the server selected; this will be one of the strings specified in the `protocols` parameter when creating the WebSocket object, or the empty string if no connection is established.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/protocol)
	 */
	readonly protocol: string;
	/**
	 * The **`WebSocket.readyState`** read-only property returns the current state of the WebSocket connection.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/readyState)
	 */
	readonly readyState: number;
	/**
	 * The **`WebSocket.url`** read-only property returns the absolute URL of the WebSocket as resolved by the constructor.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/url)
	 */
	readonly url: string;
	/**
	 * The **`WebSocket.close()`** method closes the already `CLOSED`, this method does nothing.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/close)
	 */
	close(code?: number, reason?: string): void;
	/**
	 * The **`WebSocket.send()`** method enqueues the specified data to be transmitted to the server over the WebSocket connection, increasing the value of `bufferedAmount` by the number of bytes needed to contain the data.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/send)
	 */
	send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
	readonly CONNECTING: 0;
	readonly OPEN: 1;
	readonly CLOSING: 2;
	readonly CLOSED: 3;
	addEventListener<K extends keyof WebSocketEventMap>(
		type: K,
		listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions,
	): void;
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions,
	): void;
	removeEventListener<K extends keyof WebSocketEventMap>(
		type: K,
		listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
		options?: boolean | EventListenerOptions,
	): void;
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions,
	): void;
}

declare var WebSocket: {
	prototype: WebSocket;
	new (url: string | URL, protocols?: string | string[]): WebSocket;
	readonly CONNECTING: 0;
	readonly OPEN: 1;
	readonly CLOSING: 2;
	readonly CLOSED: 3;
};

/**
 * The **`Navigator`** interface represents the state and the identity of the user agent.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator)
 */
interface Navigator extends NavigatorConcurrentHardware, NavigatorID, NavigatorLanguage {
	/**
	 * The **`permissions`** read-only property of the Navigator interface returns a Permissions object that can be used to query and update permission status of APIs covered by the Permissions API.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/permissions)
	 */
	readonly permissions: Permissions;
}

/**
 * The **`WritableStream`** interface of the Streams API provides a standard abstraction for writing streaming data to a destination, known as a sink.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream)
 */
interface WritableStream<W = any> {
	/**
	 * The **`locked`** read-only property of the WritableStream interface returns a boolean indicating whether the `WritableStream` is locked to a writer.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/locked)
	 */
	readonly locked: boolean;
	/**
	 * The **`abort()`** method of the WritableStream interface aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be immediately moved to an error state, with any queued writes discarded.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/abort)
	 */
	abort(reason?: any): Promise<void>;
	/**
	 * The **`close()`** method of the WritableStream interface closes the associated stream.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/close)
	 */
	close(): Promise<void>;
	/**
	 * The **`getWriter()`** method of the WritableStream interface returns a new instance of WritableStreamDefaultWriter and locks the stream to that instance.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/getWriter)
	 */
	getWriter(): WritableStreamDefaultWriter<W>;
}

declare var WritableStream: {
	prototype: WritableStream;
	new <W = any>(underlyingSink?: UnderlyingSink<W>, strategy?: QueuingStrategy<W>): WritableStream<W>;
};

/**
 * The **`WritableStreamDefaultController`** interface of the Streams API represents a controller allowing control of a WritableStream's state.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultController)
 */
interface WritableStreamDefaultController {
	/**
	 * The read-only **`signal`** property of the WritableStreamDefaultController interface returns the AbortSignal associated with the controller.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultController/signal)
	 */
	readonly signal: AbortSignal;
	/**
	 * The **`error()`** method of the with the associated stream to error.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultController/error)
	 */
	error(e?: any): void;
}

declare var WritableStreamDefaultController: {
	prototype: WritableStreamDefaultController;
	new (): WritableStreamDefaultController;
};

/**
 * The **`WritableStreamDefaultWriter`** interface of the Streams API is the object returned by WritableStream.getWriter() and once created locks the writer to the `WritableStream` ensuring that no other streams can write to the underlying sink.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter)
 */
interface WritableStreamDefaultWriter<W = any> {
	/**
	 * The **`closed`** read-only property of the the stream errors or the writer's lock is released.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/closed)
	 */
	readonly closed: Promise<void>;
	/**
	 * The **`desiredSize`** read-only property of the to fill the stream's internal queue.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/desiredSize)
	 */
	readonly desiredSize: number | null;
	/**
	 * The **`ready`** read-only property of the that resolves when the desired size of the stream's internal queue transitions from non-positive to positive, signaling that it is no longer applying backpressure.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/ready)
	 */
	readonly ready: Promise<void>;
	/**
	 * The **`abort()`** method of the the producer can no longer successfully write to the stream and it is to be immediately moved to an error state, with any queued writes discarded.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/abort)
	 */
	abort(reason?: any): Promise<void>;
	/**
	 * The **`close()`** method of the stream.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/close)
	 */
	close(): Promise<void>;
	/**
	 * The **`releaseLock()`** method of the corresponding stream.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/releaseLock)
	 */
	releaseLock(): void;
	/**
	 * The **`write()`** method of the operation.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/write)
	 */
	write(chunk?: W): Promise<void>;
}

declare var WritableStreamDefaultWriter: {
	prototype: WritableStreamDefaultWriter;
	new <W = any>(stream: WritableStream<W>): WritableStreamDefaultWriter<W>;
};

/**
 * The **`console`** object provides access to the debugging console (e.g., the Web console in Firefox).
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console)
 */
interface Console {
	/**
	 * The **`console.assert()`** static method writes an error message to the console if the assertion is false.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/assert_static)
	 */
	assert(condition?: boolean, ...data: any[]): void;
	/**
	 * The **`console.clear()`** static method clears the console if possible.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/clear_static)
	 */
	clear(): void;
	/**
	 * The **`console.count()`** static method logs the number of times that this particular call to `count()` has been called.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/count_static)
	 */
	count(label?: string): void;
	/**
	 * The **`console.countReset()`** static method resets counter used with console/count_static.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/countReset_static)
	 */
	countReset(label?: string): void;
	/**
	 * The **`console.debug()`** static method outputs a message to the console at the 'debug' log level.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/debug_static)
	 */
	debug(...data: any[]): void;
	/**
	 * The **`console.dir()`** static method displays a list of the properties of the specified JavaScript object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/dir_static)
	 */
	dir(item?: any, options?: any): void;
	/**
	 * The **`console.dirxml()`** static method displays an interactive tree of the descendant elements of the specified XML/HTML element.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/dirxml_static)
	 */
	dirxml(...data: any[]): void;
	/**
	 * The **`console.error()`** static method outputs a message to the console at the 'error' log level.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/error_static)
	 */
	error(...data: any[]): void;
	/**
	 * The **`console.group()`** static method creates a new inline group in the Web console log, causing any subsequent console messages to be indented by an additional level, until console/groupEnd_static is called.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/group_static)
	 */
	group(...data: any[]): void;
	/**
	 * The **`console.groupCollapsed()`** static method creates a new inline group in the console.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/groupCollapsed_static)
	 */
	groupCollapsed(...data: any[]): void;
	/**
	 * The **`console.groupEnd()`** static method exits the current inline group in the console.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/groupEnd_static)
	 */
	groupEnd(): void;
	/**
	 * The **`console.info()`** static method outputs a message to the console at the 'info' log level.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/info_static)
	 */
	info(...data: any[]): void;
	/**
	 * The **`console.log()`** static method outputs a message to the console.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/log_static)
	 */
	log(...data: any[]): void;
	/**
	 * The **`console.table()`** static method displays tabular data as a table.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/table_static)
	 */
	table(tabularData?: any, properties?: string[]): void;
	/**
	 * The **`console.time()`** static method starts a timer you can use to track how long an operation takes.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/time_static)
	 */
	time(label?: string): void;
	/**
	 * The **`console.timeEnd()`** static method stops a timer that was previously started by calling console/time_static.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/timeEnd_static)
	 */
	timeEnd(label?: string): void;
	/**
	 * The **`console.timeLog()`** static method logs the current value of a timer that was previously started by calling console/time_static.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/timeLog_static)
	 */
	timeLog(label?: string, ...data: any[]): void;
	timeStamp(label?: string): void;
	/**
	 * The **`console.trace()`** static method outputs a stack trace to the console.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/trace_static)
	 */
	trace(...data: any[]): void;
	/**
	 * The **`console.warn()`** static method outputs a warning message to the console at the 'warning' log level.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/warn_static)
	 */
	warn(...data: any[]): void;
}

declare var console: Console;

type QueuingStrategySize<T = any> = (chunk: T) => number;

type VoidFunction = () => void;

/**
 * The **`navigator`** read-only property returns a reference to the Navigator object.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator)
 */
declare var navigator: Navigator;

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/crypto) */
declare var crypto: Crypto;

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/performance) */
declare var performance: Performance;

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/atob) */
declare function atob(data: string): string;

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/btoa) */
declare function btoa(data: string): string;

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/clearInterval) */
declare function clearInterval(id: number | undefined): void;

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/clearTimeout) */
declare function clearTimeout(id: number | undefined): void;

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch) */
declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/queueMicrotask) */
declare function queueMicrotask(callback: VoidFunction): void;

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/setInterval) */
declare function setInterval(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/setTimeout) */
declare function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/structuredClone) */
declare function structuredClone<T = any>(value: T, options?: StructuredSerializeOptions): T;

type AlgorithmIdentifier = Algorithm | string;

type AllowSharedBufferSource = ArrayBufferLike | ArrayBufferView<ArrayBufferLike>;

type BigInteger = Uint8Array<ArrayBuffer>;

type BodyInit = ReadableStream | XMLHttpRequestBodyInit;

type BufferSource = ArrayBufferView<ArrayBuffer> | ArrayBuffer;

type DOMHighResTimeStamp = number;

type EventListenerOrEventListenerObject = EventListener | EventListenerObject;

type FormDataEntryValue = File | string;

type HashAlgorithmIdentifier = AlgorithmIdentifier;

type HeadersInit = [string, string][] | Record<string, string> | Headers;

type MessageEventSource = MessagePort;

type NamedCurve = string;

type PerformanceEntryList = PerformanceEntry[];

type ReadableStreamReadResult<T> = ReadableStreamReadValueResult<T> | ReadableStreamReadDoneResult<T>;

type ReadableStreamReader<T> = ReadableStreamDefaultReader<T> | ReadableStreamBYOBReader;

type RequestInfo = Request | string;

type TimerHandler = string | Function;

type Transferable =
	| OffscreenCanvas
	| ImageBitmap
	| MessagePort
	| MediaSourceHandle
	| ReadableStream
	| WritableStream
	| TransformStream
	| AudioData
	| VideoFrame
	| RTCDataChannel
	| ArrayBuffer;

type BinaryType = "arraybuffer" | "blob";

type KeyFormat = "jwk" | "pkcs8" | "raw" | "spki";

type KeyType = "private" | "public" | "secret";

type KeyUsage = "decrypt" | "deriveBits" | "deriveKey" | "encrypt" | "sign" | "unwrapKey" | "verify" | "wrapKey";

type PermissionName =
	| "camera"
	| "geolocation"
	| "microphone"
	| "midi"
	| "notifications"
	| "persistent-storage"
	| "push"
	| "screen-wake-lock"
	| "storage-access";

type PermissionState = "denied" | "granted" | "prompt";

type ReadableStreamReaderMode = "byob";

type ReferrerPolicy =
	| ""
	| "no-referrer"
	| "no-referrer-when-downgrade"
	| "origin"
	| "origin-when-cross-origin"
	| "same-origin"
	| "strict-origin"
	| "strict-origin-when-cross-origin"
	| "unsafe-url";

type RequestCache = "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";

type RequestCredentials = "include" | "omit" | "same-origin";

type RequestDestination =
	| ""
	| "audio"
	| "audioworklet"
	| "document"
	| "embed"
	| "font"
	| "frame"
	| "iframe"
	| "image"
	| "manifest"
	| "object"
	| "paintworklet"
	| "report"
	| "script"
	| "sharedworker"
	| "style"
	| "track"
	| "video"
	| "worker"
	| "xslt";

type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin";

type RequestPriority = "auto" | "high" | "low";

type RequestRedirect = "error" | "follow" | "manual";

type ResponseType = "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";
