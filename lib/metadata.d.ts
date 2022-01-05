/// <reference types="node" />
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
export declare const extendBorsh: () => void;
export declare const findProgramAddress: (seeds: (Buffer | Uint8Array)[], programId: PublicKey) => Promise<[PublicKey, number]>;
export declare const METADATA_PREFIX = "metadata";
export declare const EDITION = "edition";
export declare const RESERVATION = "reservation";
export declare const MAX_NAME_LENGTH = 32;
export declare const MAX_SYMBOL_LENGTH = 10;
export declare const MAX_URI_LENGTH = 200;
export declare const MAX_CREATOR_LIMIT = 5;
export declare const MAX_CREATOR_LEN: number;
export declare const MAX_METADATA_LEN: number;
export declare const MAX_MASTER_EDITION_KEN: number;
export declare enum MetadataKey {
    Uninitialized = 0,
    MetadataV1 = 4,
    EditionV1 = 1,
    MasterEditionV1 = 2,
    ReservationListV1 = 3
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
export declare class MasterEdition {
    key: MetadataKey;
    supply: any;
    maxSupply?: any;
    printingMint: PublicKey;
    oneTimePrintingAuthorizationMint: PublicKey;
    constructor(args: {
        key: MetadataKey;
        supply: any;
        maxSupply?: any;
        printingMint: PublicKey;
        oneTimePrintingAuthorizationMint: PublicKey;
    });
}
export declare class Edition {
    key: MetadataKey;
    parent: PublicKey;
    edition: any;
    constructor(args: {
        key: MetadataKey;
        parent: PublicKey;
        edition: any;
    });
}
export declare class Reservation {
    address: PublicKey;
    spotsRemaining: number;
    totalSpots: number;
    constructor(args: {
        address: PublicKey;
        spotsRemaining: number;
        totalSpots: number;
    });
}
export declare class ReservationList {
    key: MetadataKey;
    masterEdition: PublicKey;
    supplySnapshot: any | null;
    reservations: Reservation[];
    totalReservationSpots: any;
    constructor(args: {
        key: MetadataKey;
        masterEdition: PublicKey;
        supplySnapshot: any | null;
        reservations: Reservation[];
        totalReservationSpots: any;
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
export declare const decodeEdition: (buffer: Buffer) => Edition;
export declare const decodeMasterEdition: (buffer: Buffer) => MasterEdition;
export declare function updateMetadata(data: Data | undefined, newUpdateAuthority: string | undefined, primarySaleHappened: boolean | null | undefined, mintKey: PublicKey, updateAuthority: PublicKey, instructions: TransactionInstruction[], metadataAccount?: PublicKey): Promise<PublicKey>;
export declare function createMetadata(data: Data, updateAuthority: PublicKey, mintKey: PublicKey, mintAuthorityKey: PublicKey, instructions: TransactionInstruction[], payer: PublicKey): Promise<PublicKey>;
export declare function createMasterEdition(maxSupply: any | undefined, mintKey: PublicKey, printingMintKey: PublicKey, oneTimePrintingAuthorizationMint: PublicKey, updateAuthorityKey: PublicKey, mintAuthorityKey: PublicKey, instructions: TransactionInstruction[], payer: PublicKey, printingMintAuthority: PublicKey, oneTimePrintingAuthorizationMintAuthority?: PublicKey): Promise<void>;
export declare function mintNewEditionFromMasterEditionViaToken(newMint: PublicKey, tokenMint: PublicKey, newMintAuthority: PublicKey, printingMint: PublicKey, authorizationTokenHoldingAccount: PublicKey, burnAuthority: PublicKey, updateAuthorityOfMaster: PublicKey, reservationList: PublicKey | undefined, instructions: TransactionInstruction[], payer: PublicKey): Promise<void>;
export declare function updatePrimarySaleHappenedViaToken(metadata: PublicKey, owner: PublicKey, tokenAccount: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function createReservationList(metadata: PublicKey, masterEdition: PublicKey, resource: PublicKey, updateAuthority: PublicKey, payer: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function signMetadata(metadata: PublicKey, creator: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function mintPrintingTokens(destination: PublicKey, printingMint: PublicKey, updateAuthority: PublicKey, metadata: PublicKey, masterEdition: PublicKey, supply: any, instructions: TransactionInstruction[]): Promise<void>;
export declare function getEdition(tokenMint: PublicKey): Promise<PublicKey>;
export declare function getMetadata(tokenMint: PublicKey): Promise<PublicKey>;
export declare function getReservationList(masterEdition: PublicKey, resource: PublicKey): Promise<PublicKey>;
