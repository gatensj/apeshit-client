"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAssociatedTokenAddress = exports.decodedTokenBuffersToUI = exports.decodedCounterBuffersToUI = exports.decodedArtBuffersToUI = exports.getLargestTokenAccountOwnerByMint = exports.readKeypairFromPath = exports.getTokenAddressFromMintAndUser = exports.getApeTokensFromTokens = exports.getCounter = exports.mintApe = exports.buyApe = exports.getAllUserTokens = exports.getApes = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const fetch = require('node-fetch');
const fs_1 = require("fs");
const bs58 = require('bs58');
const BufferLayout = __importStar(require("buffer-layout"));
const BN = require("bn.js");
//
/**
 * Layout for a public key
 */
const publicKey = (property = 'publicKey') => {
    return BufferLayout.blob(32, property);
};
/**
 * Layout for a 64bit unsigned value
 */
const fixed_sized_string = (property = 'fixed_sized_string', length) => {
    return BufferLayout.blob(length, property);
};
const uint64 = (property = 'uint64') => {
    return BufferLayout.blob(8, property);
};
function readKeypairFromPath(path) {
    const data = JSON.parse(fs_1.readFileSync(path, 'utf-8'));
    return web3_js_1.Keypair.fromSecretKey(Buffer.from(data));
}
exports.readKeypairFromPath = readKeypairFromPath;
const URL_MAX_LEN = 128;
const COUNTER_ACCOUNT_DATA_LAYOUT = BufferLayout.struct([BufferLayout.u8('isInitialized'), uint64('count')]);
const ART_ACCOUNT_DATA_LAYOUT = BufferLayout.struct([
    BufferLayout.u8('isInitialized'),
    uint64('id'),
    publicKey('first_owner_pubkey'),
    publicKey('minted_token_pubkey'),
    uint64('version'),
    BufferLayout.u8('is_minted'),
    uint64('created_at'),
    fixed_sized_string("image_url", URL_MAX_LEN),
]);
function mintApe({ version, image_url }, adminPubKey, userPublicKey, artPubKey, mintPublicKey, programPubKey, sendTxn, { connection }) {
    return __awaiter(this, void 0, void 0, function* () {
        const image_url_formatted = image_url.length > URL_MAX_LEN ? image_url.slice(0, URL_MAX_LEN)
            : image_url + new Array(URL_MAX_LEN - image_url.length + 1).join(' ');
        // console.log('image_url_formatted: ', image_url_formatted.length)
        // const associatedTokenAddress = await Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, mintAddress,
        //    userPublicKey)
        const adminTokenAddress = yield findAssociatedTokenAddress(adminPubKey, mintPublicKey);
        const userTokenAccAddress = yield findAssociatedTokenAddress(userPublicKey, mintPublicKey);
        const createAssociatedTokenAccountIx = spl_token_1.Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mintPublicKey, userTokenAccAddress, userPublicKey, adminPubKey);
        // console.log("create associated token account for", wallet.publicKey.toBase58())
        // return await tokenClient.createAssociatedTokenAccount(wallet.publicKey)
        const mintApeIx = new web3_js_1.TransactionInstruction({
            programId: programPubKey,
            keys: [
                { pubkey: adminPubKey, isSigner: true, isWritable: true },
                { pubkey: artPubKey, isSigner: false, isWritable: true },
                { pubkey: mintPublicKey, isSigner: false, isWritable: true },
                { pubkey: userPublicKey, isSigner: false, isWritable: true },
                { pubkey: adminTokenAddress, isSigner: false, isWritable: true },
                { pubkey: userTokenAccAddress, isSigner: false, isWritable: true },
                { pubkey: spl_token_1.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
                { pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
                { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
                { pubkey: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
            ],
            data: Buffer.from(Uint8Array.of(1, ...new BN(Number(version)).toArray('le', 8), ...Array.from(Buffer.from(image_url_formatted)))),
        });
        const txMint = new web3_js_1.Transaction().add(createAssociatedTokenAccountIx, mintApeIx);
        void (yield sendTxn(txMint));
        yield new Promise((resolve) => setTimeout(resolve, 1000));
    });
}
exports.mintApe = mintApe;
function getLargestTokenAccountOwnerByMint(mintPubKey, { connection }) {
    return __awaiter(this, void 0, void 0, function* () {
        const largestAccounts = (yield connection.getTokenLargestAccounts(mintPubKey, "processed")).value;
        const largestTokenAccountPubkey = largestAccounts[0].address;
        const largestTokenAccountInfo = yield connection.getAccountInfo(largestTokenAccountPubkey, "processed");
        const decoded = decodedTokenBuffersToUI(spl_token_1.AccountLayout.decode(largestTokenAccountInfo.data), largestTokenAccountPubkey);
        return decoded.owner;
    });
}
exports.getLargestTokenAccountOwnerByMint = getLargestTokenAccountOwnerByMint;
function buyApe(userPublicKey, programPubKey, adminPubKey, sendTxn, { connection }) {
    return __awaiter(this, void 0, void 0, function* () {
        const encoder = new TextEncoder();
        const [counterAddress, nonce] = yield web3_js_1.PublicKey.findProgramAddress([encoder.encode('counter')], programPubKey);
        const artSeed = makeid(7);
        const artAddress = yield web3_js_1.PublicKey.createWithSeed(userPublicKey, artSeed, programPubKey);
        const createArtAccountIx = web3_js_1.SystemProgram.createAccountWithSeed({
            fromPubkey: userPublicKey,
            basePubkey: userPublicKey,
            seed: artSeed,
            newAccountPubkey: artAddress,
            space: ART_ACCOUNT_DATA_LAYOUT.span,
            lamports: yield connection.getMinimumBalanceForRentExemption(ART_ACCOUNT_DATA_LAYOUT.span),
            programId: programPubKey,
        });
        const buyApeIx = new web3_js_1.TransactionInstruction({
            programId: programPubKey,
            keys: [
                { pubkey: userPublicKey, isSigner: true, isWritable: false },
                { pubkey: counterAddress, isSigner: false, isWritable: true },
                { pubkey: artAddress, isSigner: false, isWritable: true },
                { pubkey: adminPubKey, isSigner: false, isWritable: true },
                { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
                { pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
                { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
            ],
            data: Buffer.from(Uint8Array.of(0)),
        });
        const tx = new web3_js_1.Transaction().add(createArtAccountIx, buyApeIx);
        void (yield sendTxn(tx));
        yield new Promise((resolve) => setTimeout(resolve, 1000));
        return { artAddress, counterAddress };
    });
}
exports.buyApe = buyApe;
function getTokenAddressFromMintAndUser(userAddress, mintAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        return findAssociatedTokenAddress(new web3_js_1.PublicKey(userAddress), new web3_js_1.PublicKey(mintAddress));
    });
}
exports.getTokenAddressFromMintAndUser = getTokenAddressFromMintAndUser;
function getApeTokensFromTokens(arts, tokens) {
    return arts.filter((art) => tokens.find((token) => art.metadata.minted_token_pubkey == token.mint));
}
exports.getApeTokensFromTokens = getApeTokensFromTokens;
function getApes(fraktProgramId, { connection }) {
    return __awaiter(this, void 0, void 0, function* () {
        let rawArtAccounts = yield connection.getProgramAccounts(fraktProgramId, 'singleGossip');
        rawArtAccounts = rawArtAccounts.filter((rawArt) => rawArt.account.data.length == ART_ACCOUNT_DATA_LAYOUT.span);
        const parsedAccounts = [];
        for (let rawArt of rawArtAccounts) {
            const decodedArtState = ART_ACCOUNT_DATA_LAYOUT.decode(rawArt.account.data);
            parsedAccounts.push(decodedArtBuffersToUI(decodedArtState, rawArt.pubkey));
        }
        return parsedAccounts;
    });
}
exports.getApes = getApes;
function getCounter(fraktProgramId, { connection }) {
    return __awaiter(this, void 0, void 0, function* () {
        let rawCounterAccounts = yield connection.getProgramAccounts(fraktProgramId, 'singleGossip');
        rawCounterAccounts = rawCounterAccounts.filter((rawCounter) => rawCounter.account.data.length == COUNTER_ACCOUNT_DATA_LAYOUT.span);
        const parsedAccounts = [];
        for (let rawCounter of rawCounterAccounts) {
            const decodedCounterState = COUNTER_ACCOUNT_DATA_LAYOUT.decode(rawCounter.account.data);
            parsedAccounts.push(decodedCounterBuffersToUI(decodedCounterState, rawCounter.pubkey));
        }
        return parsedAccounts[0] || null;
    });
}
exports.getCounter = getCounter;
function decodedCounterBuffersToUI(decodedCounterState, counterAddress) {
    return {
        counterAccountPubkey: counterAddress.toBase58(),
        isInitialized: !!decodedCounterState.isInitialized,
        count: new BN(decodedCounterState.count, 10, 'le').toNumber(),
    };
}
exports.decodedCounterBuffersToUI = decodedCounterBuffersToUI;
function decodedArtBuffersToUI(decodedArtState, artAddress) {
    // console.log('image image_url raw: ', decodedArtState.image_url)
    // console.log('image image_url raw: ', decodedArtState.image_url)
    return {
        metadata: {
            artAccountPubkey: artAddress.toBase58(),
            isInitialized: !!decodedArtState.isInitialized,
            id: new BN(decodedArtState.id, 10, 'le').toNumber(),
            first_owner_pubkey: new web3_js_1.PublicKey(decodedArtState.first_owner_pubkey).toBase58(),
            minted_token_pubkey: new web3_js_1.PublicKey(decodedArtState.minted_token_pubkey).toBase58(),
            is_minted: Boolean(new BN(decodedArtState.is_minted, 10, 'le').toNumber()),
            created_at: new BN(decodedArtState.created_at, 10, 'le').toNumber(),
        },
        attributes: {
            version: new BN(decodedArtState.version, 10, 'le').toNumber(),
            image_url: formatImageLink(decodedArtState.image_url),
        },
    };
}
exports.decodedArtBuffersToUI = decodedArtBuffersToUI;
function decodedTokenBuffersToUI(decodedTokenState, tokenAddress) {
    return {
        tokenAccountPubkey: tokenAddress.toBase58(),
        mint: new web3_js_1.PublicKey(decodedTokenState.mint).toBase58(),
        owner: new web3_js_1.PublicKey(decodedTokenState.owner).toBase58(),
        amount: new BN(decodedTokenState.amount, 10, 'le').toNumber(),
        delegateOption: !!decodedTokenState.delegateOption,
        delegate: new web3_js_1.PublicKey(decodedTokenState.delegate).toBase58(),
        state: !!decodedTokenState.state,
        isNativeOption: !!decodedTokenState.isNativeOption,
        isNative: new BN(decodedTokenState.isNative, 10, 'le').toNumber(),
        delegatedAmount: new BN(decodedTokenState.delegatedAmount, 10, 'le').toNumber(),
        closeAuthorityOption: !!decodedTokenState.closeAuthorityOption,
        closeAuthority: new web3_js_1.PublicKey(decodedTokenState.closeAuthority).toBase58(),
    };
}
exports.decodedTokenBuffersToUI = decodedTokenBuffersToUI;
function getAllUserTokens(userPublicKey, { connection }) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenAccounts = (yield connection.getTokenAccountsByOwner(userPublicKey, { programId: spl_token_1.TOKEN_PROGRAM_ID }, 'singleGossip')).value;
        const parsedAddresses = tokenAccounts.map((tokenAccount) => decodedTokenBuffersToUI(spl_token_1.AccountLayout.decode(tokenAccount.account.data), tokenAccount.pubkey)).filter(token => token.amount > 0);
        return parsedAddresses;
    });
}
exports.getAllUserTokens = getAllUserTokens;
function downloadImageBuffer(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(url)
            .then(x => x.arrayBuffer()).then(x => Buffer.from(x));
    });
}
function findAssociatedTokenAddress(walletAddress, tokenMintAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield web3_js_1.PublicKey.findProgramAddress([walletAddress.toBuffer(), spl_token_1.TOKEN_PROGRAM_ID.toBuffer(), tokenMintAddress.toBuffer()], spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID))[0];
    });
}
exports.findAssociatedTokenAddress = findAssociatedTokenAddress;
function formatImageLink(image_url_bytes) {
    const image_url = new TextDecoder().decode(image_url_bytes).trimEnd();
    return image_url.length == URL_MAX_LEN ? "" : image_url;
}
function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}
