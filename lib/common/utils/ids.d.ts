import { PublicKey } from '@solana/web3.js';
export declare const STORE_OWNER_ADDRESS: PublicKey | undefined;
export declare const WRAPPED_SOL_MINT: PublicKey;
export declare let TOKEN_PROGRAM_ID: PublicKey;
export declare let SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey;
export declare let BPF_UPGRADE_LOADER_ID: PublicKey;
export declare const METADATA_PROGRAM_ID: PublicKey;
export declare const MEMO_ID: PublicKey;
export declare const VAULT_ID: PublicKey;
export declare const AUCTION_ID: PublicKey;
export declare const METAPLEX_ID: PublicKey;
export declare let SYSTEM: PublicKey;
export declare const ENABLE_FEES_INPUT = false;
export declare const PROGRAM_IDS: {
    name: string;
}[];
export declare const setProgramIds: (envName: string) => Promise<void>;
export declare const programIds: () => {
    token: PublicKey;
    associatedToken: PublicKey;
    bpf_upgrade_loader: PublicKey;
    system: PublicKey;
    metadata: PublicKey;
    memo: PublicKey;
    vault: PublicKey;
    auction: PublicKey;
    metaplex: PublicKey;
    store: PublicKey | undefined;
};
