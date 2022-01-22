declare type BodyInit = ReadableStream | string | null;

declare interface Body {
  body: ReadableStream;
  bodyUsed: boolean;

  arrayBuffer(): Promise<ArrayBuffer>;
  json(): Promise<any>;
  text(): Promise<string>;
}

declare type RequestInfo = string | Request;

declare interface RequestInit {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;

  // Fastly extensions
  backend?: string;
}

declare class Request implements Body {
  constructor(input: RequestInfo, init?: RequestInit);
  headers: Headers;
  method: string;
  url: string;

  body: ReadableStream<any>;
  bodyUsed: boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  json(): Promise<any>;
  text(): Promise<string>;

  // Fastly extensions
  backend: string;
  setCacheOverride(override: CacheOverride);
}

declare interface ResponseInit {
  headers?: HeadersInit;
  status?: number;
}

declare class Response implements Body {
  constructor(body?: BodyInit, init?: ResponseInit);
  // static error(): Response;
  // static redirect(url: string, status: number): Response;
  // clone(): Response;
  headers: Headers;
  ok: boolean;
  redirected: boolean;
  status: number;
  url: string;

  body: ReadableStream<any>;
  bodyUsed: boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  json(): Promise<any>;
  text(): Promise<string>;
}

/** This Streams API interface represents a readable stream of byte data. The Fetch API offers a concrete instance of a ReadableStream through the body property of a Response object. */
interface ReadableStream<R = any> {
  readonly locked: boolean;
  cancel(reason?: any): Promise<void>;
  getReader(): ReadableStreamDefaultReader<R>;
  pipeThrough<T>(
    transform: ReadableWritablePair<T, R>,
    options?: StreamPipeOptions
  ): ReadableStream<T>;
  pipeTo(dest: WritableStream<R>, options?: StreamPipeOptions): Promise<void>;
  tee(): [ReadableStream<R>, ReadableStream<R>];
}

declare var ReadableStream: {
  prototype: ReadableStream;
  new <R = any>(
    underlyingSource?: UnderlyingSource<R>,
    strategy?: QueuingStrategy<R>
  ): ReadableStream<R>;
};

interface ReadableStreamDefaultController<R = any> {
  readonly desiredSize: number | null;
  close(): void;
  enqueue(chunk: R): void;
  error(e?: any): void;
}

declare var ReadableStreamDefaultController: {
  prototype: ReadableStreamDefaultController;
  new (): ReadableStreamDefaultController;
};

interface ReadableStreamDefaultReader<R = any>
  extends ReadableStreamGenericReader {
  read(): Promise<ReadableStreamDefaultReadResult<R>>;
  releaseLock(): void;
}

declare var ReadableStreamDefaultReader: {
  prototype: ReadableStreamDefaultReader;
  new <R = any>(stream: ReadableStream<R>): ReadableStreamDefaultReader<R>;
};

interface ReadableStreamGenericReader {
  readonly closed: Promise<undefined>;
  cancel(reason?: any): Promise<void>;
}

declare type HeadersInit = Headers | string[][] | { [key: string]: string };

declare class Headers implements Iterable<[string, string]> {
  constructor(init?: HeadersInit);

  forEach(callback: (value: string, name: string) => void): void;
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string): void;

  // Iterable methods
  entries(): IterableIterator<[string, string]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<[string]>;
  [Symbol.iterator](): Iterator<[string, string]>;
}

declare function fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
declare function addEventListener(
  type: "fetch",
  listener: (event: FetchEvent) => void
);

declare interface FetchEvent {
  readonly client: ClientInfo;
  readonly request: Request;

  respondWith(response: Response);
}

declare type CacheOverrideMode = "none" | "pass" | "override";

declare interface CacheOverrideInit {
  ttl?: number;
  swr?: number;
  surrogateKey?: string;
  pci?: boolean;
}

declare interface CacheOverride extends CacheOverrideInit {
  mode: CacheOverrideMode;
}

declare var CacheOverride: {
  prototype: CacheOverride;
  new (mode: CacheOverrideMode, init?: CacheOverrideInit): CacheOverride;
};

declare interface ClientInfo {
  readonly address: string;
  readonly geo: Geolocation;
}

declare class Dictionary {
  constructor(name: string);
  get(key: string): string;
}

declare interface Geolocation {
  /**
   * The name of the organization associated with as_number.
   *
   * For example, fastly is the value given for IP addresses under AS-54113.
   */
  as_name: string | null;

  /**
   * [Autonomous system](https://en.wikipedia.org/wiki/Autonomous_system_(Internet)) (AS) number.
   */
  as_number: number | null;

  /**
   * The telephone area code associated with an IP address.
   *
   * These are only available for IP addresses in the United States, its territories, and Canada.
   */
  area_code: number | null;

  /**
   * City or town name.
   */
  city: string | null;

  /**
   * Connection speed.
   */
  conn_speed: string | null;

  /**
   * Connection type.
   */
  conn_type: string | null;

  /**
   * Continent.
   */
  continent: string | null;

  /**
   * A two-character [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country code for the country associated with an IP address.
   *
   * The US country code is returned for IP addresses associated with overseas United States military bases.
   *
   * These values include subdivisions that are assigned their own country codes in ISO 3166-1. For example, subdivisions NO-21 and NO-22 are presented with the country code SJ for Svalbard and the Jan Mayen Islands.
   */
  country_code: string | null;

  /**
   * A three-character [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) country code for the country associated with the IP address.
   *
   * The USA country code is returned for IP addresses associated with overseas United States military bases.
   */
  country_code3: string | null;

  /**
   * Country name.
   *
   * This field is the [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) English short name for a country.
   */
  country_name: string | null;

  /**
   * Time zone offset from Greenwich Mean Time (GMT) for `city`.
   */
  gmt_offset: string | null;

  /**
   * Latitude, in units of degrees from the equator.
   *
   * Values range from -90.0 to +90.0 inclusive, and are based on the [WGS 84](https://en.wikipedia.org/wiki/World_Geodetic_System) coordinate reference system.
   */
  latitude: number | null;

  /**
   * Longitude, in units of degrees from the [IERS Reference Meridian](https://en.wikipedia.org/wiki/IERS_Reference_Meridian).
   *
   * Values range from -180.0 to +180.0 inclusive, and are based on the [WGS 84](https://en.wikipedia.org/wiki/World_Geodetic_System) coordinate reference system.
   */
  longitude: number | null;

  /**
   * Metro code, representing designated market areas (DMAs) in the United States.
   */
  metro_code: number | null;

  /**
   * The postal code associated with the IP address.
   *
   * These are available for some IP addresses in Australia, Canada, France, Germany, Italy, Spain, Switzerland, the United Kingdom, and the United States.
   *
   * For Canadian postal codes, this is the first 3 characters. For the United Kingdom, this is the first 2-4 characters (outward code). For countries with alphanumeric postal codes, this field is a lowercase transliteration.
   */
  postal_code: string | null;

  /**
   * Client proxy description.
   */
  proxy_description: string | null;

  /**
   * Client proxy type.
   */
  proxy_type: string | null;

  /**
   * [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) country subdivision code.
   *
   * For countries with multiple levels of subdivision (for example, nations within the United Kingdom), this variable gives the more specific subdivision.
   *
   * This field can be None for countries that do not have ISO country subdivision codes. For example, None is given for IP addresses assigned to the Åland Islands (country code AX, illustrated below).
   */
  region: string | null;

  /**
   * Time zone offset from coordinated universal time (UTC) for `city`.
   */
  utc_offset: number | null;
}

declare function getGeolocationForIpAddress(address: string): Geolocation;

/** https://url.spec.whatwg.org/#url-class */
declare class URL {
  constructor(url: string, base?: string | URL);

  get href(): string;
  set href(V: string);

  get origin(): string;

  get protocol(): string;
  set protocol(V: string);

  get username(): string;
  set username(V: string);

  get password(): string;
  set password(V: string);

  get host(): string;
  set host(V: string);

  get hostname(): string;
  set hostname(V: string);

  get port(): string;
  set port(V: string);

  get pathname(): string;
  set pathname(V: string);

  get search(): string;
  set search(V: string);

  get searchParams(): URLSearchParams;

  get hash(): string;
  set hash(V: string);

  toJSON(): string;

  readonly [Symbol.toStringTag]: "URL";
}

/** https://url.spec.whatwg.org/#interface-urlsearchparams */
declare class URLSearchParams {
  constructor(
    init?:
      | ReadonlyArray<readonly [name: string, value: string]>
      | Iterable<readonly [name: string, value: string]>
      | { readonly [name: string]: string }
      | string
  );

  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  getAll(name: string): string[];
  has(name: string): boolean;
  set(name: string, value: string): void;
  sort(): void;

  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;
  entries(): IterableIterator<[name: string, value: string]>;
  forEach<THIS_ARG = void>(
    callback: (
      this: THIS_ARG,
      value: string,
      name: string,
      searchParams: this
    ) => void,
    thisArg?: THIS_ARG
  ): void;

  readonly [Symbol.toStringTag]: "URLSearchParams";
  [Symbol.iterator](): IterableIterator<[name: string, value: string]>;
}

declare interface Console {
  log(message: any);
  trace(message: any);
  info(message: any);
  warn(message: any);
  error(message: any);
  setEndpoint(endpoint: string);
}

declare var console: Console;

declare class TextEncoder {
  constructor();
  encode(input: string = ""): Uint8Array;
  get encoding(): string;
}

declare class TextDecoder {
  constructor();
  decode(input?: ArrayBuffer | ArrayBufferView): string;
  get encoding(): string;
}

declare var self: any;