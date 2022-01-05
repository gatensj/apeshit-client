/// <reference types="node" />
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import * as BN from 'bn.js';
export declare const VAULT_PREFIX = "vault";
export declare enum VaultKey {
    Uninitialized = 0,
    VaultV1 = 3,
    SafetyDepositBoxV1 = 1,
    ExternalPriceAccountV1 = 2
}
export declare enum VaultState {
    Inactive = 0,
    Active = 1,
    Combined = 2,
    Deactivated = 3
}
export declare const MAX_VAULT_SIZE: number;
export declare const MAX_EXTERNAL_ACCOUNT_SIZE: number;
export declare class Vault {
    key: VaultKey;
    tokenProgram: PublicKey;
    fractionMint: PublicKey;
    authority: PublicKey;
    fractionTreasury: PublicKey;
    redeemTreasury: PublicKey;
    allowFurtherShareCreation: boolean;
    pricingLookupAddress: PublicKey;
    tokenTypeCount: number;
    state: VaultState;
    lockedPricePerShare: BN;
    constructor(args: {
        tokenProgram: PublicKey;
        fractionMint: PublicKey;
        authority: PublicKey;
        fractionTreasury: PublicKey;
        redeemTreasury: PublicKey;
        allowFurtherShareCreation: boolean;
        pricingLookupAddress: PublicKey;
        tokenTypeCount: number;
        state: VaultState;
        lockedPricePerShare: BN;
    });
}
export declare class SafetyDepositBox {
    key: VaultKey;
    vault: PublicKey;
    tokenMint: PublicKey;
    store: PublicKey;
    order: number;
    constructor(args: {
        vault: PublicKey;
        tokenMint: PublicKey;
        store: PublicKey;
        order: number;
    });
}
export declare class ExternalPriceAccount {
    key: VaultKey;
    pricePerShare: BN;
    priceMint: PublicKey;
    allowedToCombine: boolean;
    constructor(args: {
        pricePerShare: BN;
        priceMint: PublicKey;
        allowedToCombine: boolean;
    });
}
export declare const VAULT_SCHEMA: Map<any, any>;
export declare const decodeVault: (buffer: Buffer) => Vault;
export declare const decodeExternalPriceAccount: (buffer: Buffer) => ExternalPriceAccount;
export declare const decodeSafetyDeposit: (buffer: Buffer) => SafetyDepositBox;
export declare function setVaultAuthority(vault: PublicKey, currentAuthority: PublicKey, newAuthority: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function initVault(allowFurtherShareCreation: boolean, fractionalMint: PublicKey, redeemTreasury: PublicKey, fractionalTreasury: PublicKey, vault: PublicKey, vaultAuthority: PublicKey, pricingLookupAddress: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function getSafetyDepositBox(vault: PublicKey, tokenMint: PublicKey): Promise<PublicKey>;
export declare function addTokenToInactiveVault(amount: BN, tokenMint: PublicKey, tokenAccount: PublicKey, tokenStoreAccount: PublicKey, vault: PublicKey, vaultAuthority: PublicKey, payer: PublicKey, transferAuthority: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function activateVault(numberOfShares: BN, vault: PublicKey, fractionMint: PublicKey, fractionTreasury: PublicKey, vaultAuthority: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function combineVault(vault: PublicKey, outstandingShareTokenAccount: PublicKey, payingTokenAccount: PublicKey, fractionMint: PublicKey, fractionTreasury: PublicKey, redeemTreasury: PublicKey, newVaultAuthority: PublicKey | undefined, vaultAuthority: PublicKey, transferAuthority: PublicKey, externalPriceAccount: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function withdrawTokenFromSafetyDepositBox(amount: BN, destination: PublicKey, safetyDepositBox: PublicKey, storeKey: PublicKey, vault: PublicKey, fractionMint: PublicKey, vaultAuthority: PublicKey, instructions: TransactionInstruction[]): Promise<void>;
export declare function updateExternalPriceAccount(externalPriceAccountKey: PublicKey, externalPriceAccount: ExternalPriceAccount, instructions: TransactionInstruction[]): Promise<void>;
export declare function getSafetyDepositBoxAddress(vault: PublicKey, tokenMint: PublicKey): Promise<PublicKey>;
