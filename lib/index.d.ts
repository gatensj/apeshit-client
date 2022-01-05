import { Connection, Keypair, Transaction, PublicKey } from '@solana/web3.js';
declare function readKeypairFromPath(path: string): Keypair;
interface ApiDependencies {
    connection: Connection;
}
declare function mintApe({ version, image_url }: ArtAttributes, adminPubKey: PublicKey, userPublicKey: PublicKey, artPubKey: PublicKey, mintPublicKey: PublicKey, programPubKey: PublicKey, sendTxn: (transaction: Transaction) => Promise<void>, { connection }: ApiDependencies): Promise<void>;
declare function getLargestTokenAccountOwnerByMint(mintPubKey: PublicKey, { connection }: {
    connection: any;
}): Promise<String>;
declare function buyApe(userPublicKey: PublicKey, programPubKey: PublicKey, adminPubKey: PublicKey, sendTxn: (transaction: Transaction) => Promise<void>, { connection }: ApiDependencies): Promise<{
    artAddress: PublicKey;
    counterAddress: PublicKey;
}>;
declare function getTokenAddressFromMintAndUser(userAddress: String, mintAddress: String): Promise<PublicKey>;
declare function getApeTokensFromTokens(arts: ArtView[], tokens: TokenView[]): ArtView[];
declare function getApes(fraktProgramId: PublicKey, { connection }: ApiDependencies): Promise<ArtView[]>;
declare function getCounter(fraktProgramId: any, { connection }: ApiDependencies): Promise<CounterView>;
declare function decodedCounterBuffersToUI(decodedCounterState: any, counterAddress: any): CounterView;
declare function decodedArtBuffersToUI(decodedArtState: any, artAddress: PublicKey): ArtView;
declare function decodedTokenBuffersToUI(decodedTokenState: any, tokenAddress: PublicKey): TokenView;
declare function getAllUserTokens(userPublicKey: PublicKey, { connection }: ApiDependencies): Promise<TokenView[]>;
declare function findAssociatedTokenAddress(walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<PublicKey>;
interface TokenView {
    tokenAccountPubkey: String;
    mint: String;
    owner: String;
    amount: Number;
    delegateOption: boolean;
    delegate: String;
    state: boolean;
    isNativeOption: boolean;
    isNative: Number;
    delegatedAmount: Number;
    closeAuthorityOption: boolean;
    closeAuthority: String;
}
interface CounterView {
    counterAccountPubkey: String;
    isInitialized: boolean;
    count: Number;
}
interface ArtView {
    metadata: {
        artAccountPubkey: String;
        isInitialized: boolean;
        id: Number;
        first_owner_pubkey: String;
        minted_token_pubkey: String;
        is_minted: boolean;
        created_at: Number;
    };
    attributes: ArtAttributes;
}
interface ArtAttributes {
    version: Number;
    image_url: String;
}
export { getApes, getAllUserTokens, buyApe, mintApe, getCounter, getApeTokensFromTokens, getTokenAddressFromMintAndUser, readKeypairFromPath, getLargestTokenAccountOwnerByMint, decodedArtBuffersToUI, decodedCounterBuffersToUI, decodedTokenBuffersToUI, findAssociatedTokenAddress, ArtView, ArtAttributes, CounterView, TokenView, ApiDependencies, };
