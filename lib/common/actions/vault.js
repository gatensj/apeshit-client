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
exports.getSafetyDepositBoxAddress = exports.updateExternalPriceAccount = exports.withdrawTokenFromSafetyDepositBox = exports.combineVault = exports.activateVault = exports.addTokenToInactiveVault = exports.getSafetyDepositBox = exports.initVault = exports.setVaultAuthority = exports.decodeSafetyDeposit = exports.decodeExternalPriceAccount = exports.decodeVault = exports.VAULT_SCHEMA = exports.ExternalPriceAccount = exports.SafetyDepositBox = exports.Vault = exports.MAX_EXTERNAL_ACCOUNT_SIZE = exports.MAX_VAULT_SIZE = exports.VaultState = exports.VaultKey = exports.VAULT_PREFIX = void 0;
var web3_js_1 = require("@solana/web3.js");
var ids_1 = require("../utils/ids");
var borsh_1 = require("borsh");
var utils_1 = require("../utils");
exports.VAULT_PREFIX = 'vault';
var VaultKey;
(function (VaultKey) {
    VaultKey[VaultKey["Uninitialized"] = 0] = "Uninitialized";
    VaultKey[VaultKey["VaultV1"] = 3] = "VaultV1";
    VaultKey[VaultKey["SafetyDepositBoxV1"] = 1] = "SafetyDepositBoxV1";
    VaultKey[VaultKey["ExternalPriceAccountV1"] = 2] = "ExternalPriceAccountV1";
})(VaultKey = exports.VaultKey || (exports.VaultKey = {}));
var VaultState;
(function (VaultState) {
    VaultState[VaultState["Inactive"] = 0] = "Inactive";
    VaultState[VaultState["Active"] = 1] = "Active";
    VaultState[VaultState["Combined"] = 2] = "Combined";
    VaultState[VaultState["Deactivated"] = 3] = "Deactivated";
})(VaultState = exports.VaultState || (exports.VaultState = {}));
exports.MAX_VAULT_SIZE = 1 + 32 + 32 + 32 + 32 + 1 + 32 + 1 + 32 + 1 + 1 + 8;
exports.MAX_EXTERNAL_ACCOUNT_SIZE = 1 + 8 + 32 + 1;
var Vault = /** @class */ (function () {
    function Vault(args) {
        this.key = VaultKey.VaultV1;
        this.tokenProgram = args.tokenProgram;
        this.fractionMint = args.fractionMint;
        this.authority = args.authority;
        this.fractionTreasury = args.fractionTreasury;
        this.redeemTreasury = args.redeemTreasury;
        this.allowFurtherShareCreation = args.allowFurtherShareCreation;
        this.pricingLookupAddress = args.pricingLookupAddress;
        this.tokenTypeCount = args.tokenTypeCount;
        this.state = args.state;
        this.lockedPricePerShare = args.lockedPricePerShare;
    }
    return Vault;
}());
exports.Vault = Vault;
var SafetyDepositBox = /** @class */ (function () {
    function SafetyDepositBox(args) {
        this.key = VaultKey.SafetyDepositBoxV1;
        this.vault = args.vault;
        this.tokenMint = args.tokenMint;
        this.store = args.store;
        this.order = args.order;
    }
    return SafetyDepositBox;
}());
exports.SafetyDepositBox = SafetyDepositBox;
var ExternalPriceAccount = /** @class */ (function () {
    function ExternalPriceAccount(args) {
        this.key = VaultKey.ExternalPriceAccountV1;
        this.pricePerShare = args.pricePerShare;
        this.priceMint = args.priceMint;
        this.allowedToCombine = args.allowedToCombine;
    }
    return ExternalPriceAccount;
}());
exports.ExternalPriceAccount = ExternalPriceAccount;
var InitVaultArgs = /** @class */ (function () {
    function InitVaultArgs(args) {
        this.instruction = 0;
        this.allowFurtherShareCreation = false;
        this.allowFurtherShareCreation = args.allowFurtherShareCreation;
    }
    return InitVaultArgs;
}());
var AmountArgs = /** @class */ (function () {
    function AmountArgs(args) {
        this.instruction = args.instruction;
        this.amount = args.amount;
    }
    return AmountArgs;
}());
var NumberOfShareArgs = /** @class */ (function () {
    function NumberOfShareArgs(args) {
        this.instruction = args.instruction;
        this.numberOfShares = args.numberOfShares;
    }
    return NumberOfShareArgs;
}());
var UpdateExternalPriceAccountArgs = /** @class */ (function () {
    function UpdateExternalPriceAccountArgs(args) {
        this.instruction = 9;
        this.externalPriceAccount = args.externalPriceAccount;
    }
    return UpdateExternalPriceAccountArgs;
}());
exports.VAULT_SCHEMA = new Map([
    [
        InitVaultArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['allowFurtherShareCreation', 'u8'],
            ],
        },
    ],
    [
        AmountArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['amount', 'u64'],
            ],
        },
    ],
    [
        NumberOfShareArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['numberOfShares', 'u64'],
            ],
        },
    ],
    [
        UpdateExternalPriceAccountArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['externalPriceAccount', ExternalPriceAccount],
            ],
        },
    ],
    [
        Vault,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['tokenProgram', 'pubkey'],
                ['fractionMint', 'pubkey'],
                ['authority', 'pubkey'],
                ['fractionTreasury', 'pubkey'],
                ['redeemTreasury', 'pubkey'],
                ['allowFurtherShareCreation', 'u8'],
                ['pricingLookupAddress', 'pubkey'],
                ['tokenTypeCount', 'u8'],
                ['state', 'u8'],
                ['lockedPricePerShare', 'u64'],
            ],
        },
    ],
    [
        SafetyDepositBox,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['vault', 'pubkey'],
                ['tokenMint', 'pubkey'],
                ['store', 'pubkey'],
                ['order', 'u8'],
            ],
        },
    ],
    [
        ExternalPriceAccount,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['pricePerShare', 'u64'],
                ['priceMint', 'pubkey'],
                ['allowedToCombine', 'u8'],
            ],
        },
    ],
]);
exports.decodeVault = function (buffer) {
    return borsh_1.deserializeUnchecked(exports.VAULT_SCHEMA, Vault, buffer);
};
exports.decodeExternalPriceAccount = function (buffer) {
    return borsh_1.deserializeUnchecked(exports.VAULT_SCHEMA, ExternalPriceAccount, buffer);
};
exports.decodeSafetyDeposit = function (buffer) {
    return borsh_1.deserializeUnchecked(exports.VAULT_SCHEMA, SafetyDepositBox, buffer);
};
function setVaultAuthority(vault, currentAuthority, newAuthority, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var vaultProgramId, data, keys;
        return __generator(this, function (_a) {
            vaultProgramId = ids_1.programIds().vault;
            data = Buffer.from([10]);
            keys = [
                {
                    pubkey: vault,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: currentAuthority,
                    isSigner: true,
                    isWritable: false,
                },
                {
                    pubkey: newAuthority,
                    isSigner: false,
                    isWritable: false,
                },
            ];
            instructions.push(new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: vaultProgramId,
                data: data,
            }));
            return [2 /*return*/];
        });
    });
}
exports.setVaultAuthority = setVaultAuthority;
function initVault(allowFurtherShareCreation, fractionalMint, redeemTreasury, fractionalTreasury, vault, vaultAuthority, pricingLookupAddress, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var vaultProgramId, data, keys;
        return __generator(this, function (_a) {
            vaultProgramId = ids_1.programIds().vault;
            data = Buffer.from(borsh_1.serialize(exports.VAULT_SCHEMA, new InitVaultArgs({ allowFurtherShareCreation: allowFurtherShareCreation })));
            keys = [
                {
                    pubkey: fractionalMint,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: redeemTreasury,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: fractionalTreasury,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: vault,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: vaultAuthority,
                    isSigner: false,
                    isWritable: false,
                },
                {
                    pubkey: pricingLookupAddress,
                    isSigner: false,
                    isWritable: false,
                },
                {
                    pubkey: ids_1.programIds().token,
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
                programId: vaultProgramId,
                data: data,
            }));
            return [2 /*return*/];
        });
    });
}
exports.initVault = initVault;
function getSafetyDepositBox(vault, tokenMint) {
    return __awaiter(this, void 0, void 0, function () {
        var vaultProgramId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vaultProgramId = ids_1.programIds().vault;
                    return [4 /*yield*/, utils_1.findProgramAddress([Buffer.from(exports.VAULT_PREFIX), vault.toBuffer(), tokenMint.toBuffer()], vaultProgramId)];
                case 1: return [2 /*return*/, (_a.sent())[0]];
            }
        });
    });
}
exports.getSafetyDepositBox = getSafetyDepositBox;
function addTokenToInactiveVault(amount, tokenMint, tokenAccount, tokenStoreAccount, vault, vaultAuthority, payer, transferAuthority, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var vaultProgramId, safetyDepositBox, value, data, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vaultProgramId = ids_1.programIds().vault;
                    return [4 /*yield*/, getSafetyDepositBox(vault, tokenMint)];
                case 1:
                    safetyDepositBox = _a.sent();
                    value = new AmountArgs({
                        instruction: 1,
                        amount: amount,
                    });
                    data = Buffer.from(borsh_1.serialize(exports.VAULT_SCHEMA, value));
                    keys = [
                        {
                            pubkey: safetyDepositBox,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: tokenAccount,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: tokenStoreAccount,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: vault,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: vaultAuthority,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: payer,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: transferAuthority,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: ids_1.programIds().token,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SystemProgram.programId,
                            isSigner: false,
                            isWritable: false,
                        },
                    ];
                    instructions.push(new web3_js_1.TransactionInstruction({
                        keys: keys,
                        programId: vaultProgramId,
                        data: data,
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
exports.addTokenToInactiveVault = addTokenToInactiveVault;
function activateVault(numberOfShares, vault, fractionMint, fractionTreasury, vaultAuthority, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var vaultProgramId, fractionMintAuthority, value, data, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vaultProgramId = ids_1.programIds().vault;
                    return [4 /*yield*/, utils_1.findProgramAddress([Buffer.from(exports.VAULT_PREFIX), vaultProgramId.toBuffer(), vault.toBuffer()], vaultProgramId)];
                case 1:
                    fractionMintAuthority = (_a.sent())[0];
                    value = new NumberOfShareArgs({ instruction: 2, numberOfShares: numberOfShares });
                    data = Buffer.from(borsh_1.serialize(exports.VAULT_SCHEMA, value));
                    keys = [
                        {
                            pubkey: vault,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: fractionMint,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: fractionTreasury,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: fractionMintAuthority,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: vaultAuthority,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: ids_1.programIds().token,
                            isSigner: false,
                            isWritable: false,
                        },
                    ];
                    instructions.push(new web3_js_1.TransactionInstruction({
                        keys: keys,
                        programId: vaultProgramId,
                        data: data,
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
exports.activateVault = activateVault;
function combineVault(vault, outstandingShareTokenAccount, payingTokenAccount, fractionMint, fractionTreasury, redeemTreasury, newVaultAuthority, vaultAuthority, transferAuthority, externalPriceAccount, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var vaultProgramId, burnAuthority, data, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vaultProgramId = ids_1.programIds().vault;
                    return [4 /*yield*/, utils_1.findProgramAddress([Buffer.from(exports.VAULT_PREFIX), vaultProgramId.toBuffer(), vault.toBuffer()], vaultProgramId)];
                case 1:
                    burnAuthority = (_a.sent())[0];
                    data = Buffer.from([3]);
                    keys = [
                        {
                            pubkey: vault,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: outstandingShareTokenAccount,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: payingTokenAccount,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: fractionMint,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: fractionTreasury,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: redeemTreasury,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: newVaultAuthority || vaultAuthority,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: vaultAuthority,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: transferAuthority,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: burnAuthority,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: externalPriceAccount,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: ids_1.programIds().token,
                            isSigner: false,
                            isWritable: false,
                        },
                    ];
                    instructions.push(new web3_js_1.TransactionInstruction({
                        keys: keys,
                        programId: vaultProgramId,
                        data: data,
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
exports.combineVault = combineVault;
function withdrawTokenFromSafetyDepositBox(amount, destination, safetyDepositBox, storeKey, vault, fractionMint, vaultAuthority, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var vaultProgramId, transferAuthority, value, data, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vaultProgramId = ids_1.programIds().vault;
                    return [4 /*yield*/, utils_1.findProgramAddress([Buffer.from(exports.VAULT_PREFIX), vaultProgramId.toBuffer(), vault.toBuffer()], vaultProgramId)];
                case 1:
                    transferAuthority = (_a.sent())[0];
                    value = new AmountArgs({ instruction: 5, amount: amount });
                    data = Buffer.from(borsh_1.serialize(exports.VAULT_SCHEMA, value));
                    keys = [
                        {
                            pubkey: destination,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: safetyDepositBox,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: storeKey,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: vault,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: fractionMint,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: vaultAuthority,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: transferAuthority,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: ids_1.programIds().token,
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
                        programId: vaultProgramId,
                        data: data,
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
exports.withdrawTokenFromSafetyDepositBox = withdrawTokenFromSafetyDepositBox;
function updateExternalPriceAccount(externalPriceAccountKey, externalPriceAccount, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var vaultProgramId, value, data, keys;
        return __generator(this, function (_a) {
            vaultProgramId = ids_1.programIds().vault;
            value = new UpdateExternalPriceAccountArgs({ externalPriceAccount: externalPriceAccount });
            data = Buffer.from(borsh_1.serialize(exports.VAULT_SCHEMA, value));
            console.log('Data', data);
            keys = [
                {
                    pubkey: externalPriceAccountKey,
                    isSigner: false,
                    isWritable: true,
                },
            ];
            instructions.push(new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: vaultProgramId,
                data: data,
            }));
            return [2 /*return*/];
        });
    });
}
exports.updateExternalPriceAccount = updateExternalPriceAccount;
function getSafetyDepositBoxAddress(vault, tokenMint) {
    return __awaiter(this, void 0, void 0, function () {
        var PROGRAM_IDS;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    PROGRAM_IDS = ids_1.programIds();
                    return [4 /*yield*/, utils_1.findProgramAddress([Buffer.from(exports.VAULT_PREFIX), vault.toBuffer(), tokenMint.toBuffer()], PROGRAM_IDS.vault)];
                case 1: return [2 /*return*/, (_a.sent())[0]];
            }
        });
    });
}
exports.getSafetyDepositBoxAddress = getSafetyDepositBoxAddress;
