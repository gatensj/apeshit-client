/// <reference types="node" />
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import * as BN from 'bn.js';
export declare const METADATA_PREFIX = "metadata";
export declare const EDITION = "edition";
export declare const RESERVATION = "reservation";
export declare const MAX_NAME_LENGTH = 32;
export declare const MAX_SYMBOL_LENGTH = 10;
export declare const MAX_URI_LENGTH = 200;
export declare const MAX_CREATOR_LIMIT = 5;
export declare const MAX_CREATOR_LEN: number;
export declare const MAX_METADATA_LEN: number;
export declare const MAX_EDITION_LEN: number;
export declare const EDITION_MARKER_BIT_SIZE = 248;
export declare const findProgramAddress: (seeds: (Buffer | Uint8Array)[], programId: PublicKey) => Promise<[PublicKey, number]>;
export declare enum MetadataKey {
    Uninitialized = 0,
    MetadataV1 = 4,
    EditionV1 = 1,
    MasterEditionV1 = 2,
    MasterEditionV2 = 6,
    EditionMarker = 7
}
export declare enum MetadataCategory {
    Audio = "audio",
    Video = "video",
    Image = "image",
    VR = "vr"
}
export declare type MetadataFile = {
    uri: string;
    type: string;
};
export declare type FileOrString = MetadataFile | string;
export interface IMetadataExtension {
    name: string;
    symbol: string;
    creators: Creator[] | null;
    description: string;
    image: string;
    animation_url?: string;
    external_url: string;
    seller_fee_basis_points: number;
    properties: {
        files?: FileOrString[];
        category: MetadataCategory;
        maxSupply?: number;
        creators?: {
            address: string;
            shares: number;
        }[];
    };
}
export declare class MasterEditionV1 {
    key: MetadataKey;
    supply: BN;
    maxSupply?: BN;
    printingMint: PublicKey;
    oneTimePrintingAuthorizationMint: PublicKey;
    constructor(args: {
        key: MetadataKey;
        supply: BN;
        maxSupply?: BN;
        printingMint: PublicKey;
        oneTimePrintingAuthorizationMint: PublicKey;
    });
}
export declare class MasterEditionV2 {
    key: MetadataKey;
    supply: BN;
    maxSupply?: BN;
    constructor(args: {
        key: MetadataKey;
        supply: BN;
        maxSupply?: BN;
    });
}
export declare class EditionMarker {
    key: MetadataKey;
    ledger: number[];
    constructor(args: {
        key: MetadataKey;
        ledger: number[];
    });
    editionTaken(edition: number): boolean;
}
export declare class Edition {
    key: MetadataKey;
    parent: PublicKey;
    edition: BN;
    constructor(args: {
        key: MetadataKey;
        parent: PublicKey;
        edition: BN;
    });
}
export declare class Creator {
    address: PublicKey;
    verified: boolean;
    share: number;
    constructor(args: {
        address: PublicKey;
        verified: boolean;
        share: number;
    });
}
export declare class Data {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Creator[] | null;
    constructor(args: {
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
        creators: Creator[] | null;
    });
}
export declare class Metadata {
    key: MetadataKey;
    updateAuthority: PublicKey;
    mint: PublicKey;
    data: Data;
    primarySaleHappened: boolean;
    isMutable: boolean;
    masterEdition?: PublicKey;
    edition?: PublicKey;
    constructor(args: {
        updateAuthority: PublicKey;
        mint: PublicKey;
        data: Data;
        primarySaleHappened: boolean;
        isMutable: boolean;
    });
    init(): Promise<void>;
}
export declare const METADATA_SCHEMA: Map<any, any>;
export declare const decodeMetadata: (buffer: Buffer) => Metadata;
export declare const decodeEditionMarker: (buffer: Buffer) => EditionMarker;
export declare const decodeEdition: (buffer: Buffer) => Edition;
export declare const decodeMasterEdition: (buffer: Buffer) => MasterEditionV1 | MasterEditionV2;
export declare function updateMetadata(data: Data | undefined, newUpdateAuthority: string | undefined, primarySaleHappened: boolean | null | undefined, mintKey: PublicKey, updateAuthority: PublicKey, instructions: TransactionInstruction[], metadataAccount?: PublicKey): Promise<PublicKey>;
export declare function createMetadata(data: Data, updateAuthority: PublicKey, mintKey: PublicKey, mintAuthorityKey: PublicKey, instructions: TransactionInstruction[], payer: PublicKey): Promise<PublicKey>;
export declare function createMasterEdition(maxSupply: BN | undefined, mintKey: PublicKey, updateAuthorityKey: PublicKey, mintAuthorityKey: PublicKey, payer: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function deprecatedMintNewEditionFromMasterEditionViaPrintingToken(newMint: PublicKey, tokenMint: PublicKey, newMintAuthority: PublicKey, printingMint: PublicKey, authorizationTokenHoldingAccount: PublicKey, burnAuthority: PublicKey, updateAuthorityOfMaster: PublicKey, reservationList: PublicKey | undefined, instructions: TransactionInstruction[], payer: PublicKey): Promise<void>;
export declare function mintNewEditionFromMasterEditionViaToken(newMint: PublicKey, tokenMint: PublicKey, newMintAuthority: PublicKey, newUpdateAuthority: PublicKey, tokenOwner: PublicKey, tokenAccount: PublicKey, instructions: TransactionInstruction[], payer: PublicKey, edition: BN): Promise<void>;
export declare function updatePrimarySaleHappenedViaToken(metadata: PublicKey, owner: PublicKey, tokenAccount: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function deprecatedCreateReservationList(metadata: PublicKey, masterEdition: PublicKey, resource: PublicKey, updateAuthority: PublicKey, payer: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function signMetadata(metadata: PublicKey, creator: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function deprecatedMintPrintingTokens(destination: PublicKey, printingMint: PublicKey, updateAuthority: PublicKey, metadata: PublicKey, masterEdition: PublicKey, supply: BN, instructions: TransactionInstruction[]): Promise<void>;
export declare function convertMasterEditionV1ToV2(masterEdition: PublicKey, oneTimeAuthMint: PublicKey, printingMint: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function getEdition(tokenMint: PublicKey): Promise<PublicKey>;
export declare function getMetadata(tokenMint: PublicKey): Promise<PublicKey>;
export declare function deprecatedGetReservationList(masterEdition: PublicKey, resource: PublicKey): Promise<PublicKey>;
export declare function getEditionMarkPda(mint: PublicKey, edition: BN): Promise<PublicKey>;
