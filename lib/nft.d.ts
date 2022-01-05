import { Creator } from './common';
import { WalletAdapter } from '@solana/wallet-base';
import { Keypair, Connection, PublicKey, TransactionInstruction } from '@solana/web3.js';
export declare const mintNFT: (connection: Connection, wallet: any | undefined, env: String, files: File[], metadata: {
    name: string;
    symbol: string;
    description: string;
    image: string | undefined;
    animation_url: string | undefined;
    external_url: string;
    properties: any;
    creators: Creator[] | null;
    sellerFeeBasisPoints: number;
}, mintKey: PublicKey, adminSigners: Keypair[], maxSupply?: number | undefined) => Promise<void | {
    metadataAccount: PublicKey;
}>;
export declare const prepPayForFilesTxn: (wallet: WalletAdapter, files: File[], metadata: any) => Promise<{
    instructions: TransactionInstruction[];
    signers: Keypair[];
}>;
