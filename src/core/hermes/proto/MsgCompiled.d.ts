import * as $protobuf from "protobufjs";
/** Namespace common. */
export namespace common {
  /** Properties of an Asset. */
  interface IAsset {
    /** Asset chain */
    chain?: string | null;

    /** Asset symbol */
    symbol?: string | null;

    /** Asset ticker */
    ticker?: string | null;

    /** Asset synth */
    synth?: boolean | null;
  }

  /** Represents an Asset. */
  class Asset implements IAsset {
    /**
     * Constructs a new Asset.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IAsset);

    /** Asset chain. */
    public chain: string;

    /** Asset symbol. */
    public symbol: string;

    /** Asset ticker. */
    public ticker: string;

    /** Asset synth. */
    public synth: boolean;

    /**
     * Creates a new Asset instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Asset instance
     */
    public static create(properties?: common.IAsset): common.Asset;

    /**
     * Encodes the specified Asset message. Does not implicitly {@link common.Asset.verify|verify} messages.
     * @param message Asset message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IAsset,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Asset message, length delimited. Does not implicitly {@link common.Asset.verify|verify} messages.
     * @param message Asset message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IAsset,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes an Asset message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Asset
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.Asset;

    /**
     * Decodes an Asset message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Asset
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.Asset;

    /**
     * Verifies an Asset message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an Asset message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Asset
     */
    public static fromObject(object: { [k: string]: any }): common.Asset;

    /**
     * Creates a plain object from an Asset message. Also converts values to other types if specified.
     * @param message Asset
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.Asset,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Asset to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a Coin. */
  interface ICoin {
    /** Coin asset */
    asset?: common.IAsset | null;

    /** Coin amount */
    amount?: string | null;

    /** Coin decimals */
    decimals?: number | Long | null;
  }

  /** Represents a Coin. */
  class Coin implements ICoin {
    /**
     * Constructs a new Coin.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.ICoin);

    /** Coin asset. */
    public asset?: common.IAsset | null;

    /** Coin amount. */
    public amount: string;

    /** Coin decimals. */
    public decimals: number | Long;

    /**
     * Creates a new Coin instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Coin instance
     */
    public static create(properties?: common.ICoin): common.Coin;

    /**
     * Encodes the specified Coin message. Does not implicitly {@link common.Coin.verify|verify} messages.
     * @param message Coin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.ICoin,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Coin message, length delimited. Does not implicitly {@link common.Coin.verify|verify} messages.
     * @param message Coin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.ICoin,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a Coin message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Coin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.Coin;

    /**
     * Decodes a Coin message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Coin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.Coin;

    /**
     * Verifies a Coin message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Coin message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Coin
     */
    public static fromObject(object: { [k: string]: any }): common.Coin;

    /**
     * Creates a plain object from a Coin message. Also converts values to other types if specified.
     * @param message Coin
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.Coin,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Coin to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a PubKeySet. */
  interface IPubKeySet {
    /** PubKeySet secp256k1 */
    secp256k1?: string | null;

    /** PubKeySet ed25519 */
    ed25519?: string | null;
  }

  /** Represents a PubKeySet. */
  class PubKeySet implements IPubKeySet {
    /**
     * Constructs a new PubKeySet.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IPubKeySet);

    /** PubKeySet secp256k1. */
    public secp256k1: string;

    /** PubKeySet ed25519. */
    public ed25519: string;

    /**
     * Creates a new PubKeySet instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PubKeySet instance
     */
    public static create(properties?: common.IPubKeySet): common.PubKeySet;

    /**
     * Encodes the specified PubKeySet message. Does not implicitly {@link common.PubKeySet.verify|verify} messages.
     * @param message PubKeySet message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IPubKeySet,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified PubKeySet message, length delimited. Does not implicitly {@link common.PubKeySet.verify|verify} messages.
     * @param message PubKeySet message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IPubKeySet,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a PubKeySet message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PubKeySet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.PubKeySet;

    /**
     * Decodes a PubKeySet message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PubKeySet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.PubKeySet;

    /**
     * Verifies a PubKeySet message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a PubKeySet message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PubKeySet
     */
    public static fromObject(object: { [k: string]: any }): common.PubKeySet;

    /**
     * Creates a plain object from a PubKeySet message. Also converts values to other types if specified.
     * @param message PubKeySet
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.PubKeySet,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this PubKeySet to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a Tx. */
  interface ITx {
    /** Tx id */
    id?: string | null;

    /** Tx chain */
    chain?: string | null;

    /** Tx fromAddress */
    fromAddress?: string | null;

    /** Tx toAddress */
    toAddress?: string | null;

    /** Tx coins */
    coins?: common.ICoin[] | null;

    /** Tx gas */
    gas?: common.ICoin[] | null;

    /** Tx memo */
    memo?: string | null;

    /** Tx payload */
    payload?: Uint8Array | null;

    /** Tx isXcMsg */
    isXcMsg?: boolean | null;
  }

  /** Represents a Tx. */
  class Tx implements ITx {
    /**
     * Constructs a new Tx.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.ITx);

    /** Tx id. */
    public id: string;

    /** Tx chain. */
    public chain: string;

    /** Tx fromAddress. */
    public fromAddress: string;

    /** Tx toAddress. */
    public toAddress: string;

    /** Tx coins. */
    public coins: common.ICoin[];

    /** Tx gas. */
    public gas: common.ICoin[];

    /** Tx memo. */
    public memo: string;

    /** Tx payload. */
    public payload: Uint8Array;

    /** Tx isXcMsg. */
    public isXcMsg: boolean;

    /**
     * Creates a new Tx instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Tx instance
     */
    public static create(properties?: common.ITx): common.Tx;

    /**
     * Encodes the specified Tx message. Does not implicitly {@link common.Tx.verify|verify} messages.
     * @param message Tx message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.ITx,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Tx message, length delimited. Does not implicitly {@link common.Tx.verify|verify} messages.
     * @param message Tx message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.ITx,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a Tx message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Tx
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.Tx;

    /**
     * Decodes a Tx message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Tx
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.Tx;

    /**
     * Verifies a Tx message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Tx message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Tx
     */
    public static fromObject(object: { [k: string]: any }): common.Tx;

    /**
     * Creates a plain object from a Tx message. Also converts values to other types if specified.
     * @param message Tx
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.Tx,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Tx to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a Fee. */
  interface IFee {
    /** Fee coins */
    coins?: common.ICoin[] | null;

    /** Fee poolDeduct */
    poolDeduct?: string | null;
  }

  /** Represents a Fee. */
  class Fee implements IFee {
    /**
     * Constructs a new Fee.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IFee);

    /** Fee coins. */
    public coins: common.ICoin[];

    /** Fee poolDeduct. */
    public poolDeduct: string;

    /**
     * Creates a new Fee instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Fee instance
     */
    public static create(properties?: common.IFee): common.Fee;

    /**
     * Encodes the specified Fee message. Does not implicitly {@link common.Fee.verify|verify} messages.
     * @param message Fee message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IFee,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Fee message, length delimited. Does not implicitly {@link common.Fee.verify|verify} messages.
     * @param message Fee message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IFee,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a Fee message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Fee
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.Fee;

    /**
     * Decodes a Fee message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Fee
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.Fee;

    /**
     * Verifies a Fee message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Fee message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Fee
     */
    public static fromObject(object: { [k: string]: any }): common.Fee;

    /**
     * Creates a plain object from a Fee message. Also converts values to other types if specified.
     * @param message Fee
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.Fee,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Fee to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a KVPair. */
  interface IKVPair {
    /** KVPair key */
    key?: Uint8Array | null;

    /** KVPair value */
    value?: Uint8Array | null;
  }

  /** Represents a KVPair. */
  class KVPair implements IKVPair {
    /**
     * Constructs a new KVPair.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IKVPair);

    /** KVPair key. */
    public key: Uint8Array;

    /** KVPair value. */
    public value: Uint8Array;

    /**
     * Creates a new KVPair instance using the specified properties.
     * @param [properties] Properties to set
     * @returns KVPair instance
     */
    public static create(properties?: common.IKVPair): common.KVPair;

    /**
     * Encodes the specified KVPair message. Does not implicitly {@link common.KVPair.verify|verify} messages.
     * @param message KVPair message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IKVPair,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified KVPair message, length delimited. Does not implicitly {@link common.KVPair.verify|verify} messages.
     * @param message KVPair message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IKVPair,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a KVPair message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns KVPair
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.KVPair;

    /**
     * Decodes a KVPair message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns KVPair
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.KVPair;

    /**
     * Verifies a KVPair message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a KVPair message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns KVPair
     */
    public static fromObject(object: { [k: string]: any }): common.KVPair;

    /**
     * Creates a plain object from a KVPair message. Also converts values to other types if specified.
     * @param message KVPair
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.KVPair,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this KVPair to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a DcAddress. */
  interface IDcAddress {
    /** DcAddress address */
    address?: Uint8Array | null;
  }

  /** Represents a DcAddress. */
  class DcAddress implements IDcAddress {
    /**
     * Constructs a new DcAddress.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IDcAddress);

    /** DcAddress address. */
    public address: Uint8Array;

    /**
     * Creates a new DcAddress instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DcAddress instance
     */
    public static create(properties?: common.IDcAddress): common.DcAddress;

    /**
     * Encodes the specified DcAddress message. Does not implicitly {@link common.DcAddress.verify|verify} messages.
     * @param message DcAddress message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IDcAddress,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified DcAddress message, length delimited. Does not implicitly {@link common.DcAddress.verify|verify} messages.
     * @param message DcAddress message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IDcAddress,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a DcAddress message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DcAddress
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.DcAddress;

    /**
     * Decodes a DcAddress message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DcAddress
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.DcAddress;

    /**
     * Verifies a DcAddress message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a DcAddress message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DcAddress
     */
    public static fromObject(object: { [k: string]: any }): common.DcAddress;

    /**
     * Creates a plain object from a DcAddress message. Also converts values to other types if specified.
     * @param message DcAddress
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.DcAddress,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this DcAddress to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a DcHash. */
  interface IDcHash {
    /** DcHash hash */
    hash?: Uint8Array[] | null;
  }

  /** Represents a DcHash. */
  class DcHash implements IDcHash {
    /**
     * Constructs a new DcHash.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IDcHash);

    /** DcHash hash. */
    public hash: Uint8Array[];

    /**
     * Creates a new DcHash instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DcHash instance
     */
    public static create(properties?: common.IDcHash): common.DcHash;

    /**
     * Encodes the specified DcHash message. Does not implicitly {@link common.DcHash.verify|verify} messages.
     * @param message DcHash message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IDcHash,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified DcHash message, length delimited. Does not implicitly {@link common.DcHash.verify|verify} messages.
     * @param message DcHash message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IDcHash,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a DcHash message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DcHash
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.DcHash;

    /**
     * Decodes a DcHash message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DcHash
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.DcHash;

    /**
     * Verifies a DcHash message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a DcHash message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DcHash
     */
    public static fromObject(object: { [k: string]: any }): common.DcHash;

    /**
     * Creates a plain object from a DcHash message. Also converts values to other types if specified.
     * @param message DcHash
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.DcHash,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this DcHash to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a H128. */
  interface IH128 {
    /** H128 Hi */
    Hi?: number | Long | null;

    /** H128 Lo */
    Lo?: number | Long | null;
  }

  /** Represents a H128. */
  class H128 implements IH128 {
    /**
     * Constructs a new H128.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IH128);

    /** H128 Hi. */
    public Hi: number | Long;

    /** H128 Lo. */
    public Lo: number | Long;

    /**
     * Creates a new H128 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns H128 instance
     */
    public static create(properties?: common.IH128): common.H128;

    /**
     * Encodes the specified H128 message. Does not implicitly {@link common.H128.verify|verify} messages.
     * @param message H128 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IH128,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified H128 message, length delimited. Does not implicitly {@link common.H128.verify|verify} messages.
     * @param message H128 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IH128,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a H128 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns H128
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.H128;

    /**
     * Decodes a H128 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns H128
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.H128;

    /**
     * Verifies a H128 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a H128 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns H128
     */
    public static fromObject(object: { [k: string]: any }): common.H128;

    /**
     * Creates a plain object from a H128 message. Also converts values to other types if specified.
     * @param message H128
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.H128,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this H128 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a H160. */
  interface IH160 {
    /** H160 Hi */
    Hi?: common.IH128 | null;

    /** H160 Lo */
    Lo?: number | null;
  }

  /** Represents a H160. */
  class H160 implements IH160 {
    /**
     * Constructs a new H160.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IH160);

    /** H160 Hi. */
    public Hi?: common.IH128 | null;

    /** H160 Lo. */
    public Lo: number;

    /**
     * Creates a new H160 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns H160 instance
     */
    public static create(properties?: common.IH160): common.H160;

    /**
     * Encodes the specified H160 message. Does not implicitly {@link common.H160.verify|verify} messages.
     * @param message H160 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IH160,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified H160 message, length delimited. Does not implicitly {@link common.H160.verify|verify} messages.
     * @param message H160 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IH160,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a H160 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns H160
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.H160;

    /**
     * Decodes a H160 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns H160
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.H160;

    /**
     * Verifies a H160 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a H160 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns H160
     */
    public static fromObject(object: { [k: string]: any }): common.H160;

    /**
     * Creates a plain object from a H160 message. Also converts values to other types if specified.
     * @param message H160
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.H160,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this H160 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a H256. */
  interface IH256 {
    /** H256 Hi */
    Hi?: common.IH128 | null;

    /** H256 Lo */
    Lo?: common.IH128 | null;
  }

  /** Represents a H256. */
  class H256 implements IH256 {
    /**
     * Constructs a new H256.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IH256);

    /** H256 Hi. */
    public Hi?: common.IH128 | null;

    /** H256 Lo. */
    public Lo?: common.IH128 | null;

    /**
     * Creates a new H256 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns H256 instance
     */
    public static create(properties?: common.IH256): common.H256;

    /**
     * Encodes the specified H256 message. Does not implicitly {@link common.H256.verify|verify} messages.
     * @param message H256 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IH256,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified H256 message, length delimited. Does not implicitly {@link common.H256.verify|verify} messages.
     * @param message H256 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IH256,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a H256 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns H256
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.H256;

    /**
     * Decodes a H256 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns H256
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.H256;

    /**
     * Verifies a H256 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a H256 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns H256
     */
    public static fromObject(object: { [k: string]: any }): common.H256;

    /**
     * Creates a plain object from a H256 message. Also converts values to other types if specified.
     * @param message H256
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.H256,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this H256 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a Validator. */
  interface IValidator {
    /** Validator address */
    address?: Uint8Array | null;

    /** Validator power */
    power?: number | Long | null;
  }

  /** Represents a Validator. */
  class Validator implements IValidator {
    /**
     * Constructs a new Validator.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IValidator);

    /** Validator address. */
    public address: Uint8Array;

    /** Validator power. */
    public power: number | Long;

    /**
     * Creates a new Validator instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Validator instance
     */
    public static create(properties?: common.IValidator): common.Validator;

    /**
     * Encodes the specified Validator message. Does not implicitly {@link common.Validator.verify|verify} messages.
     * @param message Validator message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IValidator,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Validator message, length delimited. Does not implicitly {@link common.Validator.verify|verify} messages.
     * @param message Validator message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IValidator,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a Validator message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Validator
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.Validator;

    /**
     * Decodes a Validator message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Validator
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.Validator;

    /**
     * Verifies a Validator message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Validator message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Validator
     */
    public static fromObject(object: { [k: string]: any }): common.Validator;

    /**
     * Creates a plain object from a Validator message. Also converts values to other types if specified.
     * @param message Validator
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.Validator,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Validator to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a ValidatorsWrapper. */
  interface IValidatorsWrapper {
    /** ValidatorsWrapper validators */
    validators?: common.IValidator[] | null;
  }

  /** Represents a ValidatorsWrapper. */
  class ValidatorsWrapper implements IValidatorsWrapper {
    /**
     * Constructs a new ValidatorsWrapper.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IValidatorsWrapper);

    /** ValidatorsWrapper validators. */
    public validators: common.IValidator[];

    /**
     * Creates a new ValidatorsWrapper instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ValidatorsWrapper instance
     */
    public static create(
      properties?: common.IValidatorsWrapper
    ): common.ValidatorsWrapper;

    /**
     * Encodes the specified ValidatorsWrapper message. Does not implicitly {@link common.ValidatorsWrapper.verify|verify} messages.
     * @param message ValidatorsWrapper message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IValidatorsWrapper,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified ValidatorsWrapper message, length delimited. Does not implicitly {@link common.ValidatorsWrapper.verify|verify} messages.
     * @param message ValidatorsWrapper message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IValidatorsWrapper,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a ValidatorsWrapper message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ValidatorsWrapper
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.ValidatorsWrapper;

    /**
     * Decodes a ValidatorsWrapper message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ValidatorsWrapper
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.ValidatorsWrapper;

    /**
     * Verifies a ValidatorsWrapper message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a ValidatorsWrapper message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ValidatorsWrapper
     */
    public static fromObject(object: {
      [k: string]: any;
    }): common.ValidatorsWrapper;

    /**
     * Creates a plain object from a ValidatorsWrapper message. Also converts values to other types if specified.
     * @param message ValidatorsWrapper
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.ValidatorsWrapper,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this ValidatorsWrapper to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a ProtoUint. */
  interface IProtoUint {
    /** ProtoUint value */
    value?: string | null;
  }

  /** Represents a ProtoUint. */
  class ProtoUint implements IProtoUint {
    /**
     * Constructs a new ProtoUint.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IProtoUint);

    /** ProtoUint value. */
    public value: string;

    /**
     * Creates a new ProtoUint instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ProtoUint instance
     */
    public static create(properties?: common.IProtoUint): common.ProtoUint;

    /**
     * Encodes the specified ProtoUint message. Does not implicitly {@link common.ProtoUint.verify|verify} messages.
     * @param message ProtoUint message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IProtoUint,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified ProtoUint message, length delimited. Does not implicitly {@link common.ProtoUint.verify|verify} messages.
     * @param message ProtoUint message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IProtoUint,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a ProtoUint message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ProtoUint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.ProtoUint;

    /**
     * Decodes a ProtoUint message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ProtoUint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.ProtoUint;

    /**
     * Verifies a ProtoUint message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a ProtoUint message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ProtoUint
     */
    public static fromObject(object: { [k: string]: any }): common.ProtoUint;

    /**
     * Creates a plain object from a ProtoUint message. Also converts values to other types if specified.
     * @param message ProtoUint
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.ProtoUint,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this ProtoUint to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }
}

/** Namespace hermes. */
export namespace hermes {
  /** Namespace hermes. */
  namespace hermes {
    /** Namespace v1beta1. */
    namespace v1beta1 {
      /** Namespace types. */
      namespace types {
        /** Properties of a MsgDeposit. */
        interface IMsgDeposit {
          /** MsgDeposit coins */
          coins?: common.ICoin[] | null;

          /** MsgDeposit memo */
          memo?: string | null;

          /** MsgDeposit signer */
          signer?: Uint8Array | null;
        }

        /** Represents a MsgDeposit. */
        class MsgDeposit implements IMsgDeposit {
          /**
           * Constructs a new MsgDeposit.
           * @param [properties] Properties to set
           */
          constructor(properties?: hermes.hermes.v1beta1.types.IMsgDeposit);

          /** MsgDeposit coins. */
          public coins: common.ICoin[];

          /** MsgDeposit memo. */
          public memo: string;

          /** MsgDeposit signer. */
          public signer: Uint8Array;

          /**
           * Creates a new MsgDeposit instance using the specified properties.
           * @param [properties] Properties to set
           * @returns MsgDeposit instance
           */
          public static create(
            properties?: hermes.hermes.v1beta1.types.IMsgDeposit
          ): hermes.hermes.v1beta1.types.MsgDeposit;

          /**
           * Encodes the specified MsgDeposit message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgDeposit.verify|verify} messages.
           * @param message MsgDeposit message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encode(
            message: hermes.hermes.v1beta1.types.IMsgDeposit,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Encodes the specified MsgDeposit message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgDeposit.verify|verify} messages.
           * @param message MsgDeposit message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encodeDelimited(
            message: hermes.hermes.v1beta1.types.IMsgDeposit,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Decodes a MsgDeposit message from the specified reader or buffer.
           * @param reader Reader or buffer to decode from
           * @param [length] Message length if known beforehand
           * @returns MsgDeposit
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decode(
            reader: $protobuf.Reader | Uint8Array,
            length?: number
          ): hermes.hermes.v1beta1.types.MsgDeposit;

          /**
           * Decodes a MsgDeposit message from the specified reader or buffer, length delimited.
           * @param reader Reader or buffer to decode from
           * @returns MsgDeposit
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decodeDelimited(
            reader: $protobuf.Reader | Uint8Array
          ): hermes.hermes.v1beta1.types.MsgDeposit;

          /**
           * Verifies a MsgDeposit message.
           * @param message Plain object to verify
           * @returns `null` if valid, otherwise the reason why it is not
           */
          public static verify(message: { [k: string]: any }): string | null;

          /**
           * Creates a MsgDeposit message from a plain object. Also converts values to their respective internal types.
           * @param object Plain object
           * @returns MsgDeposit
           */
          public static fromObject(object: {
            [k: string]: any;
          }): hermes.hermes.v1beta1.types.MsgDeposit;

          /**
           * Creates a plain object from a MsgDeposit message. Also converts values to other types if specified.
           * @param message MsgDeposit
           * @param [options] Conversion options
           * @returns Plain object
           */
          public static toObject(
            message: hermes.hermes.v1beta1.types.MsgDeposit,
            options?: $protobuf.IConversionOptions
          ): { [k: string]: any };

          /**
           * Converts this MsgDeposit to JSON.
           * @returns JSON object
           */
          public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgSend. */
        interface IMsgSend {
          /** MsgSend fromAddress */
          fromAddress?: Uint8Array | null;

          /** MsgSend toAddress */
          toAddress?: Uint8Array | null;

          /** MsgSend amount */
          amount?: cosmos.base.v1beta1.ICoin[] | null;
        }

        /** Represents a MsgSend. */
        class MsgSend implements IMsgSend {
          /**
           * Constructs a new MsgSend.
           * @param [properties] Properties to set
           */
          constructor(properties?: hermes.hermes.v1beta1.types.IMsgSend);

          /** MsgSend fromAddress. */
          public fromAddress: Uint8Array;

          /** MsgSend toAddress. */
          public toAddress: Uint8Array;

          /** MsgSend amount. */
          public amount: cosmos.base.v1beta1.ICoin[];

          /**
           * Creates a new MsgSend instance using the specified properties.
           * @param [properties] Properties to set
           * @returns MsgSend instance
           */
          public static create(
            properties?: hermes.hermes.v1beta1.types.IMsgSend
          ): hermes.hermes.v1beta1.types.MsgSend;

          /**
           * Encodes the specified MsgSend message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSend.verify|verify} messages.
           * @param message MsgSend message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encode(
            message: hermes.hermes.v1beta1.types.IMsgSend,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Encodes the specified MsgSend message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSend.verify|verify} messages.
           * @param message MsgSend message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encodeDelimited(
            message: hermes.hermes.v1beta1.types.IMsgSend,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Decodes a MsgSend message from the specified reader or buffer.
           * @param reader Reader or buffer to decode from
           * @param [length] Message length if known beforehand
           * @returns MsgSend
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decode(
            reader: $protobuf.Reader | Uint8Array,
            length?: number
          ): hermes.hermes.v1beta1.types.MsgSend;

          /**
           * Decodes a MsgSend message from the specified reader or buffer, length delimited.
           * @param reader Reader or buffer to decode from
           * @returns MsgSend
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decodeDelimited(
            reader: $protobuf.Reader | Uint8Array
          ): hermes.hermes.v1beta1.types.MsgSend;

          /**
           * Verifies a MsgSend message.
           * @param message Plain object to verify
           * @returns `null` if valid, otherwise the reason why it is not
           */
          public static verify(message: { [k: string]: any }): string | null;

          /**
           * Creates a MsgSend message from a plain object. Also converts values to their respective internal types.
           * @param object Plain object
           * @returns MsgSend
           */
          public static fromObject(object: {
            [k: string]: any;
          }): hermes.hermes.v1beta1.types.MsgSend;

          /**
           * Creates a plain object from a MsgSend message. Also converts values to other types if specified.
           * @param message MsgSend
           * @param [options] Conversion options
           * @returns Plain object
           */
          public static toObject(
            message: hermes.hermes.v1beta1.types.MsgSend,
            options?: $protobuf.IConversionOptions
          ): { [k: string]: any };

          /**
           * Converts this MsgSend to JSON.
           * @returns JSON object
           */
          public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgSetIPAddress. */
        interface IMsgSetIPAddress {
          /** MsgSetIPAddress ipAddress */
          ipAddress?: string | null;

          /** MsgSetIPAddress signer */
          signer?: Uint8Array | null;
        }

        /** Represents a MsgSetIPAddress. */
        class MsgSetIPAddress implements IMsgSetIPAddress {
          /**
           * Constructs a new MsgSetIPAddress.
           * @param [properties] Properties to set
           */
          constructor(
            properties?: hermes.hermes.v1beta1.types.IMsgSetIPAddress
          );

          /** MsgSetIPAddress ipAddress. */
          public ipAddress: string;

          /** MsgSetIPAddress signer. */
          public signer: Uint8Array;

          /**
           * Creates a new MsgSetIPAddress instance using the specified properties.
           * @param [properties] Properties to set
           * @returns MsgSetIPAddress instance
           */
          public static create(
            properties?: hermes.hermes.v1beta1.types.IMsgSetIPAddress
          ): hermes.hermes.v1beta1.types.MsgSetIPAddress;

          /**
           * Encodes the specified MsgSetIPAddress message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetIPAddress.verify|verify} messages.
           * @param message MsgSetIPAddress message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encode(
            message: hermes.hermes.v1beta1.types.IMsgSetIPAddress,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Encodes the specified MsgSetIPAddress message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetIPAddress.verify|verify} messages.
           * @param message MsgSetIPAddress message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encodeDelimited(
            message: hermes.hermes.v1beta1.types.IMsgSetIPAddress,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Decodes a MsgSetIPAddress message from the specified reader or buffer.
           * @param reader Reader or buffer to decode from
           * @param [length] Message length if known beforehand
           * @returns MsgSetIPAddress
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decode(
            reader: $protobuf.Reader | Uint8Array,
            length?: number
          ): hermes.hermes.v1beta1.types.MsgSetIPAddress;

          /**
           * Decodes a MsgSetIPAddress message from the specified reader or buffer, length delimited.
           * @param reader Reader or buffer to decode from
           * @returns MsgSetIPAddress
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decodeDelimited(
            reader: $protobuf.Reader | Uint8Array
          ): hermes.hermes.v1beta1.types.MsgSetIPAddress;

          /**
           * Verifies a MsgSetIPAddress message.
           * @param message Plain object to verify
           * @returns `null` if valid, otherwise the reason why it is not
           */
          public static verify(message: { [k: string]: any }): string | null;

          /**
           * Creates a MsgSetIPAddress message from a plain object. Also converts values to their respective internal types.
           * @param object Plain object
           * @returns MsgSetIPAddress
           */
          public static fromObject(object: {
            [k: string]: any;
          }): hermes.hermes.v1beta1.types.MsgSetIPAddress;

          /**
           * Creates a plain object from a MsgSetIPAddress message. Also converts values to other types if specified.
           * @param message MsgSetIPAddress
           * @param [options] Conversion options
           * @returns Plain object
           */
          public static toObject(
            message: hermes.hermes.v1beta1.types.MsgSetIPAddress,
            options?: $protobuf.IConversionOptions
          ): { [k: string]: any };

          /**
           * Converts this MsgSetIPAddress to JSON.
           * @returns JSON object
           */
          public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgSetNodeKeys. */
        interface IMsgSetNodeKeys {
          /** MsgSetNodeKeys pubKeySetSet */
          pubKeySetSet?: common.IPubKeySet | null;

          /** MsgSetNodeKeys validatorConsPubKey */
          validatorConsPubKey?: string | null;

          /** MsgSetNodeKeys signer */
          signer?: Uint8Array | null;

          /** MsgSetNodeKeys dcValidatorAddress */
          dcValidatorAddress?: common.IDcAddress | null;
        }

        /** Represents a MsgSetNodeKeys. */
        class MsgSetNodeKeys implements IMsgSetNodeKeys {
          /**
           * Constructs a new MsgSetNodeKeys.
           * @param [properties] Properties to set
           */
          constructor(properties?: hermes.hermes.v1beta1.types.IMsgSetNodeKeys);

          /** MsgSetNodeKeys pubKeySetSet. */
          public pubKeySetSet?: common.IPubKeySet | null;

          /** MsgSetNodeKeys validatorConsPubKey. */
          public validatorConsPubKey: string;

          /** MsgSetNodeKeys signer. */
          public signer: Uint8Array;

          /** MsgSetNodeKeys dcValidatorAddress. */
          public dcValidatorAddress?: common.IDcAddress | null;

          /**
           * Creates a new MsgSetNodeKeys instance using the specified properties.
           * @param [properties] Properties to set
           * @returns MsgSetNodeKeys instance
           */
          public static create(
            properties?: hermes.hermes.v1beta1.types.IMsgSetNodeKeys
          ): hermes.hermes.v1beta1.types.MsgSetNodeKeys;

          /**
           * Encodes the specified MsgSetNodeKeys message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetNodeKeys.verify|verify} messages.
           * @param message MsgSetNodeKeys message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encode(
            message: hermes.hermes.v1beta1.types.IMsgSetNodeKeys,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Encodes the specified MsgSetNodeKeys message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetNodeKeys.verify|verify} messages.
           * @param message MsgSetNodeKeys message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encodeDelimited(
            message: hermes.hermes.v1beta1.types.IMsgSetNodeKeys,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Decodes a MsgSetNodeKeys message from the specified reader or buffer.
           * @param reader Reader or buffer to decode from
           * @param [length] Message length if known beforehand
           * @returns MsgSetNodeKeys
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decode(
            reader: $protobuf.Reader | Uint8Array,
            length?: number
          ): hermes.hermes.v1beta1.types.MsgSetNodeKeys;

          /**
           * Decodes a MsgSetNodeKeys message from the specified reader or buffer, length delimited.
           * @param reader Reader or buffer to decode from
           * @returns MsgSetNodeKeys
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decodeDelimited(
            reader: $protobuf.Reader | Uint8Array
          ): hermes.hermes.v1beta1.types.MsgSetNodeKeys;

          /**
           * Verifies a MsgSetNodeKeys message.
           * @param message Plain object to verify
           * @returns `null` if valid, otherwise the reason why it is not
           */
          public static verify(message: { [k: string]: any }): string | null;

          /**
           * Creates a MsgSetNodeKeys message from a plain object. Also converts values to their respective internal types.
           * @param object Plain object
           * @returns MsgSetNodeKeys
           */
          public static fromObject(object: {
            [k: string]: any;
          }): hermes.hermes.v1beta1.types.MsgSetNodeKeys;

          /**
           * Creates a plain object from a MsgSetNodeKeys message. Also converts values to other types if specified.
           * @param message MsgSetNodeKeys
           * @param [options] Conversion options
           * @returns Plain object
           */
          public static toObject(
            message: hermes.hermes.v1beta1.types.MsgSetNodeKeys,
            options?: $protobuf.IConversionOptions
          ): { [k: string]: any };

          /**
           * Converts this MsgSetNodeKeys to JSON.
           * @returns JSON object
           */
          public toJSON(): { [k: string]: any };
        }

        /** Properties of a MsgSetVersion. */
        interface IMsgSetVersion {
          /** MsgSetVersion version */
          version?: string | null;

          /** MsgSetVersion signer */
          signer?: Uint8Array | null;
        }

        /** Represents a MsgSetVersion. */
        class MsgSetVersion implements IMsgSetVersion {
          /**
           * Constructs a new MsgSetVersion.
           * @param [properties] Properties to set
           */
          constructor(properties?: hermes.hermes.v1beta1.types.IMsgSetVersion);

          /** MsgSetVersion version. */
          public version: string;

          /** MsgSetVersion signer. */
          public signer: Uint8Array;

          /**
           * Creates a new MsgSetVersion instance using the specified properties.
           * @param [properties] Properties to set
           * @returns MsgSetVersion instance
           */
          public static create(
            properties?: hermes.hermes.v1beta1.types.IMsgSetVersion
          ): hermes.hermes.v1beta1.types.MsgSetVersion;

          /**
           * Encodes the specified MsgSetVersion message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetVersion.verify|verify} messages.
           * @param message MsgSetVersion message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encode(
            message: hermes.hermes.v1beta1.types.IMsgSetVersion,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Encodes the specified MsgSetVersion message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetVersion.verify|verify} messages.
           * @param message MsgSetVersion message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encodeDelimited(
            message: hermes.hermes.v1beta1.types.IMsgSetVersion,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Decodes a MsgSetVersion message from the specified reader or buffer.
           * @param reader Reader or buffer to decode from
           * @param [length] Message length if known beforehand
           * @returns MsgSetVersion
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decode(
            reader: $protobuf.Reader | Uint8Array,
            length?: number
          ): hermes.hermes.v1beta1.types.MsgSetVersion;

          /**
           * Decodes a MsgSetVersion message from the specified reader or buffer, length delimited.
           * @param reader Reader or buffer to decode from
           * @returns MsgSetVersion
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decodeDelimited(
            reader: $protobuf.Reader | Uint8Array
          ): hermes.hermes.v1beta1.types.MsgSetVersion;

          /**
           * Verifies a MsgSetVersion message.
           * @param message Plain object to verify
           * @returns `null` if valid, otherwise the reason why it is not
           */
          public static verify(message: { [k: string]: any }): string | null;

          /**
           * Creates a MsgSetVersion message from a plain object. Also converts values to their respective internal types.
           * @param object Plain object
           * @returns MsgSetVersion
           */
          public static fromObject(object: {
            [k: string]: any;
          }): hermes.hermes.v1beta1.types.MsgSetVersion;

          /**
           * Creates a plain object from a MsgSetVersion message. Also converts values to other types if specified.
           * @param message MsgSetVersion
           * @param [options] Conversion options
           * @returns Plain object
           */
          public static toObject(
            message: hermes.hermes.v1beta1.types.MsgSetVersion,
            options?: $protobuf.IConversionOptions
          ): { [k: string]: any };

          /**
           * Converts this MsgSetVersion to JSON.
           * @returns JSON object
           */
          public toJSON(): { [k: string]: any };
        }
      }
    }
  }
}

/** Namespace cosmos. */
export namespace cosmos {
  /** Namespace base. */
  namespace base {
    /** Namespace v1beta1. */
    namespace v1beta1 {
      /** Properties of a Coin. */
      interface ICoin {
        /** Coin denom */
        denom?: string | null;

        /** Coin amount */
        amount?: string | null;
      }

      /** Represents a Coin. */
      class Coin implements ICoin {
        /**
         * Constructs a new Coin.
         * @param [properties] Properties to set
         */
        constructor(properties?: cosmos.base.v1beta1.ICoin);

        /** Coin denom. */
        public denom: string;

        /** Coin amount. */
        public amount: string;

        /**
         * Creates a new Coin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Coin instance
         */
        public static create(
          properties?: cosmos.base.v1beta1.ICoin
        ): cosmos.base.v1beta1.Coin;

        /**
         * Encodes the specified Coin message. Does not implicitly {@link cosmos.base.v1beta1.Coin.verify|verify} messages.
         * @param message Coin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: cosmos.base.v1beta1.ICoin,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified Coin message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.Coin.verify|verify} messages.
         * @param message Coin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: cosmos.base.v1beta1.ICoin,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a Coin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Coin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): cosmos.base.v1beta1.Coin;

        /**
         * Decodes a Coin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Coin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): cosmos.base.v1beta1.Coin;

        /**
         * Verifies a Coin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a Coin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Coin
         */
        public static fromObject(object: {
          [k: string]: any;
        }): cosmos.base.v1beta1.Coin;

        /**
         * Creates a plain object from a Coin message. Also converts values to other types if specified.
         * @param message Coin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: cosmos.base.v1beta1.Coin,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this Coin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
      }

      /** Properties of a DecCoin. */
      interface IDecCoin {
        /** DecCoin denom */
        denom?: string | null;

        /** DecCoin amount */
        amount?: string | null;
      }

      /** Represents a DecCoin. */
      class DecCoin implements IDecCoin {
        /**
         * Constructs a new DecCoin.
         * @param [properties] Properties to set
         */
        constructor(properties?: cosmos.base.v1beta1.IDecCoin);

        /** DecCoin denom. */
        public denom: string;

        /** DecCoin amount. */
        public amount: string;

        /**
         * Creates a new DecCoin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DecCoin instance
         */
        public static create(
          properties?: cosmos.base.v1beta1.IDecCoin
        ): cosmos.base.v1beta1.DecCoin;

        /**
         * Encodes the specified DecCoin message. Does not implicitly {@link cosmos.base.v1beta1.DecCoin.verify|verify} messages.
         * @param message DecCoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: cosmos.base.v1beta1.IDecCoin,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified DecCoin message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.DecCoin.verify|verify} messages.
         * @param message DecCoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: cosmos.base.v1beta1.IDecCoin,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a DecCoin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DecCoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): cosmos.base.v1beta1.DecCoin;

        /**
         * Decodes a DecCoin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DecCoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): cosmos.base.v1beta1.DecCoin;

        /**
         * Verifies a DecCoin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a DecCoin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DecCoin
         */
        public static fromObject(object: {
          [k: string]: any;
        }): cosmos.base.v1beta1.DecCoin;

        /**
         * Creates a plain object from a DecCoin message. Also converts values to other types if specified.
         * @param message DecCoin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: cosmos.base.v1beta1.DecCoin,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this DecCoin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
      }

      /** Properties of an IntProto. */
      interface IIntProto {
        /** IntProto int */
        int?: string | null;
      }

      /** Represents an IntProto. */
      class IntProto implements IIntProto {
        /**
         * Constructs a new IntProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: cosmos.base.v1beta1.IIntProto);

        /** IntProto int. */
        public int: string;

        /**
         * Creates a new IntProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IntProto instance
         */
        public static create(
          properties?: cosmos.base.v1beta1.IIntProto
        ): cosmos.base.v1beta1.IntProto;

        /**
         * Encodes the specified IntProto message. Does not implicitly {@link cosmos.base.v1beta1.IntProto.verify|verify} messages.
         * @param message IntProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: cosmos.base.v1beta1.IIntProto,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified IntProto message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.IntProto.verify|verify} messages.
         * @param message IntProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: cosmos.base.v1beta1.IIntProto,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes an IntProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IntProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): cosmos.base.v1beta1.IntProto;

        /**
         * Decodes an IntProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IntProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): cosmos.base.v1beta1.IntProto;

        /**
         * Verifies an IntProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates an IntProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IntProto
         */
        public static fromObject(object: {
          [k: string]: any;
        }): cosmos.base.v1beta1.IntProto;

        /**
         * Creates a plain object from an IntProto message. Also converts values to other types if specified.
         * @param message IntProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: cosmos.base.v1beta1.IntProto,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this IntProto to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
      }

      /** Properties of a DecProto. */
      interface IDecProto {
        /** DecProto dec */
        dec?: string | null;
      }

      /** Represents a DecProto. */
      class DecProto implements IDecProto {
        /**
         * Constructs a new DecProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: cosmos.base.v1beta1.IDecProto);

        /** DecProto dec. */
        public dec: string;

        /**
         * Creates a new DecProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DecProto instance
         */
        public static create(
          properties?: cosmos.base.v1beta1.IDecProto
        ): cosmos.base.v1beta1.DecProto;

        /**
         * Encodes the specified DecProto message. Does not implicitly {@link cosmos.base.v1beta1.DecProto.verify|verify} messages.
         * @param message DecProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: cosmos.base.v1beta1.IDecProto,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified DecProto message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.DecProto.verify|verify} messages.
         * @param message DecProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: cosmos.base.v1beta1.IDecProto,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a DecProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DecProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): cosmos.base.v1beta1.DecProto;

        /**
         * Decodes a DecProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DecProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): cosmos.base.v1beta1.DecProto;

        /**
         * Verifies a DecProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a DecProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DecProto
         */
        public static fromObject(object: {
          [k: string]: any;
        }): cosmos.base.v1beta1.DecProto;

        /**
         * Creates a plain object from a DecProto message. Also converts values to other types if specified.
         * @param message DecProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: cosmos.base.v1beta1.DecProto,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this DecProto to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
      }
    }
  }
}
