/// <reference types="node" />
import { AccountInfo, PublicKey, TransactionInstruction } from '@solana/web3.js';
import * as BN from 'bn.js';
export declare type AccountParser = (pubkey: PublicKey, data: AccountInfo<Buffer>) => any | undefined;
export declare const AUCTION_PREFIX = "auction";
export declare const METADATA = "metadata";
export declare const EXTENDED = "extended";
export declare const MAX_AUCTION_DATA_EXTENDED_SIZE: number;
export declare enum AuctionState {
    Created = 0,
    Started = 1,
    Ended = 2
}
export declare enum BidStateType {
    EnglishAuction = 0,
    OpenEdition = 1
}
export declare class Bid {
    key: PublicKey;
    amount: BN;
    constructor(args: {
        key: PublicKey;
        amount: BN;
    });
}
export declare class BidState {
    type: BidStateType;
    bids: Bid[];
    max: BN;
    getWinnerIndex(bidder: PublicKey): number | null;
    constructor(args: {
        type: BidStateType;
        bids: Bid[];
        max: BN;
    });
}
export declare const AuctionParser: AccountParser;
export declare const decodeAuction: (buffer: Buffer) => AuctionData;
export declare const BidderPotParser: AccountParser;
export declare const decodeBidderPot: (buffer: Buffer) => BidderPot;
export declare const AuctionDataExtendedParser: AccountParser;
export declare const decodeAuctionDataExtended: (buffer: Buffer) => AuctionDataExtended;
export declare const BidderMetadataParser: AccountParser;
export declare const decodeBidderMetadata: (buffer: Buffer) => BidderMetadata;
export declare const BASE_AUCTION_DATA_SIZE: number;
export declare enum PriceFloorType {
    None = 0,
    Minimum = 1,
    BlindedPrice = 2
}
export declare class PriceFloor {
    type: PriceFloorType;
    hash: Uint8Array;
    minPrice?: BN;
    constructor(args: {
        type: PriceFloorType;
        hash?: Uint8Array;
        minPrice?: BN;
    });
}
export declare class AuctionDataExtended {
    totalUncancelledBids: BN;
    tickSize: BN | null;
    gapTickSizePercentage: number | null;
    constructor(args: {
        totalUncancelledBids: BN;
        tickSize: BN | null;
        gapTickSizePercentage: number | null;
    });
}
export interface CountdownState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export declare class AuctionData {
    authority: PublicKey;
    tokenMint: PublicKey;
    lastBid: BN | null;
    endedAt: BN | null;
    endAuctionAt: BN | null;
    auctionGap: BN | null;
    priceFloor: PriceFloor;
    state: AuctionState;
    bidState: BidState;
    totalUncancelledBids: BN;
    bidRedemptionKey?: PublicKey;
    timeToEnd(): CountdownState;
    ended(): boolean | undefined;
    constructor(args: {
        authority: PublicKey;
        tokenMint: PublicKey;
        lastBid: BN | null;
        endedAt: BN | null;
        endAuctionAt: BN | null;
        auctionGap: BN | null;
        priceFloor: PriceFloor;
        state: AuctionState;
        bidState: BidState;
        totalUncancelledBids: BN;
    });
}
export declare const BIDDER_METADATA_LEN: number;
export declare class BidderMetadata {
    bidderPubkey: PublicKey;
    auctionPubkey: PublicKey;
    lastBid: BN;
    lastBidTimestamp: BN;
    cancelled: boolean;
    constructor(args: {
        bidderPubkey: PublicKey;
        auctionPubkey: PublicKey;
        lastBid: BN;
        lastBidTimestamp: BN;
        cancelled: boolean;
    });
}
export declare const BIDDER_POT_LEN: number;
export declare class BidderPot {
    bidderPot: PublicKey;
    bidderAct: PublicKey;
    auctionAct: PublicKey;
    emptied: boolean;
    constructor(args: {
        bidderPot: PublicKey;
        bidderAct: PublicKey;
        auctionAct: PublicKey;
        emptied: boolean;
    });
}
export declare enum WinnerLimitType {
    Unlimited = 0,
    Capped = 1
}
export declare class WinnerLimit {
    type: WinnerLimitType;
    usize: BN;
    constructor(args: {
        type: WinnerLimitType;
        usize: BN;
    });
}
export interface IPartialCreateAuctionArgs {
    winners: WinnerLimit;
    endAuctionAt: BN | null;
    auctionGap: BN | null;
    tokenMint: PublicKey;
    priceFloor: PriceFloor;
    tickSize: BN | null;
    gapTickSizePercentage: number | null;
}
export declare class CreateAuctionArgs implements IPartialCreateAuctionArgs {
    instruction: number;
    winners: WinnerLimit;
    endAuctionAt: BN | null;
    auctionGap: BN | null;
    tokenMint: PublicKey;
    authority: PublicKey;
    resource: PublicKey;
    priceFloor: PriceFloor;
    tickSize: BN | null;
    gapTickSizePercentage: number | null;
    constructor(args: {
        winners: WinnerLimit;
        endAuctionAt: BN | null;
        auctionGap: BN | null;
        tokenMint: PublicKey;
        authority: PublicKey;
        resource: PublicKey;
        priceFloor: PriceFloor;
        tickSize: BN | null;
        gapTickSizePercentage: number | null;
    });
}
export declare const AUCTION_SCHEMA: Map<any, any>;
export declare const decodeAuctionData: (buffer: Buffer) => AuctionData;
export declare function createAuction(settings: CreateAuctionArgs, creator: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function startAuction(resource: PublicKey, creator: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function setAuctionAuthority(auction: PublicKey, currentAuthority: PublicKey, newAuthority: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function placeBid(bidderPubkey: PublicKey, bidderTokenPubkey: PublicKey, bidderPotTokenPubkey: PublicKey, tokenMintPubkey: PublicKey, transferAuthority: PublicKey, payer: PublicKey, resource: PublicKey, amount: BN, instructions: TransactionInstruction[]): Promise<{
    amount: BN;
}>;
export declare function getBidderPotKey({ auctionProgramId, auctionKey, bidderPubkey, }: {
    auctionProgramId: PublicKey;
    auctionKey: PublicKey;
    bidderPubkey: PublicKey;
}): Promise<PublicKey>;
export declare function getAuctionExtended({ auctionProgramId, resource, }: {
    auctionProgramId: PublicKey;
    resource: PublicKey;
}): Promise<PublicKey>;
export declare function cancelBid(bidderPubkey: PublicKey, bidderTokenPubkey: PublicKey, bidderPotTokenPubkey: PublicKey, tokenMintPubkey: PublicKey, resource: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
