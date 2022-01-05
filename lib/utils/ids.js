"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programIds = exports.PROGRAM_IDS = exports.ENABLE_FEES_INPUT = exports.SYSTEM = exports.METAPLEX_ID = exports.AUCTION_ID = exports.VAULT_ID = exports.MEMO_ID = exports.METADATA_PROGRAM_ID = exports.BPF_UPGRADE_LOADER_ID = exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = exports.TOKEN_PROGRAM_ID = exports.WRAPPED_SOL_MINT = exports.AR_SOL_HOLDER_ID = exports.METAPLEX_PROGRAM_ID = exports.VAULT_PROGRAM_ID = exports.AUCTION_PROGRAM_ID = void 0;
var web3_js_1 = require("@solana/web3.js");
// export const STORE_OWNER_ADDRESS = process.env
//   .REACT_APP_STORE_OWNER_ADDRESS_ADDRESS
//   ? new PublicKey(`${process.env.REACT_APP_STORE_OWNER_ADDRESS_ADDRESS}`)
//   : // DEFAULT STORE FRONT OWNER FOR METAPLEX
//     undefined;
// console.debug(`Store owner address: ${STORE_OWNER_ADDRESS?.toBase58()}`);
exports.AUCTION_PROGRAM_ID = new web3_js_1.PublicKey('C9nHkL6BfGx9M9MyYrJqAD5hPsGJd1fHpp1uAJA6vTCn');
exports.VAULT_PROGRAM_ID = new web3_js_1.PublicKey('94wRaYAQdC2gYF76AUTYSugNJ3rAC4EimjAMPwM7uYry');
exports.METAPLEX_PROGRAM_ID = new web3_js_1.PublicKey('EPtpKdKW8qciGVd1UFyGjgbBHTbSAyvbY61h9uQGVgeu');
// TODO: generate key ---
exports.AR_SOL_HOLDER_ID = new web3_js_1.PublicKey('HvwC9QSAzvGXhhVrgPmauVwFWcYZhne3hVot9EbHuFTm');
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
