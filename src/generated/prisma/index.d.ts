
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
 * Model lojas
 * 
 */
export type lojas = $Result.DefaultSelection<Prisma.$lojasPayload>
/**
 * Model produtos
 * 
 */
export type produtos = $Result.DefaultSelection<Prisma.$produtosPayload>
/**
 * Model setor
 * 
 */
export type setor = $Result.DefaultSelection<Prisma.$setorPayload>
/**
 * Model estoque_loja
 * 
 */
export type estoque_loja = $Result.DefaultSelection<Prisma.$estoque_lojaPayload>
/**
 * Model usuarios
 * 
 */
export type usuarios = $Result.DefaultSelection<Prisma.$usuariosPayload>
/**
 * Model pedidos
 * 
 */
export type pedidos = $Result.DefaultSelection<Prisma.$pedidosPayload>
/**
 * Model itens_pedido
 * 
 */
export type itens_pedido = $Result.DefaultSelection<Prisma.$itens_pedidoPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Lojas
 * const lojas = await prisma.lojas.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Lojas
   * const lojas = await prisma.lojas.findMany()
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
   * `prisma.lojas`: Exposes CRUD operations for the **lojas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lojas
    * const lojas = await prisma.lojas.findMany()
    * ```
    */
  get lojas(): Prisma.lojasDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.produtos`: Exposes CRUD operations for the **produtos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Produtos
    * const produtos = await prisma.produtos.findMany()
    * ```
    */
  get produtos(): Prisma.produtosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.setor`: Exposes CRUD operations for the **setor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Setors
    * const setors = await prisma.setor.findMany()
    * ```
    */
  get setor(): Prisma.setorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.estoque_loja`: Exposes CRUD operations for the **estoque_loja** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Estoque_lojas
    * const estoque_lojas = await prisma.estoque_loja.findMany()
    * ```
    */
  get estoque_loja(): Prisma.estoque_lojaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuarios`: Exposes CRUD operations for the **usuarios** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuarios.findMany()
    * ```
    */
  get usuarios(): Prisma.usuariosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pedidos`: Exposes CRUD operations for the **pedidos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pedidos
    * const pedidos = await prisma.pedidos.findMany()
    * ```
    */
  get pedidos(): Prisma.pedidosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itens_pedido`: Exposes CRUD operations for the **itens_pedido** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Itens_pedidos
    * const itens_pedidos = await prisma.itens_pedido.findMany()
    * ```
    */
  get itens_pedido(): Prisma.itens_pedidoDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.16.3
   * Query Engine version: bb420e667c1820a8c05a38023385f6cc7ef8e83a
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
    lojas: 'lojas',
    produtos: 'produtos',
    setor: 'setor',
    estoque_loja: 'estoque_loja',
    usuarios: 'usuarios',
    pedidos: 'pedidos',
    itens_pedido: 'itens_pedido'
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
      modelProps: "lojas" | "produtos" | "setor" | "estoque_loja" | "usuarios" | "pedidos" | "itens_pedido"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      lojas: {
        payload: Prisma.$lojasPayload<ExtArgs>
        fields: Prisma.lojasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.lojasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lojasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.lojasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lojasPayload>
          }
          findFirst: {
            args: Prisma.lojasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lojasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.lojasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lojasPayload>
          }
          findMany: {
            args: Prisma.lojasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lojasPayload>[]
          }
          create: {
            args: Prisma.lojasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lojasPayload>
          }
          createMany: {
            args: Prisma.lojasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.lojasCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lojasPayload>[]
          }
          delete: {
            args: Prisma.lojasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lojasPayload>
          }
          update: {
            args: Prisma.lojasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lojasPayload>
          }
          deleteMany: {
            args: Prisma.lojasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.lojasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.lojasUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lojasPayload>[]
          }
          upsert: {
            args: Prisma.lojasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lojasPayload>
          }
          aggregate: {
            args: Prisma.LojasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLojas>
          }
          groupBy: {
            args: Prisma.lojasGroupByArgs<ExtArgs>
            result: $Utils.Optional<LojasGroupByOutputType>[]
          }
          count: {
            args: Prisma.lojasCountArgs<ExtArgs>
            result: $Utils.Optional<LojasCountAggregateOutputType> | number
          }
        }
      }
      produtos: {
        payload: Prisma.$produtosPayload<ExtArgs>
        fields: Prisma.produtosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.produtosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.produtosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>
          }
          findFirst: {
            args: Prisma.produtosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.produtosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>
          }
          findMany: {
            args: Prisma.produtosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>[]
          }
          create: {
            args: Prisma.produtosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>
          }
          createMany: {
            args: Prisma.produtosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.produtosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>[]
          }
          delete: {
            args: Prisma.produtosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>
          }
          update: {
            args: Prisma.produtosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>
          }
          deleteMany: {
            args: Prisma.produtosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.produtosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.produtosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>[]
          }
          upsert: {
            args: Prisma.produtosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>
          }
          aggregate: {
            args: Prisma.ProdutosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProdutos>
          }
          groupBy: {
            args: Prisma.produtosGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProdutosGroupByOutputType>[]
          }
          count: {
            args: Prisma.produtosCountArgs<ExtArgs>
            result: $Utils.Optional<ProdutosCountAggregateOutputType> | number
          }
        }
      }
      setor: {
        payload: Prisma.$setorPayload<ExtArgs>
        fields: Prisma.setorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.setorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$setorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.setorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$setorPayload>
          }
          findFirst: {
            args: Prisma.setorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$setorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.setorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$setorPayload>
          }
          findMany: {
            args: Prisma.setorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$setorPayload>[]
          }
          create: {
            args: Prisma.setorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$setorPayload>
          }
          createMany: {
            args: Prisma.setorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.setorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$setorPayload>[]
          }
          delete: {
            args: Prisma.setorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$setorPayload>
          }
          update: {
            args: Prisma.setorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$setorPayload>
          }
          deleteMany: {
            args: Prisma.setorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.setorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.setorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$setorPayload>[]
          }
          upsert: {
            args: Prisma.setorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$setorPayload>
          }
          aggregate: {
            args: Prisma.SetorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSetor>
          }
          groupBy: {
            args: Prisma.setorGroupByArgs<ExtArgs>
            result: $Utils.Optional<SetorGroupByOutputType>[]
          }
          count: {
            args: Prisma.setorCountArgs<ExtArgs>
            result: $Utils.Optional<SetorCountAggregateOutputType> | number
          }
        }
      }
      estoque_loja: {
        payload: Prisma.$estoque_lojaPayload<ExtArgs>
        fields: Prisma.estoque_lojaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.estoque_lojaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$estoque_lojaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.estoque_lojaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$estoque_lojaPayload>
          }
          findFirst: {
            args: Prisma.estoque_lojaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$estoque_lojaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.estoque_lojaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$estoque_lojaPayload>
          }
          findMany: {
            args: Prisma.estoque_lojaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$estoque_lojaPayload>[]
          }
          create: {
            args: Prisma.estoque_lojaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$estoque_lojaPayload>
          }
          createMany: {
            args: Prisma.estoque_lojaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.estoque_lojaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$estoque_lojaPayload>[]
          }
          delete: {
            args: Prisma.estoque_lojaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$estoque_lojaPayload>
          }
          update: {
            args: Prisma.estoque_lojaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$estoque_lojaPayload>
          }
          deleteMany: {
            args: Prisma.estoque_lojaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.estoque_lojaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.estoque_lojaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$estoque_lojaPayload>[]
          }
          upsert: {
            args: Prisma.estoque_lojaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$estoque_lojaPayload>
          }
          aggregate: {
            args: Prisma.Estoque_lojaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEstoque_loja>
          }
          groupBy: {
            args: Prisma.estoque_lojaGroupByArgs<ExtArgs>
            result: $Utils.Optional<Estoque_lojaGroupByOutputType>[]
          }
          count: {
            args: Prisma.estoque_lojaCountArgs<ExtArgs>
            result: $Utils.Optional<Estoque_lojaCountAggregateOutputType> | number
          }
        }
      }
      usuarios: {
        payload: Prisma.$usuariosPayload<ExtArgs>
        fields: Prisma.usuariosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usuariosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usuariosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          findFirst: {
            args: Prisma.usuariosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usuariosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          findMany: {
            args: Prisma.usuariosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>[]
          }
          create: {
            args: Prisma.usuariosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          createMany: {
            args: Prisma.usuariosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usuariosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>[]
          }
          delete: {
            args: Prisma.usuariosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          update: {
            args: Prisma.usuariosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          deleteMany: {
            args: Prisma.usuariosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usuariosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usuariosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>[]
          }
          upsert: {
            args: Prisma.usuariosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          aggregate: {
            args: Prisma.UsuariosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuarios>
          }
          groupBy: {
            args: Prisma.usuariosGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuariosGroupByOutputType>[]
          }
          count: {
            args: Prisma.usuariosCountArgs<ExtArgs>
            result: $Utils.Optional<UsuariosCountAggregateOutputType> | number
          }
        }
      }
      pedidos: {
        payload: Prisma.$pedidosPayload<ExtArgs>
        fields: Prisma.pedidosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pedidosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pedidosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          findFirst: {
            args: Prisma.pedidosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pedidosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          findMany: {
            args: Prisma.pedidosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>[]
          }
          create: {
            args: Prisma.pedidosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          createMany: {
            args: Prisma.pedidosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.pedidosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>[]
          }
          delete: {
            args: Prisma.pedidosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          update: {
            args: Prisma.pedidosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          deleteMany: {
            args: Prisma.pedidosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.pedidosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.pedidosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>[]
          }
          upsert: {
            args: Prisma.pedidosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pedidosPayload>
          }
          aggregate: {
            args: Prisma.PedidosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedidos>
          }
          groupBy: {
            args: Prisma.pedidosGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidosGroupByOutputType>[]
          }
          count: {
            args: Prisma.pedidosCountArgs<ExtArgs>
            result: $Utils.Optional<PedidosCountAggregateOutputType> | number
          }
        }
      }
      itens_pedido: {
        payload: Prisma.$itens_pedidoPayload<ExtArgs>
        fields: Prisma.itens_pedidoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.itens_pedidoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itens_pedidoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.itens_pedidoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itens_pedidoPayload>
          }
          findFirst: {
            args: Prisma.itens_pedidoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itens_pedidoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.itens_pedidoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itens_pedidoPayload>
          }
          findMany: {
            args: Prisma.itens_pedidoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itens_pedidoPayload>[]
          }
          create: {
            args: Prisma.itens_pedidoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itens_pedidoPayload>
          }
          createMany: {
            args: Prisma.itens_pedidoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.itens_pedidoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itens_pedidoPayload>[]
          }
          delete: {
            args: Prisma.itens_pedidoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itens_pedidoPayload>
          }
          update: {
            args: Prisma.itens_pedidoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itens_pedidoPayload>
          }
          deleteMany: {
            args: Prisma.itens_pedidoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.itens_pedidoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.itens_pedidoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itens_pedidoPayload>[]
          }
          upsert: {
            args: Prisma.itens_pedidoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itens_pedidoPayload>
          }
          aggregate: {
            args: Prisma.Itens_pedidoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItens_pedido>
          }
          groupBy: {
            args: Prisma.itens_pedidoGroupByArgs<ExtArgs>
            result: $Utils.Optional<Itens_pedidoGroupByOutputType>[]
          }
          count: {
            args: Prisma.itens_pedidoCountArgs<ExtArgs>
            result: $Utils.Optional<Itens_pedidoCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    lojas?: lojasOmit
    produtos?: produtosOmit
    setor?: setorOmit
    estoque_loja?: estoque_lojaOmit
    usuarios?: usuariosOmit
    pedidos?: pedidosOmit
    itens_pedido?: itens_pedidoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type LojasCountOutputType
   */

  export type LojasCountOutputType = {
    estoque_por_loja: number
    pedidos: number
  }

  export type LojasCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    estoque_por_loja?: boolean | LojasCountOutputTypeCountEstoque_por_lojaArgs
    pedidos?: boolean | LojasCountOutputTypeCountPedidosArgs
  }

  // Custom InputTypes
  /**
   * LojasCountOutputType without action
   */
  export type LojasCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LojasCountOutputType
     */
    select?: LojasCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LojasCountOutputType without action
   */
  export type LojasCountOutputTypeCountEstoque_por_lojaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: estoque_lojaWhereInput
  }

  /**
   * LojasCountOutputType without action
   */
  export type LojasCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pedidosWhereInput
  }


  /**
   * Count Type ProdutosCountOutputType
   */

  export type ProdutosCountOutputType = {
    estoque_por_loja: number
    itens_pedido: number
  }

  export type ProdutosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    estoque_por_loja?: boolean | ProdutosCountOutputTypeCountEstoque_por_lojaArgs
    itens_pedido?: boolean | ProdutosCountOutputTypeCountItens_pedidoArgs
  }

  // Custom InputTypes
  /**
   * ProdutosCountOutputType without action
   */
  export type ProdutosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProdutosCountOutputType
     */
    select?: ProdutosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProdutosCountOutputType without action
   */
  export type ProdutosCountOutputTypeCountEstoque_por_lojaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: estoque_lojaWhereInput
  }

  /**
   * ProdutosCountOutputType without action
   */
  export type ProdutosCountOutputTypeCountItens_pedidoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: itens_pedidoWhereInput
  }


  /**
   * Count Type PedidosCountOutputType
   */

  export type PedidosCountOutputType = {
    itens: number
  }

  export type PedidosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itens?: boolean | PedidosCountOutputTypeCountItensArgs
  }

  // Custom InputTypes
  /**
   * PedidosCountOutputType without action
   */
  export type PedidosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidosCountOutputType
     */
    select?: PedidosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PedidosCountOutputType without action
   */
  export type PedidosCountOutputTypeCountItensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: itens_pedidoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model lojas
   */

  export type AggregateLojas = {
    _count: LojasCountAggregateOutputType | null
    _avg: LojasAvgAggregateOutputType | null
    _sum: LojasSumAggregateOutputType | null
    _min: LojasMinAggregateOutputType | null
    _max: LojasMaxAggregateOutputType | null
  }

  export type LojasAvgAggregateOutputType = {
    id: number | null
    gerente: number | null
    qtd_total_prod: number | null
  }

  export type LojasSumAggregateOutputType = {
    id: number | null
    gerente: number | null
    qtd_total_prod: number | null
  }

  export type LojasMinAggregateOutputType = {
    id: number | null
    nome: string | null
    endereco: string | null
    gerente: number | null
    qtd_total_prod: number | null
  }

  export type LojasMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    endereco: string | null
    gerente: number | null
    qtd_total_prod: number | null
  }

  export type LojasCountAggregateOutputType = {
    id: number
    nome: number
    endereco: number
    gerente: number
    qtd_total_prod: number
    _all: number
  }


  export type LojasAvgAggregateInputType = {
    id?: true
    gerente?: true
    qtd_total_prod?: true
  }

  export type LojasSumAggregateInputType = {
    id?: true
    gerente?: true
    qtd_total_prod?: true
  }

  export type LojasMinAggregateInputType = {
    id?: true
    nome?: true
    endereco?: true
    gerente?: true
    qtd_total_prod?: true
  }

  export type LojasMaxAggregateInputType = {
    id?: true
    nome?: true
    endereco?: true
    gerente?: true
    qtd_total_prod?: true
  }

  export type LojasCountAggregateInputType = {
    id?: true
    nome?: true
    endereco?: true
    gerente?: true
    qtd_total_prod?: true
    _all?: true
  }

  export type LojasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which lojas to aggregate.
     */
    where?: lojasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lojas to fetch.
     */
    orderBy?: lojasOrderByWithRelationInput | lojasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: lojasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lojas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lojas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned lojas
    **/
    _count?: true | LojasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LojasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LojasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LojasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LojasMaxAggregateInputType
  }

  export type GetLojasAggregateType<T extends LojasAggregateArgs> = {
        [P in keyof T & keyof AggregateLojas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLojas[P]>
      : GetScalarType<T[P], AggregateLojas[P]>
  }




  export type lojasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: lojasWhereInput
    orderBy?: lojasOrderByWithAggregationInput | lojasOrderByWithAggregationInput[]
    by: LojasScalarFieldEnum[] | LojasScalarFieldEnum
    having?: lojasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LojasCountAggregateInputType | true
    _avg?: LojasAvgAggregateInputType
    _sum?: LojasSumAggregateInputType
    _min?: LojasMinAggregateInputType
    _max?: LojasMaxAggregateInputType
  }

  export type LojasGroupByOutputType = {
    id: number
    nome: string | null
    endereco: string | null
    gerente: number | null
    qtd_total_prod: number | null
    _count: LojasCountAggregateOutputType | null
    _avg: LojasAvgAggregateOutputType | null
    _sum: LojasSumAggregateOutputType | null
    _min: LojasMinAggregateOutputType | null
    _max: LojasMaxAggregateOutputType | null
  }

  type GetLojasGroupByPayload<T extends lojasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LojasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LojasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LojasGroupByOutputType[P]>
            : GetScalarType<T[P], LojasGroupByOutputType[P]>
        }
      >
    >


  export type lojasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    endereco?: boolean
    gerente?: boolean
    qtd_total_prod?: boolean
    estoque_por_loja?: boolean | lojas$estoque_por_lojaArgs<ExtArgs>
    pedidos?: boolean | lojas$pedidosArgs<ExtArgs>
    _count?: boolean | LojasCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lojas"]>

  export type lojasSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    endereco?: boolean
    gerente?: boolean
    qtd_total_prod?: boolean
  }, ExtArgs["result"]["lojas"]>

  export type lojasSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    endereco?: boolean
    gerente?: boolean
    qtd_total_prod?: boolean
  }, ExtArgs["result"]["lojas"]>

  export type lojasSelectScalar = {
    id?: boolean
    nome?: boolean
    endereco?: boolean
    gerente?: boolean
    qtd_total_prod?: boolean
  }

  export type lojasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "endereco" | "gerente" | "qtd_total_prod", ExtArgs["result"]["lojas"]>
  export type lojasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    estoque_por_loja?: boolean | lojas$estoque_por_lojaArgs<ExtArgs>
    pedidos?: boolean | lojas$pedidosArgs<ExtArgs>
    _count?: boolean | LojasCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type lojasIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type lojasIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $lojasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "lojas"
    objects: {
      estoque_por_loja: Prisma.$estoque_lojaPayload<ExtArgs>[]
      pedidos: Prisma.$pedidosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string | null
      endereco: string | null
      gerente: number | null
      qtd_total_prod: number | null
    }, ExtArgs["result"]["lojas"]>
    composites: {}
  }

  type lojasGetPayload<S extends boolean | null | undefined | lojasDefaultArgs> = $Result.GetResult<Prisma.$lojasPayload, S>

  type lojasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<lojasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LojasCountAggregateInputType | true
    }

  export interface lojasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['lojas'], meta: { name: 'lojas' } }
    /**
     * Find zero or one Lojas that matches the filter.
     * @param {lojasFindUniqueArgs} args - Arguments to find a Lojas
     * @example
     * // Get one Lojas
     * const lojas = await prisma.lojas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends lojasFindUniqueArgs>(args: SelectSubset<T, lojasFindUniqueArgs<ExtArgs>>): Prisma__lojasClient<$Result.GetResult<Prisma.$lojasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lojas that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {lojasFindUniqueOrThrowArgs} args - Arguments to find a Lojas
     * @example
     * // Get one Lojas
     * const lojas = await prisma.lojas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends lojasFindUniqueOrThrowArgs>(args: SelectSubset<T, lojasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__lojasClient<$Result.GetResult<Prisma.$lojasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lojas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lojasFindFirstArgs} args - Arguments to find a Lojas
     * @example
     * // Get one Lojas
     * const lojas = await prisma.lojas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends lojasFindFirstArgs>(args?: SelectSubset<T, lojasFindFirstArgs<ExtArgs>>): Prisma__lojasClient<$Result.GetResult<Prisma.$lojasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lojas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lojasFindFirstOrThrowArgs} args - Arguments to find a Lojas
     * @example
     * // Get one Lojas
     * const lojas = await prisma.lojas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends lojasFindFirstOrThrowArgs>(args?: SelectSubset<T, lojasFindFirstOrThrowArgs<ExtArgs>>): Prisma__lojasClient<$Result.GetResult<Prisma.$lojasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lojas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lojasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lojas
     * const lojas = await prisma.lojas.findMany()
     * 
     * // Get first 10 Lojas
     * const lojas = await prisma.lojas.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lojasWithIdOnly = await prisma.lojas.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends lojasFindManyArgs>(args?: SelectSubset<T, lojasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$lojasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lojas.
     * @param {lojasCreateArgs} args - Arguments to create a Lojas.
     * @example
     * // Create one Lojas
     * const Lojas = await prisma.lojas.create({
     *   data: {
     *     // ... data to create a Lojas
     *   }
     * })
     * 
     */
    create<T extends lojasCreateArgs>(args: SelectSubset<T, lojasCreateArgs<ExtArgs>>): Prisma__lojasClient<$Result.GetResult<Prisma.$lojasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Lojas.
     * @param {lojasCreateManyArgs} args - Arguments to create many Lojas.
     * @example
     * // Create many Lojas
     * const lojas = await prisma.lojas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends lojasCreateManyArgs>(args?: SelectSubset<T, lojasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lojas and returns the data saved in the database.
     * @param {lojasCreateManyAndReturnArgs} args - Arguments to create many Lojas.
     * @example
     * // Create many Lojas
     * const lojas = await prisma.lojas.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lojas and only return the `id`
     * const lojasWithIdOnly = await prisma.lojas.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends lojasCreateManyAndReturnArgs>(args?: SelectSubset<T, lojasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$lojasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lojas.
     * @param {lojasDeleteArgs} args - Arguments to delete one Lojas.
     * @example
     * // Delete one Lojas
     * const Lojas = await prisma.lojas.delete({
     *   where: {
     *     // ... filter to delete one Lojas
     *   }
     * })
     * 
     */
    delete<T extends lojasDeleteArgs>(args: SelectSubset<T, lojasDeleteArgs<ExtArgs>>): Prisma__lojasClient<$Result.GetResult<Prisma.$lojasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lojas.
     * @param {lojasUpdateArgs} args - Arguments to update one Lojas.
     * @example
     * // Update one Lojas
     * const lojas = await prisma.lojas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends lojasUpdateArgs>(args: SelectSubset<T, lojasUpdateArgs<ExtArgs>>): Prisma__lojasClient<$Result.GetResult<Prisma.$lojasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Lojas.
     * @param {lojasDeleteManyArgs} args - Arguments to filter Lojas to delete.
     * @example
     * // Delete a few Lojas
     * const { count } = await prisma.lojas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends lojasDeleteManyArgs>(args?: SelectSubset<T, lojasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lojas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lojasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lojas
     * const lojas = await prisma.lojas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends lojasUpdateManyArgs>(args: SelectSubset<T, lojasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lojas and returns the data updated in the database.
     * @param {lojasUpdateManyAndReturnArgs} args - Arguments to update many Lojas.
     * @example
     * // Update many Lojas
     * const lojas = await prisma.lojas.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Lojas and only return the `id`
     * const lojasWithIdOnly = await prisma.lojas.updateManyAndReturn({
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
    updateManyAndReturn<T extends lojasUpdateManyAndReturnArgs>(args: SelectSubset<T, lojasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$lojasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lojas.
     * @param {lojasUpsertArgs} args - Arguments to update or create a Lojas.
     * @example
     * // Update or create a Lojas
     * const lojas = await prisma.lojas.upsert({
     *   create: {
     *     // ... data to create a Lojas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lojas we want to update
     *   }
     * })
     */
    upsert<T extends lojasUpsertArgs>(args: SelectSubset<T, lojasUpsertArgs<ExtArgs>>): Prisma__lojasClient<$Result.GetResult<Prisma.$lojasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Lojas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lojasCountArgs} args - Arguments to filter Lojas to count.
     * @example
     * // Count the number of Lojas
     * const count = await prisma.lojas.count({
     *   where: {
     *     // ... the filter for the Lojas we want to count
     *   }
     * })
    **/
    count<T extends lojasCountArgs>(
      args?: Subset<T, lojasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LojasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lojas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LojasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LojasAggregateArgs>(args: Subset<T, LojasAggregateArgs>): Prisma.PrismaPromise<GetLojasAggregateType<T>>

    /**
     * Group by Lojas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lojasGroupByArgs} args - Group by arguments.
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
      T extends lojasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: lojasGroupByArgs['orderBy'] }
        : { orderBy?: lojasGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, lojasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLojasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the lojas model
   */
  readonly fields: lojasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for lojas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__lojasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    estoque_por_loja<T extends lojas$estoque_por_lojaArgs<ExtArgs> = {}>(args?: Subset<T, lojas$estoque_por_lojaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$estoque_lojaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pedidos<T extends lojas$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, lojas$pedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the lojas model
   */
  interface lojasFieldRefs {
    readonly id: FieldRef<"lojas", 'Int'>
    readonly nome: FieldRef<"lojas", 'String'>
    readonly endereco: FieldRef<"lojas", 'String'>
    readonly gerente: FieldRef<"lojas", 'Int'>
    readonly qtd_total_prod: FieldRef<"lojas", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * lojas findUnique
   */
  export type lojasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lojas
     */
    select?: lojasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lojas
     */
    omit?: lojasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lojasInclude<ExtArgs> | null
    /**
     * Filter, which lojas to fetch.
     */
    where: lojasWhereUniqueInput
  }

  /**
   * lojas findUniqueOrThrow
   */
  export type lojasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lojas
     */
    select?: lojasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lojas
     */
    omit?: lojasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lojasInclude<ExtArgs> | null
    /**
     * Filter, which lojas to fetch.
     */
    where: lojasWhereUniqueInput
  }

  /**
   * lojas findFirst
   */
  export type lojasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lojas
     */
    select?: lojasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lojas
     */
    omit?: lojasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lojasInclude<ExtArgs> | null
    /**
     * Filter, which lojas to fetch.
     */
    where?: lojasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lojas to fetch.
     */
    orderBy?: lojasOrderByWithRelationInput | lojasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for lojas.
     */
    cursor?: lojasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lojas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lojas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of lojas.
     */
    distinct?: LojasScalarFieldEnum | LojasScalarFieldEnum[]
  }

  /**
   * lojas findFirstOrThrow
   */
  export type lojasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lojas
     */
    select?: lojasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lojas
     */
    omit?: lojasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lojasInclude<ExtArgs> | null
    /**
     * Filter, which lojas to fetch.
     */
    where?: lojasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lojas to fetch.
     */
    orderBy?: lojasOrderByWithRelationInput | lojasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for lojas.
     */
    cursor?: lojasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lojas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lojas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of lojas.
     */
    distinct?: LojasScalarFieldEnum | LojasScalarFieldEnum[]
  }

  /**
   * lojas findMany
   */
  export type lojasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lojas
     */
    select?: lojasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lojas
     */
    omit?: lojasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lojasInclude<ExtArgs> | null
    /**
     * Filter, which lojas to fetch.
     */
    where?: lojasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lojas to fetch.
     */
    orderBy?: lojasOrderByWithRelationInput | lojasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing lojas.
     */
    cursor?: lojasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lojas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lojas.
     */
    skip?: number
    distinct?: LojasScalarFieldEnum | LojasScalarFieldEnum[]
  }

  /**
   * lojas create
   */
  export type lojasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lojas
     */
    select?: lojasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lojas
     */
    omit?: lojasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lojasInclude<ExtArgs> | null
    /**
     * The data needed to create a lojas.
     */
    data?: XOR<lojasCreateInput, lojasUncheckedCreateInput>
  }

  /**
   * lojas createMany
   */
  export type lojasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many lojas.
     */
    data: lojasCreateManyInput | lojasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * lojas createManyAndReturn
   */
  export type lojasCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lojas
     */
    select?: lojasSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the lojas
     */
    omit?: lojasOmit<ExtArgs> | null
    /**
     * The data used to create many lojas.
     */
    data: lojasCreateManyInput | lojasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * lojas update
   */
  export type lojasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lojas
     */
    select?: lojasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lojas
     */
    omit?: lojasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lojasInclude<ExtArgs> | null
    /**
     * The data needed to update a lojas.
     */
    data: XOR<lojasUpdateInput, lojasUncheckedUpdateInput>
    /**
     * Choose, which lojas to update.
     */
    where: lojasWhereUniqueInput
  }

  /**
   * lojas updateMany
   */
  export type lojasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update lojas.
     */
    data: XOR<lojasUpdateManyMutationInput, lojasUncheckedUpdateManyInput>
    /**
     * Filter which lojas to update
     */
    where?: lojasWhereInput
    /**
     * Limit how many lojas to update.
     */
    limit?: number
  }

  /**
   * lojas updateManyAndReturn
   */
  export type lojasUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lojas
     */
    select?: lojasSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the lojas
     */
    omit?: lojasOmit<ExtArgs> | null
    /**
     * The data used to update lojas.
     */
    data: XOR<lojasUpdateManyMutationInput, lojasUncheckedUpdateManyInput>
    /**
     * Filter which lojas to update
     */
    where?: lojasWhereInput
    /**
     * Limit how many lojas to update.
     */
    limit?: number
  }

  /**
   * lojas upsert
   */
  export type lojasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lojas
     */
    select?: lojasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lojas
     */
    omit?: lojasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lojasInclude<ExtArgs> | null
    /**
     * The filter to search for the lojas to update in case it exists.
     */
    where: lojasWhereUniqueInput
    /**
     * In case the lojas found by the `where` argument doesn't exist, create a new lojas with this data.
     */
    create: XOR<lojasCreateInput, lojasUncheckedCreateInput>
    /**
     * In case the lojas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<lojasUpdateInput, lojasUncheckedUpdateInput>
  }

  /**
   * lojas delete
   */
  export type lojasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lojas
     */
    select?: lojasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lojas
     */
    omit?: lojasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lojasInclude<ExtArgs> | null
    /**
     * Filter which lojas to delete.
     */
    where: lojasWhereUniqueInput
  }

  /**
   * lojas deleteMany
   */
  export type lojasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which lojas to delete
     */
    where?: lojasWhereInput
    /**
     * Limit how many lojas to delete.
     */
    limit?: number
  }

  /**
   * lojas.estoque_por_loja
   */
  export type lojas$estoque_por_lojaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estoque_loja
     */
    select?: estoque_lojaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the estoque_loja
     */
    omit?: estoque_lojaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: estoque_lojaInclude<ExtArgs> | null
    where?: estoque_lojaWhereInput
    orderBy?: estoque_lojaOrderByWithRelationInput | estoque_lojaOrderByWithRelationInput[]
    cursor?: estoque_lojaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Estoque_lojaScalarFieldEnum | Estoque_lojaScalarFieldEnum[]
  }

  /**
   * lojas.pedidos
   */
  export type lojas$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    where?: pedidosWhereInput
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    cursor?: pedidosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * lojas without action
   */
  export type lojasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lojas
     */
    select?: lojasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lojas
     */
    omit?: lojasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lojasInclude<ExtArgs> | null
  }


  /**
   * Model produtos
   */

  export type AggregateProdutos = {
    _count: ProdutosCountAggregateOutputType | null
    _avg: ProdutosAvgAggregateOutputType | null
    _sum: ProdutosSumAggregateOutputType | null
    _min: ProdutosMinAggregateOutputType | null
    _max: ProdutosMaxAggregateOutputType | null
  }

  export type ProdutosAvgAggregateOutputType = {
    id: number | null
    preco_venda: Decimal | null
  }

  export type ProdutosSumAggregateOutputType = {
    id: number | null
    preco_venda: Decimal | null
  }

  export type ProdutosMinAggregateOutputType = {
    id: number | null
    codigo: string | null
    descricao: string | null
    fornecedor: string | null
    preco_venda: Decimal | null
  }

  export type ProdutosMaxAggregateOutputType = {
    id: number | null
    codigo: string | null
    descricao: string | null
    fornecedor: string | null
    preco_venda: Decimal | null
  }

  export type ProdutosCountAggregateOutputType = {
    id: number
    codigo: number
    descricao: number
    fornecedor: number
    preco_venda: number
    _all: number
  }


  export type ProdutosAvgAggregateInputType = {
    id?: true
    preco_venda?: true
  }

  export type ProdutosSumAggregateInputType = {
    id?: true
    preco_venda?: true
  }

  export type ProdutosMinAggregateInputType = {
    id?: true
    codigo?: true
    descricao?: true
    fornecedor?: true
    preco_venda?: true
  }

  export type ProdutosMaxAggregateInputType = {
    id?: true
    codigo?: true
    descricao?: true
    fornecedor?: true
    preco_venda?: true
  }

  export type ProdutosCountAggregateInputType = {
    id?: true
    codigo?: true
    descricao?: true
    fornecedor?: true
    preco_venda?: true
    _all?: true
  }

  export type ProdutosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which produtos to aggregate.
     */
    where?: produtosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of produtos to fetch.
     */
    orderBy?: produtosOrderByWithRelationInput | produtosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: produtosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned produtos
    **/
    _count?: true | ProdutosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProdutosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProdutosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProdutosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProdutosMaxAggregateInputType
  }

  export type GetProdutosAggregateType<T extends ProdutosAggregateArgs> = {
        [P in keyof T & keyof AggregateProdutos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProdutos[P]>
      : GetScalarType<T[P], AggregateProdutos[P]>
  }




  export type produtosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: produtosWhereInput
    orderBy?: produtosOrderByWithAggregationInput | produtosOrderByWithAggregationInput[]
    by: ProdutosScalarFieldEnum[] | ProdutosScalarFieldEnum
    having?: produtosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProdutosCountAggregateInputType | true
    _avg?: ProdutosAvgAggregateInputType
    _sum?: ProdutosSumAggregateInputType
    _min?: ProdutosMinAggregateInputType
    _max?: ProdutosMaxAggregateInputType
  }

  export type ProdutosGroupByOutputType = {
    id: number
    codigo: string
    descricao: string | null
    fornecedor: string | null
    preco_venda: Decimal
    _count: ProdutosCountAggregateOutputType | null
    _avg: ProdutosAvgAggregateOutputType | null
    _sum: ProdutosSumAggregateOutputType | null
    _min: ProdutosMinAggregateOutputType | null
    _max: ProdutosMaxAggregateOutputType | null
  }

  type GetProdutosGroupByPayload<T extends produtosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProdutosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProdutosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProdutosGroupByOutputType[P]>
            : GetScalarType<T[P], ProdutosGroupByOutputType[P]>
        }
      >
    >


  export type produtosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo?: boolean
    descricao?: boolean
    fornecedor?: boolean
    preco_venda?: boolean
    estoque_por_loja?: boolean | produtos$estoque_por_lojaArgs<ExtArgs>
    itens_pedido?: boolean | produtos$itens_pedidoArgs<ExtArgs>
    _count?: boolean | ProdutosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produtos"]>

  export type produtosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo?: boolean
    descricao?: boolean
    fornecedor?: boolean
    preco_venda?: boolean
  }, ExtArgs["result"]["produtos"]>

  export type produtosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo?: boolean
    descricao?: boolean
    fornecedor?: boolean
    preco_venda?: boolean
  }, ExtArgs["result"]["produtos"]>

  export type produtosSelectScalar = {
    id?: boolean
    codigo?: boolean
    descricao?: boolean
    fornecedor?: boolean
    preco_venda?: boolean
  }

  export type produtosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "codigo" | "descricao" | "fornecedor" | "preco_venda", ExtArgs["result"]["produtos"]>
  export type produtosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    estoque_por_loja?: boolean | produtos$estoque_por_lojaArgs<ExtArgs>
    itens_pedido?: boolean | produtos$itens_pedidoArgs<ExtArgs>
    _count?: boolean | ProdutosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type produtosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type produtosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $produtosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "produtos"
    objects: {
      estoque_por_loja: Prisma.$estoque_lojaPayload<ExtArgs>[]
      itens_pedido: Prisma.$itens_pedidoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      codigo: string
      descricao: string | null
      fornecedor: string | null
      preco_venda: Prisma.Decimal
    }, ExtArgs["result"]["produtos"]>
    composites: {}
  }

  type produtosGetPayload<S extends boolean | null | undefined | produtosDefaultArgs> = $Result.GetResult<Prisma.$produtosPayload, S>

  type produtosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<produtosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProdutosCountAggregateInputType | true
    }

  export interface produtosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['produtos'], meta: { name: 'produtos' } }
    /**
     * Find zero or one Produtos that matches the filter.
     * @param {produtosFindUniqueArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends produtosFindUniqueArgs>(args: SelectSubset<T, produtosFindUniqueArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Produtos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {produtosFindUniqueOrThrowArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends produtosFindUniqueOrThrowArgs>(args: SelectSubset<T, produtosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosFindFirstArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends produtosFindFirstArgs>(args?: SelectSubset<T, produtosFindFirstArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produtos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosFindFirstOrThrowArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends produtosFindFirstOrThrowArgs>(args?: SelectSubset<T, produtosFindFirstOrThrowArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Produtos
     * const produtos = await prisma.produtos.findMany()
     * 
     * // Get first 10 Produtos
     * const produtos = await prisma.produtos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const produtosWithIdOnly = await prisma.produtos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends produtosFindManyArgs>(args?: SelectSubset<T, produtosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Produtos.
     * @param {produtosCreateArgs} args - Arguments to create a Produtos.
     * @example
     * // Create one Produtos
     * const Produtos = await prisma.produtos.create({
     *   data: {
     *     // ... data to create a Produtos
     *   }
     * })
     * 
     */
    create<T extends produtosCreateArgs>(args: SelectSubset<T, produtosCreateArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Produtos.
     * @param {produtosCreateManyArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produtos = await prisma.produtos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends produtosCreateManyArgs>(args?: SelectSubset<T, produtosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Produtos and returns the data saved in the database.
     * @param {produtosCreateManyAndReturnArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produtos = await prisma.produtos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Produtos and only return the `id`
     * const produtosWithIdOnly = await prisma.produtos.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends produtosCreateManyAndReturnArgs>(args?: SelectSubset<T, produtosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Produtos.
     * @param {produtosDeleteArgs} args - Arguments to delete one Produtos.
     * @example
     * // Delete one Produtos
     * const Produtos = await prisma.produtos.delete({
     *   where: {
     *     // ... filter to delete one Produtos
     *   }
     * })
     * 
     */
    delete<T extends produtosDeleteArgs>(args: SelectSubset<T, produtosDeleteArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Produtos.
     * @param {produtosUpdateArgs} args - Arguments to update one Produtos.
     * @example
     * // Update one Produtos
     * const produtos = await prisma.produtos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends produtosUpdateArgs>(args: SelectSubset<T, produtosUpdateArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Produtos.
     * @param {produtosDeleteManyArgs} args - Arguments to filter Produtos to delete.
     * @example
     * // Delete a few Produtos
     * const { count } = await prisma.produtos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends produtosDeleteManyArgs>(args?: SelectSubset<T, produtosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Produtos
     * const produtos = await prisma.produtos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends produtosUpdateManyArgs>(args: SelectSubset<T, produtosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos and returns the data updated in the database.
     * @param {produtosUpdateManyAndReturnArgs} args - Arguments to update many Produtos.
     * @example
     * // Update many Produtos
     * const produtos = await prisma.produtos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Produtos and only return the `id`
     * const produtosWithIdOnly = await prisma.produtos.updateManyAndReturn({
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
    updateManyAndReturn<T extends produtosUpdateManyAndReturnArgs>(args: SelectSubset<T, produtosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Produtos.
     * @param {produtosUpsertArgs} args - Arguments to update or create a Produtos.
     * @example
     * // Update or create a Produtos
     * const produtos = await prisma.produtos.upsert({
     *   create: {
     *     // ... data to create a Produtos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Produtos we want to update
     *   }
     * })
     */
    upsert<T extends produtosUpsertArgs>(args: SelectSubset<T, produtosUpsertArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosCountArgs} args - Arguments to filter Produtos to count.
     * @example
     * // Count the number of Produtos
     * const count = await prisma.produtos.count({
     *   where: {
     *     // ... the filter for the Produtos we want to count
     *   }
     * })
    **/
    count<T extends produtosCountArgs>(
      args?: Subset<T, produtosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProdutosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProdutosAggregateArgs>(args: Subset<T, ProdutosAggregateArgs>): Prisma.PrismaPromise<GetProdutosAggregateType<T>>

    /**
     * Group by Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosGroupByArgs} args - Group by arguments.
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
      T extends produtosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: produtosGroupByArgs['orderBy'] }
        : { orderBy?: produtosGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, produtosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProdutosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the produtos model
   */
  readonly fields: produtosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for produtos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__produtosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    estoque_por_loja<T extends produtos$estoque_por_lojaArgs<ExtArgs> = {}>(args?: Subset<T, produtos$estoque_por_lojaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$estoque_lojaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    itens_pedido<T extends produtos$itens_pedidoArgs<ExtArgs> = {}>(args?: Subset<T, produtos$itens_pedidoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$itens_pedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the produtos model
   */
  interface produtosFieldRefs {
    readonly id: FieldRef<"produtos", 'Int'>
    readonly codigo: FieldRef<"produtos", 'String'>
    readonly descricao: FieldRef<"produtos", 'String'>
    readonly fornecedor: FieldRef<"produtos", 'String'>
    readonly preco_venda: FieldRef<"produtos", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * produtos findUnique
   */
  export type produtosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * Filter, which produtos to fetch.
     */
    where: produtosWhereUniqueInput
  }

  /**
   * produtos findUniqueOrThrow
   */
  export type produtosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * Filter, which produtos to fetch.
     */
    where: produtosWhereUniqueInput
  }

  /**
   * produtos findFirst
   */
  export type produtosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * Filter, which produtos to fetch.
     */
    where?: produtosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of produtos to fetch.
     */
    orderBy?: produtosOrderByWithRelationInput | produtosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for produtos.
     */
    cursor?: produtosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of produtos.
     */
    distinct?: ProdutosScalarFieldEnum | ProdutosScalarFieldEnum[]
  }

  /**
   * produtos findFirstOrThrow
   */
  export type produtosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * Filter, which produtos to fetch.
     */
    where?: produtosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of produtos to fetch.
     */
    orderBy?: produtosOrderByWithRelationInput | produtosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for produtos.
     */
    cursor?: produtosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of produtos.
     */
    distinct?: ProdutosScalarFieldEnum | ProdutosScalarFieldEnum[]
  }

  /**
   * produtos findMany
   */
  export type produtosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * Filter, which produtos to fetch.
     */
    where?: produtosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of produtos to fetch.
     */
    orderBy?: produtosOrderByWithRelationInput | produtosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing produtos.
     */
    cursor?: produtosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` produtos.
     */
    skip?: number
    distinct?: ProdutosScalarFieldEnum | ProdutosScalarFieldEnum[]
  }

  /**
   * produtos create
   */
  export type produtosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * The data needed to create a produtos.
     */
    data: XOR<produtosCreateInput, produtosUncheckedCreateInput>
  }

  /**
   * produtos createMany
   */
  export type produtosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many produtos.
     */
    data: produtosCreateManyInput | produtosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * produtos createManyAndReturn
   */
  export type produtosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * The data used to create many produtos.
     */
    data: produtosCreateManyInput | produtosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * produtos update
   */
  export type produtosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * The data needed to update a produtos.
     */
    data: XOR<produtosUpdateInput, produtosUncheckedUpdateInput>
    /**
     * Choose, which produtos to update.
     */
    where: produtosWhereUniqueInput
  }

  /**
   * produtos updateMany
   */
  export type produtosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update produtos.
     */
    data: XOR<produtosUpdateManyMutationInput, produtosUncheckedUpdateManyInput>
    /**
     * Filter which produtos to update
     */
    where?: produtosWhereInput
    /**
     * Limit how many produtos to update.
     */
    limit?: number
  }

  /**
   * produtos updateManyAndReturn
   */
  export type produtosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * The data used to update produtos.
     */
    data: XOR<produtosUpdateManyMutationInput, produtosUncheckedUpdateManyInput>
    /**
     * Filter which produtos to update
     */
    where?: produtosWhereInput
    /**
     * Limit how many produtos to update.
     */
    limit?: number
  }

  /**
   * produtos upsert
   */
  export type produtosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * The filter to search for the produtos to update in case it exists.
     */
    where: produtosWhereUniqueInput
    /**
     * In case the produtos found by the `where` argument doesn't exist, create a new produtos with this data.
     */
    create: XOR<produtosCreateInput, produtosUncheckedCreateInput>
    /**
     * In case the produtos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<produtosUpdateInput, produtosUncheckedUpdateInput>
  }

  /**
   * produtos delete
   */
  export type produtosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * Filter which produtos to delete.
     */
    where: produtosWhereUniqueInput
  }

  /**
   * produtos deleteMany
   */
  export type produtosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which produtos to delete
     */
    where?: produtosWhereInput
    /**
     * Limit how many produtos to delete.
     */
    limit?: number
  }

  /**
   * produtos.estoque_por_loja
   */
  export type produtos$estoque_por_lojaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estoque_loja
     */
    select?: estoque_lojaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the estoque_loja
     */
    omit?: estoque_lojaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: estoque_lojaInclude<ExtArgs> | null
    where?: estoque_lojaWhereInput
    orderBy?: estoque_lojaOrderByWithRelationInput | estoque_lojaOrderByWithRelationInput[]
    cursor?: estoque_lojaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Estoque_lojaScalarFieldEnum | Estoque_lojaScalarFieldEnum[]
  }

  /**
   * produtos.itens_pedido
   */
  export type produtos$itens_pedidoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the itens_pedido
     */
    select?: itens_pedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the itens_pedido
     */
    omit?: itens_pedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itens_pedidoInclude<ExtArgs> | null
    where?: itens_pedidoWhereInput
    orderBy?: itens_pedidoOrderByWithRelationInput | itens_pedidoOrderByWithRelationInput[]
    cursor?: itens_pedidoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Itens_pedidoScalarFieldEnum | Itens_pedidoScalarFieldEnum[]
  }

  /**
   * produtos without action
   */
  export type produtosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
  }


  /**
   * Model setor
   */

  export type AggregateSetor = {
    _count: SetorCountAggregateOutputType | null
    _avg: SetorAvgAggregateOutputType | null
    _sum: SetorSumAggregateOutputType | null
    _min: SetorMinAggregateOutputType | null
    _max: SetorMaxAggregateOutputType | null
  }

  export type SetorAvgAggregateOutputType = {
    id: number | null
  }

  export type SetorSumAggregateOutputType = {
    id: number | null
  }

  export type SetorMinAggregateOutputType = {
    id: number | null
    descricao: string | null
  }

  export type SetorMaxAggregateOutputType = {
    id: number | null
    descricao: string | null
  }

  export type SetorCountAggregateOutputType = {
    id: number
    descricao: number
    _all: number
  }


  export type SetorAvgAggregateInputType = {
    id?: true
  }

  export type SetorSumAggregateInputType = {
    id?: true
  }

  export type SetorMinAggregateInputType = {
    id?: true
    descricao?: true
  }

  export type SetorMaxAggregateInputType = {
    id?: true
    descricao?: true
  }

  export type SetorCountAggregateInputType = {
    id?: true
    descricao?: true
    _all?: true
  }

  export type SetorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which setor to aggregate.
     */
    where?: setorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of setors to fetch.
     */
    orderBy?: setorOrderByWithRelationInput | setorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: setorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` setors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` setors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned setors
    **/
    _count?: true | SetorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SetorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SetorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SetorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SetorMaxAggregateInputType
  }

  export type GetSetorAggregateType<T extends SetorAggregateArgs> = {
        [P in keyof T & keyof AggregateSetor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSetor[P]>
      : GetScalarType<T[P], AggregateSetor[P]>
  }




  export type setorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: setorWhereInput
    orderBy?: setorOrderByWithAggregationInput | setorOrderByWithAggregationInput[]
    by: SetorScalarFieldEnum[] | SetorScalarFieldEnum
    having?: setorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SetorCountAggregateInputType | true
    _avg?: SetorAvgAggregateInputType
    _sum?: SetorSumAggregateInputType
    _min?: SetorMinAggregateInputType
    _max?: SetorMaxAggregateInputType
  }

  export type SetorGroupByOutputType = {
    id: number
    descricao: string | null
    _count: SetorCountAggregateOutputType | null
    _avg: SetorAvgAggregateOutputType | null
    _sum: SetorSumAggregateOutputType | null
    _min: SetorMinAggregateOutputType | null
    _max: SetorMaxAggregateOutputType | null
  }

  type GetSetorGroupByPayload<T extends setorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SetorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SetorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SetorGroupByOutputType[P]>
            : GetScalarType<T[P], SetorGroupByOutputType[P]>
        }
      >
    >


  export type setorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
  }, ExtArgs["result"]["setor"]>

  export type setorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
  }, ExtArgs["result"]["setor"]>

  export type setorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
  }, ExtArgs["result"]["setor"]>

  export type setorSelectScalar = {
    id?: boolean
    descricao?: boolean
  }

  export type setorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "descricao", ExtArgs["result"]["setor"]>

  export type $setorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "setor"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      descricao: string | null
    }, ExtArgs["result"]["setor"]>
    composites: {}
  }

  type setorGetPayload<S extends boolean | null | undefined | setorDefaultArgs> = $Result.GetResult<Prisma.$setorPayload, S>

  type setorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<setorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SetorCountAggregateInputType | true
    }

  export interface setorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['setor'], meta: { name: 'setor' } }
    /**
     * Find zero or one Setor that matches the filter.
     * @param {setorFindUniqueArgs} args - Arguments to find a Setor
     * @example
     * // Get one Setor
     * const setor = await prisma.setor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends setorFindUniqueArgs>(args: SelectSubset<T, setorFindUniqueArgs<ExtArgs>>): Prisma__setorClient<$Result.GetResult<Prisma.$setorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Setor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {setorFindUniqueOrThrowArgs} args - Arguments to find a Setor
     * @example
     * // Get one Setor
     * const setor = await prisma.setor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends setorFindUniqueOrThrowArgs>(args: SelectSubset<T, setorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__setorClient<$Result.GetResult<Prisma.$setorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Setor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {setorFindFirstArgs} args - Arguments to find a Setor
     * @example
     * // Get one Setor
     * const setor = await prisma.setor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends setorFindFirstArgs>(args?: SelectSubset<T, setorFindFirstArgs<ExtArgs>>): Prisma__setorClient<$Result.GetResult<Prisma.$setorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Setor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {setorFindFirstOrThrowArgs} args - Arguments to find a Setor
     * @example
     * // Get one Setor
     * const setor = await prisma.setor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends setorFindFirstOrThrowArgs>(args?: SelectSubset<T, setorFindFirstOrThrowArgs<ExtArgs>>): Prisma__setorClient<$Result.GetResult<Prisma.$setorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Setors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {setorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Setors
     * const setors = await prisma.setor.findMany()
     * 
     * // Get first 10 Setors
     * const setors = await prisma.setor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const setorWithIdOnly = await prisma.setor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends setorFindManyArgs>(args?: SelectSubset<T, setorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$setorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Setor.
     * @param {setorCreateArgs} args - Arguments to create a Setor.
     * @example
     * // Create one Setor
     * const Setor = await prisma.setor.create({
     *   data: {
     *     // ... data to create a Setor
     *   }
     * })
     * 
     */
    create<T extends setorCreateArgs>(args: SelectSubset<T, setorCreateArgs<ExtArgs>>): Prisma__setorClient<$Result.GetResult<Prisma.$setorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Setors.
     * @param {setorCreateManyArgs} args - Arguments to create many Setors.
     * @example
     * // Create many Setors
     * const setor = await prisma.setor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends setorCreateManyArgs>(args?: SelectSubset<T, setorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Setors and returns the data saved in the database.
     * @param {setorCreateManyAndReturnArgs} args - Arguments to create many Setors.
     * @example
     * // Create many Setors
     * const setor = await prisma.setor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Setors and only return the `id`
     * const setorWithIdOnly = await prisma.setor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends setorCreateManyAndReturnArgs>(args?: SelectSubset<T, setorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$setorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Setor.
     * @param {setorDeleteArgs} args - Arguments to delete one Setor.
     * @example
     * // Delete one Setor
     * const Setor = await prisma.setor.delete({
     *   where: {
     *     // ... filter to delete one Setor
     *   }
     * })
     * 
     */
    delete<T extends setorDeleteArgs>(args: SelectSubset<T, setorDeleteArgs<ExtArgs>>): Prisma__setorClient<$Result.GetResult<Prisma.$setorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Setor.
     * @param {setorUpdateArgs} args - Arguments to update one Setor.
     * @example
     * // Update one Setor
     * const setor = await prisma.setor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends setorUpdateArgs>(args: SelectSubset<T, setorUpdateArgs<ExtArgs>>): Prisma__setorClient<$Result.GetResult<Prisma.$setorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Setors.
     * @param {setorDeleteManyArgs} args - Arguments to filter Setors to delete.
     * @example
     * // Delete a few Setors
     * const { count } = await prisma.setor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends setorDeleteManyArgs>(args?: SelectSubset<T, setorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Setors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {setorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Setors
     * const setor = await prisma.setor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends setorUpdateManyArgs>(args: SelectSubset<T, setorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Setors and returns the data updated in the database.
     * @param {setorUpdateManyAndReturnArgs} args - Arguments to update many Setors.
     * @example
     * // Update many Setors
     * const setor = await prisma.setor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Setors and only return the `id`
     * const setorWithIdOnly = await prisma.setor.updateManyAndReturn({
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
    updateManyAndReturn<T extends setorUpdateManyAndReturnArgs>(args: SelectSubset<T, setorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$setorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Setor.
     * @param {setorUpsertArgs} args - Arguments to update or create a Setor.
     * @example
     * // Update or create a Setor
     * const setor = await prisma.setor.upsert({
     *   create: {
     *     // ... data to create a Setor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Setor we want to update
     *   }
     * })
     */
    upsert<T extends setorUpsertArgs>(args: SelectSubset<T, setorUpsertArgs<ExtArgs>>): Prisma__setorClient<$Result.GetResult<Prisma.$setorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Setors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {setorCountArgs} args - Arguments to filter Setors to count.
     * @example
     * // Count the number of Setors
     * const count = await prisma.setor.count({
     *   where: {
     *     // ... the filter for the Setors we want to count
     *   }
     * })
    **/
    count<T extends setorCountArgs>(
      args?: Subset<T, setorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SetorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Setor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SetorAggregateArgs>(args: Subset<T, SetorAggregateArgs>): Prisma.PrismaPromise<GetSetorAggregateType<T>>

    /**
     * Group by Setor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {setorGroupByArgs} args - Group by arguments.
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
      T extends setorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: setorGroupByArgs['orderBy'] }
        : { orderBy?: setorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, setorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSetorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the setor model
   */
  readonly fields: setorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for setor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__setorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the setor model
   */
  interface setorFieldRefs {
    readonly id: FieldRef<"setor", 'Int'>
    readonly descricao: FieldRef<"setor", 'String'>
  }
    

  // Custom InputTypes
  /**
   * setor findUnique
   */
  export type setorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the setor
     */
    select?: setorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the setor
     */
    omit?: setorOmit<ExtArgs> | null
    /**
     * Filter, which setor to fetch.
     */
    where: setorWhereUniqueInput
  }

  /**
   * setor findUniqueOrThrow
   */
  export type setorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the setor
     */
    select?: setorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the setor
     */
    omit?: setorOmit<ExtArgs> | null
    /**
     * Filter, which setor to fetch.
     */
    where: setorWhereUniqueInput
  }

  /**
   * setor findFirst
   */
  export type setorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the setor
     */
    select?: setorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the setor
     */
    omit?: setorOmit<ExtArgs> | null
    /**
     * Filter, which setor to fetch.
     */
    where?: setorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of setors to fetch.
     */
    orderBy?: setorOrderByWithRelationInput | setorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for setors.
     */
    cursor?: setorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` setors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` setors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of setors.
     */
    distinct?: SetorScalarFieldEnum | SetorScalarFieldEnum[]
  }

  /**
   * setor findFirstOrThrow
   */
  export type setorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the setor
     */
    select?: setorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the setor
     */
    omit?: setorOmit<ExtArgs> | null
    /**
     * Filter, which setor to fetch.
     */
    where?: setorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of setors to fetch.
     */
    orderBy?: setorOrderByWithRelationInput | setorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for setors.
     */
    cursor?: setorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` setors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` setors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of setors.
     */
    distinct?: SetorScalarFieldEnum | SetorScalarFieldEnum[]
  }

  /**
   * setor findMany
   */
  export type setorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the setor
     */
    select?: setorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the setor
     */
    omit?: setorOmit<ExtArgs> | null
    /**
     * Filter, which setors to fetch.
     */
    where?: setorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of setors to fetch.
     */
    orderBy?: setorOrderByWithRelationInput | setorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing setors.
     */
    cursor?: setorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` setors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` setors.
     */
    skip?: number
    distinct?: SetorScalarFieldEnum | SetorScalarFieldEnum[]
  }

  /**
   * setor create
   */
  export type setorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the setor
     */
    select?: setorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the setor
     */
    omit?: setorOmit<ExtArgs> | null
    /**
     * The data needed to create a setor.
     */
    data?: XOR<setorCreateInput, setorUncheckedCreateInput>
  }

  /**
   * setor createMany
   */
  export type setorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many setors.
     */
    data: setorCreateManyInput | setorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * setor createManyAndReturn
   */
  export type setorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the setor
     */
    select?: setorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the setor
     */
    omit?: setorOmit<ExtArgs> | null
    /**
     * The data used to create many setors.
     */
    data: setorCreateManyInput | setorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * setor update
   */
  export type setorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the setor
     */
    select?: setorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the setor
     */
    omit?: setorOmit<ExtArgs> | null
    /**
     * The data needed to update a setor.
     */
    data: XOR<setorUpdateInput, setorUncheckedUpdateInput>
    /**
     * Choose, which setor to update.
     */
    where: setorWhereUniqueInput
  }

  /**
   * setor updateMany
   */
  export type setorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update setors.
     */
    data: XOR<setorUpdateManyMutationInput, setorUncheckedUpdateManyInput>
    /**
     * Filter which setors to update
     */
    where?: setorWhereInput
    /**
     * Limit how many setors to update.
     */
    limit?: number
  }

  /**
   * setor updateManyAndReturn
   */
  export type setorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the setor
     */
    select?: setorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the setor
     */
    omit?: setorOmit<ExtArgs> | null
    /**
     * The data used to update setors.
     */
    data: XOR<setorUpdateManyMutationInput, setorUncheckedUpdateManyInput>
    /**
     * Filter which setors to update
     */
    where?: setorWhereInput
    /**
     * Limit how many setors to update.
     */
    limit?: number
  }

  /**
   * setor upsert
   */
  export type setorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the setor
     */
    select?: setorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the setor
     */
    omit?: setorOmit<ExtArgs> | null
    /**
     * The filter to search for the setor to update in case it exists.
     */
    where: setorWhereUniqueInput
    /**
     * In case the setor found by the `where` argument doesn't exist, create a new setor with this data.
     */
    create: XOR<setorCreateInput, setorUncheckedCreateInput>
    /**
     * In case the setor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<setorUpdateInput, setorUncheckedUpdateInput>
  }

  /**
   * setor delete
   */
  export type setorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the setor
     */
    select?: setorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the setor
     */
    omit?: setorOmit<ExtArgs> | null
    /**
     * Filter which setor to delete.
     */
    where: setorWhereUniqueInput
  }

  /**
   * setor deleteMany
   */
  export type setorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which setors to delete
     */
    where?: setorWhereInput
    /**
     * Limit how many setors to delete.
     */
    limit?: number
  }

  /**
   * setor without action
   */
  export type setorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the setor
     */
    select?: setorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the setor
     */
    omit?: setorOmit<ExtArgs> | null
  }


  /**
   * Model estoque_loja
   */

  export type AggregateEstoque_loja = {
    _count: Estoque_lojaCountAggregateOutputType | null
    _avg: Estoque_lojaAvgAggregateOutputType | null
    _sum: Estoque_lojaSumAggregateOutputType | null
    _min: Estoque_lojaMinAggregateOutputType | null
    _max: Estoque_lojaMaxAggregateOutputType | null
  }

  export type Estoque_lojaAvgAggregateOutputType = {
    id: number | null
    produto_id: number | null
    loja_id: number | null
    quantidade_estoque: number | null
    quantidade_mostruario: number | null
    quantidade_disponivel: number | null
  }

  export type Estoque_lojaSumAggregateOutputType = {
    id: number | null
    produto_id: number | null
    loja_id: number | null
    quantidade_estoque: number | null
    quantidade_mostruario: number | null
    quantidade_disponivel: number | null
  }

  export type Estoque_lojaMinAggregateOutputType = {
    id: number | null
    produto_id: number | null
    loja_id: number | null
    quantidade_estoque: number | null
    quantidade_mostruario: number | null
    quantidade_disponivel: number | null
  }

  export type Estoque_lojaMaxAggregateOutputType = {
    id: number | null
    produto_id: number | null
    loja_id: number | null
    quantidade_estoque: number | null
    quantidade_mostruario: number | null
    quantidade_disponivel: number | null
  }

  export type Estoque_lojaCountAggregateOutputType = {
    id: number
    produto_id: number
    loja_id: number
    quantidade_estoque: number
    quantidade_mostruario: number
    quantidade_disponivel: number
    _all: number
  }


  export type Estoque_lojaAvgAggregateInputType = {
    id?: true
    produto_id?: true
    loja_id?: true
    quantidade_estoque?: true
    quantidade_mostruario?: true
    quantidade_disponivel?: true
  }

  export type Estoque_lojaSumAggregateInputType = {
    id?: true
    produto_id?: true
    loja_id?: true
    quantidade_estoque?: true
    quantidade_mostruario?: true
    quantidade_disponivel?: true
  }

  export type Estoque_lojaMinAggregateInputType = {
    id?: true
    produto_id?: true
    loja_id?: true
    quantidade_estoque?: true
    quantidade_mostruario?: true
    quantidade_disponivel?: true
  }

  export type Estoque_lojaMaxAggregateInputType = {
    id?: true
    produto_id?: true
    loja_id?: true
    quantidade_estoque?: true
    quantidade_mostruario?: true
    quantidade_disponivel?: true
  }

  export type Estoque_lojaCountAggregateInputType = {
    id?: true
    produto_id?: true
    loja_id?: true
    quantidade_estoque?: true
    quantidade_mostruario?: true
    quantidade_disponivel?: true
    _all?: true
  }

  export type Estoque_lojaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which estoque_loja to aggregate.
     */
    where?: estoque_lojaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of estoque_lojas to fetch.
     */
    orderBy?: estoque_lojaOrderByWithRelationInput | estoque_lojaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: estoque_lojaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` estoque_lojas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` estoque_lojas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned estoque_lojas
    **/
    _count?: true | Estoque_lojaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Estoque_lojaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Estoque_lojaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Estoque_lojaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Estoque_lojaMaxAggregateInputType
  }

  export type GetEstoque_lojaAggregateType<T extends Estoque_lojaAggregateArgs> = {
        [P in keyof T & keyof AggregateEstoque_loja]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEstoque_loja[P]>
      : GetScalarType<T[P], AggregateEstoque_loja[P]>
  }




  export type estoque_lojaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: estoque_lojaWhereInput
    orderBy?: estoque_lojaOrderByWithAggregationInput | estoque_lojaOrderByWithAggregationInput[]
    by: Estoque_lojaScalarFieldEnum[] | Estoque_lojaScalarFieldEnum
    having?: estoque_lojaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Estoque_lojaCountAggregateInputType | true
    _avg?: Estoque_lojaAvgAggregateInputType
    _sum?: Estoque_lojaSumAggregateInputType
    _min?: Estoque_lojaMinAggregateInputType
    _max?: Estoque_lojaMaxAggregateInputType
  }

  export type Estoque_lojaGroupByOutputType = {
    id: number
    produto_id: number
    loja_id: number
    quantidade_estoque: number
    quantidade_mostruario: number
    quantidade_disponivel: number
    _count: Estoque_lojaCountAggregateOutputType | null
    _avg: Estoque_lojaAvgAggregateOutputType | null
    _sum: Estoque_lojaSumAggregateOutputType | null
    _min: Estoque_lojaMinAggregateOutputType | null
    _max: Estoque_lojaMaxAggregateOutputType | null
  }

  type GetEstoque_lojaGroupByPayload<T extends estoque_lojaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Estoque_lojaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Estoque_lojaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Estoque_lojaGroupByOutputType[P]>
            : GetScalarType<T[P], Estoque_lojaGroupByOutputType[P]>
        }
      >
    >


  export type estoque_lojaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    produto_id?: boolean
    loja_id?: boolean
    quantidade_estoque?: boolean
    quantidade_mostruario?: boolean
    quantidade_disponivel?: boolean
    produto?: boolean | produtosDefaultArgs<ExtArgs>
    loja_ref?: boolean | lojasDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["estoque_loja"]>

  export type estoque_lojaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    produto_id?: boolean
    loja_id?: boolean
    quantidade_estoque?: boolean
    quantidade_mostruario?: boolean
    quantidade_disponivel?: boolean
    produto?: boolean | produtosDefaultArgs<ExtArgs>
    loja_ref?: boolean | lojasDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["estoque_loja"]>

  export type estoque_lojaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    produto_id?: boolean
    loja_id?: boolean
    quantidade_estoque?: boolean
    quantidade_mostruario?: boolean
    quantidade_disponivel?: boolean
    produto?: boolean | produtosDefaultArgs<ExtArgs>
    loja_ref?: boolean | lojasDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["estoque_loja"]>

  export type estoque_lojaSelectScalar = {
    id?: boolean
    produto_id?: boolean
    loja_id?: boolean
    quantidade_estoque?: boolean
    quantidade_mostruario?: boolean
    quantidade_disponivel?: boolean
  }

  export type estoque_lojaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "produto_id" | "loja_id" | "quantidade_estoque" | "quantidade_mostruario" | "quantidade_disponivel", ExtArgs["result"]["estoque_loja"]>
  export type estoque_lojaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | produtosDefaultArgs<ExtArgs>
    loja_ref?: boolean | lojasDefaultArgs<ExtArgs>
  }
  export type estoque_lojaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | produtosDefaultArgs<ExtArgs>
    loja_ref?: boolean | lojasDefaultArgs<ExtArgs>
  }
  export type estoque_lojaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | produtosDefaultArgs<ExtArgs>
    loja_ref?: boolean | lojasDefaultArgs<ExtArgs>
  }

  export type $estoque_lojaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "estoque_loja"
    objects: {
      produto: Prisma.$produtosPayload<ExtArgs>
      loja_ref: Prisma.$lojasPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      produto_id: number
      loja_id: number
      quantidade_estoque: number
      quantidade_mostruario: number
      quantidade_disponivel: number
    }, ExtArgs["result"]["estoque_loja"]>
    composites: {}
  }

  type estoque_lojaGetPayload<S extends boolean | null | undefined | estoque_lojaDefaultArgs> = $Result.GetResult<Prisma.$estoque_lojaPayload, S>

  type estoque_lojaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<estoque_lojaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Estoque_lojaCountAggregateInputType | true
    }

  export interface estoque_lojaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['estoque_loja'], meta: { name: 'estoque_loja' } }
    /**
     * Find zero or one Estoque_loja that matches the filter.
     * @param {estoque_lojaFindUniqueArgs} args - Arguments to find a Estoque_loja
     * @example
     * // Get one Estoque_loja
     * const estoque_loja = await prisma.estoque_loja.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends estoque_lojaFindUniqueArgs>(args: SelectSubset<T, estoque_lojaFindUniqueArgs<ExtArgs>>): Prisma__estoque_lojaClient<$Result.GetResult<Prisma.$estoque_lojaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Estoque_loja that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {estoque_lojaFindUniqueOrThrowArgs} args - Arguments to find a Estoque_loja
     * @example
     * // Get one Estoque_loja
     * const estoque_loja = await prisma.estoque_loja.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends estoque_lojaFindUniqueOrThrowArgs>(args: SelectSubset<T, estoque_lojaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__estoque_lojaClient<$Result.GetResult<Prisma.$estoque_lojaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Estoque_loja that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {estoque_lojaFindFirstArgs} args - Arguments to find a Estoque_loja
     * @example
     * // Get one Estoque_loja
     * const estoque_loja = await prisma.estoque_loja.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends estoque_lojaFindFirstArgs>(args?: SelectSubset<T, estoque_lojaFindFirstArgs<ExtArgs>>): Prisma__estoque_lojaClient<$Result.GetResult<Prisma.$estoque_lojaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Estoque_loja that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {estoque_lojaFindFirstOrThrowArgs} args - Arguments to find a Estoque_loja
     * @example
     * // Get one Estoque_loja
     * const estoque_loja = await prisma.estoque_loja.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends estoque_lojaFindFirstOrThrowArgs>(args?: SelectSubset<T, estoque_lojaFindFirstOrThrowArgs<ExtArgs>>): Prisma__estoque_lojaClient<$Result.GetResult<Prisma.$estoque_lojaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Estoque_lojas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {estoque_lojaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Estoque_lojas
     * const estoque_lojas = await prisma.estoque_loja.findMany()
     * 
     * // Get first 10 Estoque_lojas
     * const estoque_lojas = await prisma.estoque_loja.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const estoque_lojaWithIdOnly = await prisma.estoque_loja.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends estoque_lojaFindManyArgs>(args?: SelectSubset<T, estoque_lojaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$estoque_lojaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Estoque_loja.
     * @param {estoque_lojaCreateArgs} args - Arguments to create a Estoque_loja.
     * @example
     * // Create one Estoque_loja
     * const Estoque_loja = await prisma.estoque_loja.create({
     *   data: {
     *     // ... data to create a Estoque_loja
     *   }
     * })
     * 
     */
    create<T extends estoque_lojaCreateArgs>(args: SelectSubset<T, estoque_lojaCreateArgs<ExtArgs>>): Prisma__estoque_lojaClient<$Result.GetResult<Prisma.$estoque_lojaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Estoque_lojas.
     * @param {estoque_lojaCreateManyArgs} args - Arguments to create many Estoque_lojas.
     * @example
     * // Create many Estoque_lojas
     * const estoque_loja = await prisma.estoque_loja.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends estoque_lojaCreateManyArgs>(args?: SelectSubset<T, estoque_lojaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Estoque_lojas and returns the data saved in the database.
     * @param {estoque_lojaCreateManyAndReturnArgs} args - Arguments to create many Estoque_lojas.
     * @example
     * // Create many Estoque_lojas
     * const estoque_loja = await prisma.estoque_loja.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Estoque_lojas and only return the `id`
     * const estoque_lojaWithIdOnly = await prisma.estoque_loja.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends estoque_lojaCreateManyAndReturnArgs>(args?: SelectSubset<T, estoque_lojaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$estoque_lojaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Estoque_loja.
     * @param {estoque_lojaDeleteArgs} args - Arguments to delete one Estoque_loja.
     * @example
     * // Delete one Estoque_loja
     * const Estoque_loja = await prisma.estoque_loja.delete({
     *   where: {
     *     // ... filter to delete one Estoque_loja
     *   }
     * })
     * 
     */
    delete<T extends estoque_lojaDeleteArgs>(args: SelectSubset<T, estoque_lojaDeleteArgs<ExtArgs>>): Prisma__estoque_lojaClient<$Result.GetResult<Prisma.$estoque_lojaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Estoque_loja.
     * @param {estoque_lojaUpdateArgs} args - Arguments to update one Estoque_loja.
     * @example
     * // Update one Estoque_loja
     * const estoque_loja = await prisma.estoque_loja.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends estoque_lojaUpdateArgs>(args: SelectSubset<T, estoque_lojaUpdateArgs<ExtArgs>>): Prisma__estoque_lojaClient<$Result.GetResult<Prisma.$estoque_lojaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Estoque_lojas.
     * @param {estoque_lojaDeleteManyArgs} args - Arguments to filter Estoque_lojas to delete.
     * @example
     * // Delete a few Estoque_lojas
     * const { count } = await prisma.estoque_loja.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends estoque_lojaDeleteManyArgs>(args?: SelectSubset<T, estoque_lojaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Estoque_lojas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {estoque_lojaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Estoque_lojas
     * const estoque_loja = await prisma.estoque_loja.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends estoque_lojaUpdateManyArgs>(args: SelectSubset<T, estoque_lojaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Estoque_lojas and returns the data updated in the database.
     * @param {estoque_lojaUpdateManyAndReturnArgs} args - Arguments to update many Estoque_lojas.
     * @example
     * // Update many Estoque_lojas
     * const estoque_loja = await prisma.estoque_loja.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Estoque_lojas and only return the `id`
     * const estoque_lojaWithIdOnly = await prisma.estoque_loja.updateManyAndReturn({
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
    updateManyAndReturn<T extends estoque_lojaUpdateManyAndReturnArgs>(args: SelectSubset<T, estoque_lojaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$estoque_lojaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Estoque_loja.
     * @param {estoque_lojaUpsertArgs} args - Arguments to update or create a Estoque_loja.
     * @example
     * // Update or create a Estoque_loja
     * const estoque_loja = await prisma.estoque_loja.upsert({
     *   create: {
     *     // ... data to create a Estoque_loja
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Estoque_loja we want to update
     *   }
     * })
     */
    upsert<T extends estoque_lojaUpsertArgs>(args: SelectSubset<T, estoque_lojaUpsertArgs<ExtArgs>>): Prisma__estoque_lojaClient<$Result.GetResult<Prisma.$estoque_lojaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Estoque_lojas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {estoque_lojaCountArgs} args - Arguments to filter Estoque_lojas to count.
     * @example
     * // Count the number of Estoque_lojas
     * const count = await prisma.estoque_loja.count({
     *   where: {
     *     // ... the filter for the Estoque_lojas we want to count
     *   }
     * })
    **/
    count<T extends estoque_lojaCountArgs>(
      args?: Subset<T, estoque_lojaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Estoque_lojaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Estoque_loja.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Estoque_lojaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Estoque_lojaAggregateArgs>(args: Subset<T, Estoque_lojaAggregateArgs>): Prisma.PrismaPromise<GetEstoque_lojaAggregateType<T>>

    /**
     * Group by Estoque_loja.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {estoque_lojaGroupByArgs} args - Group by arguments.
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
      T extends estoque_lojaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: estoque_lojaGroupByArgs['orderBy'] }
        : { orderBy?: estoque_lojaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, estoque_lojaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEstoque_lojaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the estoque_loja model
   */
  readonly fields: estoque_lojaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for estoque_loja.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__estoque_lojaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produto<T extends produtosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, produtosDefaultArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    loja_ref<T extends lojasDefaultArgs<ExtArgs> = {}>(args?: Subset<T, lojasDefaultArgs<ExtArgs>>): Prisma__lojasClient<$Result.GetResult<Prisma.$lojasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the estoque_loja model
   */
  interface estoque_lojaFieldRefs {
    readonly id: FieldRef<"estoque_loja", 'Int'>
    readonly produto_id: FieldRef<"estoque_loja", 'Int'>
    readonly loja_id: FieldRef<"estoque_loja", 'Int'>
    readonly quantidade_estoque: FieldRef<"estoque_loja", 'Int'>
    readonly quantidade_mostruario: FieldRef<"estoque_loja", 'Int'>
    readonly quantidade_disponivel: FieldRef<"estoque_loja", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * estoque_loja findUnique
   */
  export type estoque_lojaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estoque_loja
     */
    select?: estoque_lojaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the estoque_loja
     */
    omit?: estoque_lojaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: estoque_lojaInclude<ExtArgs> | null
    /**
     * Filter, which estoque_loja to fetch.
     */
    where: estoque_lojaWhereUniqueInput
  }

  /**
   * estoque_loja findUniqueOrThrow
   */
  export type estoque_lojaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estoque_loja
     */
    select?: estoque_lojaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the estoque_loja
     */
    omit?: estoque_lojaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: estoque_lojaInclude<ExtArgs> | null
    /**
     * Filter, which estoque_loja to fetch.
     */
    where: estoque_lojaWhereUniqueInput
  }

  /**
   * estoque_loja findFirst
   */
  export type estoque_lojaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estoque_loja
     */
    select?: estoque_lojaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the estoque_loja
     */
    omit?: estoque_lojaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: estoque_lojaInclude<ExtArgs> | null
    /**
     * Filter, which estoque_loja to fetch.
     */
    where?: estoque_lojaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of estoque_lojas to fetch.
     */
    orderBy?: estoque_lojaOrderByWithRelationInput | estoque_lojaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for estoque_lojas.
     */
    cursor?: estoque_lojaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` estoque_lojas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` estoque_lojas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of estoque_lojas.
     */
    distinct?: Estoque_lojaScalarFieldEnum | Estoque_lojaScalarFieldEnum[]
  }

  /**
   * estoque_loja findFirstOrThrow
   */
  export type estoque_lojaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estoque_loja
     */
    select?: estoque_lojaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the estoque_loja
     */
    omit?: estoque_lojaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: estoque_lojaInclude<ExtArgs> | null
    /**
     * Filter, which estoque_loja to fetch.
     */
    where?: estoque_lojaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of estoque_lojas to fetch.
     */
    orderBy?: estoque_lojaOrderByWithRelationInput | estoque_lojaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for estoque_lojas.
     */
    cursor?: estoque_lojaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` estoque_lojas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` estoque_lojas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of estoque_lojas.
     */
    distinct?: Estoque_lojaScalarFieldEnum | Estoque_lojaScalarFieldEnum[]
  }

  /**
   * estoque_loja findMany
   */
  export type estoque_lojaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estoque_loja
     */
    select?: estoque_lojaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the estoque_loja
     */
    omit?: estoque_lojaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: estoque_lojaInclude<ExtArgs> | null
    /**
     * Filter, which estoque_lojas to fetch.
     */
    where?: estoque_lojaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of estoque_lojas to fetch.
     */
    orderBy?: estoque_lojaOrderByWithRelationInput | estoque_lojaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing estoque_lojas.
     */
    cursor?: estoque_lojaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` estoque_lojas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` estoque_lojas.
     */
    skip?: number
    distinct?: Estoque_lojaScalarFieldEnum | Estoque_lojaScalarFieldEnum[]
  }

  /**
   * estoque_loja create
   */
  export type estoque_lojaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estoque_loja
     */
    select?: estoque_lojaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the estoque_loja
     */
    omit?: estoque_lojaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: estoque_lojaInclude<ExtArgs> | null
    /**
     * The data needed to create a estoque_loja.
     */
    data: XOR<estoque_lojaCreateInput, estoque_lojaUncheckedCreateInput>
  }

  /**
   * estoque_loja createMany
   */
  export type estoque_lojaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many estoque_lojas.
     */
    data: estoque_lojaCreateManyInput | estoque_lojaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * estoque_loja createManyAndReturn
   */
  export type estoque_lojaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estoque_loja
     */
    select?: estoque_lojaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the estoque_loja
     */
    omit?: estoque_lojaOmit<ExtArgs> | null
    /**
     * The data used to create many estoque_lojas.
     */
    data: estoque_lojaCreateManyInput | estoque_lojaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: estoque_lojaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * estoque_loja update
   */
  export type estoque_lojaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estoque_loja
     */
    select?: estoque_lojaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the estoque_loja
     */
    omit?: estoque_lojaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: estoque_lojaInclude<ExtArgs> | null
    /**
     * The data needed to update a estoque_loja.
     */
    data: XOR<estoque_lojaUpdateInput, estoque_lojaUncheckedUpdateInput>
    /**
     * Choose, which estoque_loja to update.
     */
    where: estoque_lojaWhereUniqueInput
  }

  /**
   * estoque_loja updateMany
   */
  export type estoque_lojaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update estoque_lojas.
     */
    data: XOR<estoque_lojaUpdateManyMutationInput, estoque_lojaUncheckedUpdateManyInput>
    /**
     * Filter which estoque_lojas to update
     */
    where?: estoque_lojaWhereInput
    /**
     * Limit how many estoque_lojas to update.
     */
    limit?: number
  }

  /**
   * estoque_loja updateManyAndReturn
   */
  export type estoque_lojaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estoque_loja
     */
    select?: estoque_lojaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the estoque_loja
     */
    omit?: estoque_lojaOmit<ExtArgs> | null
    /**
     * The data used to update estoque_lojas.
     */
    data: XOR<estoque_lojaUpdateManyMutationInput, estoque_lojaUncheckedUpdateManyInput>
    /**
     * Filter which estoque_lojas to update
     */
    where?: estoque_lojaWhereInput
    /**
     * Limit how many estoque_lojas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: estoque_lojaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * estoque_loja upsert
   */
  export type estoque_lojaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estoque_loja
     */
    select?: estoque_lojaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the estoque_loja
     */
    omit?: estoque_lojaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: estoque_lojaInclude<ExtArgs> | null
    /**
     * The filter to search for the estoque_loja to update in case it exists.
     */
    where: estoque_lojaWhereUniqueInput
    /**
     * In case the estoque_loja found by the `where` argument doesn't exist, create a new estoque_loja with this data.
     */
    create: XOR<estoque_lojaCreateInput, estoque_lojaUncheckedCreateInput>
    /**
     * In case the estoque_loja was found with the provided `where` argument, update it with this data.
     */
    update: XOR<estoque_lojaUpdateInput, estoque_lojaUncheckedUpdateInput>
  }

  /**
   * estoque_loja delete
   */
  export type estoque_lojaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estoque_loja
     */
    select?: estoque_lojaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the estoque_loja
     */
    omit?: estoque_lojaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: estoque_lojaInclude<ExtArgs> | null
    /**
     * Filter which estoque_loja to delete.
     */
    where: estoque_lojaWhereUniqueInput
  }

  /**
   * estoque_loja deleteMany
   */
  export type estoque_lojaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which estoque_lojas to delete
     */
    where?: estoque_lojaWhereInput
    /**
     * Limit how many estoque_lojas to delete.
     */
    limit?: number
  }

  /**
   * estoque_loja without action
   */
  export type estoque_lojaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the estoque_loja
     */
    select?: estoque_lojaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the estoque_loja
     */
    omit?: estoque_lojaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: estoque_lojaInclude<ExtArgs> | null
  }


  /**
   * Model usuarios
   */

  export type AggregateUsuarios = {
    _count: UsuariosCountAggregateOutputType | null
    _avg: UsuariosAvgAggregateOutputType | null
    _sum: UsuariosSumAggregateOutputType | null
    _min: UsuariosMinAggregateOutputType | null
    _max: UsuariosMaxAggregateOutputType | null
  }

  export type UsuariosAvgAggregateOutputType = {
    id: number | null
    senha: number | null
    setor: number | null
    loja: number | null
  }

  export type UsuariosSumAggregateOutputType = {
    id: number | null
    senha: number | null
    setor: number | null
    loja: number | null
  }

  export type UsuariosMinAggregateOutputType = {
    id: number | null
    nome: string | null
    login: string | null
    senha: number | null
    setor: number | null
    loja: number | null
    inativo: boolean | null
    email: string | null
    id_vendedor_tiny: string | null
  }

  export type UsuariosMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    login: string | null
    senha: number | null
    setor: number | null
    loja: number | null
    inativo: boolean | null
    email: string | null
    id_vendedor_tiny: string | null
  }

  export type UsuariosCountAggregateOutputType = {
    id: number
    nome: number
    login: number
    senha: number
    setor: number
    loja: number
    inativo: number
    email: number
    id_vendedor_tiny: number
    _all: number
  }


  export type UsuariosAvgAggregateInputType = {
    id?: true
    senha?: true
    setor?: true
    loja?: true
  }

  export type UsuariosSumAggregateInputType = {
    id?: true
    senha?: true
    setor?: true
    loja?: true
  }

  export type UsuariosMinAggregateInputType = {
    id?: true
    nome?: true
    login?: true
    senha?: true
    setor?: true
    loja?: true
    inativo?: true
    email?: true
    id_vendedor_tiny?: true
  }

  export type UsuariosMaxAggregateInputType = {
    id?: true
    nome?: true
    login?: true
    senha?: true
    setor?: true
    loja?: true
    inativo?: true
    email?: true
    id_vendedor_tiny?: true
  }

  export type UsuariosCountAggregateInputType = {
    id?: true
    nome?: true
    login?: true
    senha?: true
    setor?: true
    loja?: true
    inativo?: true
    email?: true
    id_vendedor_tiny?: true
    _all?: true
  }

  export type UsuariosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to aggregate.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned usuarios
    **/
    _count?: true | UsuariosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuariosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuariosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuariosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuariosMaxAggregateInputType
  }

  export type GetUsuariosAggregateType<T extends UsuariosAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuarios]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuarios[P]>
      : GetScalarType<T[P], AggregateUsuarios[P]>
  }




  export type usuariosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usuariosWhereInput
    orderBy?: usuariosOrderByWithAggregationInput | usuariosOrderByWithAggregationInput[]
    by: UsuariosScalarFieldEnum[] | UsuariosScalarFieldEnum
    having?: usuariosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuariosCountAggregateInputType | true
    _avg?: UsuariosAvgAggregateInputType
    _sum?: UsuariosSumAggregateInputType
    _min?: UsuariosMinAggregateInputType
    _max?: UsuariosMaxAggregateInputType
  }

  export type UsuariosGroupByOutputType = {
    id: number
    nome: string | null
    login: string | null
    senha: number | null
    setor: number | null
    loja: number | null
    inativo: boolean | null
    email: string | null
    id_vendedor_tiny: string | null
    _count: UsuariosCountAggregateOutputType | null
    _avg: UsuariosAvgAggregateOutputType | null
    _sum: UsuariosSumAggregateOutputType | null
    _min: UsuariosMinAggregateOutputType | null
    _max: UsuariosMaxAggregateOutputType | null
  }

  type GetUsuariosGroupByPayload<T extends usuariosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuariosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuariosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuariosGroupByOutputType[P]>
            : GetScalarType<T[P], UsuariosGroupByOutputType[P]>
        }
      >
    >


  export type usuariosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    login?: boolean
    senha?: boolean
    setor?: boolean
    loja?: boolean
    inativo?: boolean
    email?: boolean
    id_vendedor_tiny?: boolean
  }, ExtArgs["result"]["usuarios"]>

  export type usuariosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    login?: boolean
    senha?: boolean
    setor?: boolean
    loja?: boolean
    inativo?: boolean
    email?: boolean
    id_vendedor_tiny?: boolean
  }, ExtArgs["result"]["usuarios"]>

  export type usuariosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    login?: boolean
    senha?: boolean
    setor?: boolean
    loja?: boolean
    inativo?: boolean
    email?: boolean
    id_vendedor_tiny?: boolean
  }, ExtArgs["result"]["usuarios"]>

  export type usuariosSelectScalar = {
    id?: boolean
    nome?: boolean
    login?: boolean
    senha?: boolean
    setor?: boolean
    loja?: boolean
    inativo?: boolean
    email?: boolean
    id_vendedor_tiny?: boolean
  }

  export type usuariosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "login" | "senha" | "setor" | "loja" | "inativo" | "email" | "id_vendedor_tiny", ExtArgs["result"]["usuarios"]>

  export type $usuariosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "usuarios"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string | null
      login: string | null
      senha: number | null
      setor: number | null
      loja: number | null
      inativo: boolean | null
      email: string | null
      id_vendedor_tiny: string | null
    }, ExtArgs["result"]["usuarios"]>
    composites: {}
  }

  type usuariosGetPayload<S extends boolean | null | undefined | usuariosDefaultArgs> = $Result.GetResult<Prisma.$usuariosPayload, S>

  type usuariosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usuariosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuariosCountAggregateInputType | true
    }

  export interface usuariosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['usuarios'], meta: { name: 'usuarios' } }
    /**
     * Find zero or one Usuarios that matches the filter.
     * @param {usuariosFindUniqueArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usuariosFindUniqueArgs>(args: SelectSubset<T, usuariosFindUniqueArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuarios that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usuariosFindUniqueOrThrowArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usuariosFindUniqueOrThrowArgs>(args: SelectSubset<T, usuariosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindFirstArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usuariosFindFirstArgs>(args?: SelectSubset<T, usuariosFindFirstArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuarios that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindFirstOrThrowArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usuariosFindFirstOrThrowArgs>(args?: SelectSubset<T, usuariosFindFirstOrThrowArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuarios.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuarios.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuariosWithIdOnly = await prisma.usuarios.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usuariosFindManyArgs>(args?: SelectSubset<T, usuariosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuarios.
     * @param {usuariosCreateArgs} args - Arguments to create a Usuarios.
     * @example
     * // Create one Usuarios
     * const Usuarios = await prisma.usuarios.create({
     *   data: {
     *     // ... data to create a Usuarios
     *   }
     * })
     * 
     */
    create<T extends usuariosCreateArgs>(args: SelectSubset<T, usuariosCreateArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {usuariosCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuarios = await prisma.usuarios.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usuariosCreateManyArgs>(args?: SelectSubset<T, usuariosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {usuariosCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuarios = await prisma.usuarios.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuariosWithIdOnly = await prisma.usuarios.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usuariosCreateManyAndReturnArgs>(args?: SelectSubset<T, usuariosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuarios.
     * @param {usuariosDeleteArgs} args - Arguments to delete one Usuarios.
     * @example
     * // Delete one Usuarios
     * const Usuarios = await prisma.usuarios.delete({
     *   where: {
     *     // ... filter to delete one Usuarios
     *   }
     * })
     * 
     */
    delete<T extends usuariosDeleteArgs>(args: SelectSubset<T, usuariosDeleteArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuarios.
     * @param {usuariosUpdateArgs} args - Arguments to update one Usuarios.
     * @example
     * // Update one Usuarios
     * const usuarios = await prisma.usuarios.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usuariosUpdateArgs>(args: SelectSubset<T, usuariosUpdateArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {usuariosDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuarios.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usuariosDeleteManyArgs>(args?: SelectSubset<T, usuariosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuarios = await prisma.usuarios.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usuariosUpdateManyArgs>(args: SelectSubset<T, usuariosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {usuariosUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuarios = await prisma.usuarios.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuariosWithIdOnly = await prisma.usuarios.updateManyAndReturn({
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
    updateManyAndReturn<T extends usuariosUpdateManyAndReturnArgs>(args: SelectSubset<T, usuariosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuarios.
     * @param {usuariosUpsertArgs} args - Arguments to update or create a Usuarios.
     * @example
     * // Update or create a Usuarios
     * const usuarios = await prisma.usuarios.upsert({
     *   create: {
     *     // ... data to create a Usuarios
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuarios we want to update
     *   }
     * })
     */
    upsert<T extends usuariosUpsertArgs>(args: SelectSubset<T, usuariosUpsertArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuarios.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends usuariosCountArgs>(
      args?: Subset<T, usuariosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuariosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsuariosAggregateArgs>(args: Subset<T, UsuariosAggregateArgs>): Prisma.PrismaPromise<GetUsuariosAggregateType<T>>

    /**
     * Group by Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosGroupByArgs} args - Group by arguments.
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
      T extends usuariosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usuariosGroupByArgs['orderBy'] }
        : { orderBy?: usuariosGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, usuariosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuariosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the usuarios model
   */
  readonly fields: usuariosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for usuarios.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usuariosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the usuarios model
   */
  interface usuariosFieldRefs {
    readonly id: FieldRef<"usuarios", 'Int'>
    readonly nome: FieldRef<"usuarios", 'String'>
    readonly login: FieldRef<"usuarios", 'String'>
    readonly senha: FieldRef<"usuarios", 'Int'>
    readonly setor: FieldRef<"usuarios", 'Int'>
    readonly loja: FieldRef<"usuarios", 'Int'>
    readonly inativo: FieldRef<"usuarios", 'Boolean'>
    readonly email: FieldRef<"usuarios", 'String'>
    readonly id_vendedor_tiny: FieldRef<"usuarios", 'String'>
  }
    

  // Custom InputTypes
  /**
   * usuarios findUnique
   */
  export type usuariosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios findUniqueOrThrow
   */
  export type usuariosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios findFirst
   */
  export type usuariosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios.
     */
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios findFirstOrThrow
   */
  export type usuariosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios.
     */
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios findMany
   */
  export type usuariosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios create
   */
  export type usuariosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * The data needed to create a usuarios.
     */
    data?: XOR<usuariosCreateInput, usuariosUncheckedCreateInput>
  }

  /**
   * usuarios createMany
   */
  export type usuariosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many usuarios.
     */
    data: usuariosCreateManyInput | usuariosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * usuarios createManyAndReturn
   */
  export type usuariosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * The data used to create many usuarios.
     */
    data: usuariosCreateManyInput | usuariosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * usuarios update
   */
  export type usuariosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * The data needed to update a usuarios.
     */
    data: XOR<usuariosUpdateInput, usuariosUncheckedUpdateInput>
    /**
     * Choose, which usuarios to update.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios updateMany
   */
  export type usuariosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update usuarios.
     */
    data: XOR<usuariosUpdateManyMutationInput, usuariosUncheckedUpdateManyInput>
    /**
     * Filter which usuarios to update
     */
    where?: usuariosWhereInput
    /**
     * Limit how many usuarios to update.
     */
    limit?: number
  }

  /**
   * usuarios updateManyAndReturn
   */
  export type usuariosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * The data used to update usuarios.
     */
    data: XOR<usuariosUpdateManyMutationInput, usuariosUncheckedUpdateManyInput>
    /**
     * Filter which usuarios to update
     */
    where?: usuariosWhereInput
    /**
     * Limit how many usuarios to update.
     */
    limit?: number
  }

  /**
   * usuarios upsert
   */
  export type usuariosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * The filter to search for the usuarios to update in case it exists.
     */
    where: usuariosWhereUniqueInput
    /**
     * In case the usuarios found by the `where` argument doesn't exist, create a new usuarios with this data.
     */
    create: XOR<usuariosCreateInput, usuariosUncheckedCreateInput>
    /**
     * In case the usuarios was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usuariosUpdateInput, usuariosUncheckedUpdateInput>
  }

  /**
   * usuarios delete
   */
  export type usuariosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Filter which usuarios to delete.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios deleteMany
   */
  export type usuariosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to delete
     */
    where?: usuariosWhereInput
    /**
     * Limit how many usuarios to delete.
     */
    limit?: number
  }

  /**
   * usuarios without action
   */
  export type usuariosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
  }


  /**
   * Model pedidos
   */

  export type AggregatePedidos = {
    _count: PedidosCountAggregateOutputType | null
    _avg: PedidosAvgAggregateOutputType | null
    _sum: PedidosSumAggregateOutputType | null
    _min: PedidosMinAggregateOutputType | null
    _max: PedidosMaxAggregateOutputType | null
  }

  export type PedidosAvgAggregateOutputType = {
    id: number | null
    valor_total: Decimal | null
    loja_id: number | null
  }

  export type PedidosSumAggregateOutputType = {
    id: number | null
    valor_total: Decimal | null
    loja_id: number | null
  }

  export type PedidosMinAggregateOutputType = {
    id: number | null
    codigo_tiny: string | null
    numero: string | null
    data_pedido: Date | null
    data_atualizacao: Date | null
    status: string | null
    cliente_nome: string | null
    valor_total: Decimal | null
    id_vendedor: string | null
    nome_vendedor: string | null
    situacao: string | null
    loja_id: number | null
    sincronizado_em: Date | null
    estoque_baixado: boolean | null
    estoque_baixado_em: Date | null
  }

  export type PedidosMaxAggregateOutputType = {
    id: number | null
    codigo_tiny: string | null
    numero: string | null
    data_pedido: Date | null
    data_atualizacao: Date | null
    status: string | null
    cliente_nome: string | null
    valor_total: Decimal | null
    id_vendedor: string | null
    nome_vendedor: string | null
    situacao: string | null
    loja_id: number | null
    sincronizado_em: Date | null
    estoque_baixado: boolean | null
    estoque_baixado_em: Date | null
  }

  export type PedidosCountAggregateOutputType = {
    id: number
    codigo_tiny: number
    numero: number
    data_pedido: number
    data_atualizacao: number
    status: number
    cliente_nome: number
    valor_total: number
    id_vendedor: number
    nome_vendedor: number
    situacao: number
    loja_id: number
    sincronizado_em: number
    estoque_baixado: number
    estoque_baixado_em: number
    _all: number
  }


  export type PedidosAvgAggregateInputType = {
    id?: true
    valor_total?: true
    loja_id?: true
  }

  export type PedidosSumAggregateInputType = {
    id?: true
    valor_total?: true
    loja_id?: true
  }

  export type PedidosMinAggregateInputType = {
    id?: true
    codigo_tiny?: true
    numero?: true
    data_pedido?: true
    data_atualizacao?: true
    status?: true
    cliente_nome?: true
    valor_total?: true
    id_vendedor?: true
    nome_vendedor?: true
    situacao?: true
    loja_id?: true
    sincronizado_em?: true
    estoque_baixado?: true
    estoque_baixado_em?: true
  }

  export type PedidosMaxAggregateInputType = {
    id?: true
    codigo_tiny?: true
    numero?: true
    data_pedido?: true
    data_atualizacao?: true
    status?: true
    cliente_nome?: true
    valor_total?: true
    id_vendedor?: true
    nome_vendedor?: true
    situacao?: true
    loja_id?: true
    sincronizado_em?: true
    estoque_baixado?: true
    estoque_baixado_em?: true
  }

  export type PedidosCountAggregateInputType = {
    id?: true
    codigo_tiny?: true
    numero?: true
    data_pedido?: true
    data_atualizacao?: true
    status?: true
    cliente_nome?: true
    valor_total?: true
    id_vendedor?: true
    nome_vendedor?: true
    situacao?: true
    loja_id?: true
    sincronizado_em?: true
    estoque_baixado?: true
    estoque_baixado_em?: true
    _all?: true
  }

  export type PedidosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pedidos to aggregate.
     */
    where?: pedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedidos to fetch.
     */
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pedidos
    **/
    _count?: true | PedidosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidosMaxAggregateInputType
  }

  export type GetPedidosAggregateType<T extends PedidosAggregateArgs> = {
        [P in keyof T & keyof AggregatePedidos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedidos[P]>
      : GetScalarType<T[P], AggregatePedidos[P]>
  }




  export type pedidosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pedidosWhereInput
    orderBy?: pedidosOrderByWithAggregationInput | pedidosOrderByWithAggregationInput[]
    by: PedidosScalarFieldEnum[] | PedidosScalarFieldEnum
    having?: pedidosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidosCountAggregateInputType | true
    _avg?: PedidosAvgAggregateInputType
    _sum?: PedidosSumAggregateInputType
    _min?: PedidosMinAggregateInputType
    _max?: PedidosMaxAggregateInputType
  }

  export type PedidosGroupByOutputType = {
    id: number
    codigo_tiny: string | null
    numero: string | null
    data_pedido: Date | null
    data_atualizacao: Date
    status: string | null
    cliente_nome: string | null
    valor_total: Decimal | null
    id_vendedor: string | null
    nome_vendedor: string | null
    situacao: string | null
    loja_id: number | null
    sincronizado_em: Date | null
    estoque_baixado: boolean
    estoque_baixado_em: Date | null
    _count: PedidosCountAggregateOutputType | null
    _avg: PedidosAvgAggregateOutputType | null
    _sum: PedidosSumAggregateOutputType | null
    _min: PedidosMinAggregateOutputType | null
    _max: PedidosMaxAggregateOutputType | null
  }

  type GetPedidosGroupByPayload<T extends pedidosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidosGroupByOutputType[P]>
            : GetScalarType<T[P], PedidosGroupByOutputType[P]>
        }
      >
    >


  export type pedidosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo_tiny?: boolean
    numero?: boolean
    data_pedido?: boolean
    data_atualizacao?: boolean
    status?: boolean
    cliente_nome?: boolean
    valor_total?: boolean
    id_vendedor?: boolean
    nome_vendedor?: boolean
    situacao?: boolean
    loja_id?: boolean
    sincronizado_em?: boolean
    estoque_baixado?: boolean
    estoque_baixado_em?: boolean
    itens?: boolean | pedidos$itensArgs<ExtArgs>
    loja_ref?: boolean | pedidos$loja_refArgs<ExtArgs>
    _count?: boolean | PedidosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidos"]>

  export type pedidosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo_tiny?: boolean
    numero?: boolean
    data_pedido?: boolean
    data_atualizacao?: boolean
    status?: boolean
    cliente_nome?: boolean
    valor_total?: boolean
    id_vendedor?: boolean
    nome_vendedor?: boolean
    situacao?: boolean
    loja_id?: boolean
    sincronizado_em?: boolean
    estoque_baixado?: boolean
    estoque_baixado_em?: boolean
    loja_ref?: boolean | pedidos$loja_refArgs<ExtArgs>
  }, ExtArgs["result"]["pedidos"]>

  export type pedidosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo_tiny?: boolean
    numero?: boolean
    data_pedido?: boolean
    data_atualizacao?: boolean
    status?: boolean
    cliente_nome?: boolean
    valor_total?: boolean
    id_vendedor?: boolean
    nome_vendedor?: boolean
    situacao?: boolean
    loja_id?: boolean
    sincronizado_em?: boolean
    estoque_baixado?: boolean
    estoque_baixado_em?: boolean
    loja_ref?: boolean | pedidos$loja_refArgs<ExtArgs>
  }, ExtArgs["result"]["pedidos"]>

  export type pedidosSelectScalar = {
    id?: boolean
    codigo_tiny?: boolean
    numero?: boolean
    data_pedido?: boolean
    data_atualizacao?: boolean
    status?: boolean
    cliente_nome?: boolean
    valor_total?: boolean
    id_vendedor?: boolean
    nome_vendedor?: boolean
    situacao?: boolean
    loja_id?: boolean
    sincronizado_em?: boolean
    estoque_baixado?: boolean
    estoque_baixado_em?: boolean
  }

  export type pedidosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "codigo_tiny" | "numero" | "data_pedido" | "data_atualizacao" | "status" | "cliente_nome" | "valor_total" | "id_vendedor" | "nome_vendedor" | "situacao" | "loja_id" | "sincronizado_em" | "estoque_baixado" | "estoque_baixado_em", ExtArgs["result"]["pedidos"]>
  export type pedidosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itens?: boolean | pedidos$itensArgs<ExtArgs>
    loja_ref?: boolean | pedidos$loja_refArgs<ExtArgs>
    _count?: boolean | PedidosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type pedidosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loja_ref?: boolean | pedidos$loja_refArgs<ExtArgs>
  }
  export type pedidosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loja_ref?: boolean | pedidos$loja_refArgs<ExtArgs>
  }

  export type $pedidosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pedidos"
    objects: {
      itens: Prisma.$itens_pedidoPayload<ExtArgs>[]
      loja_ref: Prisma.$lojasPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      codigo_tiny: string | null
      numero: string | null
      data_pedido: Date | null
      data_atualizacao: Date
      status: string | null
      cliente_nome: string | null
      valor_total: Prisma.Decimal | null
      id_vendedor: string | null
      nome_vendedor: string | null
      situacao: string | null
      loja_id: number | null
      sincronizado_em: Date | null
      estoque_baixado: boolean
      estoque_baixado_em: Date | null
    }, ExtArgs["result"]["pedidos"]>
    composites: {}
  }

  type pedidosGetPayload<S extends boolean | null | undefined | pedidosDefaultArgs> = $Result.GetResult<Prisma.$pedidosPayload, S>

  type pedidosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<pedidosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PedidosCountAggregateInputType | true
    }

  export interface pedidosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pedidos'], meta: { name: 'pedidos' } }
    /**
     * Find zero or one Pedidos that matches the filter.
     * @param {pedidosFindUniqueArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends pedidosFindUniqueArgs>(args: SelectSubset<T, pedidosFindUniqueArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pedidos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {pedidosFindUniqueOrThrowArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends pedidosFindUniqueOrThrowArgs>(args: SelectSubset<T, pedidosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosFindFirstArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends pedidosFindFirstArgs>(args?: SelectSubset<T, pedidosFindFirstArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedidos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosFindFirstOrThrowArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends pedidosFindFirstOrThrowArgs>(args?: SelectSubset<T, pedidosFindFirstOrThrowArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pedidos
     * const pedidos = await prisma.pedidos.findMany()
     * 
     * // Get first 10 Pedidos
     * const pedidos = await prisma.pedidos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pedidosWithIdOnly = await prisma.pedidos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends pedidosFindManyArgs>(args?: SelectSubset<T, pedidosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pedidos.
     * @param {pedidosCreateArgs} args - Arguments to create a Pedidos.
     * @example
     * // Create one Pedidos
     * const Pedidos = await prisma.pedidos.create({
     *   data: {
     *     // ... data to create a Pedidos
     *   }
     * })
     * 
     */
    create<T extends pedidosCreateArgs>(args: SelectSubset<T, pedidosCreateArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pedidos.
     * @param {pedidosCreateManyArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedidos = await prisma.pedidos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends pedidosCreateManyArgs>(args?: SelectSubset<T, pedidosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pedidos and returns the data saved in the database.
     * @param {pedidosCreateManyAndReturnArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedidos = await prisma.pedidos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pedidos and only return the `id`
     * const pedidosWithIdOnly = await prisma.pedidos.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends pedidosCreateManyAndReturnArgs>(args?: SelectSubset<T, pedidosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pedidos.
     * @param {pedidosDeleteArgs} args - Arguments to delete one Pedidos.
     * @example
     * // Delete one Pedidos
     * const Pedidos = await prisma.pedidos.delete({
     *   where: {
     *     // ... filter to delete one Pedidos
     *   }
     * })
     * 
     */
    delete<T extends pedidosDeleteArgs>(args: SelectSubset<T, pedidosDeleteArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pedidos.
     * @param {pedidosUpdateArgs} args - Arguments to update one Pedidos.
     * @example
     * // Update one Pedidos
     * const pedidos = await prisma.pedidos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends pedidosUpdateArgs>(args: SelectSubset<T, pedidosUpdateArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pedidos.
     * @param {pedidosDeleteManyArgs} args - Arguments to filter Pedidos to delete.
     * @example
     * // Delete a few Pedidos
     * const { count } = await prisma.pedidos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends pedidosDeleteManyArgs>(args?: SelectSubset<T, pedidosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pedidos
     * const pedidos = await prisma.pedidos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends pedidosUpdateManyArgs>(args: SelectSubset<T, pedidosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos and returns the data updated in the database.
     * @param {pedidosUpdateManyAndReturnArgs} args - Arguments to update many Pedidos.
     * @example
     * // Update many Pedidos
     * const pedidos = await prisma.pedidos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pedidos and only return the `id`
     * const pedidosWithIdOnly = await prisma.pedidos.updateManyAndReturn({
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
    updateManyAndReturn<T extends pedidosUpdateManyAndReturnArgs>(args: SelectSubset<T, pedidosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pedidos.
     * @param {pedidosUpsertArgs} args - Arguments to update or create a Pedidos.
     * @example
     * // Update or create a Pedidos
     * const pedidos = await prisma.pedidos.upsert({
     *   create: {
     *     // ... data to create a Pedidos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pedidos we want to update
     *   }
     * })
     */
    upsert<T extends pedidosUpsertArgs>(args: SelectSubset<T, pedidosUpsertArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosCountArgs} args - Arguments to filter Pedidos to count.
     * @example
     * // Count the number of Pedidos
     * const count = await prisma.pedidos.count({
     *   where: {
     *     // ... the filter for the Pedidos we want to count
     *   }
     * })
    **/
    count<T extends pedidosCountArgs>(
      args?: Subset<T, pedidosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PedidosAggregateArgs>(args: Subset<T, PedidosAggregateArgs>): Prisma.PrismaPromise<GetPedidosAggregateType<T>>

    /**
     * Group by Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pedidosGroupByArgs} args - Group by arguments.
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
      T extends pedidosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pedidosGroupByArgs['orderBy'] }
        : { orderBy?: pedidosGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, pedidosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pedidos model
   */
  readonly fields: pedidosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pedidos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pedidosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    itens<T extends pedidos$itensArgs<ExtArgs> = {}>(args?: Subset<T, pedidos$itensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$itens_pedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    loja_ref<T extends pedidos$loja_refArgs<ExtArgs> = {}>(args?: Subset<T, pedidos$loja_refArgs<ExtArgs>>): Prisma__lojasClient<$Result.GetResult<Prisma.$lojasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the pedidos model
   */
  interface pedidosFieldRefs {
    readonly id: FieldRef<"pedidos", 'Int'>
    readonly codigo_tiny: FieldRef<"pedidos", 'String'>
    readonly numero: FieldRef<"pedidos", 'String'>
    readonly data_pedido: FieldRef<"pedidos", 'DateTime'>
    readonly data_atualizacao: FieldRef<"pedidos", 'DateTime'>
    readonly status: FieldRef<"pedidos", 'String'>
    readonly cliente_nome: FieldRef<"pedidos", 'String'>
    readonly valor_total: FieldRef<"pedidos", 'Decimal'>
    readonly id_vendedor: FieldRef<"pedidos", 'String'>
    readonly nome_vendedor: FieldRef<"pedidos", 'String'>
    readonly situacao: FieldRef<"pedidos", 'String'>
    readonly loja_id: FieldRef<"pedidos", 'Int'>
    readonly sincronizado_em: FieldRef<"pedidos", 'DateTime'>
    readonly estoque_baixado: FieldRef<"pedidos", 'Boolean'>
    readonly estoque_baixado_em: FieldRef<"pedidos", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * pedidos findUnique
   */
  export type pedidosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where: pedidosWhereUniqueInput
  }

  /**
   * pedidos findUniqueOrThrow
   */
  export type pedidosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where: pedidosWhereUniqueInput
  }

  /**
   * pedidos findFirst
   */
  export type pedidosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where?: pedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedidos to fetch.
     */
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pedidos.
     */
    cursor?: pedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pedidos.
     */
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * pedidos findFirstOrThrow
   */
  export type pedidosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where?: pedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedidos to fetch.
     */
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pedidos.
     */
    cursor?: pedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pedidos.
     */
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * pedidos findMany
   */
  export type pedidosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter, which pedidos to fetch.
     */
    where?: pedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pedidos to fetch.
     */
    orderBy?: pedidosOrderByWithRelationInput | pedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pedidos.
     */
    cursor?: pedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pedidos.
     */
    skip?: number
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * pedidos create
   */
  export type pedidosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * The data needed to create a pedidos.
     */
    data: XOR<pedidosCreateInput, pedidosUncheckedCreateInput>
  }

  /**
   * pedidos createMany
   */
  export type pedidosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pedidos.
     */
    data: pedidosCreateManyInput | pedidosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pedidos createManyAndReturn
   */
  export type pedidosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * The data used to create many pedidos.
     */
    data: pedidosCreateManyInput | pedidosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * pedidos update
   */
  export type pedidosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * The data needed to update a pedidos.
     */
    data: XOR<pedidosUpdateInput, pedidosUncheckedUpdateInput>
    /**
     * Choose, which pedidos to update.
     */
    where: pedidosWhereUniqueInput
  }

  /**
   * pedidos updateMany
   */
  export type pedidosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pedidos.
     */
    data: XOR<pedidosUpdateManyMutationInput, pedidosUncheckedUpdateManyInput>
    /**
     * Filter which pedidos to update
     */
    where?: pedidosWhereInput
    /**
     * Limit how many pedidos to update.
     */
    limit?: number
  }

  /**
   * pedidos updateManyAndReturn
   */
  export type pedidosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * The data used to update pedidos.
     */
    data: XOR<pedidosUpdateManyMutationInput, pedidosUncheckedUpdateManyInput>
    /**
     * Filter which pedidos to update
     */
    where?: pedidosWhereInput
    /**
     * Limit how many pedidos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * pedidos upsert
   */
  export type pedidosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * The filter to search for the pedidos to update in case it exists.
     */
    where: pedidosWhereUniqueInput
    /**
     * In case the pedidos found by the `where` argument doesn't exist, create a new pedidos with this data.
     */
    create: XOR<pedidosCreateInput, pedidosUncheckedCreateInput>
    /**
     * In case the pedidos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pedidosUpdateInput, pedidosUncheckedUpdateInput>
  }

  /**
   * pedidos delete
   */
  export type pedidosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
    /**
     * Filter which pedidos to delete.
     */
    where: pedidosWhereUniqueInput
  }

  /**
   * pedidos deleteMany
   */
  export type pedidosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pedidos to delete
     */
    where?: pedidosWhereInput
    /**
     * Limit how many pedidos to delete.
     */
    limit?: number
  }

  /**
   * pedidos.itens
   */
  export type pedidos$itensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the itens_pedido
     */
    select?: itens_pedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the itens_pedido
     */
    omit?: itens_pedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itens_pedidoInclude<ExtArgs> | null
    where?: itens_pedidoWhereInput
    orderBy?: itens_pedidoOrderByWithRelationInput | itens_pedidoOrderByWithRelationInput[]
    cursor?: itens_pedidoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Itens_pedidoScalarFieldEnum | Itens_pedidoScalarFieldEnum[]
  }

  /**
   * pedidos.loja_ref
   */
  export type pedidos$loja_refArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lojas
     */
    select?: lojasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lojas
     */
    omit?: lojasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lojasInclude<ExtArgs> | null
    where?: lojasWhereInput
  }

  /**
   * pedidos without action
   */
  export type pedidosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pedidos
     */
    select?: pedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pedidos
     */
    omit?: pedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pedidosInclude<ExtArgs> | null
  }


  /**
   * Model itens_pedido
   */

  export type AggregateItens_pedido = {
    _count: Itens_pedidoCountAggregateOutputType | null
    _avg: Itens_pedidoAvgAggregateOutputType | null
    _sum: Itens_pedidoSumAggregateOutputType | null
    _min: Itens_pedidoMinAggregateOutputType | null
    _max: Itens_pedidoMaxAggregateOutputType | null
  }

  export type Itens_pedidoAvgAggregateOutputType = {
    id: number | null
    pedido_id: number | null
    produto_id: number | null
    quantidade: Decimal | null
    valor_unitario: Decimal | null
    valor_total: Decimal | null
  }

  export type Itens_pedidoSumAggregateOutputType = {
    id: number | null
    pedido_id: number | null
    produto_id: number | null
    quantidade: Decimal | null
    valor_unitario: Decimal | null
    valor_total: Decimal | null
  }

  export type Itens_pedidoMinAggregateOutputType = {
    id: number | null
    pedido_id: number | null
    produto_id: number | null
    codigo_produto_tiny: string | null
    descricao: string | null
    quantidade: Decimal | null
    valor_unitario: Decimal | null
    valor_total: Decimal | null
  }

  export type Itens_pedidoMaxAggregateOutputType = {
    id: number | null
    pedido_id: number | null
    produto_id: number | null
    codigo_produto_tiny: string | null
    descricao: string | null
    quantidade: Decimal | null
    valor_unitario: Decimal | null
    valor_total: Decimal | null
  }

  export type Itens_pedidoCountAggregateOutputType = {
    id: number
    pedido_id: number
    produto_id: number
    codigo_produto_tiny: number
    descricao: number
    quantidade: number
    valor_unitario: number
    valor_total: number
    _all: number
  }


  export type Itens_pedidoAvgAggregateInputType = {
    id?: true
    pedido_id?: true
    produto_id?: true
    quantidade?: true
    valor_unitario?: true
    valor_total?: true
  }

  export type Itens_pedidoSumAggregateInputType = {
    id?: true
    pedido_id?: true
    produto_id?: true
    quantidade?: true
    valor_unitario?: true
    valor_total?: true
  }

  export type Itens_pedidoMinAggregateInputType = {
    id?: true
    pedido_id?: true
    produto_id?: true
    codigo_produto_tiny?: true
    descricao?: true
    quantidade?: true
    valor_unitario?: true
    valor_total?: true
  }

  export type Itens_pedidoMaxAggregateInputType = {
    id?: true
    pedido_id?: true
    produto_id?: true
    codigo_produto_tiny?: true
    descricao?: true
    quantidade?: true
    valor_unitario?: true
    valor_total?: true
  }

  export type Itens_pedidoCountAggregateInputType = {
    id?: true
    pedido_id?: true
    produto_id?: true
    codigo_produto_tiny?: true
    descricao?: true
    quantidade?: true
    valor_unitario?: true
    valor_total?: true
    _all?: true
  }

  export type Itens_pedidoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which itens_pedido to aggregate.
     */
    where?: itens_pedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of itens_pedidos to fetch.
     */
    orderBy?: itens_pedidoOrderByWithRelationInput | itens_pedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: itens_pedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` itens_pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` itens_pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned itens_pedidos
    **/
    _count?: true | Itens_pedidoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Itens_pedidoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Itens_pedidoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Itens_pedidoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Itens_pedidoMaxAggregateInputType
  }

  export type GetItens_pedidoAggregateType<T extends Itens_pedidoAggregateArgs> = {
        [P in keyof T & keyof AggregateItens_pedido]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItens_pedido[P]>
      : GetScalarType<T[P], AggregateItens_pedido[P]>
  }




  export type itens_pedidoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: itens_pedidoWhereInput
    orderBy?: itens_pedidoOrderByWithAggregationInput | itens_pedidoOrderByWithAggregationInput[]
    by: Itens_pedidoScalarFieldEnum[] | Itens_pedidoScalarFieldEnum
    having?: itens_pedidoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Itens_pedidoCountAggregateInputType | true
    _avg?: Itens_pedidoAvgAggregateInputType
    _sum?: Itens_pedidoSumAggregateInputType
    _min?: Itens_pedidoMinAggregateInputType
    _max?: Itens_pedidoMaxAggregateInputType
  }

  export type Itens_pedidoGroupByOutputType = {
    id: number
    pedido_id: number
    produto_id: number | null
    codigo_produto_tiny: string | null
    descricao: string | null
    quantidade: Decimal
    valor_unitario: Decimal
    valor_total: Decimal
    _count: Itens_pedidoCountAggregateOutputType | null
    _avg: Itens_pedidoAvgAggregateOutputType | null
    _sum: Itens_pedidoSumAggregateOutputType | null
    _min: Itens_pedidoMinAggregateOutputType | null
    _max: Itens_pedidoMaxAggregateOutputType | null
  }

  type GetItens_pedidoGroupByPayload<T extends itens_pedidoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Itens_pedidoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Itens_pedidoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Itens_pedidoGroupByOutputType[P]>
            : GetScalarType<T[P], Itens_pedidoGroupByOutputType[P]>
        }
      >
    >


  export type itens_pedidoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pedido_id?: boolean
    produto_id?: boolean
    codigo_produto_tiny?: boolean
    descricao?: boolean
    quantidade?: boolean
    valor_unitario?: boolean
    valor_total?: boolean
    pedido?: boolean | pedidosDefaultArgs<ExtArgs>
    produto?: boolean | itens_pedido$produtoArgs<ExtArgs>
  }, ExtArgs["result"]["itens_pedido"]>

  export type itens_pedidoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pedido_id?: boolean
    produto_id?: boolean
    codigo_produto_tiny?: boolean
    descricao?: boolean
    quantidade?: boolean
    valor_unitario?: boolean
    valor_total?: boolean
    pedido?: boolean | pedidosDefaultArgs<ExtArgs>
    produto?: boolean | itens_pedido$produtoArgs<ExtArgs>
  }, ExtArgs["result"]["itens_pedido"]>

  export type itens_pedidoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pedido_id?: boolean
    produto_id?: boolean
    codigo_produto_tiny?: boolean
    descricao?: boolean
    quantidade?: boolean
    valor_unitario?: boolean
    valor_total?: boolean
    pedido?: boolean | pedidosDefaultArgs<ExtArgs>
    produto?: boolean | itens_pedido$produtoArgs<ExtArgs>
  }, ExtArgs["result"]["itens_pedido"]>

  export type itens_pedidoSelectScalar = {
    id?: boolean
    pedido_id?: boolean
    produto_id?: boolean
    codigo_produto_tiny?: boolean
    descricao?: boolean
    quantidade?: boolean
    valor_unitario?: boolean
    valor_total?: boolean
  }

  export type itens_pedidoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pedido_id" | "produto_id" | "codigo_produto_tiny" | "descricao" | "quantidade" | "valor_unitario" | "valor_total", ExtArgs["result"]["itens_pedido"]>
  export type itens_pedidoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | pedidosDefaultArgs<ExtArgs>
    produto?: boolean | itens_pedido$produtoArgs<ExtArgs>
  }
  export type itens_pedidoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | pedidosDefaultArgs<ExtArgs>
    produto?: boolean | itens_pedido$produtoArgs<ExtArgs>
  }
  export type itens_pedidoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedido?: boolean | pedidosDefaultArgs<ExtArgs>
    produto?: boolean | itens_pedido$produtoArgs<ExtArgs>
  }

  export type $itens_pedidoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "itens_pedido"
    objects: {
      pedido: Prisma.$pedidosPayload<ExtArgs>
      produto: Prisma.$produtosPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      pedido_id: number
      produto_id: number | null
      codigo_produto_tiny: string | null
      descricao: string | null
      quantidade: Prisma.Decimal
      valor_unitario: Prisma.Decimal
      valor_total: Prisma.Decimal
    }, ExtArgs["result"]["itens_pedido"]>
    composites: {}
  }

  type itens_pedidoGetPayload<S extends boolean | null | undefined | itens_pedidoDefaultArgs> = $Result.GetResult<Prisma.$itens_pedidoPayload, S>

  type itens_pedidoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<itens_pedidoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Itens_pedidoCountAggregateInputType | true
    }

  export interface itens_pedidoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['itens_pedido'], meta: { name: 'itens_pedido' } }
    /**
     * Find zero or one Itens_pedido that matches the filter.
     * @param {itens_pedidoFindUniqueArgs} args - Arguments to find a Itens_pedido
     * @example
     * // Get one Itens_pedido
     * const itens_pedido = await prisma.itens_pedido.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends itens_pedidoFindUniqueArgs>(args: SelectSubset<T, itens_pedidoFindUniqueArgs<ExtArgs>>): Prisma__itens_pedidoClient<$Result.GetResult<Prisma.$itens_pedidoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Itens_pedido that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {itens_pedidoFindUniqueOrThrowArgs} args - Arguments to find a Itens_pedido
     * @example
     * // Get one Itens_pedido
     * const itens_pedido = await prisma.itens_pedido.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends itens_pedidoFindUniqueOrThrowArgs>(args: SelectSubset<T, itens_pedidoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__itens_pedidoClient<$Result.GetResult<Prisma.$itens_pedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Itens_pedido that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {itens_pedidoFindFirstArgs} args - Arguments to find a Itens_pedido
     * @example
     * // Get one Itens_pedido
     * const itens_pedido = await prisma.itens_pedido.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends itens_pedidoFindFirstArgs>(args?: SelectSubset<T, itens_pedidoFindFirstArgs<ExtArgs>>): Prisma__itens_pedidoClient<$Result.GetResult<Prisma.$itens_pedidoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Itens_pedido that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {itens_pedidoFindFirstOrThrowArgs} args - Arguments to find a Itens_pedido
     * @example
     * // Get one Itens_pedido
     * const itens_pedido = await prisma.itens_pedido.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends itens_pedidoFindFirstOrThrowArgs>(args?: SelectSubset<T, itens_pedidoFindFirstOrThrowArgs<ExtArgs>>): Prisma__itens_pedidoClient<$Result.GetResult<Prisma.$itens_pedidoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Itens_pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {itens_pedidoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Itens_pedidos
     * const itens_pedidos = await prisma.itens_pedido.findMany()
     * 
     * // Get first 10 Itens_pedidos
     * const itens_pedidos = await prisma.itens_pedido.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itens_pedidoWithIdOnly = await prisma.itens_pedido.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends itens_pedidoFindManyArgs>(args?: SelectSubset<T, itens_pedidoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$itens_pedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Itens_pedido.
     * @param {itens_pedidoCreateArgs} args - Arguments to create a Itens_pedido.
     * @example
     * // Create one Itens_pedido
     * const Itens_pedido = await prisma.itens_pedido.create({
     *   data: {
     *     // ... data to create a Itens_pedido
     *   }
     * })
     * 
     */
    create<T extends itens_pedidoCreateArgs>(args: SelectSubset<T, itens_pedidoCreateArgs<ExtArgs>>): Prisma__itens_pedidoClient<$Result.GetResult<Prisma.$itens_pedidoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Itens_pedidos.
     * @param {itens_pedidoCreateManyArgs} args - Arguments to create many Itens_pedidos.
     * @example
     * // Create many Itens_pedidos
     * const itens_pedido = await prisma.itens_pedido.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends itens_pedidoCreateManyArgs>(args?: SelectSubset<T, itens_pedidoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Itens_pedidos and returns the data saved in the database.
     * @param {itens_pedidoCreateManyAndReturnArgs} args - Arguments to create many Itens_pedidos.
     * @example
     * // Create many Itens_pedidos
     * const itens_pedido = await prisma.itens_pedido.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Itens_pedidos and only return the `id`
     * const itens_pedidoWithIdOnly = await prisma.itens_pedido.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends itens_pedidoCreateManyAndReturnArgs>(args?: SelectSubset<T, itens_pedidoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$itens_pedidoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Itens_pedido.
     * @param {itens_pedidoDeleteArgs} args - Arguments to delete one Itens_pedido.
     * @example
     * // Delete one Itens_pedido
     * const Itens_pedido = await prisma.itens_pedido.delete({
     *   where: {
     *     // ... filter to delete one Itens_pedido
     *   }
     * })
     * 
     */
    delete<T extends itens_pedidoDeleteArgs>(args: SelectSubset<T, itens_pedidoDeleteArgs<ExtArgs>>): Prisma__itens_pedidoClient<$Result.GetResult<Prisma.$itens_pedidoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Itens_pedido.
     * @param {itens_pedidoUpdateArgs} args - Arguments to update one Itens_pedido.
     * @example
     * // Update one Itens_pedido
     * const itens_pedido = await prisma.itens_pedido.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends itens_pedidoUpdateArgs>(args: SelectSubset<T, itens_pedidoUpdateArgs<ExtArgs>>): Prisma__itens_pedidoClient<$Result.GetResult<Prisma.$itens_pedidoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Itens_pedidos.
     * @param {itens_pedidoDeleteManyArgs} args - Arguments to filter Itens_pedidos to delete.
     * @example
     * // Delete a few Itens_pedidos
     * const { count } = await prisma.itens_pedido.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends itens_pedidoDeleteManyArgs>(args?: SelectSubset<T, itens_pedidoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Itens_pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {itens_pedidoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Itens_pedidos
     * const itens_pedido = await prisma.itens_pedido.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends itens_pedidoUpdateManyArgs>(args: SelectSubset<T, itens_pedidoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Itens_pedidos and returns the data updated in the database.
     * @param {itens_pedidoUpdateManyAndReturnArgs} args - Arguments to update many Itens_pedidos.
     * @example
     * // Update many Itens_pedidos
     * const itens_pedido = await prisma.itens_pedido.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Itens_pedidos and only return the `id`
     * const itens_pedidoWithIdOnly = await prisma.itens_pedido.updateManyAndReturn({
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
    updateManyAndReturn<T extends itens_pedidoUpdateManyAndReturnArgs>(args: SelectSubset<T, itens_pedidoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$itens_pedidoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Itens_pedido.
     * @param {itens_pedidoUpsertArgs} args - Arguments to update or create a Itens_pedido.
     * @example
     * // Update or create a Itens_pedido
     * const itens_pedido = await prisma.itens_pedido.upsert({
     *   create: {
     *     // ... data to create a Itens_pedido
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Itens_pedido we want to update
     *   }
     * })
     */
    upsert<T extends itens_pedidoUpsertArgs>(args: SelectSubset<T, itens_pedidoUpsertArgs<ExtArgs>>): Prisma__itens_pedidoClient<$Result.GetResult<Prisma.$itens_pedidoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Itens_pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {itens_pedidoCountArgs} args - Arguments to filter Itens_pedidos to count.
     * @example
     * // Count the number of Itens_pedidos
     * const count = await prisma.itens_pedido.count({
     *   where: {
     *     // ... the filter for the Itens_pedidos we want to count
     *   }
     * })
    **/
    count<T extends itens_pedidoCountArgs>(
      args?: Subset<T, itens_pedidoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Itens_pedidoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Itens_pedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Itens_pedidoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Itens_pedidoAggregateArgs>(args: Subset<T, Itens_pedidoAggregateArgs>): Prisma.PrismaPromise<GetItens_pedidoAggregateType<T>>

    /**
     * Group by Itens_pedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {itens_pedidoGroupByArgs} args - Group by arguments.
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
      T extends itens_pedidoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: itens_pedidoGroupByArgs['orderBy'] }
        : { orderBy?: itens_pedidoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, itens_pedidoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItens_pedidoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the itens_pedido model
   */
  readonly fields: itens_pedidoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for itens_pedido.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__itens_pedidoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedido<T extends pedidosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, pedidosDefaultArgs<ExtArgs>>): Prisma__pedidosClient<$Result.GetResult<Prisma.$pedidosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    produto<T extends itens_pedido$produtoArgs<ExtArgs> = {}>(args?: Subset<T, itens_pedido$produtoArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the itens_pedido model
   */
  interface itens_pedidoFieldRefs {
    readonly id: FieldRef<"itens_pedido", 'Int'>
    readonly pedido_id: FieldRef<"itens_pedido", 'Int'>
    readonly produto_id: FieldRef<"itens_pedido", 'Int'>
    readonly codigo_produto_tiny: FieldRef<"itens_pedido", 'String'>
    readonly descricao: FieldRef<"itens_pedido", 'String'>
    readonly quantidade: FieldRef<"itens_pedido", 'Decimal'>
    readonly valor_unitario: FieldRef<"itens_pedido", 'Decimal'>
    readonly valor_total: FieldRef<"itens_pedido", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * itens_pedido findUnique
   */
  export type itens_pedidoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the itens_pedido
     */
    select?: itens_pedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the itens_pedido
     */
    omit?: itens_pedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itens_pedidoInclude<ExtArgs> | null
    /**
     * Filter, which itens_pedido to fetch.
     */
    where: itens_pedidoWhereUniqueInput
  }

  /**
   * itens_pedido findUniqueOrThrow
   */
  export type itens_pedidoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the itens_pedido
     */
    select?: itens_pedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the itens_pedido
     */
    omit?: itens_pedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itens_pedidoInclude<ExtArgs> | null
    /**
     * Filter, which itens_pedido to fetch.
     */
    where: itens_pedidoWhereUniqueInput
  }

  /**
   * itens_pedido findFirst
   */
  export type itens_pedidoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the itens_pedido
     */
    select?: itens_pedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the itens_pedido
     */
    omit?: itens_pedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itens_pedidoInclude<ExtArgs> | null
    /**
     * Filter, which itens_pedido to fetch.
     */
    where?: itens_pedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of itens_pedidos to fetch.
     */
    orderBy?: itens_pedidoOrderByWithRelationInput | itens_pedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for itens_pedidos.
     */
    cursor?: itens_pedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` itens_pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` itens_pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of itens_pedidos.
     */
    distinct?: Itens_pedidoScalarFieldEnum | Itens_pedidoScalarFieldEnum[]
  }

  /**
   * itens_pedido findFirstOrThrow
   */
  export type itens_pedidoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the itens_pedido
     */
    select?: itens_pedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the itens_pedido
     */
    omit?: itens_pedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itens_pedidoInclude<ExtArgs> | null
    /**
     * Filter, which itens_pedido to fetch.
     */
    where?: itens_pedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of itens_pedidos to fetch.
     */
    orderBy?: itens_pedidoOrderByWithRelationInput | itens_pedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for itens_pedidos.
     */
    cursor?: itens_pedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` itens_pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` itens_pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of itens_pedidos.
     */
    distinct?: Itens_pedidoScalarFieldEnum | Itens_pedidoScalarFieldEnum[]
  }

  /**
   * itens_pedido findMany
   */
  export type itens_pedidoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the itens_pedido
     */
    select?: itens_pedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the itens_pedido
     */
    omit?: itens_pedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itens_pedidoInclude<ExtArgs> | null
    /**
     * Filter, which itens_pedidos to fetch.
     */
    where?: itens_pedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of itens_pedidos to fetch.
     */
    orderBy?: itens_pedidoOrderByWithRelationInput | itens_pedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing itens_pedidos.
     */
    cursor?: itens_pedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` itens_pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` itens_pedidos.
     */
    skip?: number
    distinct?: Itens_pedidoScalarFieldEnum | Itens_pedidoScalarFieldEnum[]
  }

  /**
   * itens_pedido create
   */
  export type itens_pedidoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the itens_pedido
     */
    select?: itens_pedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the itens_pedido
     */
    omit?: itens_pedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itens_pedidoInclude<ExtArgs> | null
    /**
     * The data needed to create a itens_pedido.
     */
    data: XOR<itens_pedidoCreateInput, itens_pedidoUncheckedCreateInput>
  }

  /**
   * itens_pedido createMany
   */
  export type itens_pedidoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many itens_pedidos.
     */
    data: itens_pedidoCreateManyInput | itens_pedidoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * itens_pedido createManyAndReturn
   */
  export type itens_pedidoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the itens_pedido
     */
    select?: itens_pedidoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the itens_pedido
     */
    omit?: itens_pedidoOmit<ExtArgs> | null
    /**
     * The data used to create many itens_pedidos.
     */
    data: itens_pedidoCreateManyInput | itens_pedidoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itens_pedidoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * itens_pedido update
   */
  export type itens_pedidoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the itens_pedido
     */
    select?: itens_pedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the itens_pedido
     */
    omit?: itens_pedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itens_pedidoInclude<ExtArgs> | null
    /**
     * The data needed to update a itens_pedido.
     */
    data: XOR<itens_pedidoUpdateInput, itens_pedidoUncheckedUpdateInput>
    /**
     * Choose, which itens_pedido to update.
     */
    where: itens_pedidoWhereUniqueInput
  }

  /**
   * itens_pedido updateMany
   */
  export type itens_pedidoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update itens_pedidos.
     */
    data: XOR<itens_pedidoUpdateManyMutationInput, itens_pedidoUncheckedUpdateManyInput>
    /**
     * Filter which itens_pedidos to update
     */
    where?: itens_pedidoWhereInput
    /**
     * Limit how many itens_pedidos to update.
     */
    limit?: number
  }

  /**
   * itens_pedido updateManyAndReturn
   */
  export type itens_pedidoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the itens_pedido
     */
    select?: itens_pedidoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the itens_pedido
     */
    omit?: itens_pedidoOmit<ExtArgs> | null
    /**
     * The data used to update itens_pedidos.
     */
    data: XOR<itens_pedidoUpdateManyMutationInput, itens_pedidoUncheckedUpdateManyInput>
    /**
     * Filter which itens_pedidos to update
     */
    where?: itens_pedidoWhereInput
    /**
     * Limit how many itens_pedidos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itens_pedidoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * itens_pedido upsert
   */
  export type itens_pedidoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the itens_pedido
     */
    select?: itens_pedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the itens_pedido
     */
    omit?: itens_pedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itens_pedidoInclude<ExtArgs> | null
    /**
     * The filter to search for the itens_pedido to update in case it exists.
     */
    where: itens_pedidoWhereUniqueInput
    /**
     * In case the itens_pedido found by the `where` argument doesn't exist, create a new itens_pedido with this data.
     */
    create: XOR<itens_pedidoCreateInput, itens_pedidoUncheckedCreateInput>
    /**
     * In case the itens_pedido was found with the provided `where` argument, update it with this data.
     */
    update: XOR<itens_pedidoUpdateInput, itens_pedidoUncheckedUpdateInput>
  }

  /**
   * itens_pedido delete
   */
  export type itens_pedidoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the itens_pedido
     */
    select?: itens_pedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the itens_pedido
     */
    omit?: itens_pedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itens_pedidoInclude<ExtArgs> | null
    /**
     * Filter which itens_pedido to delete.
     */
    where: itens_pedidoWhereUniqueInput
  }

  /**
   * itens_pedido deleteMany
   */
  export type itens_pedidoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which itens_pedidos to delete
     */
    where?: itens_pedidoWhereInput
    /**
     * Limit how many itens_pedidos to delete.
     */
    limit?: number
  }

  /**
   * itens_pedido.produto
   */
  export type itens_pedido$produtoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    where?: produtosWhereInput
  }

  /**
   * itens_pedido without action
   */
  export type itens_pedidoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the itens_pedido
     */
    select?: itens_pedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the itens_pedido
     */
    omit?: itens_pedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itens_pedidoInclude<ExtArgs> | null
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


  export const LojasScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    endereco: 'endereco',
    gerente: 'gerente',
    qtd_total_prod: 'qtd_total_prod'
  };

  export type LojasScalarFieldEnum = (typeof LojasScalarFieldEnum)[keyof typeof LojasScalarFieldEnum]


  export const ProdutosScalarFieldEnum: {
    id: 'id',
    codigo: 'codigo',
    descricao: 'descricao',
    fornecedor: 'fornecedor',
    preco_venda: 'preco_venda'
  };

  export type ProdutosScalarFieldEnum = (typeof ProdutosScalarFieldEnum)[keyof typeof ProdutosScalarFieldEnum]


  export const SetorScalarFieldEnum: {
    id: 'id',
    descricao: 'descricao'
  };

  export type SetorScalarFieldEnum = (typeof SetorScalarFieldEnum)[keyof typeof SetorScalarFieldEnum]


  export const Estoque_lojaScalarFieldEnum: {
    id: 'id',
    produto_id: 'produto_id',
    loja_id: 'loja_id',
    quantidade_estoque: 'quantidade_estoque',
    quantidade_mostruario: 'quantidade_mostruario',
    quantidade_disponivel: 'quantidade_disponivel'
  };

  export type Estoque_lojaScalarFieldEnum = (typeof Estoque_lojaScalarFieldEnum)[keyof typeof Estoque_lojaScalarFieldEnum]


  export const UsuariosScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    login: 'login',
    senha: 'senha',
    setor: 'setor',
    loja: 'loja',
    inativo: 'inativo',
    email: 'email',
    id_vendedor_tiny: 'id_vendedor_tiny'
  };

  export type UsuariosScalarFieldEnum = (typeof UsuariosScalarFieldEnum)[keyof typeof UsuariosScalarFieldEnum]


  export const PedidosScalarFieldEnum: {
    id: 'id',
    codigo_tiny: 'codigo_tiny',
    numero: 'numero',
    data_pedido: 'data_pedido',
    data_atualizacao: 'data_atualizacao',
    status: 'status',
    cliente_nome: 'cliente_nome',
    valor_total: 'valor_total',
    id_vendedor: 'id_vendedor',
    nome_vendedor: 'nome_vendedor',
    situacao: 'situacao',
    loja_id: 'loja_id',
    sincronizado_em: 'sincronizado_em',
    estoque_baixado: 'estoque_baixado',
    estoque_baixado_em: 'estoque_baixado_em'
  };

  export type PedidosScalarFieldEnum = (typeof PedidosScalarFieldEnum)[keyof typeof PedidosScalarFieldEnum]


  export const Itens_pedidoScalarFieldEnum: {
    id: 'id',
    pedido_id: 'pedido_id',
    produto_id: 'produto_id',
    codigo_produto_tiny: 'codigo_produto_tiny',
    descricao: 'descricao',
    quantidade: 'quantidade',
    valor_unitario: 'valor_unitario',
    valor_total: 'valor_total'
  };

  export type Itens_pedidoScalarFieldEnum = (typeof Itens_pedidoScalarFieldEnum)[keyof typeof Itens_pedidoScalarFieldEnum]


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
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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


  export type lojasWhereInput = {
    AND?: lojasWhereInput | lojasWhereInput[]
    OR?: lojasWhereInput[]
    NOT?: lojasWhereInput | lojasWhereInput[]
    id?: IntFilter<"lojas"> | number
    nome?: StringNullableFilter<"lojas"> | string | null
    endereco?: StringNullableFilter<"lojas"> | string | null
    gerente?: IntNullableFilter<"lojas"> | number | null
    qtd_total_prod?: IntNullableFilter<"lojas"> | number | null
    estoque_por_loja?: Estoque_lojaListRelationFilter
    pedidos?: PedidosListRelationFilter
  }

  export type lojasOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrderInput | SortOrder
    endereco?: SortOrderInput | SortOrder
    gerente?: SortOrderInput | SortOrder
    qtd_total_prod?: SortOrderInput | SortOrder
    estoque_por_loja?: estoque_lojaOrderByRelationAggregateInput
    pedidos?: pedidosOrderByRelationAggregateInput
  }

  export type lojasWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: lojasWhereInput | lojasWhereInput[]
    OR?: lojasWhereInput[]
    NOT?: lojasWhereInput | lojasWhereInput[]
    nome?: StringNullableFilter<"lojas"> | string | null
    endereco?: StringNullableFilter<"lojas"> | string | null
    gerente?: IntNullableFilter<"lojas"> | number | null
    qtd_total_prod?: IntNullableFilter<"lojas"> | number | null
    estoque_por_loja?: Estoque_lojaListRelationFilter
    pedidos?: PedidosListRelationFilter
  }, "id">

  export type lojasOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrderInput | SortOrder
    endereco?: SortOrderInput | SortOrder
    gerente?: SortOrderInput | SortOrder
    qtd_total_prod?: SortOrderInput | SortOrder
    _count?: lojasCountOrderByAggregateInput
    _avg?: lojasAvgOrderByAggregateInput
    _max?: lojasMaxOrderByAggregateInput
    _min?: lojasMinOrderByAggregateInput
    _sum?: lojasSumOrderByAggregateInput
  }

  export type lojasScalarWhereWithAggregatesInput = {
    AND?: lojasScalarWhereWithAggregatesInput | lojasScalarWhereWithAggregatesInput[]
    OR?: lojasScalarWhereWithAggregatesInput[]
    NOT?: lojasScalarWhereWithAggregatesInput | lojasScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"lojas"> | number
    nome?: StringNullableWithAggregatesFilter<"lojas"> | string | null
    endereco?: StringNullableWithAggregatesFilter<"lojas"> | string | null
    gerente?: IntNullableWithAggregatesFilter<"lojas"> | number | null
    qtd_total_prod?: IntNullableWithAggregatesFilter<"lojas"> | number | null
  }

  export type produtosWhereInput = {
    AND?: produtosWhereInput | produtosWhereInput[]
    OR?: produtosWhereInput[]
    NOT?: produtosWhereInput | produtosWhereInput[]
    id?: IntFilter<"produtos"> | number
    codigo?: StringFilter<"produtos"> | string
    descricao?: StringNullableFilter<"produtos"> | string | null
    fornecedor?: StringNullableFilter<"produtos"> | string | null
    preco_venda?: DecimalFilter<"produtos"> | Decimal | DecimalJsLike | number | string
    estoque_por_loja?: Estoque_lojaListRelationFilter
    itens_pedido?: Itens_pedidoListRelationFilter
  }

  export type produtosOrderByWithRelationInput = {
    id?: SortOrder
    codigo?: SortOrder
    descricao?: SortOrderInput | SortOrder
    fornecedor?: SortOrderInput | SortOrder
    preco_venda?: SortOrder
    estoque_por_loja?: estoque_lojaOrderByRelationAggregateInput
    itens_pedido?: itens_pedidoOrderByRelationAggregateInput
  }

  export type produtosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    codigo?: string
    AND?: produtosWhereInput | produtosWhereInput[]
    OR?: produtosWhereInput[]
    NOT?: produtosWhereInput | produtosWhereInput[]
    descricao?: StringNullableFilter<"produtos"> | string | null
    fornecedor?: StringNullableFilter<"produtos"> | string | null
    preco_venda?: DecimalFilter<"produtos"> | Decimal | DecimalJsLike | number | string
    estoque_por_loja?: Estoque_lojaListRelationFilter
    itens_pedido?: Itens_pedidoListRelationFilter
  }, "id" | "codigo">

  export type produtosOrderByWithAggregationInput = {
    id?: SortOrder
    codigo?: SortOrder
    descricao?: SortOrderInput | SortOrder
    fornecedor?: SortOrderInput | SortOrder
    preco_venda?: SortOrder
    _count?: produtosCountOrderByAggregateInput
    _avg?: produtosAvgOrderByAggregateInput
    _max?: produtosMaxOrderByAggregateInput
    _min?: produtosMinOrderByAggregateInput
    _sum?: produtosSumOrderByAggregateInput
  }

  export type produtosScalarWhereWithAggregatesInput = {
    AND?: produtosScalarWhereWithAggregatesInput | produtosScalarWhereWithAggregatesInput[]
    OR?: produtosScalarWhereWithAggregatesInput[]
    NOT?: produtosScalarWhereWithAggregatesInput | produtosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"produtos"> | number
    codigo?: StringWithAggregatesFilter<"produtos"> | string
    descricao?: StringNullableWithAggregatesFilter<"produtos"> | string | null
    fornecedor?: StringNullableWithAggregatesFilter<"produtos"> | string | null
    preco_venda?: DecimalWithAggregatesFilter<"produtos"> | Decimal | DecimalJsLike | number | string
  }

  export type setorWhereInput = {
    AND?: setorWhereInput | setorWhereInput[]
    OR?: setorWhereInput[]
    NOT?: setorWhereInput | setorWhereInput[]
    id?: IntFilter<"setor"> | number
    descricao?: StringNullableFilter<"setor"> | string | null
  }

  export type setorOrderByWithRelationInput = {
    id?: SortOrder
    descricao?: SortOrderInput | SortOrder
  }

  export type setorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: setorWhereInput | setorWhereInput[]
    OR?: setorWhereInput[]
    NOT?: setorWhereInput | setorWhereInput[]
    descricao?: StringNullableFilter<"setor"> | string | null
  }, "id">

  export type setorOrderByWithAggregationInput = {
    id?: SortOrder
    descricao?: SortOrderInput | SortOrder
    _count?: setorCountOrderByAggregateInput
    _avg?: setorAvgOrderByAggregateInput
    _max?: setorMaxOrderByAggregateInput
    _min?: setorMinOrderByAggregateInput
    _sum?: setorSumOrderByAggregateInput
  }

  export type setorScalarWhereWithAggregatesInput = {
    AND?: setorScalarWhereWithAggregatesInput | setorScalarWhereWithAggregatesInput[]
    OR?: setorScalarWhereWithAggregatesInput[]
    NOT?: setorScalarWhereWithAggregatesInput | setorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"setor"> | number
    descricao?: StringNullableWithAggregatesFilter<"setor"> | string | null
  }

  export type estoque_lojaWhereInput = {
    AND?: estoque_lojaWhereInput | estoque_lojaWhereInput[]
    OR?: estoque_lojaWhereInput[]
    NOT?: estoque_lojaWhereInput | estoque_lojaWhereInput[]
    id?: IntFilter<"estoque_loja"> | number
    produto_id?: IntFilter<"estoque_loja"> | number
    loja_id?: IntFilter<"estoque_loja"> | number
    quantidade_estoque?: IntFilter<"estoque_loja"> | number
    quantidade_mostruario?: IntFilter<"estoque_loja"> | number
    quantidade_disponivel?: IntFilter<"estoque_loja"> | number
    produto?: XOR<ProdutosScalarRelationFilter, produtosWhereInput>
    loja_ref?: XOR<LojasScalarRelationFilter, lojasWhereInput>
  }

  export type estoque_lojaOrderByWithRelationInput = {
    id?: SortOrder
    produto_id?: SortOrder
    loja_id?: SortOrder
    quantidade_estoque?: SortOrder
    quantidade_mostruario?: SortOrder
    quantidade_disponivel?: SortOrder
    produto?: produtosOrderByWithRelationInput
    loja_ref?: lojasOrderByWithRelationInput
  }

  export type estoque_lojaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    produto_id_loja_id?: estoque_lojaProduto_idLoja_idCompoundUniqueInput
    AND?: estoque_lojaWhereInput | estoque_lojaWhereInput[]
    OR?: estoque_lojaWhereInput[]
    NOT?: estoque_lojaWhereInput | estoque_lojaWhereInput[]
    produto_id?: IntFilter<"estoque_loja"> | number
    loja_id?: IntFilter<"estoque_loja"> | number
    quantidade_estoque?: IntFilter<"estoque_loja"> | number
    quantidade_mostruario?: IntFilter<"estoque_loja"> | number
    quantidade_disponivel?: IntFilter<"estoque_loja"> | number
    produto?: XOR<ProdutosScalarRelationFilter, produtosWhereInput>
    loja_ref?: XOR<LojasScalarRelationFilter, lojasWhereInput>
  }, "id" | "produto_id_loja_id">

  export type estoque_lojaOrderByWithAggregationInput = {
    id?: SortOrder
    produto_id?: SortOrder
    loja_id?: SortOrder
    quantidade_estoque?: SortOrder
    quantidade_mostruario?: SortOrder
    quantidade_disponivel?: SortOrder
    _count?: estoque_lojaCountOrderByAggregateInput
    _avg?: estoque_lojaAvgOrderByAggregateInput
    _max?: estoque_lojaMaxOrderByAggregateInput
    _min?: estoque_lojaMinOrderByAggregateInput
    _sum?: estoque_lojaSumOrderByAggregateInput
  }

  export type estoque_lojaScalarWhereWithAggregatesInput = {
    AND?: estoque_lojaScalarWhereWithAggregatesInput | estoque_lojaScalarWhereWithAggregatesInput[]
    OR?: estoque_lojaScalarWhereWithAggregatesInput[]
    NOT?: estoque_lojaScalarWhereWithAggregatesInput | estoque_lojaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"estoque_loja"> | number
    produto_id?: IntWithAggregatesFilter<"estoque_loja"> | number
    loja_id?: IntWithAggregatesFilter<"estoque_loja"> | number
    quantidade_estoque?: IntWithAggregatesFilter<"estoque_loja"> | number
    quantidade_mostruario?: IntWithAggregatesFilter<"estoque_loja"> | number
    quantidade_disponivel?: IntWithAggregatesFilter<"estoque_loja"> | number
  }

  export type usuariosWhereInput = {
    AND?: usuariosWhereInput | usuariosWhereInput[]
    OR?: usuariosWhereInput[]
    NOT?: usuariosWhereInput | usuariosWhereInput[]
    id?: IntFilter<"usuarios"> | number
    nome?: StringNullableFilter<"usuarios"> | string | null
    login?: StringNullableFilter<"usuarios"> | string | null
    senha?: IntNullableFilter<"usuarios"> | number | null
    setor?: IntNullableFilter<"usuarios"> | number | null
    loja?: IntNullableFilter<"usuarios"> | number | null
    inativo?: BoolNullableFilter<"usuarios"> | boolean | null
    email?: StringNullableFilter<"usuarios"> | string | null
    id_vendedor_tiny?: StringNullableFilter<"usuarios"> | string | null
  }

  export type usuariosOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrderInput | SortOrder
    login?: SortOrderInput | SortOrder
    senha?: SortOrderInput | SortOrder
    setor?: SortOrderInput | SortOrder
    loja?: SortOrderInput | SortOrder
    inativo?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    id_vendedor_tiny?: SortOrderInput | SortOrder
  }

  export type usuariosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    id_vendedor_tiny?: string
    AND?: usuariosWhereInput | usuariosWhereInput[]
    OR?: usuariosWhereInput[]
    NOT?: usuariosWhereInput | usuariosWhereInput[]
    nome?: StringNullableFilter<"usuarios"> | string | null
    login?: StringNullableFilter<"usuarios"> | string | null
    senha?: IntNullableFilter<"usuarios"> | number | null
    setor?: IntNullableFilter<"usuarios"> | number | null
    loja?: IntNullableFilter<"usuarios"> | number | null
    inativo?: BoolNullableFilter<"usuarios"> | boolean | null
    email?: StringNullableFilter<"usuarios"> | string | null
  }, "id" | "id_vendedor_tiny">

  export type usuariosOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrderInput | SortOrder
    login?: SortOrderInput | SortOrder
    senha?: SortOrderInput | SortOrder
    setor?: SortOrderInput | SortOrder
    loja?: SortOrderInput | SortOrder
    inativo?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    id_vendedor_tiny?: SortOrderInput | SortOrder
    _count?: usuariosCountOrderByAggregateInput
    _avg?: usuariosAvgOrderByAggregateInput
    _max?: usuariosMaxOrderByAggregateInput
    _min?: usuariosMinOrderByAggregateInput
    _sum?: usuariosSumOrderByAggregateInput
  }

  export type usuariosScalarWhereWithAggregatesInput = {
    AND?: usuariosScalarWhereWithAggregatesInput | usuariosScalarWhereWithAggregatesInput[]
    OR?: usuariosScalarWhereWithAggregatesInput[]
    NOT?: usuariosScalarWhereWithAggregatesInput | usuariosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"usuarios"> | number
    nome?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    login?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    senha?: IntNullableWithAggregatesFilter<"usuarios"> | number | null
    setor?: IntNullableWithAggregatesFilter<"usuarios"> | number | null
    loja?: IntNullableWithAggregatesFilter<"usuarios"> | number | null
    inativo?: BoolNullableWithAggregatesFilter<"usuarios"> | boolean | null
    email?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    id_vendedor_tiny?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
  }

  export type pedidosWhereInput = {
    AND?: pedidosWhereInput | pedidosWhereInput[]
    OR?: pedidosWhereInput[]
    NOT?: pedidosWhereInput | pedidosWhereInput[]
    id?: IntFilter<"pedidos"> | number
    codigo_tiny?: StringNullableFilter<"pedidos"> | string | null
    numero?: StringNullableFilter<"pedidos"> | string | null
    data_pedido?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    data_atualizacao?: DateTimeFilter<"pedidos"> | Date | string
    status?: StringNullableFilter<"pedidos"> | string | null
    cliente_nome?: StringNullableFilter<"pedidos"> | string | null
    valor_total?: DecimalNullableFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
    id_vendedor?: StringNullableFilter<"pedidos"> | string | null
    nome_vendedor?: StringNullableFilter<"pedidos"> | string | null
    situacao?: StringNullableFilter<"pedidos"> | string | null
    loja_id?: IntNullableFilter<"pedidos"> | number | null
    sincronizado_em?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    estoque_baixado?: BoolFilter<"pedidos"> | boolean
    estoque_baixado_em?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    itens?: Itens_pedidoListRelationFilter
    loja_ref?: XOR<LojasNullableScalarRelationFilter, lojasWhereInput> | null
  }

  export type pedidosOrderByWithRelationInput = {
    id?: SortOrder
    codigo_tiny?: SortOrderInput | SortOrder
    numero?: SortOrderInput | SortOrder
    data_pedido?: SortOrderInput | SortOrder
    data_atualizacao?: SortOrder
    status?: SortOrderInput | SortOrder
    cliente_nome?: SortOrderInput | SortOrder
    valor_total?: SortOrderInput | SortOrder
    id_vendedor?: SortOrderInput | SortOrder
    nome_vendedor?: SortOrderInput | SortOrder
    situacao?: SortOrderInput | SortOrder
    loja_id?: SortOrderInput | SortOrder
    sincronizado_em?: SortOrderInput | SortOrder
    estoque_baixado?: SortOrder
    estoque_baixado_em?: SortOrderInput | SortOrder
    itens?: itens_pedidoOrderByRelationAggregateInput
    loja_ref?: lojasOrderByWithRelationInput
  }

  export type pedidosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    codigo_tiny?: string
    AND?: pedidosWhereInput | pedidosWhereInput[]
    OR?: pedidosWhereInput[]
    NOT?: pedidosWhereInput | pedidosWhereInput[]
    numero?: StringNullableFilter<"pedidos"> | string | null
    data_pedido?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    data_atualizacao?: DateTimeFilter<"pedidos"> | Date | string
    status?: StringNullableFilter<"pedidos"> | string | null
    cliente_nome?: StringNullableFilter<"pedidos"> | string | null
    valor_total?: DecimalNullableFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
    id_vendedor?: StringNullableFilter<"pedidos"> | string | null
    nome_vendedor?: StringNullableFilter<"pedidos"> | string | null
    situacao?: StringNullableFilter<"pedidos"> | string | null
    loja_id?: IntNullableFilter<"pedidos"> | number | null
    sincronizado_em?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    estoque_baixado?: BoolFilter<"pedidos"> | boolean
    estoque_baixado_em?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    itens?: Itens_pedidoListRelationFilter
    loja_ref?: XOR<LojasNullableScalarRelationFilter, lojasWhereInput> | null
  }, "id" | "codigo_tiny">

  export type pedidosOrderByWithAggregationInput = {
    id?: SortOrder
    codigo_tiny?: SortOrderInput | SortOrder
    numero?: SortOrderInput | SortOrder
    data_pedido?: SortOrderInput | SortOrder
    data_atualizacao?: SortOrder
    status?: SortOrderInput | SortOrder
    cliente_nome?: SortOrderInput | SortOrder
    valor_total?: SortOrderInput | SortOrder
    id_vendedor?: SortOrderInput | SortOrder
    nome_vendedor?: SortOrderInput | SortOrder
    situacao?: SortOrderInput | SortOrder
    loja_id?: SortOrderInput | SortOrder
    sincronizado_em?: SortOrderInput | SortOrder
    estoque_baixado?: SortOrder
    estoque_baixado_em?: SortOrderInput | SortOrder
    _count?: pedidosCountOrderByAggregateInput
    _avg?: pedidosAvgOrderByAggregateInput
    _max?: pedidosMaxOrderByAggregateInput
    _min?: pedidosMinOrderByAggregateInput
    _sum?: pedidosSumOrderByAggregateInput
  }

  export type pedidosScalarWhereWithAggregatesInput = {
    AND?: pedidosScalarWhereWithAggregatesInput | pedidosScalarWhereWithAggregatesInput[]
    OR?: pedidosScalarWhereWithAggregatesInput[]
    NOT?: pedidosScalarWhereWithAggregatesInput | pedidosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"pedidos"> | number
    codigo_tiny?: StringNullableWithAggregatesFilter<"pedidos"> | string | null
    numero?: StringNullableWithAggregatesFilter<"pedidos"> | string | null
    data_pedido?: DateTimeNullableWithAggregatesFilter<"pedidos"> | Date | string | null
    data_atualizacao?: DateTimeWithAggregatesFilter<"pedidos"> | Date | string
    status?: StringNullableWithAggregatesFilter<"pedidos"> | string | null
    cliente_nome?: StringNullableWithAggregatesFilter<"pedidos"> | string | null
    valor_total?: DecimalNullableWithAggregatesFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
    id_vendedor?: StringNullableWithAggregatesFilter<"pedidos"> | string | null
    nome_vendedor?: StringNullableWithAggregatesFilter<"pedidos"> | string | null
    situacao?: StringNullableWithAggregatesFilter<"pedidos"> | string | null
    loja_id?: IntNullableWithAggregatesFilter<"pedidos"> | number | null
    sincronizado_em?: DateTimeNullableWithAggregatesFilter<"pedidos"> | Date | string | null
    estoque_baixado?: BoolWithAggregatesFilter<"pedidos"> | boolean
    estoque_baixado_em?: DateTimeNullableWithAggregatesFilter<"pedidos"> | Date | string | null
  }

  export type itens_pedidoWhereInput = {
    AND?: itens_pedidoWhereInput | itens_pedidoWhereInput[]
    OR?: itens_pedidoWhereInput[]
    NOT?: itens_pedidoWhereInput | itens_pedidoWhereInput[]
    id?: IntFilter<"itens_pedido"> | number
    pedido_id?: IntFilter<"itens_pedido"> | number
    produto_id?: IntNullableFilter<"itens_pedido"> | number | null
    codigo_produto_tiny?: StringNullableFilter<"itens_pedido"> | string | null
    descricao?: StringNullableFilter<"itens_pedido"> | string | null
    quantidade?: DecimalFilter<"itens_pedido"> | Decimal | DecimalJsLike | number | string
    valor_unitario?: DecimalFilter<"itens_pedido"> | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalFilter<"itens_pedido"> | Decimal | DecimalJsLike | number | string
    pedido?: XOR<PedidosScalarRelationFilter, pedidosWhereInput>
    produto?: XOR<ProdutosNullableScalarRelationFilter, produtosWhereInput> | null
  }

  export type itens_pedidoOrderByWithRelationInput = {
    id?: SortOrder
    pedido_id?: SortOrder
    produto_id?: SortOrderInput | SortOrder
    codigo_produto_tiny?: SortOrderInput | SortOrder
    descricao?: SortOrderInput | SortOrder
    quantidade?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
    pedido?: pedidosOrderByWithRelationInput
    produto?: produtosOrderByWithRelationInput
  }

  export type itens_pedidoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: itens_pedidoWhereInput | itens_pedidoWhereInput[]
    OR?: itens_pedidoWhereInput[]
    NOT?: itens_pedidoWhereInput | itens_pedidoWhereInput[]
    pedido_id?: IntFilter<"itens_pedido"> | number
    produto_id?: IntNullableFilter<"itens_pedido"> | number | null
    codigo_produto_tiny?: StringNullableFilter<"itens_pedido"> | string | null
    descricao?: StringNullableFilter<"itens_pedido"> | string | null
    quantidade?: DecimalFilter<"itens_pedido"> | Decimal | DecimalJsLike | number | string
    valor_unitario?: DecimalFilter<"itens_pedido"> | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalFilter<"itens_pedido"> | Decimal | DecimalJsLike | number | string
    pedido?: XOR<PedidosScalarRelationFilter, pedidosWhereInput>
    produto?: XOR<ProdutosNullableScalarRelationFilter, produtosWhereInput> | null
  }, "id">

  export type itens_pedidoOrderByWithAggregationInput = {
    id?: SortOrder
    pedido_id?: SortOrder
    produto_id?: SortOrderInput | SortOrder
    codigo_produto_tiny?: SortOrderInput | SortOrder
    descricao?: SortOrderInput | SortOrder
    quantidade?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
    _count?: itens_pedidoCountOrderByAggregateInput
    _avg?: itens_pedidoAvgOrderByAggregateInput
    _max?: itens_pedidoMaxOrderByAggregateInput
    _min?: itens_pedidoMinOrderByAggregateInput
    _sum?: itens_pedidoSumOrderByAggregateInput
  }

  export type itens_pedidoScalarWhereWithAggregatesInput = {
    AND?: itens_pedidoScalarWhereWithAggregatesInput | itens_pedidoScalarWhereWithAggregatesInput[]
    OR?: itens_pedidoScalarWhereWithAggregatesInput[]
    NOT?: itens_pedidoScalarWhereWithAggregatesInput | itens_pedidoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"itens_pedido"> | number
    pedido_id?: IntWithAggregatesFilter<"itens_pedido"> | number
    produto_id?: IntNullableWithAggregatesFilter<"itens_pedido"> | number | null
    codigo_produto_tiny?: StringNullableWithAggregatesFilter<"itens_pedido"> | string | null
    descricao?: StringNullableWithAggregatesFilter<"itens_pedido"> | string | null
    quantidade?: DecimalWithAggregatesFilter<"itens_pedido"> | Decimal | DecimalJsLike | number | string
    valor_unitario?: DecimalWithAggregatesFilter<"itens_pedido"> | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalWithAggregatesFilter<"itens_pedido"> | Decimal | DecimalJsLike | number | string
  }

  export type lojasCreateInput = {
    nome?: string | null
    endereco?: string | null
    gerente?: number | null
    qtd_total_prod?: number | null
    estoque_por_loja?: estoque_lojaCreateNestedManyWithoutLoja_refInput
    pedidos?: pedidosCreateNestedManyWithoutLoja_refInput
  }

  export type lojasUncheckedCreateInput = {
    id?: number
    nome?: string | null
    endereco?: string | null
    gerente?: number | null
    qtd_total_prod?: number | null
    estoque_por_loja?: estoque_lojaUncheckedCreateNestedManyWithoutLoja_refInput
    pedidos?: pedidosUncheckedCreateNestedManyWithoutLoja_refInput
  }

  export type lojasUpdateInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    gerente?: NullableIntFieldUpdateOperationsInput | number | null
    qtd_total_prod?: NullableIntFieldUpdateOperationsInput | number | null
    estoque_por_loja?: estoque_lojaUpdateManyWithoutLoja_refNestedInput
    pedidos?: pedidosUpdateManyWithoutLoja_refNestedInput
  }

  export type lojasUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    gerente?: NullableIntFieldUpdateOperationsInput | number | null
    qtd_total_prod?: NullableIntFieldUpdateOperationsInput | number | null
    estoque_por_loja?: estoque_lojaUncheckedUpdateManyWithoutLoja_refNestedInput
    pedidos?: pedidosUncheckedUpdateManyWithoutLoja_refNestedInput
  }

  export type lojasCreateManyInput = {
    id?: number
    nome?: string | null
    endereco?: string | null
    gerente?: number | null
    qtd_total_prod?: number | null
  }

  export type lojasUpdateManyMutationInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    gerente?: NullableIntFieldUpdateOperationsInput | number | null
    qtd_total_prod?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type lojasUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    gerente?: NullableIntFieldUpdateOperationsInput | number | null
    qtd_total_prod?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type produtosCreateInput = {
    codigo: string
    descricao?: string | null
    fornecedor?: string | null
    preco_venda: Decimal | DecimalJsLike | number | string
    estoque_por_loja?: estoque_lojaCreateNestedManyWithoutProdutoInput
    itens_pedido?: itens_pedidoCreateNestedManyWithoutProdutoInput
  }

  export type produtosUncheckedCreateInput = {
    id?: number
    codigo: string
    descricao?: string | null
    fornecedor?: string | null
    preco_venda: Decimal | DecimalJsLike | number | string
    estoque_por_loja?: estoque_lojaUncheckedCreateNestedManyWithoutProdutoInput
    itens_pedido?: itens_pedidoUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type produtosUpdateInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    preco_venda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estoque_por_loja?: estoque_lojaUpdateManyWithoutProdutoNestedInput
    itens_pedido?: itens_pedidoUpdateManyWithoutProdutoNestedInput
  }

  export type produtosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    preco_venda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estoque_por_loja?: estoque_lojaUncheckedUpdateManyWithoutProdutoNestedInput
    itens_pedido?: itens_pedidoUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type produtosCreateManyInput = {
    id?: number
    codigo: string
    descricao?: string | null
    fornecedor?: string | null
    preco_venda: Decimal | DecimalJsLike | number | string
  }

  export type produtosUpdateManyMutationInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    preco_venda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type produtosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    preco_venda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type setorCreateInput = {
    descricao?: string | null
  }

  export type setorUncheckedCreateInput = {
    id?: number
    descricao?: string | null
  }

  export type setorUpdateInput = {
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type setorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type setorCreateManyInput = {
    id?: number
    descricao?: string | null
  }

  export type setorUpdateManyMutationInput = {
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type setorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type estoque_lojaCreateInput = {
    quantidade_estoque?: number
    quantidade_mostruario?: number
    quantidade_disponivel?: number
    produto: produtosCreateNestedOneWithoutEstoque_por_lojaInput
    loja_ref: lojasCreateNestedOneWithoutEstoque_por_lojaInput
  }

  export type estoque_lojaUncheckedCreateInput = {
    id?: number
    produto_id: number
    loja_id: number
    quantidade_estoque?: number
    quantidade_mostruario?: number
    quantidade_disponivel?: number
  }

  export type estoque_lojaUpdateInput = {
    quantidade_estoque?: IntFieldUpdateOperationsInput | number
    quantidade_mostruario?: IntFieldUpdateOperationsInput | number
    quantidade_disponivel?: IntFieldUpdateOperationsInput | number
    produto?: produtosUpdateOneRequiredWithoutEstoque_por_lojaNestedInput
    loja_ref?: lojasUpdateOneRequiredWithoutEstoque_por_lojaNestedInput
  }

  export type estoque_lojaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    produto_id?: IntFieldUpdateOperationsInput | number
    loja_id?: IntFieldUpdateOperationsInput | number
    quantidade_estoque?: IntFieldUpdateOperationsInput | number
    quantidade_mostruario?: IntFieldUpdateOperationsInput | number
    quantidade_disponivel?: IntFieldUpdateOperationsInput | number
  }

  export type estoque_lojaCreateManyInput = {
    id?: number
    produto_id: number
    loja_id: number
    quantidade_estoque?: number
    quantidade_mostruario?: number
    quantidade_disponivel?: number
  }

  export type estoque_lojaUpdateManyMutationInput = {
    quantidade_estoque?: IntFieldUpdateOperationsInput | number
    quantidade_mostruario?: IntFieldUpdateOperationsInput | number
    quantidade_disponivel?: IntFieldUpdateOperationsInput | number
  }

  export type estoque_lojaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    produto_id?: IntFieldUpdateOperationsInput | number
    loja_id?: IntFieldUpdateOperationsInput | number
    quantidade_estoque?: IntFieldUpdateOperationsInput | number
    quantidade_mostruario?: IntFieldUpdateOperationsInput | number
    quantidade_disponivel?: IntFieldUpdateOperationsInput | number
  }

  export type usuariosCreateInput = {
    nome?: string | null
    login?: string | null
    senha?: number | null
    setor?: number | null
    loja?: number | null
    inativo?: boolean | null
    email?: string | null
    id_vendedor_tiny?: string | null
  }

  export type usuariosUncheckedCreateInput = {
    id?: number
    nome?: string | null
    login?: string | null
    senha?: number | null
    setor?: number | null
    loja?: number | null
    inativo?: boolean | null
    email?: string | null
    id_vendedor_tiny?: string | null
  }

  export type usuariosUpdateInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    login?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableIntFieldUpdateOperationsInput | number | null
    setor?: NullableIntFieldUpdateOperationsInput | number | null
    loja?: NullableIntFieldUpdateOperationsInput | number | null
    inativo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    id_vendedor_tiny?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usuariosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    login?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableIntFieldUpdateOperationsInput | number | null
    setor?: NullableIntFieldUpdateOperationsInput | number | null
    loja?: NullableIntFieldUpdateOperationsInput | number | null
    inativo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    id_vendedor_tiny?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usuariosCreateManyInput = {
    id?: number
    nome?: string | null
    login?: string | null
    senha?: number | null
    setor?: number | null
    loja?: number | null
    inativo?: boolean | null
    email?: string | null
    id_vendedor_tiny?: string | null
  }

  export type usuariosUpdateManyMutationInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    login?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableIntFieldUpdateOperationsInput | number | null
    setor?: NullableIntFieldUpdateOperationsInput | number | null
    loja?: NullableIntFieldUpdateOperationsInput | number | null
    inativo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    id_vendedor_tiny?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usuariosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    login?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableIntFieldUpdateOperationsInput | number | null
    setor?: NullableIntFieldUpdateOperationsInput | number | null
    loja?: NullableIntFieldUpdateOperationsInput | number | null
    inativo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    id_vendedor_tiny?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pedidosCreateInput = {
    codigo_tiny?: string | null
    numero?: string | null
    data_pedido?: Date | string | null
    data_atualizacao?: Date | string
    status?: string | null
    cliente_nome?: string | null
    valor_total?: Decimal | DecimalJsLike | number | string | null
    id_vendedor?: string | null
    nome_vendedor?: string | null
    situacao?: string | null
    sincronizado_em?: Date | string | null
    estoque_baixado?: boolean
    estoque_baixado_em?: Date | string | null
    itens?: itens_pedidoCreateNestedManyWithoutPedidoInput
    loja_ref?: lojasCreateNestedOneWithoutPedidosInput
  }

  export type pedidosUncheckedCreateInput = {
    id?: number
    codigo_tiny?: string | null
    numero?: string | null
    data_pedido?: Date | string | null
    data_atualizacao?: Date | string
    status?: string | null
    cliente_nome?: string | null
    valor_total?: Decimal | DecimalJsLike | number | string | null
    id_vendedor?: string | null
    nome_vendedor?: string | null
    situacao?: string | null
    loja_id?: number | null
    sincronizado_em?: Date | string | null
    estoque_baixado?: boolean
    estoque_baixado_em?: Date | string | null
    itens?: itens_pedidoUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type pedidosUpdateInput = {
    codigo_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    data_pedido?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_atualizacao?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cliente_nome?: NullableStringFieldUpdateOperationsInput | string | null
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    id_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    nome_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    situacao?: NullableStringFieldUpdateOperationsInput | string | null
    sincronizado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estoque_baixado?: BoolFieldUpdateOperationsInput | boolean
    estoque_baixado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itens?: itens_pedidoUpdateManyWithoutPedidoNestedInput
    loja_ref?: lojasUpdateOneWithoutPedidosNestedInput
  }

  export type pedidosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    data_pedido?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_atualizacao?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cliente_nome?: NullableStringFieldUpdateOperationsInput | string | null
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    id_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    nome_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    situacao?: NullableStringFieldUpdateOperationsInput | string | null
    loja_id?: NullableIntFieldUpdateOperationsInput | number | null
    sincronizado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estoque_baixado?: BoolFieldUpdateOperationsInput | boolean
    estoque_baixado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itens?: itens_pedidoUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type pedidosCreateManyInput = {
    id?: number
    codigo_tiny?: string | null
    numero?: string | null
    data_pedido?: Date | string | null
    data_atualizacao?: Date | string
    status?: string | null
    cliente_nome?: string | null
    valor_total?: Decimal | DecimalJsLike | number | string | null
    id_vendedor?: string | null
    nome_vendedor?: string | null
    situacao?: string | null
    loja_id?: number | null
    sincronizado_em?: Date | string | null
    estoque_baixado?: boolean
    estoque_baixado_em?: Date | string | null
  }

  export type pedidosUpdateManyMutationInput = {
    codigo_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    data_pedido?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_atualizacao?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cliente_nome?: NullableStringFieldUpdateOperationsInput | string | null
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    id_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    nome_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    situacao?: NullableStringFieldUpdateOperationsInput | string | null
    sincronizado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estoque_baixado?: BoolFieldUpdateOperationsInput | boolean
    estoque_baixado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type pedidosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    data_pedido?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_atualizacao?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cliente_nome?: NullableStringFieldUpdateOperationsInput | string | null
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    id_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    nome_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    situacao?: NullableStringFieldUpdateOperationsInput | string | null
    loja_id?: NullableIntFieldUpdateOperationsInput | number | null
    sincronizado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estoque_baixado?: BoolFieldUpdateOperationsInput | boolean
    estoque_baixado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type itens_pedidoCreateInput = {
    codigo_produto_tiny?: string | null
    descricao?: string | null
    quantidade: Decimal | DecimalJsLike | number | string
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total: Decimal | DecimalJsLike | number | string
    pedido: pedidosCreateNestedOneWithoutItensInput
    produto?: produtosCreateNestedOneWithoutItens_pedidoInput
  }

  export type itens_pedidoUncheckedCreateInput = {
    id?: number
    pedido_id: number
    produto_id?: number | null
    codigo_produto_tiny?: string | null
    descricao?: string | null
    quantidade: Decimal | DecimalJsLike | number | string
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total: Decimal | DecimalJsLike | number | string
  }

  export type itens_pedidoUpdateInput = {
    codigo_produto_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pedido?: pedidosUpdateOneRequiredWithoutItensNestedInput
    produto?: produtosUpdateOneWithoutItens_pedidoNestedInput
  }

  export type itens_pedidoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    pedido_id?: IntFieldUpdateOperationsInput | number
    produto_id?: NullableIntFieldUpdateOperationsInput | number | null
    codigo_produto_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type itens_pedidoCreateManyInput = {
    id?: number
    pedido_id: number
    produto_id?: number | null
    codigo_produto_tiny?: string | null
    descricao?: string | null
    quantidade: Decimal | DecimalJsLike | number | string
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total: Decimal | DecimalJsLike | number | string
  }

  export type itens_pedidoUpdateManyMutationInput = {
    codigo_produto_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type itens_pedidoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    pedido_id?: IntFieldUpdateOperationsInput | number
    produto_id?: NullableIntFieldUpdateOperationsInput | number | null
    codigo_produto_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
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

  export type Estoque_lojaListRelationFilter = {
    every?: estoque_lojaWhereInput
    some?: estoque_lojaWhereInput
    none?: estoque_lojaWhereInput
  }

  export type PedidosListRelationFilter = {
    every?: pedidosWhereInput
    some?: pedidosWhereInput
    none?: pedidosWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type estoque_lojaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type pedidosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type lojasCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    endereco?: SortOrder
    gerente?: SortOrder
    qtd_total_prod?: SortOrder
  }

  export type lojasAvgOrderByAggregateInput = {
    id?: SortOrder
    gerente?: SortOrder
    qtd_total_prod?: SortOrder
  }

  export type lojasMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    endereco?: SortOrder
    gerente?: SortOrder
    qtd_total_prod?: SortOrder
  }

  export type lojasMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    endereco?: SortOrder
    gerente?: SortOrder
    qtd_total_prod?: SortOrder
  }

  export type lojasSumOrderByAggregateInput = {
    id?: SortOrder
    gerente?: SortOrder
    qtd_total_prod?: SortOrder
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

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type Itens_pedidoListRelationFilter = {
    every?: itens_pedidoWhereInput
    some?: itens_pedidoWhereInput
    none?: itens_pedidoWhereInput
  }

  export type itens_pedidoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type produtosCountOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    descricao?: SortOrder
    fornecedor?: SortOrder
    preco_venda?: SortOrder
  }

  export type produtosAvgOrderByAggregateInput = {
    id?: SortOrder
    preco_venda?: SortOrder
  }

  export type produtosMaxOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    descricao?: SortOrder
    fornecedor?: SortOrder
    preco_venda?: SortOrder
  }

  export type produtosMinOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    descricao?: SortOrder
    fornecedor?: SortOrder
    preco_venda?: SortOrder
  }

  export type produtosSumOrderByAggregateInput = {
    id?: SortOrder
    preco_venda?: SortOrder
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

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type setorCountOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
  }

  export type setorAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type setorMaxOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
  }

  export type setorMinOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
  }

  export type setorSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProdutosScalarRelationFilter = {
    is?: produtosWhereInput
    isNot?: produtosWhereInput
  }

  export type LojasScalarRelationFilter = {
    is?: lojasWhereInput
    isNot?: lojasWhereInput
  }

  export type estoque_lojaProduto_idLoja_idCompoundUniqueInput = {
    produto_id: number
    loja_id: number
  }

  export type estoque_lojaCountOrderByAggregateInput = {
    id?: SortOrder
    produto_id?: SortOrder
    loja_id?: SortOrder
    quantidade_estoque?: SortOrder
    quantidade_mostruario?: SortOrder
    quantidade_disponivel?: SortOrder
  }

  export type estoque_lojaAvgOrderByAggregateInput = {
    id?: SortOrder
    produto_id?: SortOrder
    loja_id?: SortOrder
    quantidade_estoque?: SortOrder
    quantidade_mostruario?: SortOrder
    quantidade_disponivel?: SortOrder
  }

  export type estoque_lojaMaxOrderByAggregateInput = {
    id?: SortOrder
    produto_id?: SortOrder
    loja_id?: SortOrder
    quantidade_estoque?: SortOrder
    quantidade_mostruario?: SortOrder
    quantidade_disponivel?: SortOrder
  }

  export type estoque_lojaMinOrderByAggregateInput = {
    id?: SortOrder
    produto_id?: SortOrder
    loja_id?: SortOrder
    quantidade_estoque?: SortOrder
    quantidade_mostruario?: SortOrder
    quantidade_disponivel?: SortOrder
  }

  export type estoque_lojaSumOrderByAggregateInput = {
    id?: SortOrder
    produto_id?: SortOrder
    loja_id?: SortOrder
    quantidade_estoque?: SortOrder
    quantidade_mostruario?: SortOrder
    quantidade_disponivel?: SortOrder
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type usuariosCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    login?: SortOrder
    senha?: SortOrder
    setor?: SortOrder
    loja?: SortOrder
    inativo?: SortOrder
    email?: SortOrder
    id_vendedor_tiny?: SortOrder
  }

  export type usuariosAvgOrderByAggregateInput = {
    id?: SortOrder
    senha?: SortOrder
    setor?: SortOrder
    loja?: SortOrder
  }

  export type usuariosMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    login?: SortOrder
    senha?: SortOrder
    setor?: SortOrder
    loja?: SortOrder
    inativo?: SortOrder
    email?: SortOrder
    id_vendedor_tiny?: SortOrder
  }

  export type usuariosMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    login?: SortOrder
    senha?: SortOrder
    setor?: SortOrder
    loja?: SortOrder
    inativo?: SortOrder
    email?: SortOrder
    id_vendedor_tiny?: SortOrder
  }

  export type usuariosSumOrderByAggregateInput = {
    id?: SortOrder
    senha?: SortOrder
    setor?: SortOrder
    loja?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type LojasNullableScalarRelationFilter = {
    is?: lojasWhereInput | null
    isNot?: lojasWhereInput | null
  }

  export type pedidosCountOrderByAggregateInput = {
    id?: SortOrder
    codigo_tiny?: SortOrder
    numero?: SortOrder
    data_pedido?: SortOrder
    data_atualizacao?: SortOrder
    status?: SortOrder
    cliente_nome?: SortOrder
    valor_total?: SortOrder
    id_vendedor?: SortOrder
    nome_vendedor?: SortOrder
    situacao?: SortOrder
    loja_id?: SortOrder
    sincronizado_em?: SortOrder
    estoque_baixado?: SortOrder
    estoque_baixado_em?: SortOrder
  }

  export type pedidosAvgOrderByAggregateInput = {
    id?: SortOrder
    valor_total?: SortOrder
    loja_id?: SortOrder
  }

  export type pedidosMaxOrderByAggregateInput = {
    id?: SortOrder
    codigo_tiny?: SortOrder
    numero?: SortOrder
    data_pedido?: SortOrder
    data_atualizacao?: SortOrder
    status?: SortOrder
    cliente_nome?: SortOrder
    valor_total?: SortOrder
    id_vendedor?: SortOrder
    nome_vendedor?: SortOrder
    situacao?: SortOrder
    loja_id?: SortOrder
    sincronizado_em?: SortOrder
    estoque_baixado?: SortOrder
    estoque_baixado_em?: SortOrder
  }

  export type pedidosMinOrderByAggregateInput = {
    id?: SortOrder
    codigo_tiny?: SortOrder
    numero?: SortOrder
    data_pedido?: SortOrder
    data_atualizacao?: SortOrder
    status?: SortOrder
    cliente_nome?: SortOrder
    valor_total?: SortOrder
    id_vendedor?: SortOrder
    nome_vendedor?: SortOrder
    situacao?: SortOrder
    loja_id?: SortOrder
    sincronizado_em?: SortOrder
    estoque_baixado?: SortOrder
    estoque_baixado_em?: SortOrder
  }

  export type pedidosSumOrderByAggregateInput = {
    id?: SortOrder
    valor_total?: SortOrder
    loja_id?: SortOrder
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PedidosScalarRelationFilter = {
    is?: pedidosWhereInput
    isNot?: pedidosWhereInput
  }

  export type ProdutosNullableScalarRelationFilter = {
    is?: produtosWhereInput | null
    isNot?: produtosWhereInput | null
  }

  export type itens_pedidoCountOrderByAggregateInput = {
    id?: SortOrder
    pedido_id?: SortOrder
    produto_id?: SortOrder
    codigo_produto_tiny?: SortOrder
    descricao?: SortOrder
    quantidade?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
  }

  export type itens_pedidoAvgOrderByAggregateInput = {
    id?: SortOrder
    pedido_id?: SortOrder
    produto_id?: SortOrder
    quantidade?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
  }

  export type itens_pedidoMaxOrderByAggregateInput = {
    id?: SortOrder
    pedido_id?: SortOrder
    produto_id?: SortOrder
    codigo_produto_tiny?: SortOrder
    descricao?: SortOrder
    quantidade?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
  }

  export type itens_pedidoMinOrderByAggregateInput = {
    id?: SortOrder
    pedido_id?: SortOrder
    produto_id?: SortOrder
    codigo_produto_tiny?: SortOrder
    descricao?: SortOrder
    quantidade?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
  }

  export type itens_pedidoSumOrderByAggregateInput = {
    id?: SortOrder
    pedido_id?: SortOrder
    produto_id?: SortOrder
    quantidade?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
  }

  export type estoque_lojaCreateNestedManyWithoutLoja_refInput = {
    create?: XOR<estoque_lojaCreateWithoutLoja_refInput, estoque_lojaUncheckedCreateWithoutLoja_refInput> | estoque_lojaCreateWithoutLoja_refInput[] | estoque_lojaUncheckedCreateWithoutLoja_refInput[]
    connectOrCreate?: estoque_lojaCreateOrConnectWithoutLoja_refInput | estoque_lojaCreateOrConnectWithoutLoja_refInput[]
    createMany?: estoque_lojaCreateManyLoja_refInputEnvelope
    connect?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
  }

  export type pedidosCreateNestedManyWithoutLoja_refInput = {
    create?: XOR<pedidosCreateWithoutLoja_refInput, pedidosUncheckedCreateWithoutLoja_refInput> | pedidosCreateWithoutLoja_refInput[] | pedidosUncheckedCreateWithoutLoja_refInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutLoja_refInput | pedidosCreateOrConnectWithoutLoja_refInput[]
    createMany?: pedidosCreateManyLoja_refInputEnvelope
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
  }

  export type estoque_lojaUncheckedCreateNestedManyWithoutLoja_refInput = {
    create?: XOR<estoque_lojaCreateWithoutLoja_refInput, estoque_lojaUncheckedCreateWithoutLoja_refInput> | estoque_lojaCreateWithoutLoja_refInput[] | estoque_lojaUncheckedCreateWithoutLoja_refInput[]
    connectOrCreate?: estoque_lojaCreateOrConnectWithoutLoja_refInput | estoque_lojaCreateOrConnectWithoutLoja_refInput[]
    createMany?: estoque_lojaCreateManyLoja_refInputEnvelope
    connect?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
  }

  export type pedidosUncheckedCreateNestedManyWithoutLoja_refInput = {
    create?: XOR<pedidosCreateWithoutLoja_refInput, pedidosUncheckedCreateWithoutLoja_refInput> | pedidosCreateWithoutLoja_refInput[] | pedidosUncheckedCreateWithoutLoja_refInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutLoja_refInput | pedidosCreateOrConnectWithoutLoja_refInput[]
    createMany?: pedidosCreateManyLoja_refInputEnvelope
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type estoque_lojaUpdateManyWithoutLoja_refNestedInput = {
    create?: XOR<estoque_lojaCreateWithoutLoja_refInput, estoque_lojaUncheckedCreateWithoutLoja_refInput> | estoque_lojaCreateWithoutLoja_refInput[] | estoque_lojaUncheckedCreateWithoutLoja_refInput[]
    connectOrCreate?: estoque_lojaCreateOrConnectWithoutLoja_refInput | estoque_lojaCreateOrConnectWithoutLoja_refInput[]
    upsert?: estoque_lojaUpsertWithWhereUniqueWithoutLoja_refInput | estoque_lojaUpsertWithWhereUniqueWithoutLoja_refInput[]
    createMany?: estoque_lojaCreateManyLoja_refInputEnvelope
    set?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    disconnect?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    delete?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    connect?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    update?: estoque_lojaUpdateWithWhereUniqueWithoutLoja_refInput | estoque_lojaUpdateWithWhereUniqueWithoutLoja_refInput[]
    updateMany?: estoque_lojaUpdateManyWithWhereWithoutLoja_refInput | estoque_lojaUpdateManyWithWhereWithoutLoja_refInput[]
    deleteMany?: estoque_lojaScalarWhereInput | estoque_lojaScalarWhereInput[]
  }

  export type pedidosUpdateManyWithoutLoja_refNestedInput = {
    create?: XOR<pedidosCreateWithoutLoja_refInput, pedidosUncheckedCreateWithoutLoja_refInput> | pedidosCreateWithoutLoja_refInput[] | pedidosUncheckedCreateWithoutLoja_refInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutLoja_refInput | pedidosCreateOrConnectWithoutLoja_refInput[]
    upsert?: pedidosUpsertWithWhereUniqueWithoutLoja_refInput | pedidosUpsertWithWhereUniqueWithoutLoja_refInput[]
    createMany?: pedidosCreateManyLoja_refInputEnvelope
    set?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    disconnect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    delete?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    update?: pedidosUpdateWithWhereUniqueWithoutLoja_refInput | pedidosUpdateWithWhereUniqueWithoutLoja_refInput[]
    updateMany?: pedidosUpdateManyWithWhereWithoutLoja_refInput | pedidosUpdateManyWithWhereWithoutLoja_refInput[]
    deleteMany?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type estoque_lojaUncheckedUpdateManyWithoutLoja_refNestedInput = {
    create?: XOR<estoque_lojaCreateWithoutLoja_refInput, estoque_lojaUncheckedCreateWithoutLoja_refInput> | estoque_lojaCreateWithoutLoja_refInput[] | estoque_lojaUncheckedCreateWithoutLoja_refInput[]
    connectOrCreate?: estoque_lojaCreateOrConnectWithoutLoja_refInput | estoque_lojaCreateOrConnectWithoutLoja_refInput[]
    upsert?: estoque_lojaUpsertWithWhereUniqueWithoutLoja_refInput | estoque_lojaUpsertWithWhereUniqueWithoutLoja_refInput[]
    createMany?: estoque_lojaCreateManyLoja_refInputEnvelope
    set?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    disconnect?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    delete?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    connect?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    update?: estoque_lojaUpdateWithWhereUniqueWithoutLoja_refInput | estoque_lojaUpdateWithWhereUniqueWithoutLoja_refInput[]
    updateMany?: estoque_lojaUpdateManyWithWhereWithoutLoja_refInput | estoque_lojaUpdateManyWithWhereWithoutLoja_refInput[]
    deleteMany?: estoque_lojaScalarWhereInput | estoque_lojaScalarWhereInput[]
  }

  export type pedidosUncheckedUpdateManyWithoutLoja_refNestedInput = {
    create?: XOR<pedidosCreateWithoutLoja_refInput, pedidosUncheckedCreateWithoutLoja_refInput> | pedidosCreateWithoutLoja_refInput[] | pedidosUncheckedCreateWithoutLoja_refInput[]
    connectOrCreate?: pedidosCreateOrConnectWithoutLoja_refInput | pedidosCreateOrConnectWithoutLoja_refInput[]
    upsert?: pedidosUpsertWithWhereUniqueWithoutLoja_refInput | pedidosUpsertWithWhereUniqueWithoutLoja_refInput[]
    createMany?: pedidosCreateManyLoja_refInputEnvelope
    set?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    disconnect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    delete?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    connect?: pedidosWhereUniqueInput | pedidosWhereUniqueInput[]
    update?: pedidosUpdateWithWhereUniqueWithoutLoja_refInput | pedidosUpdateWithWhereUniqueWithoutLoja_refInput[]
    updateMany?: pedidosUpdateManyWithWhereWithoutLoja_refInput | pedidosUpdateManyWithWhereWithoutLoja_refInput[]
    deleteMany?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
  }

  export type estoque_lojaCreateNestedManyWithoutProdutoInput = {
    create?: XOR<estoque_lojaCreateWithoutProdutoInput, estoque_lojaUncheckedCreateWithoutProdutoInput> | estoque_lojaCreateWithoutProdutoInput[] | estoque_lojaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: estoque_lojaCreateOrConnectWithoutProdutoInput | estoque_lojaCreateOrConnectWithoutProdutoInput[]
    createMany?: estoque_lojaCreateManyProdutoInputEnvelope
    connect?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
  }

  export type itens_pedidoCreateNestedManyWithoutProdutoInput = {
    create?: XOR<itens_pedidoCreateWithoutProdutoInput, itens_pedidoUncheckedCreateWithoutProdutoInput> | itens_pedidoCreateWithoutProdutoInput[] | itens_pedidoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: itens_pedidoCreateOrConnectWithoutProdutoInput | itens_pedidoCreateOrConnectWithoutProdutoInput[]
    createMany?: itens_pedidoCreateManyProdutoInputEnvelope
    connect?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
  }

  export type estoque_lojaUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<estoque_lojaCreateWithoutProdutoInput, estoque_lojaUncheckedCreateWithoutProdutoInput> | estoque_lojaCreateWithoutProdutoInput[] | estoque_lojaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: estoque_lojaCreateOrConnectWithoutProdutoInput | estoque_lojaCreateOrConnectWithoutProdutoInput[]
    createMany?: estoque_lojaCreateManyProdutoInputEnvelope
    connect?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
  }

  export type itens_pedidoUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<itens_pedidoCreateWithoutProdutoInput, itens_pedidoUncheckedCreateWithoutProdutoInput> | itens_pedidoCreateWithoutProdutoInput[] | itens_pedidoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: itens_pedidoCreateOrConnectWithoutProdutoInput | itens_pedidoCreateOrConnectWithoutProdutoInput[]
    createMany?: itens_pedidoCreateManyProdutoInputEnvelope
    connect?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type estoque_lojaUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<estoque_lojaCreateWithoutProdutoInput, estoque_lojaUncheckedCreateWithoutProdutoInput> | estoque_lojaCreateWithoutProdutoInput[] | estoque_lojaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: estoque_lojaCreateOrConnectWithoutProdutoInput | estoque_lojaCreateOrConnectWithoutProdutoInput[]
    upsert?: estoque_lojaUpsertWithWhereUniqueWithoutProdutoInput | estoque_lojaUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: estoque_lojaCreateManyProdutoInputEnvelope
    set?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    disconnect?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    delete?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    connect?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    update?: estoque_lojaUpdateWithWhereUniqueWithoutProdutoInput | estoque_lojaUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: estoque_lojaUpdateManyWithWhereWithoutProdutoInput | estoque_lojaUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: estoque_lojaScalarWhereInput | estoque_lojaScalarWhereInput[]
  }

  export type itens_pedidoUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<itens_pedidoCreateWithoutProdutoInput, itens_pedidoUncheckedCreateWithoutProdutoInput> | itens_pedidoCreateWithoutProdutoInput[] | itens_pedidoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: itens_pedidoCreateOrConnectWithoutProdutoInput | itens_pedidoCreateOrConnectWithoutProdutoInput[]
    upsert?: itens_pedidoUpsertWithWhereUniqueWithoutProdutoInput | itens_pedidoUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: itens_pedidoCreateManyProdutoInputEnvelope
    set?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    disconnect?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    delete?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    connect?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    update?: itens_pedidoUpdateWithWhereUniqueWithoutProdutoInput | itens_pedidoUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: itens_pedidoUpdateManyWithWhereWithoutProdutoInput | itens_pedidoUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: itens_pedidoScalarWhereInput | itens_pedidoScalarWhereInput[]
  }

  export type estoque_lojaUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<estoque_lojaCreateWithoutProdutoInput, estoque_lojaUncheckedCreateWithoutProdutoInput> | estoque_lojaCreateWithoutProdutoInput[] | estoque_lojaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: estoque_lojaCreateOrConnectWithoutProdutoInput | estoque_lojaCreateOrConnectWithoutProdutoInput[]
    upsert?: estoque_lojaUpsertWithWhereUniqueWithoutProdutoInput | estoque_lojaUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: estoque_lojaCreateManyProdutoInputEnvelope
    set?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    disconnect?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    delete?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    connect?: estoque_lojaWhereUniqueInput | estoque_lojaWhereUniqueInput[]
    update?: estoque_lojaUpdateWithWhereUniqueWithoutProdutoInput | estoque_lojaUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: estoque_lojaUpdateManyWithWhereWithoutProdutoInput | estoque_lojaUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: estoque_lojaScalarWhereInput | estoque_lojaScalarWhereInput[]
  }

  export type itens_pedidoUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<itens_pedidoCreateWithoutProdutoInput, itens_pedidoUncheckedCreateWithoutProdutoInput> | itens_pedidoCreateWithoutProdutoInput[] | itens_pedidoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: itens_pedidoCreateOrConnectWithoutProdutoInput | itens_pedidoCreateOrConnectWithoutProdutoInput[]
    upsert?: itens_pedidoUpsertWithWhereUniqueWithoutProdutoInput | itens_pedidoUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: itens_pedidoCreateManyProdutoInputEnvelope
    set?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    disconnect?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    delete?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    connect?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    update?: itens_pedidoUpdateWithWhereUniqueWithoutProdutoInput | itens_pedidoUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: itens_pedidoUpdateManyWithWhereWithoutProdutoInput | itens_pedidoUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: itens_pedidoScalarWhereInput | itens_pedidoScalarWhereInput[]
  }

  export type produtosCreateNestedOneWithoutEstoque_por_lojaInput = {
    create?: XOR<produtosCreateWithoutEstoque_por_lojaInput, produtosUncheckedCreateWithoutEstoque_por_lojaInput>
    connectOrCreate?: produtosCreateOrConnectWithoutEstoque_por_lojaInput
    connect?: produtosWhereUniqueInput
  }

  export type lojasCreateNestedOneWithoutEstoque_por_lojaInput = {
    create?: XOR<lojasCreateWithoutEstoque_por_lojaInput, lojasUncheckedCreateWithoutEstoque_por_lojaInput>
    connectOrCreate?: lojasCreateOrConnectWithoutEstoque_por_lojaInput
    connect?: lojasWhereUniqueInput
  }

  export type produtosUpdateOneRequiredWithoutEstoque_por_lojaNestedInput = {
    create?: XOR<produtosCreateWithoutEstoque_por_lojaInput, produtosUncheckedCreateWithoutEstoque_por_lojaInput>
    connectOrCreate?: produtosCreateOrConnectWithoutEstoque_por_lojaInput
    upsert?: produtosUpsertWithoutEstoque_por_lojaInput
    connect?: produtosWhereUniqueInput
    update?: XOR<XOR<produtosUpdateToOneWithWhereWithoutEstoque_por_lojaInput, produtosUpdateWithoutEstoque_por_lojaInput>, produtosUncheckedUpdateWithoutEstoque_por_lojaInput>
  }

  export type lojasUpdateOneRequiredWithoutEstoque_por_lojaNestedInput = {
    create?: XOR<lojasCreateWithoutEstoque_por_lojaInput, lojasUncheckedCreateWithoutEstoque_por_lojaInput>
    connectOrCreate?: lojasCreateOrConnectWithoutEstoque_por_lojaInput
    upsert?: lojasUpsertWithoutEstoque_por_lojaInput
    connect?: lojasWhereUniqueInput
    update?: XOR<XOR<lojasUpdateToOneWithWhereWithoutEstoque_por_lojaInput, lojasUpdateWithoutEstoque_por_lojaInput>, lojasUncheckedUpdateWithoutEstoque_por_lojaInput>
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type itens_pedidoCreateNestedManyWithoutPedidoInput = {
    create?: XOR<itens_pedidoCreateWithoutPedidoInput, itens_pedidoUncheckedCreateWithoutPedidoInput> | itens_pedidoCreateWithoutPedidoInput[] | itens_pedidoUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: itens_pedidoCreateOrConnectWithoutPedidoInput | itens_pedidoCreateOrConnectWithoutPedidoInput[]
    createMany?: itens_pedidoCreateManyPedidoInputEnvelope
    connect?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
  }

  export type lojasCreateNestedOneWithoutPedidosInput = {
    create?: XOR<lojasCreateWithoutPedidosInput, lojasUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: lojasCreateOrConnectWithoutPedidosInput
    connect?: lojasWhereUniqueInput
  }

  export type itens_pedidoUncheckedCreateNestedManyWithoutPedidoInput = {
    create?: XOR<itens_pedidoCreateWithoutPedidoInput, itens_pedidoUncheckedCreateWithoutPedidoInput> | itens_pedidoCreateWithoutPedidoInput[] | itens_pedidoUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: itens_pedidoCreateOrConnectWithoutPedidoInput | itens_pedidoCreateOrConnectWithoutPedidoInput[]
    createMany?: itens_pedidoCreateManyPedidoInputEnvelope
    connect?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type itens_pedidoUpdateManyWithoutPedidoNestedInput = {
    create?: XOR<itens_pedidoCreateWithoutPedidoInput, itens_pedidoUncheckedCreateWithoutPedidoInput> | itens_pedidoCreateWithoutPedidoInput[] | itens_pedidoUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: itens_pedidoCreateOrConnectWithoutPedidoInput | itens_pedidoCreateOrConnectWithoutPedidoInput[]
    upsert?: itens_pedidoUpsertWithWhereUniqueWithoutPedidoInput | itens_pedidoUpsertWithWhereUniqueWithoutPedidoInput[]
    createMany?: itens_pedidoCreateManyPedidoInputEnvelope
    set?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    disconnect?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    delete?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    connect?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    update?: itens_pedidoUpdateWithWhereUniqueWithoutPedidoInput | itens_pedidoUpdateWithWhereUniqueWithoutPedidoInput[]
    updateMany?: itens_pedidoUpdateManyWithWhereWithoutPedidoInput | itens_pedidoUpdateManyWithWhereWithoutPedidoInput[]
    deleteMany?: itens_pedidoScalarWhereInput | itens_pedidoScalarWhereInput[]
  }

  export type lojasUpdateOneWithoutPedidosNestedInput = {
    create?: XOR<lojasCreateWithoutPedidosInput, lojasUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: lojasCreateOrConnectWithoutPedidosInput
    upsert?: lojasUpsertWithoutPedidosInput
    disconnect?: lojasWhereInput | boolean
    delete?: lojasWhereInput | boolean
    connect?: lojasWhereUniqueInput
    update?: XOR<XOR<lojasUpdateToOneWithWhereWithoutPedidosInput, lojasUpdateWithoutPedidosInput>, lojasUncheckedUpdateWithoutPedidosInput>
  }

  export type itens_pedidoUncheckedUpdateManyWithoutPedidoNestedInput = {
    create?: XOR<itens_pedidoCreateWithoutPedidoInput, itens_pedidoUncheckedCreateWithoutPedidoInput> | itens_pedidoCreateWithoutPedidoInput[] | itens_pedidoUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: itens_pedidoCreateOrConnectWithoutPedidoInput | itens_pedidoCreateOrConnectWithoutPedidoInput[]
    upsert?: itens_pedidoUpsertWithWhereUniqueWithoutPedidoInput | itens_pedidoUpsertWithWhereUniqueWithoutPedidoInput[]
    createMany?: itens_pedidoCreateManyPedidoInputEnvelope
    set?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    disconnect?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    delete?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    connect?: itens_pedidoWhereUniqueInput | itens_pedidoWhereUniqueInput[]
    update?: itens_pedidoUpdateWithWhereUniqueWithoutPedidoInput | itens_pedidoUpdateWithWhereUniqueWithoutPedidoInput[]
    updateMany?: itens_pedidoUpdateManyWithWhereWithoutPedidoInput | itens_pedidoUpdateManyWithWhereWithoutPedidoInput[]
    deleteMany?: itens_pedidoScalarWhereInput | itens_pedidoScalarWhereInput[]
  }

  export type pedidosCreateNestedOneWithoutItensInput = {
    create?: XOR<pedidosCreateWithoutItensInput, pedidosUncheckedCreateWithoutItensInput>
    connectOrCreate?: pedidosCreateOrConnectWithoutItensInput
    connect?: pedidosWhereUniqueInput
  }

  export type produtosCreateNestedOneWithoutItens_pedidoInput = {
    create?: XOR<produtosCreateWithoutItens_pedidoInput, produtosUncheckedCreateWithoutItens_pedidoInput>
    connectOrCreate?: produtosCreateOrConnectWithoutItens_pedidoInput
    connect?: produtosWhereUniqueInput
  }

  export type pedidosUpdateOneRequiredWithoutItensNestedInput = {
    create?: XOR<pedidosCreateWithoutItensInput, pedidosUncheckedCreateWithoutItensInput>
    connectOrCreate?: pedidosCreateOrConnectWithoutItensInput
    upsert?: pedidosUpsertWithoutItensInput
    connect?: pedidosWhereUniqueInput
    update?: XOR<XOR<pedidosUpdateToOneWithWhereWithoutItensInput, pedidosUpdateWithoutItensInput>, pedidosUncheckedUpdateWithoutItensInput>
  }

  export type produtosUpdateOneWithoutItens_pedidoNestedInput = {
    create?: XOR<produtosCreateWithoutItens_pedidoInput, produtosUncheckedCreateWithoutItens_pedidoInput>
    connectOrCreate?: produtosCreateOrConnectWithoutItens_pedidoInput
    upsert?: produtosUpsertWithoutItens_pedidoInput
    disconnect?: produtosWhereInput | boolean
    delete?: produtosWhereInput | boolean
    connect?: produtosWhereUniqueInput
    update?: XOR<XOR<produtosUpdateToOneWithWhereWithoutItens_pedidoInput, produtosUpdateWithoutItens_pedidoInput>, produtosUncheckedUpdateWithoutItens_pedidoInput>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
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

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type estoque_lojaCreateWithoutLoja_refInput = {
    quantidade_estoque?: number
    quantidade_mostruario?: number
    quantidade_disponivel?: number
    produto: produtosCreateNestedOneWithoutEstoque_por_lojaInput
  }

  export type estoque_lojaUncheckedCreateWithoutLoja_refInput = {
    id?: number
    produto_id: number
    quantidade_estoque?: number
    quantidade_mostruario?: number
    quantidade_disponivel?: number
  }

  export type estoque_lojaCreateOrConnectWithoutLoja_refInput = {
    where: estoque_lojaWhereUniqueInput
    create: XOR<estoque_lojaCreateWithoutLoja_refInput, estoque_lojaUncheckedCreateWithoutLoja_refInput>
  }

  export type estoque_lojaCreateManyLoja_refInputEnvelope = {
    data: estoque_lojaCreateManyLoja_refInput | estoque_lojaCreateManyLoja_refInput[]
    skipDuplicates?: boolean
  }

  export type pedidosCreateWithoutLoja_refInput = {
    codigo_tiny?: string | null
    numero?: string | null
    data_pedido?: Date | string | null
    data_atualizacao?: Date | string
    status?: string | null
    cliente_nome?: string | null
    valor_total?: Decimal | DecimalJsLike | number | string | null
    id_vendedor?: string | null
    nome_vendedor?: string | null
    situacao?: string | null
    sincronizado_em?: Date | string | null
    estoque_baixado?: boolean
    estoque_baixado_em?: Date | string | null
    itens?: itens_pedidoCreateNestedManyWithoutPedidoInput
  }

  export type pedidosUncheckedCreateWithoutLoja_refInput = {
    id?: number
    codigo_tiny?: string | null
    numero?: string | null
    data_pedido?: Date | string | null
    data_atualizacao?: Date | string
    status?: string | null
    cliente_nome?: string | null
    valor_total?: Decimal | DecimalJsLike | number | string | null
    id_vendedor?: string | null
    nome_vendedor?: string | null
    situacao?: string | null
    sincronizado_em?: Date | string | null
    estoque_baixado?: boolean
    estoque_baixado_em?: Date | string | null
    itens?: itens_pedidoUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type pedidosCreateOrConnectWithoutLoja_refInput = {
    where: pedidosWhereUniqueInput
    create: XOR<pedidosCreateWithoutLoja_refInput, pedidosUncheckedCreateWithoutLoja_refInput>
  }

  export type pedidosCreateManyLoja_refInputEnvelope = {
    data: pedidosCreateManyLoja_refInput | pedidosCreateManyLoja_refInput[]
    skipDuplicates?: boolean
  }

  export type estoque_lojaUpsertWithWhereUniqueWithoutLoja_refInput = {
    where: estoque_lojaWhereUniqueInput
    update: XOR<estoque_lojaUpdateWithoutLoja_refInput, estoque_lojaUncheckedUpdateWithoutLoja_refInput>
    create: XOR<estoque_lojaCreateWithoutLoja_refInput, estoque_lojaUncheckedCreateWithoutLoja_refInput>
  }

  export type estoque_lojaUpdateWithWhereUniqueWithoutLoja_refInput = {
    where: estoque_lojaWhereUniqueInput
    data: XOR<estoque_lojaUpdateWithoutLoja_refInput, estoque_lojaUncheckedUpdateWithoutLoja_refInput>
  }

  export type estoque_lojaUpdateManyWithWhereWithoutLoja_refInput = {
    where: estoque_lojaScalarWhereInput
    data: XOR<estoque_lojaUpdateManyMutationInput, estoque_lojaUncheckedUpdateManyWithoutLoja_refInput>
  }

  export type estoque_lojaScalarWhereInput = {
    AND?: estoque_lojaScalarWhereInput | estoque_lojaScalarWhereInput[]
    OR?: estoque_lojaScalarWhereInput[]
    NOT?: estoque_lojaScalarWhereInput | estoque_lojaScalarWhereInput[]
    id?: IntFilter<"estoque_loja"> | number
    produto_id?: IntFilter<"estoque_loja"> | number
    loja_id?: IntFilter<"estoque_loja"> | number
    quantidade_estoque?: IntFilter<"estoque_loja"> | number
    quantidade_mostruario?: IntFilter<"estoque_loja"> | number
    quantidade_disponivel?: IntFilter<"estoque_loja"> | number
  }

  export type pedidosUpsertWithWhereUniqueWithoutLoja_refInput = {
    where: pedidosWhereUniqueInput
    update: XOR<pedidosUpdateWithoutLoja_refInput, pedidosUncheckedUpdateWithoutLoja_refInput>
    create: XOR<pedidosCreateWithoutLoja_refInput, pedidosUncheckedCreateWithoutLoja_refInput>
  }

  export type pedidosUpdateWithWhereUniqueWithoutLoja_refInput = {
    where: pedidosWhereUniqueInput
    data: XOR<pedidosUpdateWithoutLoja_refInput, pedidosUncheckedUpdateWithoutLoja_refInput>
  }

  export type pedidosUpdateManyWithWhereWithoutLoja_refInput = {
    where: pedidosScalarWhereInput
    data: XOR<pedidosUpdateManyMutationInput, pedidosUncheckedUpdateManyWithoutLoja_refInput>
  }

  export type pedidosScalarWhereInput = {
    AND?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
    OR?: pedidosScalarWhereInput[]
    NOT?: pedidosScalarWhereInput | pedidosScalarWhereInput[]
    id?: IntFilter<"pedidos"> | number
    codigo_tiny?: StringNullableFilter<"pedidos"> | string | null
    numero?: StringNullableFilter<"pedidos"> | string | null
    data_pedido?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    data_atualizacao?: DateTimeFilter<"pedidos"> | Date | string
    status?: StringNullableFilter<"pedidos"> | string | null
    cliente_nome?: StringNullableFilter<"pedidos"> | string | null
    valor_total?: DecimalNullableFilter<"pedidos"> | Decimal | DecimalJsLike | number | string | null
    id_vendedor?: StringNullableFilter<"pedidos"> | string | null
    nome_vendedor?: StringNullableFilter<"pedidos"> | string | null
    situacao?: StringNullableFilter<"pedidos"> | string | null
    loja_id?: IntNullableFilter<"pedidos"> | number | null
    sincronizado_em?: DateTimeNullableFilter<"pedidos"> | Date | string | null
    estoque_baixado?: BoolFilter<"pedidos"> | boolean
    estoque_baixado_em?: DateTimeNullableFilter<"pedidos"> | Date | string | null
  }

  export type estoque_lojaCreateWithoutProdutoInput = {
    quantidade_estoque?: number
    quantidade_mostruario?: number
    quantidade_disponivel?: number
    loja_ref: lojasCreateNestedOneWithoutEstoque_por_lojaInput
  }

  export type estoque_lojaUncheckedCreateWithoutProdutoInput = {
    id?: number
    loja_id: number
    quantidade_estoque?: number
    quantidade_mostruario?: number
    quantidade_disponivel?: number
  }

  export type estoque_lojaCreateOrConnectWithoutProdutoInput = {
    where: estoque_lojaWhereUniqueInput
    create: XOR<estoque_lojaCreateWithoutProdutoInput, estoque_lojaUncheckedCreateWithoutProdutoInput>
  }

  export type estoque_lojaCreateManyProdutoInputEnvelope = {
    data: estoque_lojaCreateManyProdutoInput | estoque_lojaCreateManyProdutoInput[]
    skipDuplicates?: boolean
  }

  export type itens_pedidoCreateWithoutProdutoInput = {
    codigo_produto_tiny?: string | null
    descricao?: string | null
    quantidade: Decimal | DecimalJsLike | number | string
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total: Decimal | DecimalJsLike | number | string
    pedido: pedidosCreateNestedOneWithoutItensInput
  }

  export type itens_pedidoUncheckedCreateWithoutProdutoInput = {
    id?: number
    pedido_id: number
    codigo_produto_tiny?: string | null
    descricao?: string | null
    quantidade: Decimal | DecimalJsLike | number | string
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total: Decimal | DecimalJsLike | number | string
  }

  export type itens_pedidoCreateOrConnectWithoutProdutoInput = {
    where: itens_pedidoWhereUniqueInput
    create: XOR<itens_pedidoCreateWithoutProdutoInput, itens_pedidoUncheckedCreateWithoutProdutoInput>
  }

  export type itens_pedidoCreateManyProdutoInputEnvelope = {
    data: itens_pedidoCreateManyProdutoInput | itens_pedidoCreateManyProdutoInput[]
    skipDuplicates?: boolean
  }

  export type estoque_lojaUpsertWithWhereUniqueWithoutProdutoInput = {
    where: estoque_lojaWhereUniqueInput
    update: XOR<estoque_lojaUpdateWithoutProdutoInput, estoque_lojaUncheckedUpdateWithoutProdutoInput>
    create: XOR<estoque_lojaCreateWithoutProdutoInput, estoque_lojaUncheckedCreateWithoutProdutoInput>
  }

  export type estoque_lojaUpdateWithWhereUniqueWithoutProdutoInput = {
    where: estoque_lojaWhereUniqueInput
    data: XOR<estoque_lojaUpdateWithoutProdutoInput, estoque_lojaUncheckedUpdateWithoutProdutoInput>
  }

  export type estoque_lojaUpdateManyWithWhereWithoutProdutoInput = {
    where: estoque_lojaScalarWhereInput
    data: XOR<estoque_lojaUpdateManyMutationInput, estoque_lojaUncheckedUpdateManyWithoutProdutoInput>
  }

  export type itens_pedidoUpsertWithWhereUniqueWithoutProdutoInput = {
    where: itens_pedidoWhereUniqueInput
    update: XOR<itens_pedidoUpdateWithoutProdutoInput, itens_pedidoUncheckedUpdateWithoutProdutoInput>
    create: XOR<itens_pedidoCreateWithoutProdutoInput, itens_pedidoUncheckedCreateWithoutProdutoInput>
  }

  export type itens_pedidoUpdateWithWhereUniqueWithoutProdutoInput = {
    where: itens_pedidoWhereUniqueInput
    data: XOR<itens_pedidoUpdateWithoutProdutoInput, itens_pedidoUncheckedUpdateWithoutProdutoInput>
  }

  export type itens_pedidoUpdateManyWithWhereWithoutProdutoInput = {
    where: itens_pedidoScalarWhereInput
    data: XOR<itens_pedidoUpdateManyMutationInput, itens_pedidoUncheckedUpdateManyWithoutProdutoInput>
  }

  export type itens_pedidoScalarWhereInput = {
    AND?: itens_pedidoScalarWhereInput | itens_pedidoScalarWhereInput[]
    OR?: itens_pedidoScalarWhereInput[]
    NOT?: itens_pedidoScalarWhereInput | itens_pedidoScalarWhereInput[]
    id?: IntFilter<"itens_pedido"> | number
    pedido_id?: IntFilter<"itens_pedido"> | number
    produto_id?: IntNullableFilter<"itens_pedido"> | number | null
    codigo_produto_tiny?: StringNullableFilter<"itens_pedido"> | string | null
    descricao?: StringNullableFilter<"itens_pedido"> | string | null
    quantidade?: DecimalFilter<"itens_pedido"> | Decimal | DecimalJsLike | number | string
    valor_unitario?: DecimalFilter<"itens_pedido"> | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalFilter<"itens_pedido"> | Decimal | DecimalJsLike | number | string
  }

  export type produtosCreateWithoutEstoque_por_lojaInput = {
    codigo: string
    descricao?: string | null
    fornecedor?: string | null
    preco_venda: Decimal | DecimalJsLike | number | string
    itens_pedido?: itens_pedidoCreateNestedManyWithoutProdutoInput
  }

  export type produtosUncheckedCreateWithoutEstoque_por_lojaInput = {
    id?: number
    codigo: string
    descricao?: string | null
    fornecedor?: string | null
    preco_venda: Decimal | DecimalJsLike | number | string
    itens_pedido?: itens_pedidoUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type produtosCreateOrConnectWithoutEstoque_por_lojaInput = {
    where: produtosWhereUniqueInput
    create: XOR<produtosCreateWithoutEstoque_por_lojaInput, produtosUncheckedCreateWithoutEstoque_por_lojaInput>
  }

  export type lojasCreateWithoutEstoque_por_lojaInput = {
    nome?: string | null
    endereco?: string | null
    gerente?: number | null
    qtd_total_prod?: number | null
    pedidos?: pedidosCreateNestedManyWithoutLoja_refInput
  }

  export type lojasUncheckedCreateWithoutEstoque_por_lojaInput = {
    id?: number
    nome?: string | null
    endereco?: string | null
    gerente?: number | null
    qtd_total_prod?: number | null
    pedidos?: pedidosUncheckedCreateNestedManyWithoutLoja_refInput
  }

  export type lojasCreateOrConnectWithoutEstoque_por_lojaInput = {
    where: lojasWhereUniqueInput
    create: XOR<lojasCreateWithoutEstoque_por_lojaInput, lojasUncheckedCreateWithoutEstoque_por_lojaInput>
  }

  export type produtosUpsertWithoutEstoque_por_lojaInput = {
    update: XOR<produtosUpdateWithoutEstoque_por_lojaInput, produtosUncheckedUpdateWithoutEstoque_por_lojaInput>
    create: XOR<produtosCreateWithoutEstoque_por_lojaInput, produtosUncheckedCreateWithoutEstoque_por_lojaInput>
    where?: produtosWhereInput
  }

  export type produtosUpdateToOneWithWhereWithoutEstoque_por_lojaInput = {
    where?: produtosWhereInput
    data: XOR<produtosUpdateWithoutEstoque_por_lojaInput, produtosUncheckedUpdateWithoutEstoque_por_lojaInput>
  }

  export type produtosUpdateWithoutEstoque_por_lojaInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    preco_venda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    itens_pedido?: itens_pedidoUpdateManyWithoutProdutoNestedInput
  }

  export type produtosUncheckedUpdateWithoutEstoque_por_lojaInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    preco_venda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    itens_pedido?: itens_pedidoUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type lojasUpsertWithoutEstoque_por_lojaInput = {
    update: XOR<lojasUpdateWithoutEstoque_por_lojaInput, lojasUncheckedUpdateWithoutEstoque_por_lojaInput>
    create: XOR<lojasCreateWithoutEstoque_por_lojaInput, lojasUncheckedCreateWithoutEstoque_por_lojaInput>
    where?: lojasWhereInput
  }

  export type lojasUpdateToOneWithWhereWithoutEstoque_por_lojaInput = {
    where?: lojasWhereInput
    data: XOR<lojasUpdateWithoutEstoque_por_lojaInput, lojasUncheckedUpdateWithoutEstoque_por_lojaInput>
  }

  export type lojasUpdateWithoutEstoque_por_lojaInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    gerente?: NullableIntFieldUpdateOperationsInput | number | null
    qtd_total_prod?: NullableIntFieldUpdateOperationsInput | number | null
    pedidos?: pedidosUpdateManyWithoutLoja_refNestedInput
  }

  export type lojasUncheckedUpdateWithoutEstoque_por_lojaInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    gerente?: NullableIntFieldUpdateOperationsInput | number | null
    qtd_total_prod?: NullableIntFieldUpdateOperationsInput | number | null
    pedidos?: pedidosUncheckedUpdateManyWithoutLoja_refNestedInput
  }

  export type itens_pedidoCreateWithoutPedidoInput = {
    codigo_produto_tiny?: string | null
    descricao?: string | null
    quantidade: Decimal | DecimalJsLike | number | string
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total: Decimal | DecimalJsLike | number | string
    produto?: produtosCreateNestedOneWithoutItens_pedidoInput
  }

  export type itens_pedidoUncheckedCreateWithoutPedidoInput = {
    id?: number
    produto_id?: number | null
    codigo_produto_tiny?: string | null
    descricao?: string | null
    quantidade: Decimal | DecimalJsLike | number | string
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total: Decimal | DecimalJsLike | number | string
  }

  export type itens_pedidoCreateOrConnectWithoutPedidoInput = {
    where: itens_pedidoWhereUniqueInput
    create: XOR<itens_pedidoCreateWithoutPedidoInput, itens_pedidoUncheckedCreateWithoutPedidoInput>
  }

  export type itens_pedidoCreateManyPedidoInputEnvelope = {
    data: itens_pedidoCreateManyPedidoInput | itens_pedidoCreateManyPedidoInput[]
    skipDuplicates?: boolean
  }

  export type lojasCreateWithoutPedidosInput = {
    nome?: string | null
    endereco?: string | null
    gerente?: number | null
    qtd_total_prod?: number | null
    estoque_por_loja?: estoque_lojaCreateNestedManyWithoutLoja_refInput
  }

  export type lojasUncheckedCreateWithoutPedidosInput = {
    id?: number
    nome?: string | null
    endereco?: string | null
    gerente?: number | null
    qtd_total_prod?: number | null
    estoque_por_loja?: estoque_lojaUncheckedCreateNestedManyWithoutLoja_refInput
  }

  export type lojasCreateOrConnectWithoutPedidosInput = {
    where: lojasWhereUniqueInput
    create: XOR<lojasCreateWithoutPedidosInput, lojasUncheckedCreateWithoutPedidosInput>
  }

  export type itens_pedidoUpsertWithWhereUniqueWithoutPedidoInput = {
    where: itens_pedidoWhereUniqueInput
    update: XOR<itens_pedidoUpdateWithoutPedidoInput, itens_pedidoUncheckedUpdateWithoutPedidoInput>
    create: XOR<itens_pedidoCreateWithoutPedidoInput, itens_pedidoUncheckedCreateWithoutPedidoInput>
  }

  export type itens_pedidoUpdateWithWhereUniqueWithoutPedidoInput = {
    where: itens_pedidoWhereUniqueInput
    data: XOR<itens_pedidoUpdateWithoutPedidoInput, itens_pedidoUncheckedUpdateWithoutPedidoInput>
  }

  export type itens_pedidoUpdateManyWithWhereWithoutPedidoInput = {
    where: itens_pedidoScalarWhereInput
    data: XOR<itens_pedidoUpdateManyMutationInput, itens_pedidoUncheckedUpdateManyWithoutPedidoInput>
  }

  export type lojasUpsertWithoutPedidosInput = {
    update: XOR<lojasUpdateWithoutPedidosInput, lojasUncheckedUpdateWithoutPedidosInput>
    create: XOR<lojasCreateWithoutPedidosInput, lojasUncheckedCreateWithoutPedidosInput>
    where?: lojasWhereInput
  }

  export type lojasUpdateToOneWithWhereWithoutPedidosInput = {
    where?: lojasWhereInput
    data: XOR<lojasUpdateWithoutPedidosInput, lojasUncheckedUpdateWithoutPedidosInput>
  }

  export type lojasUpdateWithoutPedidosInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    gerente?: NullableIntFieldUpdateOperationsInput | number | null
    qtd_total_prod?: NullableIntFieldUpdateOperationsInput | number | null
    estoque_por_loja?: estoque_lojaUpdateManyWithoutLoja_refNestedInput
  }

  export type lojasUncheckedUpdateWithoutPedidosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    gerente?: NullableIntFieldUpdateOperationsInput | number | null
    qtd_total_prod?: NullableIntFieldUpdateOperationsInput | number | null
    estoque_por_loja?: estoque_lojaUncheckedUpdateManyWithoutLoja_refNestedInput
  }

  export type pedidosCreateWithoutItensInput = {
    codigo_tiny?: string | null
    numero?: string | null
    data_pedido?: Date | string | null
    data_atualizacao?: Date | string
    status?: string | null
    cliente_nome?: string | null
    valor_total?: Decimal | DecimalJsLike | number | string | null
    id_vendedor?: string | null
    nome_vendedor?: string | null
    situacao?: string | null
    sincronizado_em?: Date | string | null
    estoque_baixado?: boolean
    estoque_baixado_em?: Date | string | null
    loja_ref?: lojasCreateNestedOneWithoutPedidosInput
  }

  export type pedidosUncheckedCreateWithoutItensInput = {
    id?: number
    codigo_tiny?: string | null
    numero?: string | null
    data_pedido?: Date | string | null
    data_atualizacao?: Date | string
    status?: string | null
    cliente_nome?: string | null
    valor_total?: Decimal | DecimalJsLike | number | string | null
    id_vendedor?: string | null
    nome_vendedor?: string | null
    situacao?: string | null
    loja_id?: number | null
    sincronizado_em?: Date | string | null
    estoque_baixado?: boolean
    estoque_baixado_em?: Date | string | null
  }

  export type pedidosCreateOrConnectWithoutItensInput = {
    where: pedidosWhereUniqueInput
    create: XOR<pedidosCreateWithoutItensInput, pedidosUncheckedCreateWithoutItensInput>
  }

  export type produtosCreateWithoutItens_pedidoInput = {
    codigo: string
    descricao?: string | null
    fornecedor?: string | null
    preco_venda: Decimal | DecimalJsLike | number | string
    estoque_por_loja?: estoque_lojaCreateNestedManyWithoutProdutoInput
  }

  export type produtosUncheckedCreateWithoutItens_pedidoInput = {
    id?: number
    codigo: string
    descricao?: string | null
    fornecedor?: string | null
    preco_venda: Decimal | DecimalJsLike | number | string
    estoque_por_loja?: estoque_lojaUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type produtosCreateOrConnectWithoutItens_pedidoInput = {
    where: produtosWhereUniqueInput
    create: XOR<produtosCreateWithoutItens_pedidoInput, produtosUncheckedCreateWithoutItens_pedidoInput>
  }

  export type pedidosUpsertWithoutItensInput = {
    update: XOR<pedidosUpdateWithoutItensInput, pedidosUncheckedUpdateWithoutItensInput>
    create: XOR<pedidosCreateWithoutItensInput, pedidosUncheckedCreateWithoutItensInput>
    where?: pedidosWhereInput
  }

  export type pedidosUpdateToOneWithWhereWithoutItensInput = {
    where?: pedidosWhereInput
    data: XOR<pedidosUpdateWithoutItensInput, pedidosUncheckedUpdateWithoutItensInput>
  }

  export type pedidosUpdateWithoutItensInput = {
    codigo_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    data_pedido?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_atualizacao?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cliente_nome?: NullableStringFieldUpdateOperationsInput | string | null
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    id_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    nome_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    situacao?: NullableStringFieldUpdateOperationsInput | string | null
    sincronizado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estoque_baixado?: BoolFieldUpdateOperationsInput | boolean
    estoque_baixado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loja_ref?: lojasUpdateOneWithoutPedidosNestedInput
  }

  export type pedidosUncheckedUpdateWithoutItensInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    data_pedido?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_atualizacao?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cliente_nome?: NullableStringFieldUpdateOperationsInput | string | null
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    id_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    nome_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    situacao?: NullableStringFieldUpdateOperationsInput | string | null
    loja_id?: NullableIntFieldUpdateOperationsInput | number | null
    sincronizado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estoque_baixado?: BoolFieldUpdateOperationsInput | boolean
    estoque_baixado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type produtosUpsertWithoutItens_pedidoInput = {
    update: XOR<produtosUpdateWithoutItens_pedidoInput, produtosUncheckedUpdateWithoutItens_pedidoInput>
    create: XOR<produtosCreateWithoutItens_pedidoInput, produtosUncheckedCreateWithoutItens_pedidoInput>
    where?: produtosWhereInput
  }

  export type produtosUpdateToOneWithWhereWithoutItens_pedidoInput = {
    where?: produtosWhereInput
    data: XOR<produtosUpdateWithoutItens_pedidoInput, produtosUncheckedUpdateWithoutItens_pedidoInput>
  }

  export type produtosUpdateWithoutItens_pedidoInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    preco_venda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estoque_por_loja?: estoque_lojaUpdateManyWithoutProdutoNestedInput
  }

  export type produtosUncheckedUpdateWithoutItens_pedidoInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    preco_venda?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estoque_por_loja?: estoque_lojaUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type estoque_lojaCreateManyLoja_refInput = {
    id?: number
    produto_id: number
    quantidade_estoque?: number
    quantidade_mostruario?: number
    quantidade_disponivel?: number
  }

  export type pedidosCreateManyLoja_refInput = {
    id?: number
    codigo_tiny?: string | null
    numero?: string | null
    data_pedido?: Date | string | null
    data_atualizacao?: Date | string
    status?: string | null
    cliente_nome?: string | null
    valor_total?: Decimal | DecimalJsLike | number | string | null
    id_vendedor?: string | null
    nome_vendedor?: string | null
    situacao?: string | null
    sincronizado_em?: Date | string | null
    estoque_baixado?: boolean
    estoque_baixado_em?: Date | string | null
  }

  export type estoque_lojaUpdateWithoutLoja_refInput = {
    quantidade_estoque?: IntFieldUpdateOperationsInput | number
    quantidade_mostruario?: IntFieldUpdateOperationsInput | number
    quantidade_disponivel?: IntFieldUpdateOperationsInput | number
    produto?: produtosUpdateOneRequiredWithoutEstoque_por_lojaNestedInput
  }

  export type estoque_lojaUncheckedUpdateWithoutLoja_refInput = {
    id?: IntFieldUpdateOperationsInput | number
    produto_id?: IntFieldUpdateOperationsInput | number
    quantidade_estoque?: IntFieldUpdateOperationsInput | number
    quantidade_mostruario?: IntFieldUpdateOperationsInput | number
    quantidade_disponivel?: IntFieldUpdateOperationsInput | number
  }

  export type estoque_lojaUncheckedUpdateManyWithoutLoja_refInput = {
    id?: IntFieldUpdateOperationsInput | number
    produto_id?: IntFieldUpdateOperationsInput | number
    quantidade_estoque?: IntFieldUpdateOperationsInput | number
    quantidade_mostruario?: IntFieldUpdateOperationsInput | number
    quantidade_disponivel?: IntFieldUpdateOperationsInput | number
  }

  export type pedidosUpdateWithoutLoja_refInput = {
    codigo_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    data_pedido?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_atualizacao?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cliente_nome?: NullableStringFieldUpdateOperationsInput | string | null
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    id_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    nome_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    situacao?: NullableStringFieldUpdateOperationsInput | string | null
    sincronizado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estoque_baixado?: BoolFieldUpdateOperationsInput | boolean
    estoque_baixado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itens?: itens_pedidoUpdateManyWithoutPedidoNestedInput
  }

  export type pedidosUncheckedUpdateWithoutLoja_refInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    data_pedido?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_atualizacao?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cliente_nome?: NullableStringFieldUpdateOperationsInput | string | null
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    id_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    nome_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    situacao?: NullableStringFieldUpdateOperationsInput | string | null
    sincronizado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estoque_baixado?: BoolFieldUpdateOperationsInput | boolean
    estoque_baixado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itens?: itens_pedidoUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type pedidosUncheckedUpdateManyWithoutLoja_refInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    data_pedido?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_atualizacao?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    cliente_nome?: NullableStringFieldUpdateOperationsInput | string | null
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    id_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    nome_vendedor?: NullableStringFieldUpdateOperationsInput | string | null
    situacao?: NullableStringFieldUpdateOperationsInput | string | null
    sincronizado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estoque_baixado?: BoolFieldUpdateOperationsInput | boolean
    estoque_baixado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type estoque_lojaCreateManyProdutoInput = {
    id?: number
    loja_id: number
    quantidade_estoque?: number
    quantidade_mostruario?: number
    quantidade_disponivel?: number
  }

  export type itens_pedidoCreateManyProdutoInput = {
    id?: number
    pedido_id: number
    codigo_produto_tiny?: string | null
    descricao?: string | null
    quantidade: Decimal | DecimalJsLike | number | string
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total: Decimal | DecimalJsLike | number | string
  }

  export type estoque_lojaUpdateWithoutProdutoInput = {
    quantidade_estoque?: IntFieldUpdateOperationsInput | number
    quantidade_mostruario?: IntFieldUpdateOperationsInput | number
    quantidade_disponivel?: IntFieldUpdateOperationsInput | number
    loja_ref?: lojasUpdateOneRequiredWithoutEstoque_por_lojaNestedInput
  }

  export type estoque_lojaUncheckedUpdateWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    loja_id?: IntFieldUpdateOperationsInput | number
    quantidade_estoque?: IntFieldUpdateOperationsInput | number
    quantidade_mostruario?: IntFieldUpdateOperationsInput | number
    quantidade_disponivel?: IntFieldUpdateOperationsInput | number
  }

  export type estoque_lojaUncheckedUpdateManyWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    loja_id?: IntFieldUpdateOperationsInput | number
    quantidade_estoque?: IntFieldUpdateOperationsInput | number
    quantidade_mostruario?: IntFieldUpdateOperationsInput | number
    quantidade_disponivel?: IntFieldUpdateOperationsInput | number
  }

  export type itens_pedidoUpdateWithoutProdutoInput = {
    codigo_produto_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pedido?: pedidosUpdateOneRequiredWithoutItensNestedInput
  }

  export type itens_pedidoUncheckedUpdateWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    pedido_id?: IntFieldUpdateOperationsInput | number
    codigo_produto_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type itens_pedidoUncheckedUpdateManyWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    pedido_id?: IntFieldUpdateOperationsInput | number
    codigo_produto_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type itens_pedidoCreateManyPedidoInput = {
    id?: number
    produto_id?: number | null
    codigo_produto_tiny?: string | null
    descricao?: string | null
    quantidade: Decimal | DecimalJsLike | number | string
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total: Decimal | DecimalJsLike | number | string
  }

  export type itens_pedidoUpdateWithoutPedidoInput = {
    codigo_produto_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    produto?: produtosUpdateOneWithoutItens_pedidoNestedInput
  }

  export type itens_pedidoUncheckedUpdateWithoutPedidoInput = {
    id?: IntFieldUpdateOperationsInput | number
    produto_id?: NullableIntFieldUpdateOperationsInput | number | null
    codigo_produto_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type itens_pedidoUncheckedUpdateManyWithoutPedidoInput = {
    id?: IntFieldUpdateOperationsInput | number
    produto_id?: NullableIntFieldUpdateOperationsInput | number | null
    codigo_produto_tiny?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
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