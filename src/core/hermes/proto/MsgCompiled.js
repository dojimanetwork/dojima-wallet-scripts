/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.common = (function() {

    /**
     * Namespace common.
     * @exports common
     * @namespace
     */
    var common = {};

    common.Asset = (function() {

        /**
         * Properties of an Asset.
         * @memberof common
         * @interface IAsset
         * @property {string|null} [chain] Asset chain
         * @property {string|null} [symbol] Asset symbol
         * @property {string|null} [ticker] Asset ticker
         * @property {boolean|null} [synth] Asset synth
         */

        /**
         * Constructs a new Asset.
         * @memberof common
         * @classdesc Represents an Asset.
         * @implements IAsset
         * @constructor
         * @param {common.IAsset=} [properties] Properties to set
         */
        function Asset(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Asset chain.
         * @member {string} chain
         * @memberof common.Asset
         * @instance
         */
        Asset.prototype.chain = "";

        /**
         * Asset symbol.
         * @member {string} symbol
         * @memberof common.Asset
         * @instance
         */
        Asset.prototype.symbol = "";

        /**
         * Asset ticker.
         * @member {string} ticker
         * @memberof common.Asset
         * @instance
         */
        Asset.prototype.ticker = "";

        /**
         * Asset synth.
         * @member {boolean} synth
         * @memberof common.Asset
         * @instance
         */
        Asset.prototype.synth = false;

        /**
         * Creates a new Asset instance using the specified properties.
         * @function create
         * @memberof common.Asset
         * @static
         * @param {common.IAsset=} [properties] Properties to set
         * @returns {common.Asset} Asset instance
         */
        Asset.create = function create(properties) {
            return new Asset(properties);
        };

        /**
         * Encodes the specified Asset message. Does not implicitly {@link common.Asset.verify|verify} messages.
         * @function encode
         * @memberof common.Asset
         * @static
         * @param {common.IAsset} message Asset message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Asset.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chain != null && Object.hasOwnProperty.call(message, "chain"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.chain);
            if (message.symbol != null && Object.hasOwnProperty.call(message, "symbol"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.symbol);
            if (message.ticker != null && Object.hasOwnProperty.call(message, "ticker"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.ticker);
            if (message.synth != null && Object.hasOwnProperty.call(message, "synth"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.synth);
            return writer;
        };

        /**
         * Encodes the specified Asset message, length delimited. Does not implicitly {@link common.Asset.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.Asset
         * @static
         * @param {common.IAsset} message Asset message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Asset.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Asset message from the specified reader or buffer.
         * @function decode
         * @memberof common.Asset
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.Asset} Asset
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Asset.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.Asset();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.chain = reader.string();
                        break;
                    }
                case 2: {
                        message.symbol = reader.string();
                        break;
                    }
                case 3: {
                        message.ticker = reader.string();
                        break;
                    }
                case 4: {
                        message.synth = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Asset message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.Asset
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.Asset} Asset
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Asset.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Asset message.
         * @function verify
         * @memberof common.Asset
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Asset.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chain != null && message.hasOwnProperty("chain"))
                if (!$util.isString(message.chain))
                    return "chain: string expected";
            if (message.symbol != null && message.hasOwnProperty("symbol"))
                if (!$util.isString(message.symbol))
                    return "symbol: string expected";
            if (message.ticker != null && message.hasOwnProperty("ticker"))
                if (!$util.isString(message.ticker))
                    return "ticker: string expected";
            if (message.synth != null && message.hasOwnProperty("synth"))
                if (typeof message.synth !== "boolean")
                    return "synth: boolean expected";
            return null;
        };

        /**
         * Creates an Asset message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.Asset
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.Asset} Asset
         */
        Asset.fromObject = function fromObject(object) {
            if (object instanceof $root.common.Asset)
                return object;
            var message = new $root.common.Asset();
            if (object.chain != null)
                message.chain = String(object.chain);
            if (object.symbol != null)
                message.symbol = String(object.symbol);
            if (object.ticker != null)
                message.ticker = String(object.ticker);
            if (object.synth != null)
                message.synth = Boolean(object.synth);
            return message;
        };

        /**
         * Creates a plain object from an Asset message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.Asset
         * @static
         * @param {common.Asset} message Asset
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Asset.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.chain = "";
                object.symbol = "";
                object.ticker = "";
                object.synth = false;
            }
            if (message.chain != null && message.hasOwnProperty("chain"))
                object.chain = message.chain;
            if (message.symbol != null && message.hasOwnProperty("symbol"))
                object.symbol = message.symbol;
            if (message.ticker != null && message.hasOwnProperty("ticker"))
                object.ticker = message.ticker;
            if (message.synth != null && message.hasOwnProperty("synth"))
                object.synth = message.synth;
            return object;
        };

        /**
         * Converts this Asset to JSON.
         * @function toJSON
         * @memberof common.Asset
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Asset.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Asset
         * @function getTypeUrl
         * @memberof common.Asset
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Asset.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.Asset";
        };

        return Asset;
    })();

    common.Coin = (function() {

        /**
         * Properties of a Coin.
         * @memberof common
         * @interface ICoin
         * @property {common.IAsset|null} [asset] Coin asset
         * @property {string|null} [amount] Coin amount
         * @property {number|Long|null} [decimals] Coin decimals
         */

        /**
         * Constructs a new Coin.
         * @memberof common
         * @classdesc Represents a Coin.
         * @implements ICoin
         * @constructor
         * @param {common.ICoin=} [properties] Properties to set
         */
        function Coin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Coin asset.
         * @member {common.IAsset|null|undefined} asset
         * @memberof common.Coin
         * @instance
         */
        Coin.prototype.asset = null;

        /**
         * Coin amount.
         * @member {string} amount
         * @memberof common.Coin
         * @instance
         */
        Coin.prototype.amount = "";

        /**
         * Coin decimals.
         * @member {number|Long} decimals
         * @memberof common.Coin
         * @instance
         */
        Coin.prototype.decimals = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Coin instance using the specified properties.
         * @function create
         * @memberof common.Coin
         * @static
         * @param {common.ICoin=} [properties] Properties to set
         * @returns {common.Coin} Coin instance
         */
        Coin.create = function create(properties) {
            return new Coin(properties);
        };

        /**
         * Encodes the specified Coin message. Does not implicitly {@link common.Coin.verify|verify} messages.
         * @function encode
         * @memberof common.Coin
         * @static
         * @param {common.ICoin} message Coin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Coin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.asset != null && Object.hasOwnProperty.call(message, "asset"))
                $root.common.Asset.encode(message.asset, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.amount);
            if (message.decimals != null && Object.hasOwnProperty.call(message, "decimals"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.decimals);
            return writer;
        };

        /**
         * Encodes the specified Coin message, length delimited. Does not implicitly {@link common.Coin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.Coin
         * @static
         * @param {common.ICoin} message Coin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Coin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Coin message from the specified reader or buffer.
         * @function decode
         * @memberof common.Coin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.Coin} Coin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Coin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.Coin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.asset = $root.common.Asset.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.amount = reader.string();
                        break;
                    }
                case 3: {
                        message.decimals = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Coin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.Coin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.Coin} Coin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Coin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Coin message.
         * @function verify
         * @memberof common.Coin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Coin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.asset != null && message.hasOwnProperty("asset")) {
                var error = $root.common.Asset.verify(message.asset);
                if (error)
                    return "asset." + error;
            }
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isString(message.amount))
                    return "amount: string expected";
            if (message.decimals != null && message.hasOwnProperty("decimals"))
                if (!$util.isInteger(message.decimals) && !(message.decimals && $util.isInteger(message.decimals.low) && $util.isInteger(message.decimals.high)))
                    return "decimals: integer|Long expected";
            return null;
        };

        /**
         * Creates a Coin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.Coin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.Coin} Coin
         */
        Coin.fromObject = function fromObject(object) {
            if (object instanceof $root.common.Coin)
                return object;
            var message = new $root.common.Coin();
            if (object.asset != null) {
                if (typeof object.asset !== "object")
                    throw TypeError(".common.Coin.asset: object expected");
                message.asset = $root.common.Asset.fromObject(object.asset);
            }
            if (object.amount != null)
                message.amount = String(object.amount);
            if (object.decimals != null)
                if ($util.Long)
                    (message.decimals = $util.Long.fromValue(object.decimals)).unsigned = false;
                else if (typeof object.decimals === "string")
                    message.decimals = parseInt(object.decimals, 10);
                else if (typeof object.decimals === "number")
                    message.decimals = object.decimals;
                else if (typeof object.decimals === "object")
                    message.decimals = new $util.LongBits(object.decimals.low >>> 0, object.decimals.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a Coin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.Coin
         * @static
         * @param {common.Coin} message Coin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Coin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.asset = null;
                object.amount = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.decimals = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.decimals = options.longs === String ? "0" : 0;
            }
            if (message.asset != null && message.hasOwnProperty("asset"))
                object.asset = $root.common.Asset.toObject(message.asset, options);
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            if (message.decimals != null && message.hasOwnProperty("decimals"))
                if (typeof message.decimals === "number")
                    object.decimals = options.longs === String ? String(message.decimals) : message.decimals;
                else
                    object.decimals = options.longs === String ? $util.Long.prototype.toString.call(message.decimals) : options.longs === Number ? new $util.LongBits(message.decimals.low >>> 0, message.decimals.high >>> 0).toNumber() : message.decimals;
            return object;
        };

        /**
         * Converts this Coin to JSON.
         * @function toJSON
         * @memberof common.Coin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Coin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Coin
         * @function getTypeUrl
         * @memberof common.Coin
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Coin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.Coin";
        };

        return Coin;
    })();

    common.PubKeySet = (function() {

        /**
         * Properties of a PubKeySet.
         * @memberof common
         * @interface IPubKeySet
         * @property {string|null} [secp256k1] PubKeySet secp256k1
         * @property {string|null} [ed25519] PubKeySet ed25519
         */

        /**
         * Constructs a new PubKeySet.
         * @memberof common
         * @classdesc Represents a PubKeySet.
         * @implements IPubKeySet
         * @constructor
         * @param {common.IPubKeySet=} [properties] Properties to set
         */
        function PubKeySet(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PubKeySet secp256k1.
         * @member {string} secp256k1
         * @memberof common.PubKeySet
         * @instance
         */
        PubKeySet.prototype.secp256k1 = "";

        /**
         * PubKeySet ed25519.
         * @member {string} ed25519
         * @memberof common.PubKeySet
         * @instance
         */
        PubKeySet.prototype.ed25519 = "";

        /**
         * Creates a new PubKeySet instance using the specified properties.
         * @function create
         * @memberof common.PubKeySet
         * @static
         * @param {common.IPubKeySet=} [properties] Properties to set
         * @returns {common.PubKeySet} PubKeySet instance
         */
        PubKeySet.create = function create(properties) {
            return new PubKeySet(properties);
        };

        /**
         * Encodes the specified PubKeySet message. Does not implicitly {@link common.PubKeySet.verify|verify} messages.
         * @function encode
         * @memberof common.PubKeySet
         * @static
         * @param {common.IPubKeySet} message PubKeySet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PubKeySet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.secp256k1 != null && Object.hasOwnProperty.call(message, "secp256k1"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.secp256k1);
            if (message.ed25519 != null && Object.hasOwnProperty.call(message, "ed25519"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.ed25519);
            return writer;
        };

        /**
         * Encodes the specified PubKeySet message, length delimited. Does not implicitly {@link common.PubKeySet.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.PubKeySet
         * @static
         * @param {common.IPubKeySet} message PubKeySet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PubKeySet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PubKeySet message from the specified reader or buffer.
         * @function decode
         * @memberof common.PubKeySet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.PubKeySet} PubKeySet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PubKeySet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.PubKeySet();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.secp256k1 = reader.string();
                        break;
                    }
                case 2: {
                        message.ed25519 = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PubKeySet message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.PubKeySet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.PubKeySet} PubKeySet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PubKeySet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PubKeySet message.
         * @function verify
         * @memberof common.PubKeySet
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PubKeySet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.secp256k1 != null && message.hasOwnProperty("secp256k1"))
                if (!$util.isString(message.secp256k1))
                    return "secp256k1: string expected";
            if (message.ed25519 != null && message.hasOwnProperty("ed25519"))
                if (!$util.isString(message.ed25519))
                    return "ed25519: string expected";
            return null;
        };

        /**
         * Creates a PubKeySet message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.PubKeySet
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.PubKeySet} PubKeySet
         */
        PubKeySet.fromObject = function fromObject(object) {
            if (object instanceof $root.common.PubKeySet)
                return object;
            var message = new $root.common.PubKeySet();
            if (object.secp256k1 != null)
                message.secp256k1 = String(object.secp256k1);
            if (object.ed25519 != null)
                message.ed25519 = String(object.ed25519);
            return message;
        };

        /**
         * Creates a plain object from a PubKeySet message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.PubKeySet
         * @static
         * @param {common.PubKeySet} message PubKeySet
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PubKeySet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.secp256k1 = "";
                object.ed25519 = "";
            }
            if (message.secp256k1 != null && message.hasOwnProperty("secp256k1"))
                object.secp256k1 = message.secp256k1;
            if (message.ed25519 != null && message.hasOwnProperty("ed25519"))
                object.ed25519 = message.ed25519;
            return object;
        };

        /**
         * Converts this PubKeySet to JSON.
         * @function toJSON
         * @memberof common.PubKeySet
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PubKeySet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PubKeySet
         * @function getTypeUrl
         * @memberof common.PubKeySet
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PubKeySet.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.PubKeySet";
        };

        return PubKeySet;
    })();

    common.Tx = (function() {

        /**
         * Properties of a Tx.
         * @memberof common
         * @interface ITx
         * @property {string|null} [id] Tx id
         * @property {string|null} [chain] Tx chain
         * @property {string|null} [fromAddress] Tx fromAddress
         * @property {string|null} [toAddress] Tx toAddress
         * @property {Array.<common.ICoin>|null} [coins] Tx coins
         * @property {Array.<common.ICoin>|null} [gas] Tx gas
         * @property {string|null} [memo] Tx memo
         */

        /**
         * Constructs a new Tx.
         * @memberof common
         * @classdesc Represents a Tx.
         * @implements ITx
         * @constructor
         * @param {common.ITx=} [properties] Properties to set
         */
        function Tx(properties) {
            this.coins = [];
            this.gas = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Tx id.
         * @member {string} id
         * @memberof common.Tx
         * @instance
         */
        Tx.prototype.id = "";

        /**
         * Tx chain.
         * @member {string} chain
         * @memberof common.Tx
         * @instance
         */
        Tx.prototype.chain = "";

        /**
         * Tx fromAddress.
         * @member {string} fromAddress
         * @memberof common.Tx
         * @instance
         */
        Tx.prototype.fromAddress = "";

        /**
         * Tx toAddress.
         * @member {string} toAddress
         * @memberof common.Tx
         * @instance
         */
        Tx.prototype.toAddress = "";

        /**
         * Tx coins.
         * @member {Array.<common.ICoin>} coins
         * @memberof common.Tx
         * @instance
         */
        Tx.prototype.coins = $util.emptyArray;

        /**
         * Tx gas.
         * @member {Array.<common.ICoin>} gas
         * @memberof common.Tx
         * @instance
         */
        Tx.prototype.gas = $util.emptyArray;

        /**
         * Tx memo.
         * @member {string} memo
         * @memberof common.Tx
         * @instance
         */
        Tx.prototype.memo = "";

        /**
         * Creates a new Tx instance using the specified properties.
         * @function create
         * @memberof common.Tx
         * @static
         * @param {common.ITx=} [properties] Properties to set
         * @returns {common.Tx} Tx instance
         */
        Tx.create = function create(properties) {
            return new Tx(properties);
        };

        /**
         * Encodes the specified Tx message. Does not implicitly {@link common.Tx.verify|verify} messages.
         * @function encode
         * @memberof common.Tx
         * @static
         * @param {common.ITx} message Tx message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tx.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.chain != null && Object.hasOwnProperty.call(message, "chain"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.chain);
            if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.fromAddress);
            if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.toAddress);
            if (message.coins != null && message.coins.length)
                for (var i = 0; i < message.coins.length; ++i)
                    $root.common.Coin.encode(message.coins[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.gas != null && message.gas.length)
                for (var i = 0; i < message.gas.length; ++i)
                    $root.common.Coin.encode(message.gas[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.memo != null && Object.hasOwnProperty.call(message, "memo"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.memo);
            return writer;
        };

        /**
         * Encodes the specified Tx message, length delimited. Does not implicitly {@link common.Tx.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.Tx
         * @static
         * @param {common.ITx} message Tx message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tx.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Tx message from the specified reader or buffer.
         * @function decode
         * @memberof common.Tx
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.Tx} Tx
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Tx.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.Tx();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.chain = reader.string();
                        break;
                    }
                case 3: {
                        message.fromAddress = reader.string();
                        break;
                    }
                case 4: {
                        message.toAddress = reader.string();
                        break;
                    }
                case 5: {
                        if (!(message.coins && message.coins.length))
                            message.coins = [];
                        message.coins.push($root.common.Coin.decode(reader, reader.uint32()));
                        break;
                    }
                case 6: {
                        if (!(message.gas && message.gas.length))
                            message.gas = [];
                        message.gas.push($root.common.Coin.decode(reader, reader.uint32()));
                        break;
                    }
                case 7: {
                        message.memo = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Tx message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.Tx
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.Tx} Tx
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Tx.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Tx message.
         * @function verify
         * @memberof common.Tx
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Tx.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.chain != null && message.hasOwnProperty("chain"))
                if (!$util.isString(message.chain))
                    return "chain: string expected";
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                if (!$util.isString(message.fromAddress))
                    return "fromAddress: string expected";
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                if (!$util.isString(message.toAddress))
                    return "toAddress: string expected";
            if (message.coins != null && message.hasOwnProperty("coins")) {
                if (!Array.isArray(message.coins))
                    return "coins: array expected";
                for (var i = 0; i < message.coins.length; ++i) {
                    var error = $root.common.Coin.verify(message.coins[i]);
                    if (error)
                        return "coins." + error;
                }
            }
            if (message.gas != null && message.hasOwnProperty("gas")) {
                if (!Array.isArray(message.gas))
                    return "gas: array expected";
                for (var i = 0; i < message.gas.length; ++i) {
                    var error = $root.common.Coin.verify(message.gas[i]);
                    if (error)
                        return "gas." + error;
                }
            }
            if (message.memo != null && message.hasOwnProperty("memo"))
                if (!$util.isString(message.memo))
                    return "memo: string expected";
            return null;
        };

        /**
         * Creates a Tx message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.Tx
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.Tx} Tx
         */
        Tx.fromObject = function fromObject(object) {
            if (object instanceof $root.common.Tx)
                return object;
            var message = new $root.common.Tx();
            if (object.id != null)
                message.id = String(object.id);
            if (object.chain != null)
                message.chain = String(object.chain);
            if (object.fromAddress != null)
                message.fromAddress = String(object.fromAddress);
            if (object.toAddress != null)
                message.toAddress = String(object.toAddress);
            if (object.coins) {
                if (!Array.isArray(object.coins))
                    throw TypeError(".common.Tx.coins: array expected");
                message.coins = [];
                for (var i = 0; i < object.coins.length; ++i) {
                    if (typeof object.coins[i] !== "object")
                        throw TypeError(".common.Tx.coins: object expected");
                    message.coins[i] = $root.common.Coin.fromObject(object.coins[i]);
                }
            }
            if (object.gas) {
                if (!Array.isArray(object.gas))
                    throw TypeError(".common.Tx.gas: array expected");
                message.gas = [];
                for (var i = 0; i < object.gas.length; ++i) {
                    if (typeof object.gas[i] !== "object")
                        throw TypeError(".common.Tx.gas: object expected");
                    message.gas[i] = $root.common.Coin.fromObject(object.gas[i]);
                }
            }
            if (object.memo != null)
                message.memo = String(object.memo);
            return message;
        };

        /**
         * Creates a plain object from a Tx message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.Tx
         * @static
         * @param {common.Tx} message Tx
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Tx.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.coins = [];
                object.gas = [];
            }
            if (options.defaults) {
                object.id = "";
                object.chain = "";
                object.fromAddress = "";
                object.toAddress = "";
                object.memo = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.chain != null && message.hasOwnProperty("chain"))
                object.chain = message.chain;
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                object.fromAddress = message.fromAddress;
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                object.toAddress = message.toAddress;
            if (message.coins && message.coins.length) {
                object.coins = [];
                for (var j = 0; j < message.coins.length; ++j)
                    object.coins[j] = $root.common.Coin.toObject(message.coins[j], options);
            }
            if (message.gas && message.gas.length) {
                object.gas = [];
                for (var j = 0; j < message.gas.length; ++j)
                    object.gas[j] = $root.common.Coin.toObject(message.gas[j], options);
            }
            if (message.memo != null && message.hasOwnProperty("memo"))
                object.memo = message.memo;
            return object;
        };

        /**
         * Converts this Tx to JSON.
         * @function toJSON
         * @memberof common.Tx
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Tx.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Tx
         * @function getTypeUrl
         * @memberof common.Tx
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Tx.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.Tx";
        };

        return Tx;
    })();

    common.Fee = (function() {

        /**
         * Properties of a Fee.
         * @memberof common
         * @interface IFee
         * @property {Array.<common.ICoin>|null} [coins] Fee coins
         * @property {string|null} [poolDeduct] Fee poolDeduct
         */

        /**
         * Constructs a new Fee.
         * @memberof common
         * @classdesc Represents a Fee.
         * @implements IFee
         * @constructor
         * @param {common.IFee=} [properties] Properties to set
         */
        function Fee(properties) {
            this.coins = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Fee coins.
         * @member {Array.<common.ICoin>} coins
         * @memberof common.Fee
         * @instance
         */
        Fee.prototype.coins = $util.emptyArray;

        /**
         * Fee poolDeduct.
         * @member {string} poolDeduct
         * @memberof common.Fee
         * @instance
         */
        Fee.prototype.poolDeduct = "";

        /**
         * Creates a new Fee instance using the specified properties.
         * @function create
         * @memberof common.Fee
         * @static
         * @param {common.IFee=} [properties] Properties to set
         * @returns {common.Fee} Fee instance
         */
        Fee.create = function create(properties) {
            return new Fee(properties);
        };

        /**
         * Encodes the specified Fee message. Does not implicitly {@link common.Fee.verify|verify} messages.
         * @function encode
         * @memberof common.Fee
         * @static
         * @param {common.IFee} message Fee message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Fee.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.coins != null && message.coins.length)
                for (var i = 0; i < message.coins.length; ++i)
                    $root.common.Coin.encode(message.coins[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.poolDeduct != null && Object.hasOwnProperty.call(message, "poolDeduct"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.poolDeduct);
            return writer;
        };

        /**
         * Encodes the specified Fee message, length delimited. Does not implicitly {@link common.Fee.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.Fee
         * @static
         * @param {common.IFee} message Fee message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Fee.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Fee message from the specified reader or buffer.
         * @function decode
         * @memberof common.Fee
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.Fee} Fee
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Fee.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.Fee();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.coins && message.coins.length))
                            message.coins = [];
                        message.coins.push($root.common.Coin.decode(reader, reader.uint32()));
                        break;
                    }
                case 2: {
                        message.poolDeduct = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Fee message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.Fee
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.Fee} Fee
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Fee.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Fee message.
         * @function verify
         * @memberof common.Fee
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Fee.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.coins != null && message.hasOwnProperty("coins")) {
                if (!Array.isArray(message.coins))
                    return "coins: array expected";
                for (var i = 0; i < message.coins.length; ++i) {
                    var error = $root.common.Coin.verify(message.coins[i]);
                    if (error)
                        return "coins." + error;
                }
            }
            if (message.poolDeduct != null && message.hasOwnProperty("poolDeduct"))
                if (!$util.isString(message.poolDeduct))
                    return "poolDeduct: string expected";
            return null;
        };

        /**
         * Creates a Fee message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.Fee
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.Fee} Fee
         */
        Fee.fromObject = function fromObject(object) {
            if (object instanceof $root.common.Fee)
                return object;
            var message = new $root.common.Fee();
            if (object.coins) {
                if (!Array.isArray(object.coins))
                    throw TypeError(".common.Fee.coins: array expected");
                message.coins = [];
                for (var i = 0; i < object.coins.length; ++i) {
                    if (typeof object.coins[i] !== "object")
                        throw TypeError(".common.Fee.coins: object expected");
                    message.coins[i] = $root.common.Coin.fromObject(object.coins[i]);
                }
            }
            if (object.poolDeduct != null)
                message.poolDeduct = String(object.poolDeduct);
            return message;
        };

        /**
         * Creates a plain object from a Fee message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.Fee
         * @static
         * @param {common.Fee} message Fee
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Fee.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.coins = [];
            if (options.defaults)
                object.poolDeduct = "";
            if (message.coins && message.coins.length) {
                object.coins = [];
                for (var j = 0; j < message.coins.length; ++j)
                    object.coins[j] = $root.common.Coin.toObject(message.coins[j], options);
            }
            if (message.poolDeduct != null && message.hasOwnProperty("poolDeduct"))
                object.poolDeduct = message.poolDeduct;
            return object;
        };

        /**
         * Converts this Fee to JSON.
         * @function toJSON
         * @memberof common.Fee
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Fee.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Fee
         * @function getTypeUrl
         * @memberof common.Fee
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Fee.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.Fee";
        };

        return Fee;
    })();

    common.KVPair = (function() {

        /**
         * Properties of a KVPair.
         * @memberof common
         * @interface IKVPair
         * @property {Uint8Array|null} [key] KVPair key
         * @property {Uint8Array|null} [value] KVPair value
         */

        /**
         * Constructs a new KVPair.
         * @memberof common
         * @classdesc Represents a KVPair.
         * @implements IKVPair
         * @constructor
         * @param {common.IKVPair=} [properties] Properties to set
         */
        function KVPair(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KVPair key.
         * @member {Uint8Array} key
         * @memberof common.KVPair
         * @instance
         */
        KVPair.prototype.key = $util.newBuffer([]);

        /**
         * KVPair value.
         * @member {Uint8Array} value
         * @memberof common.KVPair
         * @instance
         */
        KVPair.prototype.value = $util.newBuffer([]);

        /**
         * Creates a new KVPair instance using the specified properties.
         * @function create
         * @memberof common.KVPair
         * @static
         * @param {common.IKVPair=} [properties] Properties to set
         * @returns {common.KVPair} KVPair instance
         */
        KVPair.create = function create(properties) {
            return new KVPair(properties);
        };

        /**
         * Encodes the specified KVPair message. Does not implicitly {@link common.KVPair.verify|verify} messages.
         * @function encode
         * @memberof common.KVPair
         * @static
         * @param {common.IKVPair} message KVPair message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KVPair.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
            return writer;
        };

        /**
         * Encodes the specified KVPair message, length delimited. Does not implicitly {@link common.KVPair.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.KVPair
         * @static
         * @param {common.IKVPair} message KVPair message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KVPair.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a KVPair message from the specified reader or buffer.
         * @function decode
         * @memberof common.KVPair
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.KVPair} KVPair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KVPair.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.KVPair();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.key = reader.bytes();
                        break;
                    }
                case 2: {
                        message.value = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a KVPair message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.KVPair
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.KVPair} KVPair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KVPair.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KVPair message.
         * @function verify
         * @memberof common.KVPair
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KVPair.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                    return "value: buffer expected";
            return null;
        };

        /**
         * Creates a KVPair message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.KVPair
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.KVPair} KVPair
         */
        KVPair.fromObject = function fromObject(object) {
            if (object instanceof $root.common.KVPair)
                return object;
            var message = new $root.common.KVPair();
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length >= 0)
                    message.key = object.key;
            if (object.value != null)
                if (typeof object.value === "string")
                    $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                else if (object.value.length >= 0)
                    message.value = object.value;
            return message;
        };

        /**
         * Creates a plain object from a KVPair message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.KVPair
         * @static
         * @param {common.KVPair} message KVPair
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KVPair.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
                if (options.bytes === String)
                    object.value = "";
                else {
                    object.value = [];
                    if (options.bytes !== Array)
                        object.value = $util.newBuffer(object.value);
                }
            }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
            return object;
        };

        /**
         * Converts this KVPair to JSON.
         * @function toJSON
         * @memberof common.KVPair
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KVPair.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for KVPair
         * @function getTypeUrl
         * @memberof common.KVPair
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        KVPair.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.KVPair";
        };

        return KVPair;
    })();

    common.DcAddress = (function() {

        /**
         * Properties of a DcAddress.
         * @memberof common
         * @interface IDcAddress
         * @property {Uint8Array|null} [address] DcAddress address
         */

        /**
         * Constructs a new DcAddress.
         * @memberof common
         * @classdesc Represents a DcAddress.
         * @implements IDcAddress
         * @constructor
         * @param {common.IDcAddress=} [properties] Properties to set
         */
        function DcAddress(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DcAddress address.
         * @member {Uint8Array} address
         * @memberof common.DcAddress
         * @instance
         */
        DcAddress.prototype.address = $util.newBuffer([]);

        /**
         * Creates a new DcAddress instance using the specified properties.
         * @function create
         * @memberof common.DcAddress
         * @static
         * @param {common.IDcAddress=} [properties] Properties to set
         * @returns {common.DcAddress} DcAddress instance
         */
        DcAddress.create = function create(properties) {
            return new DcAddress(properties);
        };

        /**
         * Encodes the specified DcAddress message. Does not implicitly {@link common.DcAddress.verify|verify} messages.
         * @function encode
         * @memberof common.DcAddress
         * @static
         * @param {common.IDcAddress} message DcAddress message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DcAddress.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.address);
            return writer;
        };

        /**
         * Encodes the specified DcAddress message, length delimited. Does not implicitly {@link common.DcAddress.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.DcAddress
         * @static
         * @param {common.IDcAddress} message DcAddress message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DcAddress.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DcAddress message from the specified reader or buffer.
         * @function decode
         * @memberof common.DcAddress
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.DcAddress} DcAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DcAddress.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.DcAddress();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.address = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DcAddress message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.DcAddress
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.DcAddress} DcAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DcAddress.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DcAddress message.
         * @function verify
         * @memberof common.DcAddress
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DcAddress.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.address != null && message.hasOwnProperty("address"))
                if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                    return "address: buffer expected";
            return null;
        };

        /**
         * Creates a DcAddress message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.DcAddress
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.DcAddress} DcAddress
         */
        DcAddress.fromObject = function fromObject(object) {
            if (object instanceof $root.common.DcAddress)
                return object;
            var message = new $root.common.DcAddress();
            if (object.address != null)
                if (typeof object.address === "string")
                    $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                else if (object.address.length >= 0)
                    message.address = object.address;
            return message;
        };

        /**
         * Creates a plain object from a DcAddress message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.DcAddress
         * @static
         * @param {common.DcAddress} message DcAddress
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DcAddress.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.address = "";
                else {
                    object.address = [];
                    if (options.bytes !== Array)
                        object.address = $util.newBuffer(object.address);
                }
            if (message.address != null && message.hasOwnProperty("address"))
                object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
            return object;
        };

        /**
         * Converts this DcAddress to JSON.
         * @function toJSON
         * @memberof common.DcAddress
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DcAddress.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DcAddress
         * @function getTypeUrl
         * @memberof common.DcAddress
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DcAddress.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.DcAddress";
        };

        return DcAddress;
    })();

    common.Validator = (function() {

        /**
         * Properties of a Validator.
         * @memberof common
         * @interface IValidator
         * @property {Uint8Array|null} [address] Validator address
         * @property {number|Long|null} [power] Validator power
         */

        /**
         * Constructs a new Validator.
         * @memberof common
         * @classdesc Represents a Validator.
         * @implements IValidator
         * @constructor
         * @param {common.IValidator=} [properties] Properties to set
         */
        function Validator(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Validator address.
         * @member {Uint8Array} address
         * @memberof common.Validator
         * @instance
         */
        Validator.prototype.address = $util.newBuffer([]);

        /**
         * Validator power.
         * @member {number|Long} power
         * @memberof common.Validator
         * @instance
         */
        Validator.prototype.power = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Validator instance using the specified properties.
         * @function create
         * @memberof common.Validator
         * @static
         * @param {common.IValidator=} [properties] Properties to set
         * @returns {common.Validator} Validator instance
         */
        Validator.create = function create(properties) {
            return new Validator(properties);
        };

        /**
         * Encodes the specified Validator message. Does not implicitly {@link common.Validator.verify|verify} messages.
         * @function encode
         * @memberof common.Validator
         * @static
         * @param {common.IValidator} message Validator message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Validator.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.address);
            if (message.power != null && Object.hasOwnProperty.call(message, "power"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.power);
            return writer;
        };

        /**
         * Encodes the specified Validator message, length delimited. Does not implicitly {@link common.Validator.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.Validator
         * @static
         * @param {common.IValidator} message Validator message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Validator.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Validator message from the specified reader or buffer.
         * @function decode
         * @memberof common.Validator
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.Validator} Validator
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Validator.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.Validator();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.address = reader.bytes();
                        break;
                    }
                case 3: {
                        message.power = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Validator message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.Validator
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.Validator} Validator
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Validator.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Validator message.
         * @function verify
         * @memberof common.Validator
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Validator.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.address != null && message.hasOwnProperty("address"))
                if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                    return "address: buffer expected";
            if (message.power != null && message.hasOwnProperty("power"))
                if (!$util.isInteger(message.power) && !(message.power && $util.isInteger(message.power.low) && $util.isInteger(message.power.high)))
                    return "power: integer|Long expected";
            return null;
        };

        /**
         * Creates a Validator message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.Validator
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.Validator} Validator
         */
        Validator.fromObject = function fromObject(object) {
            if (object instanceof $root.common.Validator)
                return object;
            var message = new $root.common.Validator();
            if (object.address != null)
                if (typeof object.address === "string")
                    $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                else if (object.address.length >= 0)
                    message.address = object.address;
            if (object.power != null)
                if ($util.Long)
                    (message.power = $util.Long.fromValue(object.power)).unsigned = false;
                else if (typeof object.power === "string")
                    message.power = parseInt(object.power, 10);
                else if (typeof object.power === "number")
                    message.power = object.power;
                else if (typeof object.power === "object")
                    message.power = new $util.LongBits(object.power.low >>> 0, object.power.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a Validator message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.Validator
         * @static
         * @param {common.Validator} message Validator
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Validator.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.address = "";
                else {
                    object.address = [];
                    if (options.bytes !== Array)
                        object.address = $util.newBuffer(object.address);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.power = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.power = options.longs === String ? "0" : 0;
            }
            if (message.address != null && message.hasOwnProperty("address"))
                object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
            if (message.power != null && message.hasOwnProperty("power"))
                if (typeof message.power === "number")
                    object.power = options.longs === String ? String(message.power) : message.power;
                else
                    object.power = options.longs === String ? $util.Long.prototype.toString.call(message.power) : options.longs === Number ? new $util.LongBits(message.power.low >>> 0, message.power.high >>> 0).toNumber() : message.power;
            return object;
        };

        /**
         * Converts this Validator to JSON.
         * @function toJSON
         * @memberof common.Validator
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Validator.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Validator
         * @function getTypeUrl
         * @memberof common.Validator
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Validator.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.Validator";
        };

        return Validator;
    })();

    common.ValidatorsWrapper = (function() {

        /**
         * Properties of a ValidatorsWrapper.
         * @memberof common
         * @interface IValidatorsWrapper
         * @property {Array.<common.IValidator>|null} [validators] ValidatorsWrapper validators
         */

        /**
         * Constructs a new ValidatorsWrapper.
         * @memberof common
         * @classdesc Represents a ValidatorsWrapper.
         * @implements IValidatorsWrapper
         * @constructor
         * @param {common.IValidatorsWrapper=} [properties] Properties to set
         */
        function ValidatorsWrapper(properties) {
            this.validators = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ValidatorsWrapper validators.
         * @member {Array.<common.IValidator>} validators
         * @memberof common.ValidatorsWrapper
         * @instance
         */
        ValidatorsWrapper.prototype.validators = $util.emptyArray;

        /**
         * Creates a new ValidatorsWrapper instance using the specified properties.
         * @function create
         * @memberof common.ValidatorsWrapper
         * @static
         * @param {common.IValidatorsWrapper=} [properties] Properties to set
         * @returns {common.ValidatorsWrapper} ValidatorsWrapper instance
         */
        ValidatorsWrapper.create = function create(properties) {
            return new ValidatorsWrapper(properties);
        };

        /**
         * Encodes the specified ValidatorsWrapper message. Does not implicitly {@link common.ValidatorsWrapper.verify|verify} messages.
         * @function encode
         * @memberof common.ValidatorsWrapper
         * @static
         * @param {common.IValidatorsWrapper} message ValidatorsWrapper message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidatorsWrapper.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.validators != null && message.validators.length)
                for (var i = 0; i < message.validators.length; ++i)
                    $root.common.Validator.encode(message.validators[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ValidatorsWrapper message, length delimited. Does not implicitly {@link common.ValidatorsWrapper.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.ValidatorsWrapper
         * @static
         * @param {common.IValidatorsWrapper} message ValidatorsWrapper message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidatorsWrapper.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ValidatorsWrapper message from the specified reader or buffer.
         * @function decode
         * @memberof common.ValidatorsWrapper
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.ValidatorsWrapper} ValidatorsWrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidatorsWrapper.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.ValidatorsWrapper();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.validators && message.validators.length))
                            message.validators = [];
                        message.validators.push($root.common.Validator.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ValidatorsWrapper message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.ValidatorsWrapper
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.ValidatorsWrapper} ValidatorsWrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidatorsWrapper.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ValidatorsWrapper message.
         * @function verify
         * @memberof common.ValidatorsWrapper
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ValidatorsWrapper.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.validators != null && message.hasOwnProperty("validators")) {
                if (!Array.isArray(message.validators))
                    return "validators: array expected";
                for (var i = 0; i < message.validators.length; ++i) {
                    var error = $root.common.Validator.verify(message.validators[i]);
                    if (error)
                        return "validators." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ValidatorsWrapper message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.ValidatorsWrapper
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.ValidatorsWrapper} ValidatorsWrapper
         */
        ValidatorsWrapper.fromObject = function fromObject(object) {
            if (object instanceof $root.common.ValidatorsWrapper)
                return object;
            var message = new $root.common.ValidatorsWrapper();
            if (object.validators) {
                if (!Array.isArray(object.validators))
                    throw TypeError(".common.ValidatorsWrapper.validators: array expected");
                message.validators = [];
                for (var i = 0; i < object.validators.length; ++i) {
                    if (typeof object.validators[i] !== "object")
                        throw TypeError(".common.ValidatorsWrapper.validators: object expected");
                    message.validators[i] = $root.common.Validator.fromObject(object.validators[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ValidatorsWrapper message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.ValidatorsWrapper
         * @static
         * @param {common.ValidatorsWrapper} message ValidatorsWrapper
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ValidatorsWrapper.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.validators = [];
            if (message.validators && message.validators.length) {
                object.validators = [];
                for (var j = 0; j < message.validators.length; ++j)
                    object.validators[j] = $root.common.Validator.toObject(message.validators[j], options);
            }
            return object;
        };

        /**
         * Converts this ValidatorsWrapper to JSON.
         * @function toJSON
         * @memberof common.ValidatorsWrapper
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ValidatorsWrapper.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ValidatorsWrapper
         * @function getTypeUrl
         * @memberof common.ValidatorsWrapper
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ValidatorsWrapper.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.ValidatorsWrapper";
        };

        return ValidatorsWrapper;
    })();

    common.ProtoUint = (function() {

        /**
         * Properties of a ProtoUint.
         * @memberof common
         * @interface IProtoUint
         * @property {string|null} [value] ProtoUint value
         */

        /**
         * Constructs a new ProtoUint.
         * @memberof common
         * @classdesc Represents a ProtoUint.
         * @implements IProtoUint
         * @constructor
         * @param {common.IProtoUint=} [properties] Properties to set
         */
        function ProtoUint(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ProtoUint value.
         * @member {string} value
         * @memberof common.ProtoUint
         * @instance
         */
        ProtoUint.prototype.value = "";

        /**
         * Creates a new ProtoUint instance using the specified properties.
         * @function create
         * @memberof common.ProtoUint
         * @static
         * @param {common.IProtoUint=} [properties] Properties to set
         * @returns {common.ProtoUint} ProtoUint instance
         */
        ProtoUint.create = function create(properties) {
            return new ProtoUint(properties);
        };

        /**
         * Encodes the specified ProtoUint message. Does not implicitly {@link common.ProtoUint.verify|verify} messages.
         * @function encode
         * @memberof common.ProtoUint
         * @static
         * @param {common.IProtoUint} message ProtoUint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ProtoUint.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.value);
            return writer;
        };

        /**
         * Encodes the specified ProtoUint message, length delimited. Does not implicitly {@link common.ProtoUint.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.ProtoUint
         * @static
         * @param {common.IProtoUint} message ProtoUint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ProtoUint.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ProtoUint message from the specified reader or buffer.
         * @function decode
         * @memberof common.ProtoUint
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.ProtoUint} ProtoUint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ProtoUint.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.ProtoUint();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.value = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ProtoUint message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.ProtoUint
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.ProtoUint} ProtoUint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ProtoUint.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ProtoUint message.
         * @function verify
         * @memberof common.ProtoUint
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ProtoUint.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!$util.isString(message.value))
                    return "value: string expected";
            return null;
        };

        /**
         * Creates a ProtoUint message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.ProtoUint
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.ProtoUint} ProtoUint
         */
        ProtoUint.fromObject = function fromObject(object) {
            if (object instanceof $root.common.ProtoUint)
                return object;
            var message = new $root.common.ProtoUint();
            if (object.value != null)
                message.value = String(object.value);
            return message;
        };

        /**
         * Creates a plain object from a ProtoUint message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.ProtoUint
         * @static
         * @param {common.ProtoUint} message ProtoUint
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ProtoUint.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.value = "";
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this ProtoUint to JSON.
         * @function toJSON
         * @memberof common.ProtoUint
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ProtoUint.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ProtoUint
         * @function getTypeUrl
         * @memberof common.ProtoUint
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ProtoUint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.ProtoUint";
        };

        return ProtoUint;
    })();

    return common;
})();

$root.cosmos = (function() {

    /**
     * Namespace cosmos.
     * @exports cosmos
     * @namespace
     */
    var cosmos = {};

    cosmos.base = (function() {

        /**
         * Namespace base.
         * @memberof cosmos
         * @namespace
         */
        var base = {};

        base.v1beta1 = (function() {

            /**
             * Namespace v1beta1.
             * @memberof cosmos.base
             * @namespace
             */
            var v1beta1 = {};

            v1beta1.Coin = (function() {

                /**
                 * Properties of a Coin.
                 * @memberof cosmos.base.v1beta1
                 * @interface ICoin
                 * @property {string|null} [denom] Coin denom
                 * @property {string|null} [amount] Coin amount
                 */

                /**
                 * Constructs a new Coin.
                 * @memberof cosmos.base.v1beta1
                 * @classdesc Represents a Coin.
                 * @implements ICoin
                 * @constructor
                 * @param {cosmos.base.v1beta1.ICoin=} [properties] Properties to set
                 */
                function Coin(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Coin denom.
                 * @member {string} denom
                 * @memberof cosmos.base.v1beta1.Coin
                 * @instance
                 */
                Coin.prototype.denom = "";

                /**
                 * Coin amount.
                 * @member {string} amount
                 * @memberof cosmos.base.v1beta1.Coin
                 * @instance
                 */
                Coin.prototype.amount = "";

                /**
                 * Creates a new Coin instance using the specified properties.
                 * @function create
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {cosmos.base.v1beta1.ICoin=} [properties] Properties to set
                 * @returns {cosmos.base.v1beta1.Coin} Coin instance
                 */
                Coin.create = function create(properties) {
                    return new Coin(properties);
                };

                /**
                 * Encodes the specified Coin message. Does not implicitly {@link cosmos.base.v1beta1.Coin.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {cosmos.base.v1beta1.ICoin} message Coin message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Coin.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.denom != null && Object.hasOwnProperty.call(message, "denom"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.denom);
                    if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.amount);
                    return writer;
                };

                /**
                 * Encodes the specified Coin message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.Coin.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {cosmos.base.v1beta1.ICoin} message Coin message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Coin.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Coin message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {cosmos.base.v1beta1.Coin} Coin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Coin.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.base.v1beta1.Coin();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.denom = reader.string();
                                break;
                            }
                        case 2: {
                                message.amount = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Coin message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {cosmos.base.v1beta1.Coin} Coin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Coin.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Coin message.
                 * @function verify
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Coin.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.denom != null && message.hasOwnProperty("denom"))
                        if (!$util.isString(message.denom))
                            return "denom: string expected";
                    if (message.amount != null && message.hasOwnProperty("amount"))
                        if (!$util.isString(message.amount))
                            return "amount: string expected";
                    return null;
                };

                /**
                 * Creates a Coin message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {cosmos.base.v1beta1.Coin} Coin
                 */
                Coin.fromObject = function fromObject(object) {
                    if (object instanceof $root.cosmos.base.v1beta1.Coin)
                        return object;
                    var message = new $root.cosmos.base.v1beta1.Coin();
                    if (object.denom != null)
                        message.denom = String(object.denom);
                    if (object.amount != null)
                        message.amount = String(object.amount);
                    return message;
                };

                /**
                 * Creates a plain object from a Coin message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {cosmos.base.v1beta1.Coin} message Coin
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Coin.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.denom = "";
                        object.amount = "";
                    }
                    if (message.denom != null && message.hasOwnProperty("denom"))
                        object.denom = message.denom;
                    if (message.amount != null && message.hasOwnProperty("amount"))
                        object.amount = message.amount;
                    return object;
                };

                /**
                 * Converts this Coin to JSON.
                 * @function toJSON
                 * @memberof cosmos.base.v1beta1.Coin
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Coin.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Coin
                 * @function getTypeUrl
                 * @memberof cosmos.base.v1beta1.Coin
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Coin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/cosmos.base.v1beta1.Coin";
                };

                return Coin;
            })();

            v1beta1.DecCoin = (function() {

                /**
                 * Properties of a DecCoin.
                 * @memberof cosmos.base.v1beta1
                 * @interface IDecCoin
                 * @property {string|null} [denom] DecCoin denom
                 * @property {string|null} [amount] DecCoin amount
                 */

                /**
                 * Constructs a new DecCoin.
                 * @memberof cosmos.base.v1beta1
                 * @classdesc Represents a DecCoin.
                 * @implements IDecCoin
                 * @constructor
                 * @param {cosmos.base.v1beta1.IDecCoin=} [properties] Properties to set
                 */
                function DecCoin(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DecCoin denom.
                 * @member {string} denom
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @instance
                 */
                DecCoin.prototype.denom = "";

                /**
                 * DecCoin amount.
                 * @member {string} amount
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @instance
                 */
                DecCoin.prototype.amount = "";

                /**
                 * Creates a new DecCoin instance using the specified properties.
                 * @function create
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {cosmos.base.v1beta1.IDecCoin=} [properties] Properties to set
                 * @returns {cosmos.base.v1beta1.DecCoin} DecCoin instance
                 */
                DecCoin.create = function create(properties) {
                    return new DecCoin(properties);
                };

                /**
                 * Encodes the specified DecCoin message. Does not implicitly {@link cosmos.base.v1beta1.DecCoin.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {cosmos.base.v1beta1.IDecCoin} message DecCoin message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DecCoin.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.denom != null && Object.hasOwnProperty.call(message, "denom"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.denom);
                    if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.amount);
                    return writer;
                };

                /**
                 * Encodes the specified DecCoin message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.DecCoin.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {cosmos.base.v1beta1.IDecCoin} message DecCoin message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DecCoin.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DecCoin message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {cosmos.base.v1beta1.DecCoin} DecCoin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DecCoin.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.base.v1beta1.DecCoin();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.denom = reader.string();
                                break;
                            }
                        case 2: {
                                message.amount = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DecCoin message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {cosmos.base.v1beta1.DecCoin} DecCoin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DecCoin.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DecCoin message.
                 * @function verify
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DecCoin.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.denom != null && message.hasOwnProperty("denom"))
                        if (!$util.isString(message.denom))
                            return "denom: string expected";
                    if (message.amount != null && message.hasOwnProperty("amount"))
                        if (!$util.isString(message.amount))
                            return "amount: string expected";
                    return null;
                };

                /**
                 * Creates a DecCoin message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {cosmos.base.v1beta1.DecCoin} DecCoin
                 */
                DecCoin.fromObject = function fromObject(object) {
                    if (object instanceof $root.cosmos.base.v1beta1.DecCoin)
                        return object;
                    var message = new $root.cosmos.base.v1beta1.DecCoin();
                    if (object.denom != null)
                        message.denom = String(object.denom);
                    if (object.amount != null)
                        message.amount = String(object.amount);
                    return message;
                };

                /**
                 * Creates a plain object from a DecCoin message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {cosmos.base.v1beta1.DecCoin} message DecCoin
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DecCoin.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.denom = "";
                        object.amount = "";
                    }
                    if (message.denom != null && message.hasOwnProperty("denom"))
                        object.denom = message.denom;
                    if (message.amount != null && message.hasOwnProperty("amount"))
                        object.amount = message.amount;
                    return object;
                };

                /**
                 * Converts this DecCoin to JSON.
                 * @function toJSON
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DecCoin.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DecCoin
                 * @function getTypeUrl
                 * @memberof cosmos.base.v1beta1.DecCoin
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DecCoin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/cosmos.base.v1beta1.DecCoin";
                };

                return DecCoin;
            })();

            v1beta1.IntProto = (function() {

                /**
                 * Properties of an IntProto.
                 * @memberof cosmos.base.v1beta1
                 * @interface IIntProto
                 * @property {string|null} [int] IntProto int
                 */

                /**
                 * Constructs a new IntProto.
                 * @memberof cosmos.base.v1beta1
                 * @classdesc Represents an IntProto.
                 * @implements IIntProto
                 * @constructor
                 * @param {cosmos.base.v1beta1.IIntProto=} [properties] Properties to set
                 */
                function IntProto(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * IntProto int.
                 * @member {string} int
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @instance
                 */
                IntProto.prototype.int = "";

                /**
                 * Creates a new IntProto instance using the specified properties.
                 * @function create
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {cosmos.base.v1beta1.IIntProto=} [properties] Properties to set
                 * @returns {cosmos.base.v1beta1.IntProto} IntProto instance
                 */
                IntProto.create = function create(properties) {
                    return new IntProto(properties);
                };

                /**
                 * Encodes the specified IntProto message. Does not implicitly {@link cosmos.base.v1beta1.IntProto.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {cosmos.base.v1beta1.IIntProto} message IntProto message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                IntProto.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.int != null && Object.hasOwnProperty.call(message, "int"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.int);
                    return writer;
                };

                /**
                 * Encodes the specified IntProto message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.IntProto.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {cosmos.base.v1beta1.IIntProto} message IntProto message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                IntProto.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an IntProto message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {cosmos.base.v1beta1.IntProto} IntProto
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                IntProto.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.base.v1beta1.IntProto();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.int = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an IntProto message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {cosmos.base.v1beta1.IntProto} IntProto
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                IntProto.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an IntProto message.
                 * @function verify
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                IntProto.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.int != null && message.hasOwnProperty("int"))
                        if (!$util.isString(message.int))
                            return "int: string expected";
                    return null;
                };

                /**
                 * Creates an IntProto message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {cosmos.base.v1beta1.IntProto} IntProto
                 */
                IntProto.fromObject = function fromObject(object) {
                    if (object instanceof $root.cosmos.base.v1beta1.IntProto)
                        return object;
                    var message = new $root.cosmos.base.v1beta1.IntProto();
                    if (object.int != null)
                        message.int = String(object.int);
                    return message;
                };

                /**
                 * Creates a plain object from an IntProto message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {cosmos.base.v1beta1.IntProto} message IntProto
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                IntProto.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.int = "";
                    if (message.int != null && message.hasOwnProperty("int"))
                        object.int = message.int;
                    return object;
                };

                /**
                 * Converts this IntProto to JSON.
                 * @function toJSON
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                IntProto.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for IntProto
                 * @function getTypeUrl
                 * @memberof cosmos.base.v1beta1.IntProto
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                IntProto.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/cosmos.base.v1beta1.IntProto";
                };

                return IntProto;
            })();

            v1beta1.DecProto = (function() {

                /**
                 * Properties of a DecProto.
                 * @memberof cosmos.base.v1beta1
                 * @interface IDecProto
                 * @property {string|null} [dec] DecProto dec
                 */

                /**
                 * Constructs a new DecProto.
                 * @memberof cosmos.base.v1beta1
                 * @classdesc Represents a DecProto.
                 * @implements IDecProto
                 * @constructor
                 * @param {cosmos.base.v1beta1.IDecProto=} [properties] Properties to set
                 */
                function DecProto(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DecProto dec.
                 * @member {string} dec
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @instance
                 */
                DecProto.prototype.dec = "";

                /**
                 * Creates a new DecProto instance using the specified properties.
                 * @function create
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {cosmos.base.v1beta1.IDecProto=} [properties] Properties to set
                 * @returns {cosmos.base.v1beta1.DecProto} DecProto instance
                 */
                DecProto.create = function create(properties) {
                    return new DecProto(properties);
                };

                /**
                 * Encodes the specified DecProto message. Does not implicitly {@link cosmos.base.v1beta1.DecProto.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {cosmos.base.v1beta1.IDecProto} message DecProto message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DecProto.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.dec != null && Object.hasOwnProperty.call(message, "dec"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.dec);
                    return writer;
                };

                /**
                 * Encodes the specified DecProto message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.DecProto.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {cosmos.base.v1beta1.IDecProto} message DecProto message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DecProto.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DecProto message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {cosmos.base.v1beta1.DecProto} DecProto
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DecProto.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.base.v1beta1.DecProto();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.dec = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DecProto message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {cosmos.base.v1beta1.DecProto} DecProto
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DecProto.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DecProto message.
                 * @function verify
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DecProto.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.dec != null && message.hasOwnProperty("dec"))
                        if (!$util.isString(message.dec))
                            return "dec: string expected";
                    return null;
                };

                /**
                 * Creates a DecProto message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {cosmos.base.v1beta1.DecProto} DecProto
                 */
                DecProto.fromObject = function fromObject(object) {
                    if (object instanceof $root.cosmos.base.v1beta1.DecProto)
                        return object;
                    var message = new $root.cosmos.base.v1beta1.DecProto();
                    if (object.dec != null)
                        message.dec = String(object.dec);
                    return message;
                };

                /**
                 * Creates a plain object from a DecProto message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {cosmos.base.v1beta1.DecProto} message DecProto
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DecProto.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.dec = "";
                    if (message.dec != null && message.hasOwnProperty("dec"))
                        object.dec = message.dec;
                    return object;
                };

                /**
                 * Converts this DecProto to JSON.
                 * @function toJSON
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DecProto.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DecProto
                 * @function getTypeUrl
                 * @memberof cosmos.base.v1beta1.DecProto
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DecProto.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/cosmos.base.v1beta1.DecProto";
                };

                return DecProto;
            })();

            return v1beta1;
        })();

        return base;
    })();

    return cosmos;
})();

$root.types = (function() {

    /**
     * Namespace types.
     * @exports types
     * @namespace
     */
    var types = {};

    types.MsgDeposit = (function() {

        /**
         * Properties of a MsgDeposit.
         * @memberof types
         * @interface IMsgDeposit
         * @property {Array.<common.ICoin>|null} [coins] MsgDeposit coins
         * @property {string|null} [memo] MsgDeposit memo
         * @property {Uint8Array|null} [signer] MsgDeposit signer
         */

        /**
         * Constructs a new MsgDeposit.
         * @memberof types
         * @classdesc Represents a MsgDeposit.
         * @implements IMsgDeposit
         * @constructor
         * @param {types.IMsgDeposit=} [properties] Properties to set
         */
        function MsgDeposit(properties) {
            this.coins = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgDeposit coins.
         * @member {Array.<common.ICoin>} coins
         * @memberof types.MsgDeposit
         * @instance
         */
        MsgDeposit.prototype.coins = $util.emptyArray;

        /**
         * MsgDeposit memo.
         * @member {string} memo
         * @memberof types.MsgDeposit
         * @instance
         */
        MsgDeposit.prototype.memo = "";

        /**
         * MsgDeposit signer.
         * @member {Uint8Array} signer
         * @memberof types.MsgDeposit
         * @instance
         */
        MsgDeposit.prototype.signer = $util.newBuffer([]);

        /**
         * Creates a new MsgDeposit instance using the specified properties.
         * @function create
         * @memberof types.MsgDeposit
         * @static
         * @param {types.IMsgDeposit=} [properties] Properties to set
         * @returns {types.MsgDeposit} MsgDeposit instance
         */
        MsgDeposit.create = function create(properties) {
            return new MsgDeposit(properties);
        };

        /**
         * Encodes the specified MsgDeposit message. Does not implicitly {@link types.MsgDeposit.verify|verify} messages.
         * @function encode
         * @memberof types.MsgDeposit
         * @static
         * @param {types.IMsgDeposit} message MsgDeposit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgDeposit.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.coins != null && message.coins.length)
                for (var i = 0; i < message.coins.length; ++i)
                    $root.common.Coin.encode(message.coins[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.memo != null && Object.hasOwnProperty.call(message, "memo"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.memo);
            if (message.signer != null && Object.hasOwnProperty.call(message, "signer"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.signer);
            return writer;
        };

        /**
         * Encodes the specified MsgDeposit message, length delimited. Does not implicitly {@link types.MsgDeposit.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MsgDeposit
         * @static
         * @param {types.IMsgDeposit} message MsgDeposit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgDeposit.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgDeposit message from the specified reader or buffer.
         * @function decode
         * @memberof types.MsgDeposit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MsgDeposit} MsgDeposit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgDeposit.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MsgDeposit();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.coins && message.coins.length))
                            message.coins = [];
                        message.coins.push($root.common.Coin.decode(reader, reader.uint32()));
                        break;
                    }
                case 2: {
                        message.memo = reader.string();
                        break;
                    }
                case 3: {
                        message.signer = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MsgDeposit message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MsgDeposit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MsgDeposit} MsgDeposit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgDeposit.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgDeposit message.
         * @function verify
         * @memberof types.MsgDeposit
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgDeposit.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.coins != null && message.hasOwnProperty("coins")) {
                if (!Array.isArray(message.coins))
                    return "coins: array expected";
                for (var i = 0; i < message.coins.length; ++i) {
                    var error = $root.common.Coin.verify(message.coins[i]);
                    if (error)
                        return "coins." + error;
                }
            }
            if (message.memo != null && message.hasOwnProperty("memo"))
                if (!$util.isString(message.memo))
                    return "memo: string expected";
            if (message.signer != null && message.hasOwnProperty("signer"))
                if (!(message.signer && typeof message.signer.length === "number" || $util.isString(message.signer)))
                    return "signer: buffer expected";
            return null;
        };

        /**
         * Creates a MsgDeposit message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MsgDeposit
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MsgDeposit} MsgDeposit
         */
        MsgDeposit.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MsgDeposit)
                return object;
            var message = new $root.types.MsgDeposit();
            if (object.coins) {
                if (!Array.isArray(object.coins))
                    throw TypeError(".types.MsgDeposit.coins: array expected");
                message.coins = [];
                for (var i = 0; i < object.coins.length; ++i) {
                    if (typeof object.coins[i] !== "object")
                        throw TypeError(".types.MsgDeposit.coins: object expected");
                    message.coins[i] = $root.common.Coin.fromObject(object.coins[i]);
                }
            }
            if (object.memo != null)
                message.memo = String(object.memo);
            if (object.signer != null)
                if (typeof object.signer === "string")
                    $util.base64.decode(object.signer, message.signer = $util.newBuffer($util.base64.length(object.signer)), 0);
                else if (object.signer.length >= 0)
                    message.signer = object.signer;
            return message;
        };

        /**
         * Creates a plain object from a MsgDeposit message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MsgDeposit
         * @static
         * @param {types.MsgDeposit} message MsgDeposit
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgDeposit.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.coins = [];
            if (options.defaults) {
                object.memo = "";
                if (options.bytes === String)
                    object.signer = "";
                else {
                    object.signer = [];
                    if (options.bytes !== Array)
                        object.signer = $util.newBuffer(object.signer);
                }
            }
            if (message.coins && message.coins.length) {
                object.coins = [];
                for (var j = 0; j < message.coins.length; ++j)
                    object.coins[j] = $root.common.Coin.toObject(message.coins[j], options);
            }
            if (message.memo != null && message.hasOwnProperty("memo"))
                object.memo = message.memo;
            if (message.signer != null && message.hasOwnProperty("signer"))
                object.signer = options.bytes === String ? $util.base64.encode(message.signer, 0, message.signer.length) : options.bytes === Array ? Array.prototype.slice.call(message.signer) : message.signer;
            return object;
        };

        /**
         * Converts this MsgDeposit to JSON.
         * @function toJSON
         * @memberof types.MsgDeposit
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgDeposit.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgDeposit
         * @function getTypeUrl
         * @memberof types.MsgDeposit
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgDeposit.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MsgDeposit";
        };

        return MsgDeposit;
    })();

    types.MsgSend = (function() {

        /**
         * Properties of a MsgSend.
         * @memberof types
         * @interface IMsgSend
         * @property {Uint8Array|null} [fromAddress] MsgSend fromAddress
         * @property {Uint8Array|null} [toAddress] MsgSend toAddress
         * @property {Array.<cosmos.base.v1beta1.ICoin>|null} [amount] MsgSend amount
         */

        /**
         * Constructs a new MsgSend.
         * @memberof types
         * @classdesc Represents a MsgSend.
         * @implements IMsgSend
         * @constructor
         * @param {types.IMsgSend=} [properties] Properties to set
         */
        function MsgSend(properties) {
            this.amount = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgSend fromAddress.
         * @member {Uint8Array} fromAddress
         * @memberof types.MsgSend
         * @instance
         */
        MsgSend.prototype.fromAddress = $util.newBuffer([]);

        /**
         * MsgSend toAddress.
         * @member {Uint8Array} toAddress
         * @memberof types.MsgSend
         * @instance
         */
        MsgSend.prototype.toAddress = $util.newBuffer([]);

        /**
         * MsgSend amount.
         * @member {Array.<cosmos.base.v1beta1.ICoin>} amount
         * @memberof types.MsgSend
         * @instance
         */
        MsgSend.prototype.amount = $util.emptyArray;

        /**
         * Creates a new MsgSend instance using the specified properties.
         * @function create
         * @memberof types.MsgSend
         * @static
         * @param {types.IMsgSend=} [properties] Properties to set
         * @returns {types.MsgSend} MsgSend instance
         */
        MsgSend.create = function create(properties) {
            return new MsgSend(properties);
        };

        /**
         * Encodes the specified MsgSend message. Does not implicitly {@link types.MsgSend.verify|verify} messages.
         * @function encode
         * @memberof types.MsgSend
         * @static
         * @param {types.IMsgSend} message MsgSend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.fromAddress);
            if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.toAddress);
            if (message.amount != null && message.amount.length)
                for (var i = 0; i < message.amount.length; ++i)
                    $root.cosmos.base.v1beta1.Coin.encode(message.amount[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MsgSend message, length delimited. Does not implicitly {@link types.MsgSend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MsgSend
         * @static
         * @param {types.IMsgSend} message MsgSend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgSend message from the specified reader or buffer.
         * @function decode
         * @memberof types.MsgSend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MsgSend} MsgSend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MsgSend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.fromAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.toAddress = reader.bytes();
                        break;
                    }
                case 3: {
                        if (!(message.amount && message.amount.length))
                            message.amount = [];
                        message.amount.push($root.cosmos.base.v1beta1.Coin.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MsgSend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MsgSend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MsgSend} MsgSend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgSend message.
         * @function verify
         * @memberof types.MsgSend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgSend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                if (!(message.fromAddress && typeof message.fromAddress.length === "number" || $util.isString(message.fromAddress)))
                    return "fromAddress: buffer expected";
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                if (!(message.toAddress && typeof message.toAddress.length === "number" || $util.isString(message.toAddress)))
                    return "toAddress: buffer expected";
            if (message.amount != null && message.hasOwnProperty("amount")) {
                if (!Array.isArray(message.amount))
                    return "amount: array expected";
                for (var i = 0; i < message.amount.length; ++i) {
                    var error = $root.cosmos.base.v1beta1.Coin.verify(message.amount[i]);
                    if (error)
                        return "amount." + error;
                }
            }
            return null;
        };

        /**
         * Creates a MsgSend message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MsgSend
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MsgSend} MsgSend
         */
        MsgSend.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MsgSend)
                return object;
            var message = new $root.types.MsgSend();
            if (object.fromAddress != null)
                if (typeof object.fromAddress === "string")
                    $util.base64.decode(object.fromAddress, message.fromAddress = $util.newBuffer($util.base64.length(object.fromAddress)), 0);
                else if (object.fromAddress.length >= 0)
                    message.fromAddress = object.fromAddress;
            if (object.toAddress != null)
                if (typeof object.toAddress === "string")
                    $util.base64.decode(object.toAddress, message.toAddress = $util.newBuffer($util.base64.length(object.toAddress)), 0);
                else if (object.toAddress.length >= 0)
                    message.toAddress = object.toAddress;
            if (object.amount) {
                if (!Array.isArray(object.amount))
                    throw TypeError(".types.MsgSend.amount: array expected");
                message.amount = [];
                for (var i = 0; i < object.amount.length; ++i) {
                    if (typeof object.amount[i] !== "object")
                        throw TypeError(".types.MsgSend.amount: object expected");
                    message.amount[i] = $root.cosmos.base.v1beta1.Coin.fromObject(object.amount[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a MsgSend message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MsgSend
         * @static
         * @param {types.MsgSend} message MsgSend
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgSend.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.amount = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.fromAddress = "";
                else {
                    object.fromAddress = [];
                    if (options.bytes !== Array)
                        object.fromAddress = $util.newBuffer(object.fromAddress);
                }
                if (options.bytes === String)
                    object.toAddress = "";
                else {
                    object.toAddress = [];
                    if (options.bytes !== Array)
                        object.toAddress = $util.newBuffer(object.toAddress);
                }
            }
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                object.fromAddress = options.bytes === String ? $util.base64.encode(message.fromAddress, 0, message.fromAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.fromAddress) : message.fromAddress;
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                object.toAddress = options.bytes === String ? $util.base64.encode(message.toAddress, 0, message.toAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.toAddress) : message.toAddress;
            if (message.amount && message.amount.length) {
                object.amount = [];
                for (var j = 0; j < message.amount.length; ++j)
                    object.amount[j] = $root.cosmos.base.v1beta1.Coin.toObject(message.amount[j], options);
            }
            return object;
        };

        /**
         * Converts this MsgSend to JSON.
         * @function toJSON
         * @memberof types.MsgSend
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgSend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgSend
         * @function getTypeUrl
         * @memberof types.MsgSend
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgSend.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MsgSend";
        };

        return MsgSend;
    })();

    types.MsgSetVersion = (function() {

        /**
         * Properties of a MsgSetVersion.
         * @memberof types
         * @interface IMsgSetVersion
         * @property {string|null} [version] MsgSetVersion version
         * @property {Uint8Array|null} [signer] MsgSetVersion signer
         */

        /**
         * Constructs a new MsgSetVersion.
         * @memberof types
         * @classdesc Represents a MsgSetVersion.
         * @implements IMsgSetVersion
         * @constructor
         * @param {types.IMsgSetVersion=} [properties] Properties to set
         */
        function MsgSetVersion(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgSetVersion version.
         * @member {string} version
         * @memberof types.MsgSetVersion
         * @instance
         */
        MsgSetVersion.prototype.version = "";

        /**
         * MsgSetVersion signer.
         * @member {Uint8Array} signer
         * @memberof types.MsgSetVersion
         * @instance
         */
        MsgSetVersion.prototype.signer = $util.newBuffer([]);

        /**
         * Creates a new MsgSetVersion instance using the specified properties.
         * @function create
         * @memberof types.MsgSetVersion
         * @static
         * @param {types.IMsgSetVersion=} [properties] Properties to set
         * @returns {types.MsgSetVersion} MsgSetVersion instance
         */
        MsgSetVersion.create = function create(properties) {
            return new MsgSetVersion(properties);
        };

        /**
         * Encodes the specified MsgSetVersion message. Does not implicitly {@link types.MsgSetVersion.verify|verify} messages.
         * @function encode
         * @memberof types.MsgSetVersion
         * @static
         * @param {types.IMsgSetVersion} message MsgSetVersion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSetVersion.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
            if (message.signer != null && Object.hasOwnProperty.call(message, "signer"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signer);
            return writer;
        };

        /**
         * Encodes the specified MsgSetVersion message, length delimited. Does not implicitly {@link types.MsgSetVersion.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MsgSetVersion
         * @static
         * @param {types.IMsgSetVersion} message MsgSetVersion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSetVersion.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgSetVersion message from the specified reader or buffer.
         * @function decode
         * @memberof types.MsgSetVersion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MsgSetVersion} MsgSetVersion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSetVersion.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MsgSetVersion();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.version = reader.string();
                        break;
                    }
                case 2: {
                        message.signer = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MsgSetVersion message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MsgSetVersion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MsgSetVersion} MsgSetVersion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSetVersion.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgSetVersion message.
         * @function verify
         * @memberof types.MsgSetVersion
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgSetVersion.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isString(message.version))
                    return "version: string expected";
            if (message.signer != null && message.hasOwnProperty("signer"))
                if (!(message.signer && typeof message.signer.length === "number" || $util.isString(message.signer)))
                    return "signer: buffer expected";
            return null;
        };

        /**
         * Creates a MsgSetVersion message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MsgSetVersion
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MsgSetVersion} MsgSetVersion
         */
        MsgSetVersion.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MsgSetVersion)
                return object;
            var message = new $root.types.MsgSetVersion();
            if (object.version != null)
                message.version = String(object.version);
            if (object.signer != null)
                if (typeof object.signer === "string")
                    $util.base64.decode(object.signer, message.signer = $util.newBuffer($util.base64.length(object.signer)), 0);
                else if (object.signer.length >= 0)
                    message.signer = object.signer;
            return message;
        };

        /**
         * Creates a plain object from a MsgSetVersion message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MsgSetVersion
         * @static
         * @param {types.MsgSetVersion} message MsgSetVersion
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgSetVersion.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.version = "";
                if (options.bytes === String)
                    object.signer = "";
                else {
                    object.signer = [];
                    if (options.bytes !== Array)
                        object.signer = $util.newBuffer(object.signer);
                }
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.signer != null && message.hasOwnProperty("signer"))
                object.signer = options.bytes === String ? $util.base64.encode(message.signer, 0, message.signer.length) : options.bytes === Array ? Array.prototype.slice.call(message.signer) : message.signer;
            return object;
        };

        /**
         * Converts this MsgSetVersion to JSON.
         * @function toJSON
         * @memberof types.MsgSetVersion
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgSetVersion.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgSetVersion
         * @function getTypeUrl
         * @memberof types.MsgSetVersion
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgSetVersion.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MsgSetVersion";
        };

        return MsgSetVersion;
    })();

    types.MsgSetIPAddress = (function() {

        /**
         * Properties of a MsgSetIPAddress.
         * @memberof types
         * @interface IMsgSetIPAddress
         * @property {string|null} [ipAddress] MsgSetIPAddress ipAddress
         * @property {Uint8Array|null} [signer] MsgSetIPAddress signer
         */

        /**
         * Constructs a new MsgSetIPAddress.
         * @memberof types
         * @classdesc Represents a MsgSetIPAddress.
         * @implements IMsgSetIPAddress
         * @constructor
         * @param {types.IMsgSetIPAddress=} [properties] Properties to set
         */
        function MsgSetIPAddress(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgSetIPAddress ipAddress.
         * @member {string} ipAddress
         * @memberof types.MsgSetIPAddress
         * @instance
         */
        MsgSetIPAddress.prototype.ipAddress = "";

        /**
         * MsgSetIPAddress signer.
         * @member {Uint8Array} signer
         * @memberof types.MsgSetIPAddress
         * @instance
         */
        MsgSetIPAddress.prototype.signer = $util.newBuffer([]);

        /**
         * Creates a new MsgSetIPAddress instance using the specified properties.
         * @function create
         * @memberof types.MsgSetIPAddress
         * @static
         * @param {types.IMsgSetIPAddress=} [properties] Properties to set
         * @returns {types.MsgSetIPAddress} MsgSetIPAddress instance
         */
        MsgSetIPAddress.create = function create(properties) {
            return new MsgSetIPAddress(properties);
        };

        /**
         * Encodes the specified MsgSetIPAddress message. Does not implicitly {@link types.MsgSetIPAddress.verify|verify} messages.
         * @function encode
         * @memberof types.MsgSetIPAddress
         * @static
         * @param {types.IMsgSetIPAddress} message MsgSetIPAddress message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSetIPAddress.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.ipAddress);
            if (message.signer != null && Object.hasOwnProperty.call(message, "signer"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signer);
            return writer;
        };

        /**
         * Encodes the specified MsgSetIPAddress message, length delimited. Does not implicitly {@link types.MsgSetIPAddress.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MsgSetIPAddress
         * @static
         * @param {types.IMsgSetIPAddress} message MsgSetIPAddress message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSetIPAddress.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgSetIPAddress message from the specified reader or buffer.
         * @function decode
         * @memberof types.MsgSetIPAddress
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MsgSetIPAddress} MsgSetIPAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSetIPAddress.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MsgSetIPAddress();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.ipAddress = reader.string();
                        break;
                    }
                case 2: {
                        message.signer = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MsgSetIPAddress message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MsgSetIPAddress
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MsgSetIPAddress} MsgSetIPAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSetIPAddress.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgSetIPAddress message.
         * @function verify
         * @memberof types.MsgSetIPAddress
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgSetIPAddress.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ipAddress != null && message.hasOwnProperty("ipAddress"))
                if (!$util.isString(message.ipAddress))
                    return "ipAddress: string expected";
            if (message.signer != null && message.hasOwnProperty("signer"))
                if (!(message.signer && typeof message.signer.length === "number" || $util.isString(message.signer)))
                    return "signer: buffer expected";
            return null;
        };

        /**
         * Creates a MsgSetIPAddress message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MsgSetIPAddress
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MsgSetIPAddress} MsgSetIPAddress
         */
        MsgSetIPAddress.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MsgSetIPAddress)
                return object;
            var message = new $root.types.MsgSetIPAddress();
            if (object.ipAddress != null)
                message.ipAddress = String(object.ipAddress);
            if (object.signer != null)
                if (typeof object.signer === "string")
                    $util.base64.decode(object.signer, message.signer = $util.newBuffer($util.base64.length(object.signer)), 0);
                else if (object.signer.length >= 0)
                    message.signer = object.signer;
            return message;
        };

        /**
         * Creates a plain object from a MsgSetIPAddress message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MsgSetIPAddress
         * @static
         * @param {types.MsgSetIPAddress} message MsgSetIPAddress
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgSetIPAddress.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.ipAddress = "";
                if (options.bytes === String)
                    object.signer = "";
                else {
                    object.signer = [];
                    if (options.bytes !== Array)
                        object.signer = $util.newBuffer(object.signer);
                }
            }
            if (message.ipAddress != null && message.hasOwnProperty("ipAddress"))
                object.ipAddress = message.ipAddress;
            if (message.signer != null && message.hasOwnProperty("signer"))
                object.signer = options.bytes === String ? $util.base64.encode(message.signer, 0, message.signer.length) : options.bytes === Array ? Array.prototype.slice.call(message.signer) : message.signer;
            return object;
        };

        /**
         * Converts this MsgSetIPAddress to JSON.
         * @function toJSON
         * @memberof types.MsgSetIPAddress
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgSetIPAddress.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgSetIPAddress
         * @function getTypeUrl
         * @memberof types.MsgSetIPAddress
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgSetIPAddress.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MsgSetIPAddress";
        };

        return MsgSetIPAddress;
    })();

    types.MsgSetNodeKeys = (function() {

        /**
         * Properties of a MsgSetNodeKeys.
         * @memberof types
         * @interface IMsgSetNodeKeys
         * @property {common.IPubKeySet|null} [pubKeySetSet] MsgSetNodeKeys pubKeySetSet
         * @property {string|null} [validatorConsPubKey] MsgSetNodeKeys validatorConsPubKey
         * @property {Uint8Array|null} [signer] MsgSetNodeKeys signer
         */

        /**
         * Constructs a new MsgSetNodeKeys.
         * @memberof types
         * @classdesc Represents a MsgSetNodeKeys.
         * @implements IMsgSetNodeKeys
         * @constructor
         * @param {types.IMsgSetNodeKeys=} [properties] Properties to set
         */
        function MsgSetNodeKeys(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgSetNodeKeys pubKeySetSet.
         * @member {common.IPubKeySet|null|undefined} pubKeySetSet
         * @memberof types.MsgSetNodeKeys
         * @instance
         */
        MsgSetNodeKeys.prototype.pubKeySetSet = null;

        /**
         * MsgSetNodeKeys validatorConsPubKey.
         * @member {string} validatorConsPubKey
         * @memberof types.MsgSetNodeKeys
         * @instance
         */
        MsgSetNodeKeys.prototype.validatorConsPubKey = "";

        /**
         * MsgSetNodeKeys signer.
         * @member {Uint8Array} signer
         * @memberof types.MsgSetNodeKeys
         * @instance
         */
        MsgSetNodeKeys.prototype.signer = $util.newBuffer([]);

        /**
         * Creates a new MsgSetNodeKeys instance using the specified properties.
         * @function create
         * @memberof types.MsgSetNodeKeys
         * @static
         * @param {types.IMsgSetNodeKeys=} [properties] Properties to set
         * @returns {types.MsgSetNodeKeys} MsgSetNodeKeys instance
         */
        MsgSetNodeKeys.create = function create(properties) {
            return new MsgSetNodeKeys(properties);
        };

        /**
         * Encodes the specified MsgSetNodeKeys message. Does not implicitly {@link types.MsgSetNodeKeys.verify|verify} messages.
         * @function encode
         * @memberof types.MsgSetNodeKeys
         * @static
         * @param {types.IMsgSetNodeKeys} message MsgSetNodeKeys message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSetNodeKeys.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pubKeySetSet != null && Object.hasOwnProperty.call(message, "pubKeySetSet"))
                $root.common.PubKeySet.encode(message.pubKeySetSet, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.validatorConsPubKey != null && Object.hasOwnProperty.call(message, "validatorConsPubKey"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.validatorConsPubKey);
            if (message.signer != null && Object.hasOwnProperty.call(message, "signer"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.signer);
            return writer;
        };

        /**
         * Encodes the specified MsgSetNodeKeys message, length delimited. Does not implicitly {@link types.MsgSetNodeKeys.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MsgSetNodeKeys
         * @static
         * @param {types.IMsgSetNodeKeys} message MsgSetNodeKeys message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSetNodeKeys.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgSetNodeKeys message from the specified reader or buffer.
         * @function decode
         * @memberof types.MsgSetNodeKeys
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MsgSetNodeKeys} MsgSetNodeKeys
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSetNodeKeys.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MsgSetNodeKeys();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.pubKeySetSet = $root.common.PubKeySet.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.validatorConsPubKey = reader.string();
                        break;
                    }
                case 3: {
                        message.signer = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MsgSetNodeKeys message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MsgSetNodeKeys
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MsgSetNodeKeys} MsgSetNodeKeys
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSetNodeKeys.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgSetNodeKeys message.
         * @function verify
         * @memberof types.MsgSetNodeKeys
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgSetNodeKeys.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pubKeySetSet != null && message.hasOwnProperty("pubKeySetSet")) {
                var error = $root.common.PubKeySet.verify(message.pubKeySetSet);
                if (error)
                    return "pubKeySetSet." + error;
            }
            if (message.validatorConsPubKey != null && message.hasOwnProperty("validatorConsPubKey"))
                if (!$util.isString(message.validatorConsPubKey))
                    return "validatorConsPubKey: string expected";
            if (message.signer != null && message.hasOwnProperty("signer"))
                if (!(message.signer && typeof message.signer.length === "number" || $util.isString(message.signer)))
                    return "signer: buffer expected";
            return null;
        };

        /**
         * Creates a MsgSetNodeKeys message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MsgSetNodeKeys
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MsgSetNodeKeys} MsgSetNodeKeys
         */
        MsgSetNodeKeys.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MsgSetNodeKeys)
                return object;
            var message = new $root.types.MsgSetNodeKeys();
            if (object.pubKeySetSet != null) {
                if (typeof object.pubKeySetSet !== "object")
                    throw TypeError(".types.MsgSetNodeKeys.pubKeySetSet: object expected");
                message.pubKeySetSet = $root.common.PubKeySet.fromObject(object.pubKeySetSet);
            }
            if (object.validatorConsPubKey != null)
                message.validatorConsPubKey = String(object.validatorConsPubKey);
            if (object.signer != null)
                if (typeof object.signer === "string")
                    $util.base64.decode(object.signer, message.signer = $util.newBuffer($util.base64.length(object.signer)), 0);
                else if (object.signer.length >= 0)
                    message.signer = object.signer;
            return message;
        };

        /**
         * Creates a plain object from a MsgSetNodeKeys message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MsgSetNodeKeys
         * @static
         * @param {types.MsgSetNodeKeys} message MsgSetNodeKeys
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgSetNodeKeys.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.pubKeySetSet = null;
                object.validatorConsPubKey = "";
                if (options.bytes === String)
                    object.signer = "";
                else {
                    object.signer = [];
                    if (options.bytes !== Array)
                        object.signer = $util.newBuffer(object.signer);
                }
            }
            if (message.pubKeySetSet != null && message.hasOwnProperty("pubKeySetSet"))
                object.pubKeySetSet = $root.common.PubKeySet.toObject(message.pubKeySetSet, options);
            if (message.validatorConsPubKey != null && message.hasOwnProperty("validatorConsPubKey"))
                object.validatorConsPubKey = message.validatorConsPubKey;
            if (message.signer != null && message.hasOwnProperty("signer"))
                object.signer = options.bytes === String ? $util.base64.encode(message.signer, 0, message.signer.length) : options.bytes === Array ? Array.prototype.slice.call(message.signer) : message.signer;
            return object;
        };

        /**
         * Converts this MsgSetNodeKeys to JSON.
         * @function toJSON
         * @memberof types.MsgSetNodeKeys
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgSetNodeKeys.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgSetNodeKeys
         * @function getTypeUrl
         * @memberof types.MsgSetNodeKeys
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgSetNodeKeys.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MsgSetNodeKeys";
        };

        return MsgSetNodeKeys;
    })();

    return types;
})();

module.exports = $root;
