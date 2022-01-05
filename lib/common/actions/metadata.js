"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservationList = exports.getMetadata = exports.getEdition = exports.mintPrintingTokens = exports.signMetadata = exports.createReservationList = exports.updatePrimarySaleHappenedViaToken = exports.mintNewEditionFromMasterEditionViaToken = exports.createMasterEdition = exports.createMetadata = exports.updateMetadata = exports.decodeMasterEdition = exports.decodeEdition = exports.decodeMetadata = exports.METADATA_SCHEMA = exports.Metadata = exports.Data = exports.Creator = exports.ReservationList = exports.Reservation = exports.Edition = exports.MasterEdition = exports.MetadataCategory = exports.MetadataKey = exports.MAX_MASTER_EDITION_KEN = exports.MAX_METADATA_LEN = exports.MAX_CREATOR_LEN = exports.MAX_CREATOR_LIMIT = exports.MAX_URI_LENGTH = exports.MAX_SYMBOL_LENGTH = exports.MAX_NAME_LENGTH = exports.RESERVATION = exports.EDITION = exports.METADATA_PREFIX = void 0;
var web3_js_1 = require("@solana/web3.js");
var ids_1 = require("../utils/ids");
var borsh_1 = require("borsh");
var utils_1 = require("../utils");
exports.METADATA_PREFIX = 'metadata';
exports.EDITION = 'edition';
exports.RESERVATION = 'reservation';
exports.MAX_NAME_LENGTH = 32;
exports.MAX_SYMBOL_LENGTH = 10;
exports.MAX_URI_LENGTH = 200;
exports.MAX_CREATOR_LIMIT = 5;
exports.MAX_CREATOR_LEN = 32 + 1 + 1;
exports.MAX_METADATA_LEN = 1 +
    32 +
    32 +
    exports.MAX_NAME_LENGTH +
    exports.MAX_SYMBOL_LENGTH +
    exports.MAX_URI_LENGTH +
    exports.MAX_CREATOR_LIMIT * exports.MAX_CREATOR_LEN +
    1 +
    1 +
    200;
exports.MAX_MASTER_EDITION_KEN = 1 + 9 + 8 + 32 + 32;
var MetadataKey;
(function (MetadataKey) {
    MetadataKey[MetadataKey["Uninitialized"] = 0] = "Uninitialized";
    MetadataKey[MetadataKey["MetadataV1"] = 4] = "MetadataV1";
    MetadataKey[MetadataKey["EditionV1"] = 1] = "EditionV1";
    MetadataKey[MetadataKey["MasterEditionV1"] = 2] = "MasterEditionV1";
    MetadataKey[MetadataKey["ReservationListV1"] = 3] = "ReservationListV1";
})(MetadataKey = exports.MetadataKey || (exports.MetadataKey = {}));
var MetadataCategory;
(function (MetadataCategory) {
    MetadataCategory["Audio"] = "audio";
    MetadataCategory["Video"] = "video";
    MetadataCategory["Image"] = "image";
    MetadataCategory["VR"] = "vr";
})(MetadataCategory = exports.MetadataCategory || (exports.MetadataCategory = {}));
var MasterEdition = /** @class */ (function () {
    function MasterEdition(args) {
        this.key = MetadataKey.MasterEditionV1;
        this.supply = args.supply;
        this.maxSupply = args.maxSupply;
        this.printingMint = args.printingMint;
        this.oneTimePrintingAuthorizationMint =
            args.oneTimePrintingAuthorizationMint;
    }
    return MasterEdition;
}());
exports.MasterEdition = MasterEdition;
var Edition = /** @class */ (function () {
    function Edition(args) {
        this.key = MetadataKey.EditionV1;
        this.parent = args.parent;
        this.edition = args.edition;
    }
    return Edition;
}());
exports.Edition = Edition;
var Reservation = /** @class */ (function () {
    function Reservation(args) {
        this.address = args.address;
        this.spotsRemaining = args.spotsRemaining;
        this.totalSpots = args.totalSpots;
    }
    return Reservation;
}());
exports.Reservation = Reservation;
var ReservationList = /** @class */ (function () {
    function ReservationList(args) {
        this.key = MetadataKey.ReservationListV1;
        this.key = MetadataKey.EditionV1;
        this.masterEdition = args.masterEdition;
        this.supplySnapshot = args.supplySnapshot;
        this.reservations = args.reservations;
        this.totalReservationSpots = args.totalReservationSpots;
    }
    return ReservationList;
}());
exports.ReservationList = ReservationList;
var Creator = /** @class */ (function () {
    function Creator(args) {
        this.address = args.address;
        this.verified = args.verified;
        this.share = args.share;
    }
    return Creator;
}());
exports.Creator = Creator;
var Data = /** @class */ (function () {
    function Data(args) {
        this.name = args.name;
        this.symbol = args.symbol;
        this.uri = args.uri;
        this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
        this.creators = args.creators;
    }
    return Data;
}());
exports.Data = Data;
var Metadata = /** @class */ (function () {
    function Metadata(args) {
        this.key = MetadataKey.MetadataV1;
        this.updateAuthority = args.updateAuthority;
        this.mint = args.mint;
        this.data = args.data;
        this.primarySaleHappened = args.primarySaleHappened;
        this.isMutable = args.isMutable;
    }
    Metadata.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var edition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getEdition(this.mint)];
                    case 1:
                        edition = _a.sent();
                        this.edition = edition;
                        this.masterEdition = edition;
                        return [2 /*return*/];
                }
            });
        });
    };
    return Metadata;
}());
exports.Metadata = Metadata;
var CreateMetadataArgs = /** @class */ (function () {
    function CreateMetadataArgs(args) {
        this.instruction = 0;
        this.data = args.data;
        this.isMutable = args.isMutable;
    }
    return CreateMetadataArgs;
}());
var UpdateMetadataArgs = /** @class */ (function () {
    function UpdateMetadataArgs(args) {
        this.instruction = 1;
        this.data = args.data ? args.data : null;
        this.updateAuthority = args.updateAuthority
            ? new web3_js_1.PublicKey(args.updateAuthority)
            : null;
        this.primarySaleHappened = args.primarySaleHappened;
    }
    return UpdateMetadataArgs;
}());
var CreateMasterEditionArgs = /** @class */ (function () {
    function CreateMasterEditionArgs(args) {
        this.instruction = 2;
        this.maxSupply = args.maxSupply;
    }
    return CreateMasterEditionArgs;
}());
var MintPrintingTokensArgs = /** @class */ (function () {
    function MintPrintingTokensArgs(args) {
        this.instruction = 9;
        this.supply = args.supply;
    }
    return MintPrintingTokensArgs;
}());
exports.METADATA_SCHEMA = new Map([
    [
        CreateMetadataArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['data', Data],
                ['isMutable', 'u8'],
            ],
        },
    ],
    [
        UpdateMetadataArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['data', { kind: 'option', type: Data }],
                ['updateAuthority', { kind: 'option', type: 'pubkey' }],
                ['primarySaleHappened', { kind: 'option', type: 'u8' }],
            ],
        },
    ],
    [
        CreateMasterEditionArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['maxSupply', { kind: 'option', type: 'u64' }],
            ],
        },
    ],
    [
        MintPrintingTokensArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['supply', 'u64'],
            ],
        },
    ],
    [
        MasterEdition,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['supply', 'u64'],
                ['maxSupply', { kind: 'option', type: 'u64' }],
                ['printingMint', 'pubkey'],
                ['oneTimePrintingAuthorizationMint', 'pubkey'],
            ],
        },
    ],
    [
        Edition,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['parent', 'pubkey'],
                ['edition', 'u64'],
            ],
        },
    ],
    [
        Data,
        {
            kind: 'struct',
            fields: [
                ['name', 'string'],
                ['symbol', 'string'],
                ['uri', 'string'],
                ['sellerFeeBasisPoints', 'u16'],
                ['creators', { kind: 'option', type: [Creator] }],
            ],
        },
    ],
    [
        Creator,
        {
            kind: 'struct',
            fields: [
                ['address', 'pubkey'],
                ['verified', 'u8'],
                ['share', 'u8'],
            ],
        },
    ],
    [
        Metadata,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['updateAuthority', 'pubkey'],
                ['mint', 'pubkey'],
                ['data', Data],
                ['primarySaleHappened', 'u8'],
                ['isMutable', 'u8'],
            ],
        },
    ],
    [
        Reservation,
        {
            kind: 'struct',
            fields: [
                ['address', 'pubkey'],
                ['spotsRemaining', 'u8'],
                ['totalSpots', 'u8'],
            ],
        },
    ],
    [
        ReservationList,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['masterEdition', 'pubkey'],
                ['supplySnapshot', { kind: 'option', type: 'u64' }],
                ['reservations', [Reservation]],
                ['totalReservationSpots', 'u64'],
            ],
        },
    ],
]);
exports.decodeMetadata = function (buffer) {
    var metadata = borsh_1.deserializeUnchecked(exports.METADATA_SCHEMA, Metadata, buffer);
    return metadata;
};
exports.decodeEdition = function (buffer) {
    return borsh_1.deserializeUnchecked(exports.METADATA_SCHEMA, Edition, buffer);
};
exports.decodeMasterEdition = function (buffer) {
    return borsh_1.deserializeUnchecked(exports.METADATA_SCHEMA, MasterEdition, buffer);
};
function updateMetadata(data, newUpdateAuthority, primarySaleHappened, mintKey, updateAuthority, instructions, metadataAccount) {
    return __awaiter(this, void 0, void 0, function () {
        var metadataProgramId, _a, value, txnData, keys;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    metadataProgramId = ids_1.programIds().metadata;
                    _a = metadataAccount;
                    if (_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, utils_1.findProgramAddress([
                            Buffer.from('metadata'),
                            metadataProgramId.toBuffer(),
                            mintKey.toBuffer(),
                        ], metadataProgramId)];
                case 1:
                    _a = (_b.sent())[0];
                    _b.label = 2;
                case 2:
                    metadataAccount = _a;
                    value = new UpdateMetadataArgs({
                        data: data,
                        updateAuthority: !newUpdateAuthority ? undefined : newUpdateAuthority,
                        primarySaleHappened: primarySaleHappened === null || primarySaleHappened === undefined
                            ? null
                            : primarySaleHappened,
                    });
                    txnData = Buffer.from(borsh_1.serialize(exports.METADATA_SCHEMA, value));
                    keys = [
                        {
                            pubkey: metadataAccount,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: updateAuthority,
                            isSigner: true,
                            isWritable: false,
                        },
                    ];
                    instructions.push(new web3_js_1.TransactionInstruction({
                        keys: keys,
                        programId: metadataProgramId,
                        data: txnData,
                    }));
                    return [2 /*return*/, metadataAccount];
            }
        });
    });
}
exports.updateMetadata = updateMetadata;
function createMetadata(data, updateAuthority, mintKey, mintAuthorityKey, instructions, payer) {
    return __awaiter(this, void 0, void 0, function () {
        var metadataProgramId, metadataAccount, value, txnData, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    metadataProgramId = ids_1.programIds().metadata;
                    return [4 /*yield*/, utils_1.findProgramAddress([
                            Buffer.from('metadata'),
                            metadataProgramId.toBuffer(),
                            mintKey.toBuffer(),
                        ], metadataProgramId)];
                case 1:
                    metadataAccount = (_a.sent())[0];
                    console.log('Data', data);
                    value = new CreateMetadataArgs({ data: data, isMutable: true });
                    txnData = Buffer.from(borsh_1.serialize(exports.METADATA_SCHEMA, value));
                    keys = [
                        {
                            pubkey: metadataAccount,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: mintKey,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: mintAuthorityKey,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: payer,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: updateAuthority,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SystemProgram.programId,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                            isSigner: false,
                            isWritable: false,
                        },
                    ];
                    instructions.push(new web3_js_1.TransactionInstruction({
                        keys: keys,
                        programId: metadataProgramId,
                        data: txnData,
                    }));
                    return [2 /*return*/, metadataAccount];
            }
        });
    });
}
exports.createMetadata = createMetadata;
function createMasterEdition(maxSupply, mintKey, printingMintKey, oneTimePrintingAuthorizationMint, updateAuthorityKey, mintAuthorityKey, instructions, payer, printingMintAuthority, oneTimePrintingAuthorizationMintAuthority) {
    return __awaiter(this, void 0, void 0, function () {
        var metadataProgramId, metadataAccount, editionAccount, value, data, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    metadataProgramId = ids_1.programIds().metadata;
                    return [4 /*yield*/, utils_1.findProgramAddress([
                            Buffer.from(exports.METADATA_PREFIX),
                            metadataProgramId.toBuffer(),
                            mintKey.toBuffer(),
                        ], metadataProgramId)];
                case 1:
                    metadataAccount = (_a.sent())[0];
                    return [4 /*yield*/, utils_1.findProgramAddress([
                            Buffer.from(exports.METADATA_PREFIX),
                            metadataProgramId.toBuffer(),
                            mintKey.toBuffer(),
                            Buffer.from(exports.EDITION),
                        ], metadataProgramId)];
                case 2:
                    editionAccount = (_a.sent())[0];
                    value = new CreateMasterEditionArgs({ maxSupply: maxSupply || null });
                    data = Buffer.from(borsh_1.serialize(exports.METADATA_SCHEMA, value));
                    keys = [
                        {
                            pubkey: editionAccount,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: mintKey,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: printingMintKey,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: oneTimePrintingAuthorizationMint,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: updateAuthorityKey,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: printingMintAuthority,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: mintAuthorityKey,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: metadataAccount,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: payer,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: ids_1.programIds().token,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SystemProgram.programId,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                            isSigner: false,
                            isWritable: false,
                        },
                    ];
                    if (oneTimePrintingAuthorizationMintAuthority)
                        keys.push({
                            pubkey: oneTimePrintingAuthorizationMintAuthority,
                            isSigner: true,
                            isWritable: false,
                        });
                    instructions.push(new web3_js_1.TransactionInstruction({
                        keys: keys,
                        programId: metadataProgramId,
                        data: data,
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
exports.createMasterEdition = createMasterEdition;
function mintNewEditionFromMasterEditionViaToken(newMint, tokenMint, newMintAuthority, printingMint, authorizationTokenHoldingAccount, burnAuthority, updateAuthorityOfMaster, reservationList, instructions, payer) {
    return __awaiter(this, void 0, void 0, function () {
        var metadataProgramId, newMetadataKey, masterMetadataKey, newEdition, masterEdition, data, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    metadataProgramId = ids_1.programIds().metadata;
                    return [4 /*yield*/, getMetadata(newMint)];
                case 1:
                    newMetadataKey = _a.sent();
                    return [4 /*yield*/, getMetadata(tokenMint)];
                case 2:
                    masterMetadataKey = _a.sent();
                    return [4 /*yield*/, getEdition(newMint)];
                case 3:
                    newEdition = _a.sent();
                    return [4 /*yield*/, getEdition(tokenMint)];
                case 4:
                    masterEdition = _a.sent();
                    data = Buffer.from([3]);
                    keys = [
                        {
                            pubkey: newMetadataKey,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: newEdition,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: masterEdition,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: newMint,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: newMintAuthority,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: printingMint,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: authorizationTokenHoldingAccount,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: burnAuthority,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: payer,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: updateAuthorityOfMaster,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: masterMetadataKey,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: ids_1.programIds().token,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SystemProgram.programId,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                            isSigner: false,
                            isWritable: false,
                        },
                    ];
                    if (reservationList) {
                        keys.push({
                            pubkey: reservationList,
                            isSigner: false,
                            isWritable: true,
                        });
                    }
                    instructions.push(new web3_js_1.TransactionInstruction({
                        keys: keys,
                        programId: metadataProgramId,
                        data: data,
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
exports.mintNewEditionFromMasterEditionViaToken = mintNewEditionFromMasterEditionViaToken;
function updatePrimarySaleHappenedViaToken(metadata, owner, tokenAccount, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var metadataProgramId, data, keys;
        return __generator(this, function (_a) {
            metadataProgramId = ids_1.programIds().metadata;
            data = Buffer.from([4]);
            keys = [
                {
                    pubkey: metadata,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: owner,
                    isSigner: true,
                    isWritable: false,
                },
                {
                    pubkey: tokenAccount,
                    isSigner: false,
                    isWritable: false,
                },
            ];
            instructions.push(new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: metadataProgramId,
                data: data,
            }));
            return [2 /*return*/];
        });
    });
}
exports.updatePrimarySaleHappenedViaToken = updatePrimarySaleHappenedViaToken;
function createReservationList(metadata, masterEdition, resource, updateAuthority, payer, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var metadataProgramId, reservationList, data, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    metadataProgramId = ids_1.programIds().metadata;
                    return [4 /*yield*/, getReservationList(masterEdition, resource)];
                case 1:
                    reservationList = _a.sent();
                    data = Buffer.from([6]);
                    keys = [
                        {
                            pubkey: reservationList,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: payer,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: updateAuthority,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: masterEdition,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: resource,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: metadata,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SystemProgram.programId,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                            isSigner: false,
                            isWritable: false,
                        },
                    ];
                    instructions.push(new web3_js_1.TransactionInstruction({
                        keys: keys,
                        programId: metadataProgramId,
                        data: data,
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
exports.createReservationList = createReservationList;
function signMetadata(metadata, creator, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var metadataProgramId, data, keys;
        return __generator(this, function (_a) {
            metadataProgramId = ids_1.programIds().metadata;
            data = Buffer.from([7]);
            keys = [
                {
                    pubkey: metadata,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: creator,
                    isSigner: true,
                    isWritable: false,
                },
            ];
            instructions.push(new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: metadataProgramId,
                data: data,
            }));
            return [2 /*return*/];
        });
    });
}
exports.signMetadata = signMetadata;
function mintPrintingTokens(destination, printingMint, updateAuthority, metadata, masterEdition, supply, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var PROGRAM_IDS, metadataProgramId, value, data, keys;
        return __generator(this, function (_a) {
            PROGRAM_IDS = ids_1.programIds();
            metadataProgramId = PROGRAM_IDS.metadata;
            value = new MintPrintingTokensArgs({ supply: supply });
            data = Buffer.from(borsh_1.serialize(exports.METADATA_SCHEMA, value));
            keys = [
                {
                    pubkey: destination,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: printingMint,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: updateAuthority,
                    isSigner: true,
                    isWritable: false,
                },
                {
                    pubkey: metadata,
                    isSigner: false,
                    isWritable: false,
                },
                {
                    pubkey: masterEdition,
                    isSigner: false,
                    isWritable: false,
                },
                {
                    pubkey: PROGRAM_IDS.token,
                    isSigner: false,
                    isWritable: false,
                },
                {
                    pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                    isSigner: false,
                    isWritable: false,
                },
            ];
            instructions.push(new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: metadataProgramId,
                data: data,
            }));
            return [2 /*return*/];
        });
    });
}
exports.mintPrintingTokens = mintPrintingTokens;
function getEdition(tokenMint) {
    return __awaiter(this, void 0, void 0, function () {
        var PROGRAM_IDS;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    PROGRAM_IDS = ids_1.programIds();
                    return [4 /*yield*/, utils_1.findProgramAddress([
                            Buffer.from(exports.METADATA_PREFIX),
                            PROGRAM_IDS.metadata.toBuffer(),
                            tokenMint.toBuffer(),
                            Buffer.from(exports.EDITION),
                        ], PROGRAM_IDS.metadata)];
                case 1: return [2 /*return*/, (_a.sent())[0]];
            }
        });
    });
}
exports.getEdition = getEdition;
function getMetadata(tokenMint) {
    return __awaiter(this, void 0, void 0, function () {
        var PROGRAM_IDS;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    PROGRAM_IDS = ids_1.programIds();
                    return [4 /*yield*/, utils_1.findProgramAddress([
                            Buffer.from(exports.METADATA_PREFIX),
                            PROGRAM_IDS.metadata.toBuffer(),
                            tokenMint.toBuffer(),
                        ], PROGRAM_IDS.metadata)];
                case 1: return [2 /*return*/, (_a.sent())[0]];
            }
        });
    });
}
exports.getMetadata = getMetadata;
function getReservationList(masterEdition, resource) {
    return __awaiter(this, void 0, void 0, function () {
        var PROGRAM_IDS;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    PROGRAM_IDS = ids_1.programIds();
                    return [4 /*yield*/, utils_1.findProgramAddress([
                            Buffer.from(exports.METADATA_PREFIX),
                            PROGRAM_IDS.metadata.toBuffer(),
                            masterEdition.toBuffer(),
                            Buffer.from(exports.RESERVATION),
                            resource.toBuffer(),
                        ], PROGRAM_IDS.metadata)];
                case 1: return [2 /*return*/, (_a.sent())[0]];
            }
        });
    });
}
exports.getReservationList = getReservationList;
