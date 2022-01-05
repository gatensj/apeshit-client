"use strict";
// import {
//   createAssociatedTokenAccountInstruction,
//   // createMint,
//   createMetadata,
//   ENV,
//   updateMetadata,
//   createMasterEdition,
//   sendTransactionWithRetry,
//   Data,
//   Creator,
//   findProgramAddress,
// } from './metadata';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepPayForFilesTxn = exports.mintNFT = void 0;
var common_1 = require("./common");
var ids_1 = require("./utils/ids");
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var crypto = require("crypto");
var assets_1 = require("./utils/assets");
var ids_2 = require("./utils/ids");
var fetch = require('node-fetch');
var BN = require('bn.js');
var RESERVED_TXN_MANIFEST = 'manifest.json';
var ENV = "mainnet-beta";
exports.mintNFT = function (connection, wallet, env, files, metadata, mintKey, 
// sendTransactionWithRetry: any,
adminSigners, maxSupply) { return __awaiter(void 0, void 0, void 0, function () {
    var metadataContent, fileInfo, realFiles, _a, pushInstructions, pushSigners, TOKEN_PROGRAM_ID, mintRent, payerPublicKey, instructions, signers, recipientKey, metadataAccount, txid, _b, data, tags, result, metadataFile, updateInstructions, updateSigners, arweaveLink, printingMint, oneTimePrintingAuthorizationMint, authTokenAccount, txid_1;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!(wallet === null || wallet === void 0 ? void 0 : wallet.publicKey)) {
                    return [2 /*return*/];
                }
                metadataContent = {
                    name: metadata.name,
                    symbol: metadata.symbol,
                    description: metadata.description,
                    seller_fee_basis_points: metadata.sellerFeeBasisPoints,
                    image: metadata.image,
                    animation_url: metadata.animation_url,
                    external_url: metadata.external_url,
                    properties: __assign(__assign({}, metadata.properties), { creators: (_c = metadata.creators) === null || _c === void 0 ? void 0 : _c.map(function (creator) {
                            return {
                                address: creator.address.toBase58(),
                                share: creator.share,
                            };
                        }) }),
                };
                fileInfo = { content: [
                        JSON.stringify(metadataContent),
                    ], name: 'metadata.json' };
                realFiles = __spreadArrays(files, [
                    new File([
                        JSON.stringify(metadataContent),
                    ], 'metadata.json'),
                ]);
                return [4 /*yield*/, exports.prepPayForFilesTxn(wallet, realFiles, metadata)];
            case 1:
                _a = _e.sent(), pushInstructions = _a.instructions, pushSigners = _a.signers;
                TOKEN_PROGRAM_ID = ids_1.programIds().token;
                return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span)];
            case 2:
                mintRent = _e.sent();
                payerPublicKey = wallet.publicKey;
                instructions = __spreadArrays(pushInstructions);
                signers = __spreadArrays(pushSigners, adminSigners);
                return [4 /*yield*/, common_1.findProgramAddress([
                        wallet.publicKey.toBuffer(),
                        ids_1.programIds().token.toBuffer(),
                        mintKey.toBuffer(),
                    ], ids_1.programIds().associatedToken)];
            case 3:
                recipientKey = (_e.sent())[0];
                common_1.createAssociatedTokenAccountInstruction(instructions, recipientKey, wallet.publicKey, wallet.publicKey, mintKey);
                return [4 /*yield*/, common_1.createMetadata(new common_1.Data({
                        symbol: metadata.symbol,
                        name: metadata.name,
                        uri: ' '.repeat(64),
                        sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
                        creators: metadata.creators,
                    }), payerPublicKey, mintKey, payerPublicKey, instructions, wallet.publicKey)];
            case 4:
                metadataAccount = _e.sent();
                return [4 /*yield*/, common_1.sendTransactionWithRetry(connection, wallet, instructions, signers)];
            case 5:
                txid = (_e.sent()).txid;
                _e.label = 6;
            case 6:
                _e.trys.push([6, 8, , 9]);
                return [4 /*yield*/, connection.confirmTransaction(txid, 'max')];
            case 7:
                _e.sent();
                return [3 /*break*/, 9];
            case 8:
                _b = _e.sent();
                return [3 /*break*/, 9];
            case 9: 
            // Force wait for max confirmations
            // await connection.confirmTransaction(txid, 'max');
            return [4 /*yield*/, connection.getParsedConfirmedTransaction(txid, 'confirmed')];
            case 10:
                // Force wait for max confirmations
                // await connection.confirmTransaction(txid, 'max');
                _e.sent();
                data = new FormData();
                tags = realFiles.reduce(function (acc, f) {
                    acc[f.name] = [{ name: 'mint', value: mintKey.toBase58() }];
                    return acc;
                }, {});
                data.append('tags', JSON.stringify(tags));
                data.append('transaction', txid);
                realFiles.map(function (f) { return data.append('file[]', f); });
                return [4 /*yield*/, fetch(
                    // TODO: add CNAME
                    env.startsWith('mainnet-beta')
                        ? 'https://us-central1-principal-lane-200702.cloudfunctions.net/uploadFileProd2'
                        : 'https://us-central1-principal-lane-200702.cloudfunctions.net/uploadFile2', {
                        method: 'POST',
                        body: data,
                    })];
            case 11: return [4 /*yield*/, (_e.sent()).json()];
            case 12:
                result = _e.sent();
                metadataFile = (_d = result.messages) === null || _d === void 0 ? void 0 : _d.find(function (m) { return m.filename === RESERVED_TXN_MANIFEST; });
                if (!((metadataFile === null || metadataFile === void 0 ? void 0 : metadataFile.transactionId) && wallet.publicKey)) return [3 /*break*/, 18];
                updateInstructions = [];
                updateSigners = __spreadArrays(signers);
                arweaveLink = "https://arweave.net/" + metadataFile.transactionId;
                return [4 /*yield*/, common_1.updateMetadata(new common_1.Data({
                        name: metadata.name,
                        symbol: metadata.symbol,
                        uri: arweaveLink,
                        creators: metadata.creators,
                        sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
                    }), undefined, undefined, mintKey, payerPublicKey, updateInstructions, metadataAccount)];
            case 13:
                _e.sent();
                updateInstructions.push(spl_token_1.Token.createMintToInstruction(TOKEN_PROGRAM_ID, mintKey, recipientKey, payerPublicKey, [], 1));
                printingMint = common_1.createMint(updateInstructions, payerPublicKey, mintRent, 0, payerPublicKey, payerPublicKey, updateSigners);
                oneTimePrintingAuthorizationMint = common_1.createMint(updateInstructions, payerPublicKey, mintRent, 0, payerPublicKey, payerPublicKey, updateSigners);
                if (!(maxSupply !== undefined)) return [3 /*break*/, 15];
                return [4 /*yield*/, common_1.findProgramAddress([
                        wallet.publicKey.toBuffer(),
                        ids_1.programIds().token.toBuffer(),
                        printingMint.toBuffer(),
                    ], ids_1.programIds().associatedToken)];
            case 14:
                authTokenAccount = (_e.sent())[0];
                common_1.createAssociatedTokenAccountInstruction(instructions, authTokenAccount, wallet.publicKey, wallet.publicKey, printingMint);
                _e.label = 15;
            case 15: 
            // // In this instruction, mint authority will be removed from the main mint, while
            // // minting authority will be maintained for the Printing mint (which we want.)
            return [4 /*yield*/, common_1.createMasterEdition(maxSupply !== undefined ? new BN(maxSupply) : undefined, mintKey, printingMint, oneTimePrintingAuthorizationMint, payerPublicKey, payerPublicKey, updateInstructions, payerPublicKey, payerPublicKey, maxSupply !== undefined ? payerPublicKey : undefined)];
            case 16:
                // // In this instruction, mint authority will be removed from the main mint, while
                // // minting authority will be maintained for the Printing mint (which we want.)
                _e.sent();
                return [4 /*yield*/, common_1.sendTransactionWithRetry(connection, wallet, updateInstructions, updateSigners)];
            case 17:
                txid_1 = _e.sent();
                _e.label = 18;
            case 18: 
            // TODO:
            // 1. Jordan: --- upload file and metadata to storage API
            // 2. pay for storage by hashing files and attaching memo for each file
            return [2 /*return*/, { metadataAccount: metadataAccount }];
        }
    });
}); };
exports.prepPayForFilesTxn = function (wallet, files, metadata) { return __awaiter(void 0, void 0, void 0, function () {
    var memo, instructions, signers, _a, _b, _c, _d, _e, i, hashSum, _f, _g, hex;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                memo = ids_1.programIds().memo;
                instructions = [];
                signers = [];
                if (!wallet.publicKey) return [3 /*break*/, 2];
                _b = (_a = instructions).push;
                _d = (_c = web3_js_1.SystemProgram).transfer;
                _e = {
                    fromPubkey: wallet.publicKey,
                    toPubkey: ids_2.AR_SOL_HOLDER_ID
                };
                return [4 /*yield*/, assets_1.getAssetCostToStore(files)];
            case 1:
                _b.apply(_a, [_d.apply(_c, [(_e.lamports = _h.sent(),
                            _e)])]);
                _h.label = 2;
            case 2:
                i = 0;
                _h.label = 3;
            case 3:
                if (!(i < files.length)) return [3 /*break*/, 6];
                hashSum = crypto.createHash('sha256');
                _g = (_f = hashSum).update;
                return [4 /*yield*/, files[i].text()];
            case 4:
                _g.apply(_f, [_h.sent()]);
                hex = hashSum.digest('hex');
                instructions.push(new web3_js_1.TransactionInstruction({
                    keys: [],
                    programId: memo,
                    data: Buffer.from(hex),
                }));
                _h.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/, {
                    instructions: instructions,
                    signers: signers,
                }];
        }
    });
}); };
