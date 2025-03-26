
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model bookstack_books
 * 
 */
export type bookstack_books = $Result.DefaultSelection<Prisma.$bookstack_booksPayload>
/**
 * Model bookstack_pages
 * 
 */
export type bookstack_pages = $Result.DefaultSelection<Prisma.$bookstack_pagesPayload>
/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>
/**
 * Model user_link
 * 
 */
export type user_link = $Result.DefaultSelection<Prisma.$user_linkPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Bookstack_books
 * const bookstack_books = await prisma.bookstack_books.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Bookstack_books
   * const bookstack_books = await prisma.bookstack_books.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.bookstack_books`: Exposes CRUD operations for the **bookstack_books** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookstack_books
    * const bookstack_books = await prisma.bookstack_books.findMany()
    * ```
    */
  get bookstack_books(): Prisma.bookstack_booksDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookstack_pages`: Exposes CRUD operations for the **bookstack_pages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookstack_pages
    * const bookstack_pages = await prisma.bookstack_pages.findMany()
    * ```
    */
  get bookstack_pages(): Prisma.bookstack_pagesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_link`: Exposes CRUD operations for the **user_link** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_links
    * const user_links = await prisma.user_link.findMany()
    * ```
    */
  get user_link(): Prisma.user_linkDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.5.0
   * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    bookstack_books: 'bookstack_books',
    bookstack_pages: 'bookstack_pages',
    user: 'user',
    user_link: 'user_link'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "bookstack_books" | "bookstack_pages" | "user" | "user_link"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      bookstack_books: {
        payload: Prisma.$bookstack_booksPayload<ExtArgs>
        fields: Prisma.bookstack_booksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bookstack_booksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_booksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bookstack_booksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_booksPayload>
          }
          findFirst: {
            args: Prisma.bookstack_booksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_booksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bookstack_booksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_booksPayload>
          }
          findMany: {
            args: Prisma.bookstack_booksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_booksPayload>[]
          }
          create: {
            args: Prisma.bookstack_booksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_booksPayload>
          }
          createMany: {
            args: Prisma.bookstack_booksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bookstack_booksCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_booksPayload>[]
          }
          delete: {
            args: Prisma.bookstack_booksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_booksPayload>
          }
          update: {
            args: Prisma.bookstack_booksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_booksPayload>
          }
          deleteMany: {
            args: Prisma.bookstack_booksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bookstack_booksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.bookstack_booksUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_booksPayload>[]
          }
          upsert: {
            args: Prisma.bookstack_booksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_booksPayload>
          }
          aggregate: {
            args: Prisma.Bookstack_booksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookstack_books>
          }
          groupBy: {
            args: Prisma.bookstack_booksGroupByArgs<ExtArgs>
            result: $Utils.Optional<Bookstack_booksGroupByOutputType>[]
          }
          count: {
            args: Prisma.bookstack_booksCountArgs<ExtArgs>
            result: $Utils.Optional<Bookstack_booksCountAggregateOutputType> | number
          }
        }
      }
      bookstack_pages: {
        payload: Prisma.$bookstack_pagesPayload<ExtArgs>
        fields: Prisma.bookstack_pagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bookstack_pagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_pagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bookstack_pagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_pagesPayload>
          }
          findFirst: {
            args: Prisma.bookstack_pagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_pagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bookstack_pagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_pagesPayload>
          }
          findMany: {
            args: Prisma.bookstack_pagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_pagesPayload>[]
          }
          create: {
            args: Prisma.bookstack_pagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_pagesPayload>
          }
          createMany: {
            args: Prisma.bookstack_pagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bookstack_pagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_pagesPayload>[]
          }
          delete: {
            args: Prisma.bookstack_pagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_pagesPayload>
          }
          update: {
            args: Prisma.bookstack_pagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_pagesPayload>
          }
          deleteMany: {
            args: Prisma.bookstack_pagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bookstack_pagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.bookstack_pagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_pagesPayload>[]
          }
          upsert: {
            args: Prisma.bookstack_pagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookstack_pagesPayload>
          }
          aggregate: {
            args: Prisma.Bookstack_pagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookstack_pages>
          }
          groupBy: {
            args: Prisma.bookstack_pagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Bookstack_pagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.bookstack_pagesCountArgs<ExtArgs>
            result: $Utils.Optional<Bookstack_pagesCountAggregateOutputType> | number
          }
        }
      }
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.userCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.userUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      user_link: {
        payload: Prisma.$user_linkPayload<ExtArgs>
        fields: Prisma.user_linkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_linkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_linkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_linkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_linkPayload>
          }
          findFirst: {
            args: Prisma.user_linkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_linkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_linkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_linkPayload>
          }
          findMany: {
            args: Prisma.user_linkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_linkPayload>[]
          }
          create: {
            args: Prisma.user_linkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_linkPayload>
          }
          createMany: {
            args: Prisma.user_linkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_linkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_linkPayload>[]
          }
          delete: {
            args: Prisma.user_linkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_linkPayload>
          }
          update: {
            args: Prisma.user_linkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_linkPayload>
          }
          deleteMany: {
            args: Prisma.user_linkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_linkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.user_linkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_linkPayload>[]
          }
          upsert: {
            args: Prisma.user_linkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_linkPayload>
          }
          aggregate: {
            args: Prisma.User_linkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_link>
          }
          groupBy: {
            args: Prisma.user_linkGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_linkGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_linkCountArgs<ExtArgs>
            result: $Utils.Optional<User_linkCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    bookstack_books?: bookstack_booksOmit
    bookstack_pages?: bookstack_pagesOmit
    user?: userOmit
    user_link?: user_linkOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model bookstack_books
   */

  export type AggregateBookstack_books = {
    _count: Bookstack_booksCountAggregateOutputType | null
    _avg: Bookstack_booksAvgAggregateOutputType | null
    _sum: Bookstack_booksSumAggregateOutputType | null
    _min: Bookstack_booksMinAggregateOutputType | null
    _max: Bookstack_booksMaxAggregateOutputType | null
  }

  export type Bookstack_booksAvgAggregateOutputType = {
    id: number | null
    owned_by: number | null
    created_by: number | null
    updated_by: number | null
  }

  export type Bookstack_booksSumAggregateOutputType = {
    id: number | null
    owned_by: number | null
    created_by: number | null
    updated_by: number | null
  }

  export type Bookstack_booksMinAggregateOutputType = {
    id: number | null
    slug: string | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
    owned_by: number | null
    created_by: number | null
    updated_by: number | null
    cover_url: string | null
  }

  export type Bookstack_booksMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
    owned_by: number | null
    created_by: number | null
    updated_by: number | null
    cover_url: string | null
  }

  export type Bookstack_booksCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    description: number
    created_at: number
    updated_at: number
    owned_by: number
    created_by: number
    updated_by: number
    cover_url: number
    _all: number
  }


  export type Bookstack_booksAvgAggregateInputType = {
    id?: true
    owned_by?: true
    created_by?: true
    updated_by?: true
  }

  export type Bookstack_booksSumAggregateInputType = {
    id?: true
    owned_by?: true
    created_by?: true
    updated_by?: true
  }

  export type Bookstack_booksMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
    owned_by?: true
    created_by?: true
    updated_by?: true
    cover_url?: true
  }

  export type Bookstack_booksMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
    owned_by?: true
    created_by?: true
    updated_by?: true
    cover_url?: true
  }

  export type Bookstack_booksCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
    owned_by?: true
    created_by?: true
    updated_by?: true
    cover_url?: true
    _all?: true
  }

  export type Bookstack_booksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bookstack_books to aggregate.
     */
    where?: bookstack_booksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookstack_books to fetch.
     */
    orderBy?: bookstack_booksOrderByWithRelationInput | bookstack_booksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bookstack_booksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookstack_books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookstack_books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bookstack_books
    **/
    _count?: true | Bookstack_booksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Bookstack_booksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Bookstack_booksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Bookstack_booksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Bookstack_booksMaxAggregateInputType
  }

  export type GetBookstack_booksAggregateType<T extends Bookstack_booksAggregateArgs> = {
        [P in keyof T & keyof AggregateBookstack_books]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookstack_books[P]>
      : GetScalarType<T[P], AggregateBookstack_books[P]>
  }




  export type bookstack_booksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bookstack_booksWhereInput
    orderBy?: bookstack_booksOrderByWithAggregationInput | bookstack_booksOrderByWithAggregationInput[]
    by: Bookstack_booksScalarFieldEnum[] | Bookstack_booksScalarFieldEnum
    having?: bookstack_booksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Bookstack_booksCountAggregateInputType | true
    _avg?: Bookstack_booksAvgAggregateInputType
    _sum?: Bookstack_booksSumAggregateInputType
    _min?: Bookstack_booksMinAggregateInputType
    _max?: Bookstack_booksMaxAggregateInputType
  }

  export type Bookstack_booksGroupByOutputType = {
    id: number
    slug: string | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
    owned_by: number | null
    created_by: number | null
    updated_by: number | null
    cover_url: string | null
    _count: Bookstack_booksCountAggregateOutputType | null
    _avg: Bookstack_booksAvgAggregateOutputType | null
    _sum: Bookstack_booksSumAggregateOutputType | null
    _min: Bookstack_booksMinAggregateOutputType | null
    _max: Bookstack_booksMaxAggregateOutputType | null
  }

  type GetBookstack_booksGroupByPayload<T extends bookstack_booksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Bookstack_booksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Bookstack_booksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Bookstack_booksGroupByOutputType[P]>
            : GetScalarType<T[P], Bookstack_booksGroupByOutputType[P]>
        }
      >
    >


  export type bookstack_booksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    owned_by?: boolean
    created_by?: boolean
    updated_by?: boolean
    cover_url?: boolean
  }, ExtArgs["result"]["bookstack_books"]>

  export type bookstack_booksSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    owned_by?: boolean
    created_by?: boolean
    updated_by?: boolean
    cover_url?: boolean
  }, ExtArgs["result"]["bookstack_books"]>

  export type bookstack_booksSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    owned_by?: boolean
    created_by?: boolean
    updated_by?: boolean
    cover_url?: boolean
  }, ExtArgs["result"]["bookstack_books"]>

  export type bookstack_booksSelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    owned_by?: boolean
    created_by?: boolean
    updated_by?: boolean
    cover_url?: boolean
  }

  export type bookstack_booksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "name" | "description" | "created_at" | "updated_at" | "owned_by" | "created_by" | "updated_by" | "cover_url", ExtArgs["result"]["bookstack_books"]>

  export type $bookstack_booksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bookstack_books"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string | null
      name: string | null
      description: string | null
      created_at: Date | null
      updated_at: Date | null
      owned_by: number | null
      created_by: number | null
      updated_by: number | null
      cover_url: string | null
    }, ExtArgs["result"]["bookstack_books"]>
    composites: {}
  }

  type bookstack_booksGetPayload<S extends boolean | null | undefined | bookstack_booksDefaultArgs> = $Result.GetResult<Prisma.$bookstack_booksPayload, S>

  type bookstack_booksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<bookstack_booksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Bookstack_booksCountAggregateInputType | true
    }

  export interface bookstack_booksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bookstack_books'], meta: { name: 'bookstack_books' } }
    /**
     * Find zero or one Bookstack_books that matches the filter.
     * @param {bookstack_booksFindUniqueArgs} args - Arguments to find a Bookstack_books
     * @example
     * // Get one Bookstack_books
     * const bookstack_books = await prisma.bookstack_books.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bookstack_booksFindUniqueArgs>(args: SelectSubset<T, bookstack_booksFindUniqueArgs<ExtArgs>>): Prisma__bookstack_booksClient<$Result.GetResult<Prisma.$bookstack_booksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bookstack_books that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {bookstack_booksFindUniqueOrThrowArgs} args - Arguments to find a Bookstack_books
     * @example
     * // Get one Bookstack_books
     * const bookstack_books = await prisma.bookstack_books.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bookstack_booksFindUniqueOrThrowArgs>(args: SelectSubset<T, bookstack_booksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bookstack_booksClient<$Result.GetResult<Prisma.$bookstack_booksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookstack_books that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookstack_booksFindFirstArgs} args - Arguments to find a Bookstack_books
     * @example
     * // Get one Bookstack_books
     * const bookstack_books = await prisma.bookstack_books.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bookstack_booksFindFirstArgs>(args?: SelectSubset<T, bookstack_booksFindFirstArgs<ExtArgs>>): Prisma__bookstack_booksClient<$Result.GetResult<Prisma.$bookstack_booksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookstack_books that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookstack_booksFindFirstOrThrowArgs} args - Arguments to find a Bookstack_books
     * @example
     * // Get one Bookstack_books
     * const bookstack_books = await prisma.bookstack_books.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bookstack_booksFindFirstOrThrowArgs>(args?: SelectSubset<T, bookstack_booksFindFirstOrThrowArgs<ExtArgs>>): Prisma__bookstack_booksClient<$Result.GetResult<Prisma.$bookstack_booksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookstack_books that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookstack_booksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookstack_books
     * const bookstack_books = await prisma.bookstack_books.findMany()
     * 
     * // Get first 10 Bookstack_books
     * const bookstack_books = await prisma.bookstack_books.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookstack_booksWithIdOnly = await prisma.bookstack_books.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends bookstack_booksFindManyArgs>(args?: SelectSubset<T, bookstack_booksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookstack_booksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bookstack_books.
     * @param {bookstack_booksCreateArgs} args - Arguments to create a Bookstack_books.
     * @example
     * // Create one Bookstack_books
     * const Bookstack_books = await prisma.bookstack_books.create({
     *   data: {
     *     // ... data to create a Bookstack_books
     *   }
     * })
     * 
     */
    create<T extends bookstack_booksCreateArgs>(args: SelectSubset<T, bookstack_booksCreateArgs<ExtArgs>>): Prisma__bookstack_booksClient<$Result.GetResult<Prisma.$bookstack_booksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookstack_books.
     * @param {bookstack_booksCreateManyArgs} args - Arguments to create many Bookstack_books.
     * @example
     * // Create many Bookstack_books
     * const bookstack_books = await prisma.bookstack_books.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bookstack_booksCreateManyArgs>(args?: SelectSubset<T, bookstack_booksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookstack_books and returns the data saved in the database.
     * @param {bookstack_booksCreateManyAndReturnArgs} args - Arguments to create many Bookstack_books.
     * @example
     * // Create many Bookstack_books
     * const bookstack_books = await prisma.bookstack_books.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookstack_books and only return the `id`
     * const bookstack_booksWithIdOnly = await prisma.bookstack_books.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bookstack_booksCreateManyAndReturnArgs>(args?: SelectSubset<T, bookstack_booksCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookstack_booksPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bookstack_books.
     * @param {bookstack_booksDeleteArgs} args - Arguments to delete one Bookstack_books.
     * @example
     * // Delete one Bookstack_books
     * const Bookstack_books = await prisma.bookstack_books.delete({
     *   where: {
     *     // ... filter to delete one Bookstack_books
     *   }
     * })
     * 
     */
    delete<T extends bookstack_booksDeleteArgs>(args: SelectSubset<T, bookstack_booksDeleteArgs<ExtArgs>>): Prisma__bookstack_booksClient<$Result.GetResult<Prisma.$bookstack_booksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bookstack_books.
     * @param {bookstack_booksUpdateArgs} args - Arguments to update one Bookstack_books.
     * @example
     * // Update one Bookstack_books
     * const bookstack_books = await prisma.bookstack_books.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bookstack_booksUpdateArgs>(args: SelectSubset<T, bookstack_booksUpdateArgs<ExtArgs>>): Prisma__bookstack_booksClient<$Result.GetResult<Prisma.$bookstack_booksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookstack_books.
     * @param {bookstack_booksDeleteManyArgs} args - Arguments to filter Bookstack_books to delete.
     * @example
     * // Delete a few Bookstack_books
     * const { count } = await prisma.bookstack_books.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bookstack_booksDeleteManyArgs>(args?: SelectSubset<T, bookstack_booksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookstack_books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookstack_booksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookstack_books
     * const bookstack_books = await prisma.bookstack_books.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bookstack_booksUpdateManyArgs>(args: SelectSubset<T, bookstack_booksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookstack_books and returns the data updated in the database.
     * @param {bookstack_booksUpdateManyAndReturnArgs} args - Arguments to update many Bookstack_books.
     * @example
     * // Update many Bookstack_books
     * const bookstack_books = await prisma.bookstack_books.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookstack_books and only return the `id`
     * const bookstack_booksWithIdOnly = await prisma.bookstack_books.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends bookstack_booksUpdateManyAndReturnArgs>(args: SelectSubset<T, bookstack_booksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookstack_booksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bookstack_books.
     * @param {bookstack_booksUpsertArgs} args - Arguments to update or create a Bookstack_books.
     * @example
     * // Update or create a Bookstack_books
     * const bookstack_books = await prisma.bookstack_books.upsert({
     *   create: {
     *     // ... data to create a Bookstack_books
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bookstack_books we want to update
     *   }
     * })
     */
    upsert<T extends bookstack_booksUpsertArgs>(args: SelectSubset<T, bookstack_booksUpsertArgs<ExtArgs>>): Prisma__bookstack_booksClient<$Result.GetResult<Prisma.$bookstack_booksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookstack_books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookstack_booksCountArgs} args - Arguments to filter Bookstack_books to count.
     * @example
     * // Count the number of Bookstack_books
     * const count = await prisma.bookstack_books.count({
     *   where: {
     *     // ... the filter for the Bookstack_books we want to count
     *   }
     * })
    **/
    count<T extends bookstack_booksCountArgs>(
      args?: Subset<T, bookstack_booksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Bookstack_booksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bookstack_books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Bookstack_booksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Bookstack_booksAggregateArgs>(args: Subset<T, Bookstack_booksAggregateArgs>): Prisma.PrismaPromise<GetBookstack_booksAggregateType<T>>

    /**
     * Group by Bookstack_books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookstack_booksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends bookstack_booksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bookstack_booksGroupByArgs['orderBy'] }
        : { orderBy?: bookstack_booksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bookstack_booksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookstack_booksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bookstack_books model
   */
  readonly fields: bookstack_booksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bookstack_books.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bookstack_booksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bookstack_books model
   */ 
  interface bookstack_booksFieldRefs {
    readonly id: FieldRef<"bookstack_books", 'Int'>
    readonly slug: FieldRef<"bookstack_books", 'String'>
    readonly name: FieldRef<"bookstack_books", 'String'>
    readonly description: FieldRef<"bookstack_books", 'String'>
    readonly created_at: FieldRef<"bookstack_books", 'DateTime'>
    readonly updated_at: FieldRef<"bookstack_books", 'DateTime'>
    readonly owned_by: FieldRef<"bookstack_books", 'Int'>
    readonly created_by: FieldRef<"bookstack_books", 'Int'>
    readonly updated_by: FieldRef<"bookstack_books", 'Int'>
    readonly cover_url: FieldRef<"bookstack_books", 'String'>
  }
    

  // Custom InputTypes
  /**
   * bookstack_books findUnique
   */
  export type bookstack_booksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_books
     */
    select?: bookstack_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_books
     */
    omit?: bookstack_booksOmit<ExtArgs> | null
    /**
     * Filter, which bookstack_books to fetch.
     */
    where: bookstack_booksWhereUniqueInput
  }

  /**
   * bookstack_books findUniqueOrThrow
   */
  export type bookstack_booksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_books
     */
    select?: bookstack_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_books
     */
    omit?: bookstack_booksOmit<ExtArgs> | null
    /**
     * Filter, which bookstack_books to fetch.
     */
    where: bookstack_booksWhereUniqueInput
  }

  /**
   * bookstack_books findFirst
   */
  export type bookstack_booksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_books
     */
    select?: bookstack_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_books
     */
    omit?: bookstack_booksOmit<ExtArgs> | null
    /**
     * Filter, which bookstack_books to fetch.
     */
    where?: bookstack_booksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookstack_books to fetch.
     */
    orderBy?: bookstack_booksOrderByWithRelationInput | bookstack_booksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bookstack_books.
     */
    cursor?: bookstack_booksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookstack_books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookstack_books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bookstack_books.
     */
    distinct?: Bookstack_booksScalarFieldEnum | Bookstack_booksScalarFieldEnum[]
  }

  /**
   * bookstack_books findFirstOrThrow
   */
  export type bookstack_booksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_books
     */
    select?: bookstack_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_books
     */
    omit?: bookstack_booksOmit<ExtArgs> | null
    /**
     * Filter, which bookstack_books to fetch.
     */
    where?: bookstack_booksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookstack_books to fetch.
     */
    orderBy?: bookstack_booksOrderByWithRelationInput | bookstack_booksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bookstack_books.
     */
    cursor?: bookstack_booksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookstack_books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookstack_books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bookstack_books.
     */
    distinct?: Bookstack_booksScalarFieldEnum | Bookstack_booksScalarFieldEnum[]
  }

  /**
   * bookstack_books findMany
   */
  export type bookstack_booksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_books
     */
    select?: bookstack_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_books
     */
    omit?: bookstack_booksOmit<ExtArgs> | null
    /**
     * Filter, which bookstack_books to fetch.
     */
    where?: bookstack_booksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookstack_books to fetch.
     */
    orderBy?: bookstack_booksOrderByWithRelationInput | bookstack_booksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bookstack_books.
     */
    cursor?: bookstack_booksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookstack_books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookstack_books.
     */
    skip?: number
    distinct?: Bookstack_booksScalarFieldEnum | Bookstack_booksScalarFieldEnum[]
  }

  /**
   * bookstack_books create
   */
  export type bookstack_booksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_books
     */
    select?: bookstack_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_books
     */
    omit?: bookstack_booksOmit<ExtArgs> | null
    /**
     * The data needed to create a bookstack_books.
     */
    data: XOR<bookstack_booksCreateInput, bookstack_booksUncheckedCreateInput>
  }

  /**
   * bookstack_books createMany
   */
  export type bookstack_booksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bookstack_books.
     */
    data: bookstack_booksCreateManyInput | bookstack_booksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bookstack_books createManyAndReturn
   */
  export type bookstack_booksCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_books
     */
    select?: bookstack_booksSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_books
     */
    omit?: bookstack_booksOmit<ExtArgs> | null
    /**
     * The data used to create many bookstack_books.
     */
    data: bookstack_booksCreateManyInput | bookstack_booksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bookstack_books update
   */
  export type bookstack_booksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_books
     */
    select?: bookstack_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_books
     */
    omit?: bookstack_booksOmit<ExtArgs> | null
    /**
     * The data needed to update a bookstack_books.
     */
    data: XOR<bookstack_booksUpdateInput, bookstack_booksUncheckedUpdateInput>
    /**
     * Choose, which bookstack_books to update.
     */
    where: bookstack_booksWhereUniqueInput
  }

  /**
   * bookstack_books updateMany
   */
  export type bookstack_booksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bookstack_books.
     */
    data: XOR<bookstack_booksUpdateManyMutationInput, bookstack_booksUncheckedUpdateManyInput>
    /**
     * Filter which bookstack_books to update
     */
    where?: bookstack_booksWhereInput
    /**
     * Limit how many bookstack_books to update.
     */
    limit?: number
  }

  /**
   * bookstack_books updateManyAndReturn
   */
  export type bookstack_booksUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_books
     */
    select?: bookstack_booksSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_books
     */
    omit?: bookstack_booksOmit<ExtArgs> | null
    /**
     * The data used to update bookstack_books.
     */
    data: XOR<bookstack_booksUpdateManyMutationInput, bookstack_booksUncheckedUpdateManyInput>
    /**
     * Filter which bookstack_books to update
     */
    where?: bookstack_booksWhereInput
    /**
     * Limit how many bookstack_books to update.
     */
    limit?: number
  }

  /**
   * bookstack_books upsert
   */
  export type bookstack_booksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_books
     */
    select?: bookstack_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_books
     */
    omit?: bookstack_booksOmit<ExtArgs> | null
    /**
     * The filter to search for the bookstack_books to update in case it exists.
     */
    where: bookstack_booksWhereUniqueInput
    /**
     * In case the bookstack_books found by the `where` argument doesn't exist, create a new bookstack_books with this data.
     */
    create: XOR<bookstack_booksCreateInput, bookstack_booksUncheckedCreateInput>
    /**
     * In case the bookstack_books was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bookstack_booksUpdateInput, bookstack_booksUncheckedUpdateInput>
  }

  /**
   * bookstack_books delete
   */
  export type bookstack_booksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_books
     */
    select?: bookstack_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_books
     */
    omit?: bookstack_booksOmit<ExtArgs> | null
    /**
     * Filter which bookstack_books to delete.
     */
    where: bookstack_booksWhereUniqueInput
  }

  /**
   * bookstack_books deleteMany
   */
  export type bookstack_booksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bookstack_books to delete
     */
    where?: bookstack_booksWhereInput
    /**
     * Limit how many bookstack_books to delete.
     */
    limit?: number
  }

  /**
   * bookstack_books without action
   */
  export type bookstack_booksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_books
     */
    select?: bookstack_booksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_books
     */
    omit?: bookstack_booksOmit<ExtArgs> | null
  }


  /**
   * Model bookstack_pages
   */

  export type AggregateBookstack_pages = {
    _count: Bookstack_pagesCountAggregateOutputType | null
    _avg: Bookstack_pagesAvgAggregateOutputType | null
    _sum: Bookstack_pagesSumAggregateOutputType | null
    _min: Bookstack_pagesMinAggregateOutputType | null
    _max: Bookstack_pagesMaxAggregateOutputType | null
  }

  export type Bookstack_pagesAvgAggregateOutputType = {
    id: number | null
    book_id: number | null
    chapter_id: number | null
    priority: number | null
    owned_by: number | null
    created_by: number | null
    updated_by: number | null
    revision_count: number | null
    chars: number | null
  }

  export type Bookstack_pagesSumAggregateOutputType = {
    id: number | null
    book_id: number | null
    chapter_id: number | null
    priority: number | null
    owned_by: number | null
    created_by: number | null
    updated_by: number | null
    revision_count: number | null
    chars: number | null
  }

  export type Bookstack_pagesMinAggregateOutputType = {
    name: string | null
    id: number | null
    slug: string | null
    book_id: number | null
    chapter_id: number | null
    draft: boolean | null
    template: boolean | null
    created_at: Date | null
    updated_at: Date | null
    priority: number | null
    owned_by: number | null
    book_slug: string | null
    created_by: number | null
    updated_by: number | null
    revision_count: number | null
    editor: string | null
    chars: number | null
  }

  export type Bookstack_pagesMaxAggregateOutputType = {
    name: string | null
    id: number | null
    slug: string | null
    book_id: number | null
    chapter_id: number | null
    draft: boolean | null
    template: boolean | null
    created_at: Date | null
    updated_at: Date | null
    priority: number | null
    owned_by: number | null
    book_slug: string | null
    created_by: number | null
    updated_by: number | null
    revision_count: number | null
    editor: string | null
    chars: number | null
  }

  export type Bookstack_pagesCountAggregateOutputType = {
    name: number
    id: number
    slug: number
    book_id: number
    chapter_id: number
    draft: number
    template: number
    created_at: number
    updated_at: number
    priority: number
    owned_by: number
    book_slug: number
    created_by: number
    updated_by: number
    revision_count: number
    editor: number
    chars: number
    _all: number
  }


  export type Bookstack_pagesAvgAggregateInputType = {
    id?: true
    book_id?: true
    chapter_id?: true
    priority?: true
    owned_by?: true
    created_by?: true
    updated_by?: true
    revision_count?: true
    chars?: true
  }

  export type Bookstack_pagesSumAggregateInputType = {
    id?: true
    book_id?: true
    chapter_id?: true
    priority?: true
    owned_by?: true
    created_by?: true
    updated_by?: true
    revision_count?: true
    chars?: true
  }

  export type Bookstack_pagesMinAggregateInputType = {
    name?: true
    id?: true
    slug?: true
    book_id?: true
    chapter_id?: true
    draft?: true
    template?: true
    created_at?: true
    updated_at?: true
    priority?: true
    owned_by?: true
    book_slug?: true
    created_by?: true
    updated_by?: true
    revision_count?: true
    editor?: true
    chars?: true
  }

  export type Bookstack_pagesMaxAggregateInputType = {
    name?: true
    id?: true
    slug?: true
    book_id?: true
    chapter_id?: true
    draft?: true
    template?: true
    created_at?: true
    updated_at?: true
    priority?: true
    owned_by?: true
    book_slug?: true
    created_by?: true
    updated_by?: true
    revision_count?: true
    editor?: true
    chars?: true
  }

  export type Bookstack_pagesCountAggregateInputType = {
    name?: true
    id?: true
    slug?: true
    book_id?: true
    chapter_id?: true
    draft?: true
    template?: true
    created_at?: true
    updated_at?: true
    priority?: true
    owned_by?: true
    book_slug?: true
    created_by?: true
    updated_by?: true
    revision_count?: true
    editor?: true
    chars?: true
    _all?: true
  }

  export type Bookstack_pagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bookstack_pages to aggregate.
     */
    where?: bookstack_pagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookstack_pages to fetch.
     */
    orderBy?: bookstack_pagesOrderByWithRelationInput | bookstack_pagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bookstack_pagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookstack_pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookstack_pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bookstack_pages
    **/
    _count?: true | Bookstack_pagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Bookstack_pagesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Bookstack_pagesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Bookstack_pagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Bookstack_pagesMaxAggregateInputType
  }

  export type GetBookstack_pagesAggregateType<T extends Bookstack_pagesAggregateArgs> = {
        [P in keyof T & keyof AggregateBookstack_pages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookstack_pages[P]>
      : GetScalarType<T[P], AggregateBookstack_pages[P]>
  }




  export type bookstack_pagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bookstack_pagesWhereInput
    orderBy?: bookstack_pagesOrderByWithAggregationInput | bookstack_pagesOrderByWithAggregationInput[]
    by: Bookstack_pagesScalarFieldEnum[] | Bookstack_pagesScalarFieldEnum
    having?: bookstack_pagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Bookstack_pagesCountAggregateInputType | true
    _avg?: Bookstack_pagesAvgAggregateInputType
    _sum?: Bookstack_pagesSumAggregateInputType
    _min?: Bookstack_pagesMinAggregateInputType
    _max?: Bookstack_pagesMaxAggregateInputType
  }

  export type Bookstack_pagesGroupByOutputType = {
    name: string | null
    id: number
    slug: string | null
    book_id: number | null
    chapter_id: number | null
    draft: boolean | null
    template: boolean | null
    created_at: Date | null
    updated_at: Date | null
    priority: number | null
    owned_by: number | null
    book_slug: string | null
    created_by: number | null
    updated_by: number | null
    revision_count: number | null
    editor: string | null
    chars: number | null
    _count: Bookstack_pagesCountAggregateOutputType | null
    _avg: Bookstack_pagesAvgAggregateOutputType | null
    _sum: Bookstack_pagesSumAggregateOutputType | null
    _min: Bookstack_pagesMinAggregateOutputType | null
    _max: Bookstack_pagesMaxAggregateOutputType | null
  }

  type GetBookstack_pagesGroupByPayload<T extends bookstack_pagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Bookstack_pagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Bookstack_pagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Bookstack_pagesGroupByOutputType[P]>
            : GetScalarType<T[P], Bookstack_pagesGroupByOutputType[P]>
        }
      >
    >


  export type bookstack_pagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    id?: boolean
    slug?: boolean
    book_id?: boolean
    chapter_id?: boolean
    draft?: boolean
    template?: boolean
    created_at?: boolean
    updated_at?: boolean
    priority?: boolean
    owned_by?: boolean
    book_slug?: boolean
    created_by?: boolean
    updated_by?: boolean
    revision_count?: boolean
    editor?: boolean
    chars?: boolean
  }, ExtArgs["result"]["bookstack_pages"]>

  export type bookstack_pagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    id?: boolean
    slug?: boolean
    book_id?: boolean
    chapter_id?: boolean
    draft?: boolean
    template?: boolean
    created_at?: boolean
    updated_at?: boolean
    priority?: boolean
    owned_by?: boolean
    book_slug?: boolean
    created_by?: boolean
    updated_by?: boolean
    revision_count?: boolean
    editor?: boolean
    chars?: boolean
  }, ExtArgs["result"]["bookstack_pages"]>

  export type bookstack_pagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    id?: boolean
    slug?: boolean
    book_id?: boolean
    chapter_id?: boolean
    draft?: boolean
    template?: boolean
    created_at?: boolean
    updated_at?: boolean
    priority?: boolean
    owned_by?: boolean
    book_slug?: boolean
    created_by?: boolean
    updated_by?: boolean
    revision_count?: boolean
    editor?: boolean
    chars?: boolean
  }, ExtArgs["result"]["bookstack_pages"]>

  export type bookstack_pagesSelectScalar = {
    name?: boolean
    id?: boolean
    slug?: boolean
    book_id?: boolean
    chapter_id?: boolean
    draft?: boolean
    template?: boolean
    created_at?: boolean
    updated_at?: boolean
    priority?: boolean
    owned_by?: boolean
    book_slug?: boolean
    created_by?: boolean
    updated_by?: boolean
    revision_count?: boolean
    editor?: boolean
    chars?: boolean
  }

  export type bookstack_pagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"name" | "id" | "slug" | "book_id" | "chapter_id" | "draft" | "template" | "created_at" | "updated_at" | "priority" | "owned_by" | "book_slug" | "created_by" | "updated_by" | "revision_count" | "editor" | "chars", ExtArgs["result"]["bookstack_pages"]>

  export type $bookstack_pagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bookstack_pages"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      name: string | null
      id: number
      slug: string | null
      book_id: number | null
      chapter_id: number | null
      draft: boolean | null
      template: boolean | null
      created_at: Date | null
      updated_at: Date | null
      priority: number | null
      owned_by: number | null
      book_slug: string | null
      created_by: number | null
      updated_by: number | null
      revision_count: number | null
      editor: string | null
      chars: number | null
    }, ExtArgs["result"]["bookstack_pages"]>
    composites: {}
  }

  type bookstack_pagesGetPayload<S extends boolean | null | undefined | bookstack_pagesDefaultArgs> = $Result.GetResult<Prisma.$bookstack_pagesPayload, S>

  type bookstack_pagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<bookstack_pagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Bookstack_pagesCountAggregateInputType | true
    }

  export interface bookstack_pagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bookstack_pages'], meta: { name: 'bookstack_pages' } }
    /**
     * Find zero or one Bookstack_pages that matches the filter.
     * @param {bookstack_pagesFindUniqueArgs} args - Arguments to find a Bookstack_pages
     * @example
     * // Get one Bookstack_pages
     * const bookstack_pages = await prisma.bookstack_pages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bookstack_pagesFindUniqueArgs>(args: SelectSubset<T, bookstack_pagesFindUniqueArgs<ExtArgs>>): Prisma__bookstack_pagesClient<$Result.GetResult<Prisma.$bookstack_pagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bookstack_pages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {bookstack_pagesFindUniqueOrThrowArgs} args - Arguments to find a Bookstack_pages
     * @example
     * // Get one Bookstack_pages
     * const bookstack_pages = await prisma.bookstack_pages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bookstack_pagesFindUniqueOrThrowArgs>(args: SelectSubset<T, bookstack_pagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bookstack_pagesClient<$Result.GetResult<Prisma.$bookstack_pagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookstack_pages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookstack_pagesFindFirstArgs} args - Arguments to find a Bookstack_pages
     * @example
     * // Get one Bookstack_pages
     * const bookstack_pages = await prisma.bookstack_pages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bookstack_pagesFindFirstArgs>(args?: SelectSubset<T, bookstack_pagesFindFirstArgs<ExtArgs>>): Prisma__bookstack_pagesClient<$Result.GetResult<Prisma.$bookstack_pagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookstack_pages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookstack_pagesFindFirstOrThrowArgs} args - Arguments to find a Bookstack_pages
     * @example
     * // Get one Bookstack_pages
     * const bookstack_pages = await prisma.bookstack_pages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bookstack_pagesFindFirstOrThrowArgs>(args?: SelectSubset<T, bookstack_pagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__bookstack_pagesClient<$Result.GetResult<Prisma.$bookstack_pagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookstack_pages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookstack_pagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookstack_pages
     * const bookstack_pages = await prisma.bookstack_pages.findMany()
     * 
     * // Get first 10 Bookstack_pages
     * const bookstack_pages = await prisma.bookstack_pages.findMany({ take: 10 })
     * 
     * // Only select the `name`
     * const bookstack_pagesWithNameOnly = await prisma.bookstack_pages.findMany({ select: { name: true } })
     * 
     */
    findMany<T extends bookstack_pagesFindManyArgs>(args?: SelectSubset<T, bookstack_pagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookstack_pagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bookstack_pages.
     * @param {bookstack_pagesCreateArgs} args - Arguments to create a Bookstack_pages.
     * @example
     * // Create one Bookstack_pages
     * const Bookstack_pages = await prisma.bookstack_pages.create({
     *   data: {
     *     // ... data to create a Bookstack_pages
     *   }
     * })
     * 
     */
    create<T extends bookstack_pagesCreateArgs>(args: SelectSubset<T, bookstack_pagesCreateArgs<ExtArgs>>): Prisma__bookstack_pagesClient<$Result.GetResult<Prisma.$bookstack_pagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookstack_pages.
     * @param {bookstack_pagesCreateManyArgs} args - Arguments to create many Bookstack_pages.
     * @example
     * // Create many Bookstack_pages
     * const bookstack_pages = await prisma.bookstack_pages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bookstack_pagesCreateManyArgs>(args?: SelectSubset<T, bookstack_pagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookstack_pages and returns the data saved in the database.
     * @param {bookstack_pagesCreateManyAndReturnArgs} args - Arguments to create many Bookstack_pages.
     * @example
     * // Create many Bookstack_pages
     * const bookstack_pages = await prisma.bookstack_pages.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookstack_pages and only return the `name`
     * const bookstack_pagesWithNameOnly = await prisma.bookstack_pages.createManyAndReturn({
     *   select: { name: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bookstack_pagesCreateManyAndReturnArgs>(args?: SelectSubset<T, bookstack_pagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookstack_pagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bookstack_pages.
     * @param {bookstack_pagesDeleteArgs} args - Arguments to delete one Bookstack_pages.
     * @example
     * // Delete one Bookstack_pages
     * const Bookstack_pages = await prisma.bookstack_pages.delete({
     *   where: {
     *     // ... filter to delete one Bookstack_pages
     *   }
     * })
     * 
     */
    delete<T extends bookstack_pagesDeleteArgs>(args: SelectSubset<T, bookstack_pagesDeleteArgs<ExtArgs>>): Prisma__bookstack_pagesClient<$Result.GetResult<Prisma.$bookstack_pagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bookstack_pages.
     * @param {bookstack_pagesUpdateArgs} args - Arguments to update one Bookstack_pages.
     * @example
     * // Update one Bookstack_pages
     * const bookstack_pages = await prisma.bookstack_pages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bookstack_pagesUpdateArgs>(args: SelectSubset<T, bookstack_pagesUpdateArgs<ExtArgs>>): Prisma__bookstack_pagesClient<$Result.GetResult<Prisma.$bookstack_pagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookstack_pages.
     * @param {bookstack_pagesDeleteManyArgs} args - Arguments to filter Bookstack_pages to delete.
     * @example
     * // Delete a few Bookstack_pages
     * const { count } = await prisma.bookstack_pages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bookstack_pagesDeleteManyArgs>(args?: SelectSubset<T, bookstack_pagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookstack_pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookstack_pagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookstack_pages
     * const bookstack_pages = await prisma.bookstack_pages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bookstack_pagesUpdateManyArgs>(args: SelectSubset<T, bookstack_pagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookstack_pages and returns the data updated in the database.
     * @param {bookstack_pagesUpdateManyAndReturnArgs} args - Arguments to update many Bookstack_pages.
     * @example
     * // Update many Bookstack_pages
     * const bookstack_pages = await prisma.bookstack_pages.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookstack_pages and only return the `name`
     * const bookstack_pagesWithNameOnly = await prisma.bookstack_pages.updateManyAndReturn({
     *   select: { name: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends bookstack_pagesUpdateManyAndReturnArgs>(args: SelectSubset<T, bookstack_pagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookstack_pagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bookstack_pages.
     * @param {bookstack_pagesUpsertArgs} args - Arguments to update or create a Bookstack_pages.
     * @example
     * // Update or create a Bookstack_pages
     * const bookstack_pages = await prisma.bookstack_pages.upsert({
     *   create: {
     *     // ... data to create a Bookstack_pages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bookstack_pages we want to update
     *   }
     * })
     */
    upsert<T extends bookstack_pagesUpsertArgs>(args: SelectSubset<T, bookstack_pagesUpsertArgs<ExtArgs>>): Prisma__bookstack_pagesClient<$Result.GetResult<Prisma.$bookstack_pagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookstack_pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookstack_pagesCountArgs} args - Arguments to filter Bookstack_pages to count.
     * @example
     * // Count the number of Bookstack_pages
     * const count = await prisma.bookstack_pages.count({
     *   where: {
     *     // ... the filter for the Bookstack_pages we want to count
     *   }
     * })
    **/
    count<T extends bookstack_pagesCountArgs>(
      args?: Subset<T, bookstack_pagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Bookstack_pagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bookstack_pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Bookstack_pagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Bookstack_pagesAggregateArgs>(args: Subset<T, Bookstack_pagesAggregateArgs>): Prisma.PrismaPromise<GetBookstack_pagesAggregateType<T>>

    /**
     * Group by Bookstack_pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookstack_pagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends bookstack_pagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bookstack_pagesGroupByArgs['orderBy'] }
        : { orderBy?: bookstack_pagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bookstack_pagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookstack_pagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bookstack_pages model
   */
  readonly fields: bookstack_pagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bookstack_pages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bookstack_pagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bookstack_pages model
   */ 
  interface bookstack_pagesFieldRefs {
    readonly name: FieldRef<"bookstack_pages", 'String'>
    readonly id: FieldRef<"bookstack_pages", 'Int'>
    readonly slug: FieldRef<"bookstack_pages", 'String'>
    readonly book_id: FieldRef<"bookstack_pages", 'Int'>
    readonly chapter_id: FieldRef<"bookstack_pages", 'Int'>
    readonly draft: FieldRef<"bookstack_pages", 'Boolean'>
    readonly template: FieldRef<"bookstack_pages", 'Boolean'>
    readonly created_at: FieldRef<"bookstack_pages", 'DateTime'>
    readonly updated_at: FieldRef<"bookstack_pages", 'DateTime'>
    readonly priority: FieldRef<"bookstack_pages", 'Int'>
    readonly owned_by: FieldRef<"bookstack_pages", 'Int'>
    readonly book_slug: FieldRef<"bookstack_pages", 'String'>
    readonly created_by: FieldRef<"bookstack_pages", 'Int'>
    readonly updated_by: FieldRef<"bookstack_pages", 'Int'>
    readonly revision_count: FieldRef<"bookstack_pages", 'Int'>
    readonly editor: FieldRef<"bookstack_pages", 'String'>
    readonly chars: FieldRef<"bookstack_pages", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * bookstack_pages findUnique
   */
  export type bookstack_pagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_pages
     */
    select?: bookstack_pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_pages
     */
    omit?: bookstack_pagesOmit<ExtArgs> | null
    /**
     * Filter, which bookstack_pages to fetch.
     */
    where: bookstack_pagesWhereUniqueInput
  }

  /**
   * bookstack_pages findUniqueOrThrow
   */
  export type bookstack_pagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_pages
     */
    select?: bookstack_pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_pages
     */
    omit?: bookstack_pagesOmit<ExtArgs> | null
    /**
     * Filter, which bookstack_pages to fetch.
     */
    where: bookstack_pagesWhereUniqueInput
  }

  /**
   * bookstack_pages findFirst
   */
  export type bookstack_pagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_pages
     */
    select?: bookstack_pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_pages
     */
    omit?: bookstack_pagesOmit<ExtArgs> | null
    /**
     * Filter, which bookstack_pages to fetch.
     */
    where?: bookstack_pagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookstack_pages to fetch.
     */
    orderBy?: bookstack_pagesOrderByWithRelationInput | bookstack_pagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bookstack_pages.
     */
    cursor?: bookstack_pagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookstack_pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookstack_pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bookstack_pages.
     */
    distinct?: Bookstack_pagesScalarFieldEnum | Bookstack_pagesScalarFieldEnum[]
  }

  /**
   * bookstack_pages findFirstOrThrow
   */
  export type bookstack_pagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_pages
     */
    select?: bookstack_pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_pages
     */
    omit?: bookstack_pagesOmit<ExtArgs> | null
    /**
     * Filter, which bookstack_pages to fetch.
     */
    where?: bookstack_pagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookstack_pages to fetch.
     */
    orderBy?: bookstack_pagesOrderByWithRelationInput | bookstack_pagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bookstack_pages.
     */
    cursor?: bookstack_pagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookstack_pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookstack_pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bookstack_pages.
     */
    distinct?: Bookstack_pagesScalarFieldEnum | Bookstack_pagesScalarFieldEnum[]
  }

  /**
   * bookstack_pages findMany
   */
  export type bookstack_pagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_pages
     */
    select?: bookstack_pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_pages
     */
    omit?: bookstack_pagesOmit<ExtArgs> | null
    /**
     * Filter, which bookstack_pages to fetch.
     */
    where?: bookstack_pagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookstack_pages to fetch.
     */
    orderBy?: bookstack_pagesOrderByWithRelationInput | bookstack_pagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bookstack_pages.
     */
    cursor?: bookstack_pagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookstack_pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookstack_pages.
     */
    skip?: number
    distinct?: Bookstack_pagesScalarFieldEnum | Bookstack_pagesScalarFieldEnum[]
  }

  /**
   * bookstack_pages create
   */
  export type bookstack_pagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_pages
     */
    select?: bookstack_pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_pages
     */
    omit?: bookstack_pagesOmit<ExtArgs> | null
    /**
     * The data needed to create a bookstack_pages.
     */
    data: XOR<bookstack_pagesCreateInput, bookstack_pagesUncheckedCreateInput>
  }

  /**
   * bookstack_pages createMany
   */
  export type bookstack_pagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bookstack_pages.
     */
    data: bookstack_pagesCreateManyInput | bookstack_pagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bookstack_pages createManyAndReturn
   */
  export type bookstack_pagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_pages
     */
    select?: bookstack_pagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_pages
     */
    omit?: bookstack_pagesOmit<ExtArgs> | null
    /**
     * The data used to create many bookstack_pages.
     */
    data: bookstack_pagesCreateManyInput | bookstack_pagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bookstack_pages update
   */
  export type bookstack_pagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_pages
     */
    select?: bookstack_pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_pages
     */
    omit?: bookstack_pagesOmit<ExtArgs> | null
    /**
     * The data needed to update a bookstack_pages.
     */
    data: XOR<bookstack_pagesUpdateInput, bookstack_pagesUncheckedUpdateInput>
    /**
     * Choose, which bookstack_pages to update.
     */
    where: bookstack_pagesWhereUniqueInput
  }

  /**
   * bookstack_pages updateMany
   */
  export type bookstack_pagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bookstack_pages.
     */
    data: XOR<bookstack_pagesUpdateManyMutationInput, bookstack_pagesUncheckedUpdateManyInput>
    /**
     * Filter which bookstack_pages to update
     */
    where?: bookstack_pagesWhereInput
    /**
     * Limit how many bookstack_pages to update.
     */
    limit?: number
  }

  /**
   * bookstack_pages updateManyAndReturn
   */
  export type bookstack_pagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_pages
     */
    select?: bookstack_pagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_pages
     */
    omit?: bookstack_pagesOmit<ExtArgs> | null
    /**
     * The data used to update bookstack_pages.
     */
    data: XOR<bookstack_pagesUpdateManyMutationInput, bookstack_pagesUncheckedUpdateManyInput>
    /**
     * Filter which bookstack_pages to update
     */
    where?: bookstack_pagesWhereInput
    /**
     * Limit how many bookstack_pages to update.
     */
    limit?: number
  }

  /**
   * bookstack_pages upsert
   */
  export type bookstack_pagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_pages
     */
    select?: bookstack_pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_pages
     */
    omit?: bookstack_pagesOmit<ExtArgs> | null
    /**
     * The filter to search for the bookstack_pages to update in case it exists.
     */
    where: bookstack_pagesWhereUniqueInput
    /**
     * In case the bookstack_pages found by the `where` argument doesn't exist, create a new bookstack_pages with this data.
     */
    create: XOR<bookstack_pagesCreateInput, bookstack_pagesUncheckedCreateInput>
    /**
     * In case the bookstack_pages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bookstack_pagesUpdateInput, bookstack_pagesUncheckedUpdateInput>
  }

  /**
   * bookstack_pages delete
   */
  export type bookstack_pagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_pages
     */
    select?: bookstack_pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_pages
     */
    omit?: bookstack_pagesOmit<ExtArgs> | null
    /**
     * Filter which bookstack_pages to delete.
     */
    where: bookstack_pagesWhereUniqueInput
  }

  /**
   * bookstack_pages deleteMany
   */
  export type bookstack_pagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bookstack_pages to delete
     */
    where?: bookstack_pagesWhereInput
    /**
     * Limit how many bookstack_pages to delete.
     */
    limit?: number
  }

  /**
   * bookstack_pages without action
   */
  export type bookstack_pagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookstack_pages
     */
    select?: bookstack_pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookstack_pages
     */
    omit?: bookstack_pagesOmit<ExtArgs> | null
  }


  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    logto_id: string | null
    avatar: string | null
    name: string | null
    custom_data: string | null
  }

  export type UserMaxAggregateOutputType = {
    logto_id: string | null
    avatar: string | null
    name: string | null
    custom_data: string | null
  }

  export type UserCountAggregateOutputType = {
    logto_id: number
    avatar: number
    name: number
    custom_data: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    logto_id?: true
    avatar?: true
    name?: true
    custom_data?: true
  }

  export type UserMaxAggregateInputType = {
    logto_id?: true
    avatar?: true
    name?: true
    custom_data?: true
  }

  export type UserCountAggregateInputType = {
    logto_id?: true
    avatar?: true
    name?: true
    custom_data?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    logto_id: string
    avatar: string | null
    name: string | null
    custom_data: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    logto_id?: boolean
    avatar?: boolean
    name?: boolean
    custom_data?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    logto_id?: boolean
    avatar?: boolean
    name?: boolean
    custom_data?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    logto_id?: boolean
    avatar?: boolean
    name?: boolean
    custom_data?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectScalar = {
    logto_id?: boolean
    avatar?: boolean
    name?: boolean
    custom_data?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"logto_id" | "avatar" | "name" | "custom_data", ExtArgs["result"]["user"]>

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      logto_id: string
      avatar: string | null
      name: string | null
      custom_data: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `logto_id`
     * const userWithLogto_idOnly = await prisma.user.findMany({ select: { logto_id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {userCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `logto_id`
     * const userWithLogto_idOnly = await prisma.user.createManyAndReturn({
     *   select: { logto_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends userCreateManyAndReturnArgs>(args?: SelectSubset<T, userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {userUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `logto_id`
     * const userWithLogto_idOnly = await prisma.user.updateManyAndReturn({
     *   select: { logto_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends userUpdateManyAndReturnArgs>(args: SelectSubset<T, userUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user model
   */ 
  interface userFieldRefs {
    readonly logto_id: FieldRef<"user", 'String'>
    readonly avatar: FieldRef<"user", 'String'>
    readonly name: FieldRef<"user", 'String'>
    readonly custom_data: FieldRef<"user", 'String'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user createManyAndReturn
   */
  export type userCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user updateManyAndReturn
   */
  export type userUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
  }


  /**
   * Model user_link
   */

  export type AggregateUser_link = {
    _count: User_linkCountAggregateOutputType | null
    _min: User_linkMinAggregateOutputType | null
    _max: User_linkMaxAggregateOutputType | null
  }

  export type User_linkMinAggregateOutputType = {
    logto_id: string | null
    platform: string | null
    platform_id: string | null
  }

  export type User_linkMaxAggregateOutputType = {
    logto_id: string | null
    platform: string | null
    platform_id: string | null
  }

  export type User_linkCountAggregateOutputType = {
    logto_id: number
    platform: number
    platform_id: number
    _all: number
  }


  export type User_linkMinAggregateInputType = {
    logto_id?: true
    platform?: true
    platform_id?: true
  }

  export type User_linkMaxAggregateInputType = {
    logto_id?: true
    platform?: true
    platform_id?: true
  }

  export type User_linkCountAggregateInputType = {
    logto_id?: true
    platform?: true
    platform_id?: true
    _all?: true
  }

  export type User_linkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_link to aggregate.
     */
    where?: user_linkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_links to fetch.
     */
    orderBy?: user_linkOrderByWithRelationInput | user_linkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_linkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_links
    **/
    _count?: true | User_linkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_linkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_linkMaxAggregateInputType
  }

  export type GetUser_linkAggregateType<T extends User_linkAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_link]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_link[P]>
      : GetScalarType<T[P], AggregateUser_link[P]>
  }




  export type user_linkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_linkWhereInput
    orderBy?: user_linkOrderByWithAggregationInput | user_linkOrderByWithAggregationInput[]
    by: User_linkScalarFieldEnum[] | User_linkScalarFieldEnum
    having?: user_linkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_linkCountAggregateInputType | true
    _min?: User_linkMinAggregateInputType
    _max?: User_linkMaxAggregateInputType
  }

  export type User_linkGroupByOutputType = {
    logto_id: string
    platform: string | null
    platform_id: string | null
    _count: User_linkCountAggregateOutputType | null
    _min: User_linkMinAggregateOutputType | null
    _max: User_linkMaxAggregateOutputType | null
  }

  type GetUser_linkGroupByPayload<T extends user_linkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_linkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_linkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_linkGroupByOutputType[P]>
            : GetScalarType<T[P], User_linkGroupByOutputType[P]>
        }
      >
    >


  export type user_linkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    logto_id?: boolean
    platform?: boolean
    platform_id?: boolean
  }, ExtArgs["result"]["user_link"]>

  export type user_linkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    logto_id?: boolean
    platform?: boolean
    platform_id?: boolean
  }, ExtArgs["result"]["user_link"]>

  export type user_linkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    logto_id?: boolean
    platform?: boolean
    platform_id?: boolean
  }, ExtArgs["result"]["user_link"]>

  export type user_linkSelectScalar = {
    logto_id?: boolean
    platform?: boolean
    platform_id?: boolean
  }

  export type user_linkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"logto_id" | "platform" | "platform_id", ExtArgs["result"]["user_link"]>

  export type $user_linkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_link"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      logto_id: string
      platform: string | null
      platform_id: string | null
    }, ExtArgs["result"]["user_link"]>
    composites: {}
  }

  type user_linkGetPayload<S extends boolean | null | undefined | user_linkDefaultArgs> = $Result.GetResult<Prisma.$user_linkPayload, S>

  type user_linkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_linkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_linkCountAggregateInputType | true
    }

  export interface user_linkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_link'], meta: { name: 'user_link' } }
    /**
     * Find zero or one User_link that matches the filter.
     * @param {user_linkFindUniqueArgs} args - Arguments to find a User_link
     * @example
     * // Get one User_link
     * const user_link = await prisma.user_link.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_linkFindUniqueArgs>(args: SelectSubset<T, user_linkFindUniqueArgs<ExtArgs>>): Prisma__user_linkClient<$Result.GetResult<Prisma.$user_linkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_link that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_linkFindUniqueOrThrowArgs} args - Arguments to find a User_link
     * @example
     * // Get one User_link
     * const user_link = await prisma.user_link.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_linkFindUniqueOrThrowArgs>(args: SelectSubset<T, user_linkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_linkClient<$Result.GetResult<Prisma.$user_linkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_link that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_linkFindFirstArgs} args - Arguments to find a User_link
     * @example
     * // Get one User_link
     * const user_link = await prisma.user_link.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_linkFindFirstArgs>(args?: SelectSubset<T, user_linkFindFirstArgs<ExtArgs>>): Prisma__user_linkClient<$Result.GetResult<Prisma.$user_linkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_link that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_linkFindFirstOrThrowArgs} args - Arguments to find a User_link
     * @example
     * // Get one User_link
     * const user_link = await prisma.user_link.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_linkFindFirstOrThrowArgs>(args?: SelectSubset<T, user_linkFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_linkClient<$Result.GetResult<Prisma.$user_linkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_links that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_linkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_links
     * const user_links = await prisma.user_link.findMany()
     * 
     * // Get first 10 User_links
     * const user_links = await prisma.user_link.findMany({ take: 10 })
     * 
     * // Only select the `logto_id`
     * const user_linkWithLogto_idOnly = await prisma.user_link.findMany({ select: { logto_id: true } })
     * 
     */
    findMany<T extends user_linkFindManyArgs>(args?: SelectSubset<T, user_linkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_linkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_link.
     * @param {user_linkCreateArgs} args - Arguments to create a User_link.
     * @example
     * // Create one User_link
     * const User_link = await prisma.user_link.create({
     *   data: {
     *     // ... data to create a User_link
     *   }
     * })
     * 
     */
    create<T extends user_linkCreateArgs>(args: SelectSubset<T, user_linkCreateArgs<ExtArgs>>): Prisma__user_linkClient<$Result.GetResult<Prisma.$user_linkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_links.
     * @param {user_linkCreateManyArgs} args - Arguments to create many User_links.
     * @example
     * // Create many User_links
     * const user_link = await prisma.user_link.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_linkCreateManyArgs>(args?: SelectSubset<T, user_linkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_links and returns the data saved in the database.
     * @param {user_linkCreateManyAndReturnArgs} args - Arguments to create many User_links.
     * @example
     * // Create many User_links
     * const user_link = await prisma.user_link.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_links and only return the `logto_id`
     * const user_linkWithLogto_idOnly = await prisma.user_link.createManyAndReturn({
     *   select: { logto_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_linkCreateManyAndReturnArgs>(args?: SelectSubset<T, user_linkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_linkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User_link.
     * @param {user_linkDeleteArgs} args - Arguments to delete one User_link.
     * @example
     * // Delete one User_link
     * const User_link = await prisma.user_link.delete({
     *   where: {
     *     // ... filter to delete one User_link
     *   }
     * })
     * 
     */
    delete<T extends user_linkDeleteArgs>(args: SelectSubset<T, user_linkDeleteArgs<ExtArgs>>): Prisma__user_linkClient<$Result.GetResult<Prisma.$user_linkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_link.
     * @param {user_linkUpdateArgs} args - Arguments to update one User_link.
     * @example
     * // Update one User_link
     * const user_link = await prisma.user_link.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_linkUpdateArgs>(args: SelectSubset<T, user_linkUpdateArgs<ExtArgs>>): Prisma__user_linkClient<$Result.GetResult<Prisma.$user_linkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_links.
     * @param {user_linkDeleteManyArgs} args - Arguments to filter User_links to delete.
     * @example
     * // Delete a few User_links
     * const { count } = await prisma.user_link.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_linkDeleteManyArgs>(args?: SelectSubset<T, user_linkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_linkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_links
     * const user_link = await prisma.user_link.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_linkUpdateManyArgs>(args: SelectSubset<T, user_linkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_links and returns the data updated in the database.
     * @param {user_linkUpdateManyAndReturnArgs} args - Arguments to update many User_links.
     * @example
     * // Update many User_links
     * const user_link = await prisma.user_link.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more User_links and only return the `logto_id`
     * const user_linkWithLogto_idOnly = await prisma.user_link.updateManyAndReturn({
     *   select: { logto_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends user_linkUpdateManyAndReturnArgs>(args: SelectSubset<T, user_linkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_linkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User_link.
     * @param {user_linkUpsertArgs} args - Arguments to update or create a User_link.
     * @example
     * // Update or create a User_link
     * const user_link = await prisma.user_link.upsert({
     *   create: {
     *     // ... data to create a User_link
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_link we want to update
     *   }
     * })
     */
    upsert<T extends user_linkUpsertArgs>(args: SelectSubset<T, user_linkUpsertArgs<ExtArgs>>): Prisma__user_linkClient<$Result.GetResult<Prisma.$user_linkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_linkCountArgs} args - Arguments to filter User_links to count.
     * @example
     * // Count the number of User_links
     * const count = await prisma.user_link.count({
     *   where: {
     *     // ... the filter for the User_links we want to count
     *   }
     * })
    **/
    count<T extends user_linkCountArgs>(
      args?: Subset<T, user_linkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_linkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_linkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_linkAggregateArgs>(args: Subset<T, User_linkAggregateArgs>): Prisma.PrismaPromise<GetUser_linkAggregateType<T>>

    /**
     * Group by User_link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_linkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_linkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_linkGroupByArgs['orderBy'] }
        : { orderBy?: user_linkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_linkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_linkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_link model
   */
  readonly fields: user_linkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_link.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_linkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_link model
   */ 
  interface user_linkFieldRefs {
    readonly logto_id: FieldRef<"user_link", 'String'>
    readonly platform: FieldRef<"user_link", 'String'>
    readonly platform_id: FieldRef<"user_link", 'String'>
  }
    

  // Custom InputTypes
  /**
   * user_link findUnique
   */
  export type user_linkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_link
     */
    select?: user_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_link
     */
    omit?: user_linkOmit<ExtArgs> | null
    /**
     * Filter, which user_link to fetch.
     */
    where: user_linkWhereUniqueInput
  }

  /**
   * user_link findUniqueOrThrow
   */
  export type user_linkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_link
     */
    select?: user_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_link
     */
    omit?: user_linkOmit<ExtArgs> | null
    /**
     * Filter, which user_link to fetch.
     */
    where: user_linkWhereUniqueInput
  }

  /**
   * user_link findFirst
   */
  export type user_linkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_link
     */
    select?: user_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_link
     */
    omit?: user_linkOmit<ExtArgs> | null
    /**
     * Filter, which user_link to fetch.
     */
    where?: user_linkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_links to fetch.
     */
    orderBy?: user_linkOrderByWithRelationInput | user_linkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_links.
     */
    cursor?: user_linkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_links.
     */
    distinct?: User_linkScalarFieldEnum | User_linkScalarFieldEnum[]
  }

  /**
   * user_link findFirstOrThrow
   */
  export type user_linkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_link
     */
    select?: user_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_link
     */
    omit?: user_linkOmit<ExtArgs> | null
    /**
     * Filter, which user_link to fetch.
     */
    where?: user_linkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_links to fetch.
     */
    orderBy?: user_linkOrderByWithRelationInput | user_linkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_links.
     */
    cursor?: user_linkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_links.
     */
    distinct?: User_linkScalarFieldEnum | User_linkScalarFieldEnum[]
  }

  /**
   * user_link findMany
   */
  export type user_linkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_link
     */
    select?: user_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_link
     */
    omit?: user_linkOmit<ExtArgs> | null
    /**
     * Filter, which user_links to fetch.
     */
    where?: user_linkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_links to fetch.
     */
    orderBy?: user_linkOrderByWithRelationInput | user_linkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_links.
     */
    cursor?: user_linkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_links.
     */
    skip?: number
    distinct?: User_linkScalarFieldEnum | User_linkScalarFieldEnum[]
  }

  /**
   * user_link create
   */
  export type user_linkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_link
     */
    select?: user_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_link
     */
    omit?: user_linkOmit<ExtArgs> | null
    /**
     * The data needed to create a user_link.
     */
    data: XOR<user_linkCreateInput, user_linkUncheckedCreateInput>
  }

  /**
   * user_link createMany
   */
  export type user_linkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_links.
     */
    data: user_linkCreateManyInput | user_linkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_link createManyAndReturn
   */
  export type user_linkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_link
     */
    select?: user_linkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_link
     */
    omit?: user_linkOmit<ExtArgs> | null
    /**
     * The data used to create many user_links.
     */
    data: user_linkCreateManyInput | user_linkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_link update
   */
  export type user_linkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_link
     */
    select?: user_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_link
     */
    omit?: user_linkOmit<ExtArgs> | null
    /**
     * The data needed to update a user_link.
     */
    data: XOR<user_linkUpdateInput, user_linkUncheckedUpdateInput>
    /**
     * Choose, which user_link to update.
     */
    where: user_linkWhereUniqueInput
  }

  /**
   * user_link updateMany
   */
  export type user_linkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_links.
     */
    data: XOR<user_linkUpdateManyMutationInput, user_linkUncheckedUpdateManyInput>
    /**
     * Filter which user_links to update
     */
    where?: user_linkWhereInput
    /**
     * Limit how many user_links to update.
     */
    limit?: number
  }

  /**
   * user_link updateManyAndReturn
   */
  export type user_linkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_link
     */
    select?: user_linkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_link
     */
    omit?: user_linkOmit<ExtArgs> | null
    /**
     * The data used to update user_links.
     */
    data: XOR<user_linkUpdateManyMutationInput, user_linkUncheckedUpdateManyInput>
    /**
     * Filter which user_links to update
     */
    where?: user_linkWhereInput
    /**
     * Limit how many user_links to update.
     */
    limit?: number
  }

  /**
   * user_link upsert
   */
  export type user_linkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_link
     */
    select?: user_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_link
     */
    omit?: user_linkOmit<ExtArgs> | null
    /**
     * The filter to search for the user_link to update in case it exists.
     */
    where: user_linkWhereUniqueInput
    /**
     * In case the user_link found by the `where` argument doesn't exist, create a new user_link with this data.
     */
    create: XOR<user_linkCreateInput, user_linkUncheckedCreateInput>
    /**
     * In case the user_link was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_linkUpdateInput, user_linkUncheckedUpdateInput>
  }

  /**
   * user_link delete
   */
  export type user_linkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_link
     */
    select?: user_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_link
     */
    omit?: user_linkOmit<ExtArgs> | null
    /**
     * Filter which user_link to delete.
     */
    where: user_linkWhereUniqueInput
  }

  /**
   * user_link deleteMany
   */
  export type user_linkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_links to delete
     */
    where?: user_linkWhereInput
    /**
     * Limit how many user_links to delete.
     */
    limit?: number
  }

  /**
   * user_link without action
   */
  export type user_linkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_link
     */
    select?: user_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_link
     */
    omit?: user_linkOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Bookstack_booksScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    description: 'description',
    created_at: 'created_at',
    updated_at: 'updated_at',
    owned_by: 'owned_by',
    created_by: 'created_by',
    updated_by: 'updated_by',
    cover_url: 'cover_url'
  };

  export type Bookstack_booksScalarFieldEnum = (typeof Bookstack_booksScalarFieldEnum)[keyof typeof Bookstack_booksScalarFieldEnum]


  export const Bookstack_pagesScalarFieldEnum: {
    name: 'name',
    id: 'id',
    slug: 'slug',
    book_id: 'book_id',
    chapter_id: 'chapter_id',
    draft: 'draft',
    template: 'template',
    created_at: 'created_at',
    updated_at: 'updated_at',
    priority: 'priority',
    owned_by: 'owned_by',
    book_slug: 'book_slug',
    created_by: 'created_by',
    updated_by: 'updated_by',
    revision_count: 'revision_count',
    editor: 'editor',
    chars: 'chars'
  };

  export type Bookstack_pagesScalarFieldEnum = (typeof Bookstack_pagesScalarFieldEnum)[keyof typeof Bookstack_pagesScalarFieldEnum]


  export const UserScalarFieldEnum: {
    logto_id: 'logto_id',
    avatar: 'avatar',
    name: 'name',
    custom_data: 'custom_data'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const User_linkScalarFieldEnum: {
    logto_id: 'logto_id',
    platform: 'platform',
    platform_id: 'platform_id'
  };

  export type User_linkScalarFieldEnum = (typeof User_linkScalarFieldEnum)[keyof typeof User_linkScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type bookstack_booksWhereInput = {
    AND?: bookstack_booksWhereInput | bookstack_booksWhereInput[]
    OR?: bookstack_booksWhereInput[]
    NOT?: bookstack_booksWhereInput | bookstack_booksWhereInput[]
    id?: IntFilter<"bookstack_books"> | number
    slug?: StringNullableFilter<"bookstack_books"> | string | null
    name?: StringNullableFilter<"bookstack_books"> | string | null
    description?: StringNullableFilter<"bookstack_books"> | string | null
    created_at?: DateTimeNullableFilter<"bookstack_books"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"bookstack_books"> | Date | string | null
    owned_by?: IntNullableFilter<"bookstack_books"> | number | null
    created_by?: IntNullableFilter<"bookstack_books"> | number | null
    updated_by?: IntNullableFilter<"bookstack_books"> | number | null
    cover_url?: StringNullableFilter<"bookstack_books"> | string | null
  }

  export type bookstack_booksOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    owned_by?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    cover_url?: SortOrderInput | SortOrder
  }

  export type bookstack_booksWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: bookstack_booksWhereInput | bookstack_booksWhereInput[]
    OR?: bookstack_booksWhereInput[]
    NOT?: bookstack_booksWhereInput | bookstack_booksWhereInput[]
    slug?: StringNullableFilter<"bookstack_books"> | string | null
    name?: StringNullableFilter<"bookstack_books"> | string | null
    description?: StringNullableFilter<"bookstack_books"> | string | null
    created_at?: DateTimeNullableFilter<"bookstack_books"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"bookstack_books"> | Date | string | null
    owned_by?: IntNullableFilter<"bookstack_books"> | number | null
    created_by?: IntNullableFilter<"bookstack_books"> | number | null
    updated_by?: IntNullableFilter<"bookstack_books"> | number | null
    cover_url?: StringNullableFilter<"bookstack_books"> | string | null
  }, "id">

  export type bookstack_booksOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    owned_by?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    cover_url?: SortOrderInput | SortOrder
    _count?: bookstack_booksCountOrderByAggregateInput
    _avg?: bookstack_booksAvgOrderByAggregateInput
    _max?: bookstack_booksMaxOrderByAggregateInput
    _min?: bookstack_booksMinOrderByAggregateInput
    _sum?: bookstack_booksSumOrderByAggregateInput
  }

  export type bookstack_booksScalarWhereWithAggregatesInput = {
    AND?: bookstack_booksScalarWhereWithAggregatesInput | bookstack_booksScalarWhereWithAggregatesInput[]
    OR?: bookstack_booksScalarWhereWithAggregatesInput[]
    NOT?: bookstack_booksScalarWhereWithAggregatesInput | bookstack_booksScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"bookstack_books"> | number
    slug?: StringNullableWithAggregatesFilter<"bookstack_books"> | string | null
    name?: StringNullableWithAggregatesFilter<"bookstack_books"> | string | null
    description?: StringNullableWithAggregatesFilter<"bookstack_books"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"bookstack_books"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"bookstack_books"> | Date | string | null
    owned_by?: IntNullableWithAggregatesFilter<"bookstack_books"> | number | null
    created_by?: IntNullableWithAggregatesFilter<"bookstack_books"> | number | null
    updated_by?: IntNullableWithAggregatesFilter<"bookstack_books"> | number | null
    cover_url?: StringNullableWithAggregatesFilter<"bookstack_books"> | string | null
  }

  export type bookstack_pagesWhereInput = {
    AND?: bookstack_pagesWhereInput | bookstack_pagesWhereInput[]
    OR?: bookstack_pagesWhereInput[]
    NOT?: bookstack_pagesWhereInput | bookstack_pagesWhereInput[]
    name?: StringNullableFilter<"bookstack_pages"> | string | null
    id?: IntFilter<"bookstack_pages"> | number
    slug?: StringNullableFilter<"bookstack_pages"> | string | null
    book_id?: IntNullableFilter<"bookstack_pages"> | number | null
    chapter_id?: IntNullableFilter<"bookstack_pages"> | number | null
    draft?: BoolNullableFilter<"bookstack_pages"> | boolean | null
    template?: BoolNullableFilter<"bookstack_pages"> | boolean | null
    created_at?: DateTimeNullableFilter<"bookstack_pages"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"bookstack_pages"> | Date | string | null
    priority?: IntNullableFilter<"bookstack_pages"> | number | null
    owned_by?: IntNullableFilter<"bookstack_pages"> | number | null
    book_slug?: StringNullableFilter<"bookstack_pages"> | string | null
    created_by?: IntNullableFilter<"bookstack_pages"> | number | null
    updated_by?: IntNullableFilter<"bookstack_pages"> | number | null
    revision_count?: IntNullableFilter<"bookstack_pages"> | number | null
    editor?: StringNullableFilter<"bookstack_pages"> | string | null
    chars?: IntNullableFilter<"bookstack_pages"> | number | null
  }

  export type bookstack_pagesOrderByWithRelationInput = {
    name?: SortOrderInput | SortOrder
    id?: SortOrder
    slug?: SortOrderInput | SortOrder
    book_id?: SortOrderInput | SortOrder
    chapter_id?: SortOrderInput | SortOrder
    draft?: SortOrderInput | SortOrder
    template?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    priority?: SortOrderInput | SortOrder
    owned_by?: SortOrderInput | SortOrder
    book_slug?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    revision_count?: SortOrderInput | SortOrder
    editor?: SortOrderInput | SortOrder
    chars?: SortOrderInput | SortOrder
  }

  export type bookstack_pagesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: bookstack_pagesWhereInput | bookstack_pagesWhereInput[]
    OR?: bookstack_pagesWhereInput[]
    NOT?: bookstack_pagesWhereInput | bookstack_pagesWhereInput[]
    name?: StringNullableFilter<"bookstack_pages"> | string | null
    slug?: StringNullableFilter<"bookstack_pages"> | string | null
    book_id?: IntNullableFilter<"bookstack_pages"> | number | null
    chapter_id?: IntNullableFilter<"bookstack_pages"> | number | null
    draft?: BoolNullableFilter<"bookstack_pages"> | boolean | null
    template?: BoolNullableFilter<"bookstack_pages"> | boolean | null
    created_at?: DateTimeNullableFilter<"bookstack_pages"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"bookstack_pages"> | Date | string | null
    priority?: IntNullableFilter<"bookstack_pages"> | number | null
    owned_by?: IntNullableFilter<"bookstack_pages"> | number | null
    book_slug?: StringNullableFilter<"bookstack_pages"> | string | null
    created_by?: IntNullableFilter<"bookstack_pages"> | number | null
    updated_by?: IntNullableFilter<"bookstack_pages"> | number | null
    revision_count?: IntNullableFilter<"bookstack_pages"> | number | null
    editor?: StringNullableFilter<"bookstack_pages"> | string | null
    chars?: IntNullableFilter<"bookstack_pages"> | number | null
  }, "id">

  export type bookstack_pagesOrderByWithAggregationInput = {
    name?: SortOrderInput | SortOrder
    id?: SortOrder
    slug?: SortOrderInput | SortOrder
    book_id?: SortOrderInput | SortOrder
    chapter_id?: SortOrderInput | SortOrder
    draft?: SortOrderInput | SortOrder
    template?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    priority?: SortOrderInput | SortOrder
    owned_by?: SortOrderInput | SortOrder
    book_slug?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    revision_count?: SortOrderInput | SortOrder
    editor?: SortOrderInput | SortOrder
    chars?: SortOrderInput | SortOrder
    _count?: bookstack_pagesCountOrderByAggregateInput
    _avg?: bookstack_pagesAvgOrderByAggregateInput
    _max?: bookstack_pagesMaxOrderByAggregateInput
    _min?: bookstack_pagesMinOrderByAggregateInput
    _sum?: bookstack_pagesSumOrderByAggregateInput
  }

  export type bookstack_pagesScalarWhereWithAggregatesInput = {
    AND?: bookstack_pagesScalarWhereWithAggregatesInput | bookstack_pagesScalarWhereWithAggregatesInput[]
    OR?: bookstack_pagesScalarWhereWithAggregatesInput[]
    NOT?: bookstack_pagesScalarWhereWithAggregatesInput | bookstack_pagesScalarWhereWithAggregatesInput[]
    name?: StringNullableWithAggregatesFilter<"bookstack_pages"> | string | null
    id?: IntWithAggregatesFilter<"bookstack_pages"> | number
    slug?: StringNullableWithAggregatesFilter<"bookstack_pages"> | string | null
    book_id?: IntNullableWithAggregatesFilter<"bookstack_pages"> | number | null
    chapter_id?: IntNullableWithAggregatesFilter<"bookstack_pages"> | number | null
    draft?: BoolNullableWithAggregatesFilter<"bookstack_pages"> | boolean | null
    template?: BoolNullableWithAggregatesFilter<"bookstack_pages"> | boolean | null
    created_at?: DateTimeNullableWithAggregatesFilter<"bookstack_pages"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"bookstack_pages"> | Date | string | null
    priority?: IntNullableWithAggregatesFilter<"bookstack_pages"> | number | null
    owned_by?: IntNullableWithAggregatesFilter<"bookstack_pages"> | number | null
    book_slug?: StringNullableWithAggregatesFilter<"bookstack_pages"> | string | null
    created_by?: IntNullableWithAggregatesFilter<"bookstack_pages"> | number | null
    updated_by?: IntNullableWithAggregatesFilter<"bookstack_pages"> | number | null
    revision_count?: IntNullableWithAggregatesFilter<"bookstack_pages"> | number | null
    editor?: StringNullableWithAggregatesFilter<"bookstack_pages"> | string | null
    chars?: IntNullableWithAggregatesFilter<"bookstack_pages"> | number | null
  }

  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    logto_id?: StringFilter<"user"> | string
    avatar?: StringNullableFilter<"user"> | string | null
    name?: StringNullableFilter<"user"> | string | null
    custom_data?: StringNullableFilter<"user"> | string | null
  }

  export type userOrderByWithRelationInput = {
    logto_id?: SortOrder
    avatar?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    custom_data?: SortOrderInput | SortOrder
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    logto_id?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    avatar?: StringNullableFilter<"user"> | string | null
    name?: StringNullableFilter<"user"> | string | null
    custom_data?: StringNullableFilter<"user"> | string | null
  }, "logto_id">

  export type userOrderByWithAggregationInput = {
    logto_id?: SortOrder
    avatar?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    custom_data?: SortOrderInput | SortOrder
    _count?: userCountOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    logto_id?: StringWithAggregatesFilter<"user"> | string
    avatar?: StringNullableWithAggregatesFilter<"user"> | string | null
    name?: StringNullableWithAggregatesFilter<"user"> | string | null
    custom_data?: StringNullableWithAggregatesFilter<"user"> | string | null
  }

  export type user_linkWhereInput = {
    AND?: user_linkWhereInput | user_linkWhereInput[]
    OR?: user_linkWhereInput[]
    NOT?: user_linkWhereInput | user_linkWhereInput[]
    logto_id?: StringFilter<"user_link"> | string
    platform?: StringNullableFilter<"user_link"> | string | null
    platform_id?: StringNullableFilter<"user_link"> | string | null
  }

  export type user_linkOrderByWithRelationInput = {
    logto_id?: SortOrder
    platform?: SortOrderInput | SortOrder
    platform_id?: SortOrderInput | SortOrder
  }

  export type user_linkWhereUniqueInput = Prisma.AtLeast<{
    logto_id?: string
    AND?: user_linkWhereInput | user_linkWhereInput[]
    OR?: user_linkWhereInput[]
    NOT?: user_linkWhereInput | user_linkWhereInput[]
    platform?: StringNullableFilter<"user_link"> | string | null
    platform_id?: StringNullableFilter<"user_link"> | string | null
  }, "logto_id">

  export type user_linkOrderByWithAggregationInput = {
    logto_id?: SortOrder
    platform?: SortOrderInput | SortOrder
    platform_id?: SortOrderInput | SortOrder
    _count?: user_linkCountOrderByAggregateInput
    _max?: user_linkMaxOrderByAggregateInput
    _min?: user_linkMinOrderByAggregateInput
  }

  export type user_linkScalarWhereWithAggregatesInput = {
    AND?: user_linkScalarWhereWithAggregatesInput | user_linkScalarWhereWithAggregatesInput[]
    OR?: user_linkScalarWhereWithAggregatesInput[]
    NOT?: user_linkScalarWhereWithAggregatesInput | user_linkScalarWhereWithAggregatesInput[]
    logto_id?: StringWithAggregatesFilter<"user_link"> | string
    platform?: StringNullableWithAggregatesFilter<"user_link"> | string | null
    platform_id?: StringNullableWithAggregatesFilter<"user_link"> | string | null
  }

  export type bookstack_booksCreateInput = {
    id: number
    slug?: string | null
    name?: string | null
    description?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    owned_by?: number | null
    created_by?: number | null
    updated_by?: number | null
    cover_url?: string | null
  }

  export type bookstack_booksUncheckedCreateInput = {
    id: number
    slug?: string | null
    name?: string | null
    description?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    owned_by?: number | null
    created_by?: number | null
    updated_by?: number | null
    cover_url?: string | null
  }

  export type bookstack_booksUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    cover_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bookstack_booksUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    cover_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bookstack_booksCreateManyInput = {
    id: number
    slug?: string | null
    name?: string | null
    description?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    owned_by?: number | null
    created_by?: number | null
    updated_by?: number | null
    cover_url?: string | null
  }

  export type bookstack_booksUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    cover_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bookstack_booksUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    cover_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bookstack_pagesCreateInput = {
    name?: string | null
    id: number
    slug?: string | null
    book_id?: number | null
    chapter_id?: number | null
    draft?: boolean | null
    template?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    priority?: number | null
    owned_by?: number | null
    book_slug?: string | null
    created_by?: number | null
    updated_by?: number | null
    revision_count?: number | null
    editor?: string | null
    chars?: number | null
  }

  export type bookstack_pagesUncheckedCreateInput = {
    name?: string | null
    id: number
    slug?: string | null
    book_id?: number | null
    chapter_id?: number | null
    draft?: boolean | null
    template?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    priority?: number | null
    owned_by?: number | null
    book_slug?: string | null
    created_by?: number | null
    updated_by?: number | null
    revision_count?: number | null
    editor?: string | null
    chars?: number | null
  }

  export type bookstack_pagesUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    id?: IntFieldUpdateOperationsInput | number
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    book_id?: NullableIntFieldUpdateOperationsInput | number | null
    chapter_id?: NullableIntFieldUpdateOperationsInput | number | null
    draft?: NullableBoolFieldUpdateOperationsInput | boolean | null
    template?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    book_slug?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    revision_count?: NullableIntFieldUpdateOperationsInput | number | null
    editor?: NullableStringFieldUpdateOperationsInput | string | null
    chars?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type bookstack_pagesUncheckedUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    id?: IntFieldUpdateOperationsInput | number
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    book_id?: NullableIntFieldUpdateOperationsInput | number | null
    chapter_id?: NullableIntFieldUpdateOperationsInput | number | null
    draft?: NullableBoolFieldUpdateOperationsInput | boolean | null
    template?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    book_slug?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    revision_count?: NullableIntFieldUpdateOperationsInput | number | null
    editor?: NullableStringFieldUpdateOperationsInput | string | null
    chars?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type bookstack_pagesCreateManyInput = {
    name?: string | null
    id: number
    slug?: string | null
    book_id?: number | null
    chapter_id?: number | null
    draft?: boolean | null
    template?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    priority?: number | null
    owned_by?: number | null
    book_slug?: string | null
    created_by?: number | null
    updated_by?: number | null
    revision_count?: number | null
    editor?: string | null
    chars?: number | null
  }

  export type bookstack_pagesUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    id?: IntFieldUpdateOperationsInput | number
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    book_id?: NullableIntFieldUpdateOperationsInput | number | null
    chapter_id?: NullableIntFieldUpdateOperationsInput | number | null
    draft?: NullableBoolFieldUpdateOperationsInput | boolean | null
    template?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    book_slug?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    revision_count?: NullableIntFieldUpdateOperationsInput | number | null
    editor?: NullableStringFieldUpdateOperationsInput | string | null
    chars?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type bookstack_pagesUncheckedUpdateManyInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    id?: IntFieldUpdateOperationsInput | number
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    book_id?: NullableIntFieldUpdateOperationsInput | number | null
    chapter_id?: NullableIntFieldUpdateOperationsInput | number | null
    draft?: NullableBoolFieldUpdateOperationsInput | boolean | null
    template?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    book_slug?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    revision_count?: NullableIntFieldUpdateOperationsInput | number | null
    editor?: NullableStringFieldUpdateOperationsInput | string | null
    chars?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type userCreateInput = {
    logto_id: string
    avatar?: string | null
    name?: string | null
    custom_data?: string | null
  }

  export type userUncheckedCreateInput = {
    logto_id: string
    avatar?: string | null
    name?: string | null
    custom_data?: string | null
  }

  export type userUpdateInput = {
    logto_id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    custom_data?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type userUncheckedUpdateInput = {
    logto_id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    custom_data?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type userCreateManyInput = {
    logto_id: string
    avatar?: string | null
    name?: string | null
    custom_data?: string | null
  }

  export type userUpdateManyMutationInput = {
    logto_id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    custom_data?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type userUncheckedUpdateManyInput = {
    logto_id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    custom_data?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_linkCreateInput = {
    logto_id: string
    platform?: string | null
    platform_id?: string | null
  }

  export type user_linkUncheckedCreateInput = {
    logto_id: string
    platform?: string | null
    platform_id?: string | null
  }

  export type user_linkUpdateInput = {
    logto_id?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    platform_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_linkUncheckedUpdateInput = {
    logto_id?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    platform_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_linkCreateManyInput = {
    logto_id: string
    platform?: string | null
    platform_id?: string | null
  }

  export type user_linkUpdateManyMutationInput = {
    logto_id?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    platform_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_linkUncheckedUpdateManyInput = {
    logto_id?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    platform_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type bookstack_booksCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    owned_by?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    cover_url?: SortOrder
  }

  export type bookstack_booksAvgOrderByAggregateInput = {
    id?: SortOrder
    owned_by?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
  }

  export type bookstack_booksMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    owned_by?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    cover_url?: SortOrder
  }

  export type bookstack_booksMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    owned_by?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    cover_url?: SortOrder
  }

  export type bookstack_booksSumOrderByAggregateInput = {
    id?: SortOrder
    owned_by?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type bookstack_pagesCountOrderByAggregateInput = {
    name?: SortOrder
    id?: SortOrder
    slug?: SortOrder
    book_id?: SortOrder
    chapter_id?: SortOrder
    draft?: SortOrder
    template?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    priority?: SortOrder
    owned_by?: SortOrder
    book_slug?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    revision_count?: SortOrder
    editor?: SortOrder
    chars?: SortOrder
  }

  export type bookstack_pagesAvgOrderByAggregateInput = {
    id?: SortOrder
    book_id?: SortOrder
    chapter_id?: SortOrder
    priority?: SortOrder
    owned_by?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    revision_count?: SortOrder
    chars?: SortOrder
  }

  export type bookstack_pagesMaxOrderByAggregateInput = {
    name?: SortOrder
    id?: SortOrder
    slug?: SortOrder
    book_id?: SortOrder
    chapter_id?: SortOrder
    draft?: SortOrder
    template?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    priority?: SortOrder
    owned_by?: SortOrder
    book_slug?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    revision_count?: SortOrder
    editor?: SortOrder
    chars?: SortOrder
  }

  export type bookstack_pagesMinOrderByAggregateInput = {
    name?: SortOrder
    id?: SortOrder
    slug?: SortOrder
    book_id?: SortOrder
    chapter_id?: SortOrder
    draft?: SortOrder
    template?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    priority?: SortOrder
    owned_by?: SortOrder
    book_slug?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    revision_count?: SortOrder
    editor?: SortOrder
    chars?: SortOrder
  }

  export type bookstack_pagesSumOrderByAggregateInput = {
    id?: SortOrder
    book_id?: SortOrder
    chapter_id?: SortOrder
    priority?: SortOrder
    owned_by?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    revision_count?: SortOrder
    chars?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type userCountOrderByAggregateInput = {
    logto_id?: SortOrder
    avatar?: SortOrder
    name?: SortOrder
    custom_data?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    logto_id?: SortOrder
    avatar?: SortOrder
    name?: SortOrder
    custom_data?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    logto_id?: SortOrder
    avatar?: SortOrder
    name?: SortOrder
    custom_data?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type user_linkCountOrderByAggregateInput = {
    logto_id?: SortOrder
    platform?: SortOrder
    platform_id?: SortOrder
  }

  export type user_linkMaxOrderByAggregateInput = {
    logto_id?: SortOrder
    platform?: SortOrder
    platform_id?: SortOrder
  }

  export type user_linkMinOrderByAggregateInput = {
    logto_id?: SortOrder
    platform?: SortOrder
    platform_id?: SortOrder
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}