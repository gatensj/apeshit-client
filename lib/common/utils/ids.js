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
exports.programIds = exports.setProgramIds = exports.PROGRAM_IDS = exports.ENABLE_FEES_INPUT = exports.SYSTEM = exports.METAPLEX_ID = exports.AUCTION_ID = exports.VAULT_ID = exports.MEMO_ID = exports.METADATA_PROGRAM_ID = exports.BPF_UPGRADE_LOADER_ID = exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = exports.TOKEN_PROGRAM_ID = exports.WRAPPED_SOL_MINT = exports.STORE_OWNER_ADDRESS = void 0;
var web3_js_1 = require("@solana/web3.js");
var utils_1 = require("../utils");
exports.STORE_OWNER_ADDRESS = process.env
    .REACT_APP_STORE_OWNER_ADDRESS_ADDRESS
    ? new web3_js_1.PublicKey("" + process.env.REACT_APP_STORE_OWNER_ADDRESS_ADDRESS)
    : // DEFAULT STORE FRONT OWNER FOR METAPLEX
        undefined;
console.debug("Store owner address: " + (exports.STORE_OWNER_ADDRESS === null || exports.STORE_OWNER_ADDRESS === void 0 ? void 0 : exports.STORE_OWNER_ADDRESS.toBase58()));
exports.WRAPPED_SOL_MINT = new web3_js_1.PublicKey('So11111111111111111111111111111111111111112');
exports.TOKEN_PROGRAM_ID = new web3_js_1.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new web3_js_1.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
exports.BPF_UPGRADE_LOADER_ID = new web3_js_1.PublicKey('BPFLoaderUpgradeab1e11111111111111111111111');
exports.METADATA_PROGRAM_ID = new web3_js_1.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
exports.MEMO_ID = new web3_js_1.PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
exports.VAULT_ID = new web3_js_1.PublicKey('vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn');
exports.AUCTION_ID = new web3_js_1.PublicKey('auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8');
exports.METAPLEX_ID = new web3_js_1.PublicKey('p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98');
exports.SYSTEM = new web3_js_1.PublicKey('11111111111111111111111111111111');
exports.ENABLE_FEES_INPUT = false;
// legacy pools are used to show users contributions in those pools to allow for withdrawals of funds
exports.PROGRAM_IDS = [
    {
        name: 'mainnet-beta',
    },
    {
        name: 'testnet',
    },
    {
        name: 'devnet',
    },
    {
        name: 'localnet',
    },
];
var getStoreID = function () { return __awaiter(void 0, void 0, void 0, function () {
    var programs, CUSTOM;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("STORE_OWNER_ADDRESS: " + (exports.STORE_OWNER_ADDRESS === null || exports.STORE_OWNER_ADDRESS === void 0 ? void 0 : exports.STORE_OWNER_ADDRESS.toBase58()));
                if (!exports.STORE_OWNER_ADDRESS) {
                    return [2 /*return*/, undefined];
                }
                return [4 /*yield*/, utils_1.findProgramAddress([
                        Buffer.from('metaplex'),
                        exports.METAPLEX_ID.toBuffer(),
                        exports.STORE_OWNER_ADDRESS.toBuffer(),
                    ], exports.METAPLEX_ID)];
            case 1:
                programs = _a.sent();
                CUSTOM = programs[0];
                console.log("CUSTOM STORE: " + CUSTOM.toBase58());
                return [2 /*return*/, CUSTOM];
        }
    });
}); };
exports.setProgramIds = function (envName) { return __awaiter(void 0, void 0, void 0, function () {
    var instance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                instance = exports.PROGRAM_IDS.find(function (env) { return envName.indexOf(env.name) >= 0; });
                if (!instance) {
                    return [2 /*return*/];
                }
                if (!!STORE) return [3 /*break*/, 2];
                return [4 /*yield*/, getStoreID()];
            case 1:
                STORE = _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var STORE;
exports.programIds = function () {
    return {
        token: exports.TOKEN_PROGRAM_ID,
        associatedToken: exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        bpf_upgrade_loader: exports.BPF_UPGRADE_LOADER_ID,
        system: exports.SYSTEM,
        metadata: exports.METADATA_PROGRAM_ID,
        memo: exports.MEMO_ID,
        vault: exports.VAULT_ID,
        auction: exports.AUCTION_ID,
        metaplex: exports.METAPLEX_ID,
        store: STORE,
    };
};
