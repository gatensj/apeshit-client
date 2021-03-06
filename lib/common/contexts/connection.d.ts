import { Keypair, BlockhashAndFeeCalculator, Commitment, Connection, Transaction, TransactionInstruction } from '@solana/web3.js';
import { ENV as ChainId } from '@solana/spl-token-registry';
export declare type ENV = 'mainnet-beta' | 'mainnet-beta (Solana)' | 'mainnet-beta (Serum)' | 'testnet' | 'devnet' | 'localnet' | 'lending';
export declare const ENDPOINTS: {
    name: ENV;
    endpoint: string;
    ChainId: ChainId;
}[];
export declare const getErrorForTransaction: (connection: Connection, txid: string) => Promise<string[]>;
export declare enum SequenceType {
    Sequential = 0,
    Parallel = 1,
    StopOnFailure = 2
}
export declare function sendTransactionsWithManualRetry(connection: Connection, wallet: any, instructions: TransactionInstruction[][], signers: Keypair[][]): Promise<void>;
export declare const sendTransactions: (connection: Connection, wallet: any, instructionSet: TransactionInstruction[][], signersSet: Keypair[][], sequenceType?: SequenceType, commitment?: Commitment, successCallback?: (txid: string, ind: number) => void, failCallback?: (reason: string, ind: number) => boolean, block?: BlockhashAndFeeCalculator | undefined) => Promise<number>;
export declare const sendTransaction: (connection: Connection, wallet: any, instructions: TransactionInstruction[], signers: Keypair[], awaitConfirmation?: boolean, commitment?: Commitment, includesFeePayer?: boolean, block?: BlockhashAndFeeCalculator | undefined) => Promise<{
    txid: string;
    slot: number;
}>;
export declare const sendTransactionWithRetry: (connection: Connection, wallet: any, instructions: TransactionInstruction[], signers: Keypair[], commitment?: Commitment, includesFeePayer?: boolean, block?: BlockhashAndFeeCalculator | undefined, beforeSend?: (() => void) | undefined) => Promise<{
    txid: string;
    slot: number;
}>;
export declare const getUnixTs: () => number;
export declare function sendSignedTransaction({ signedTransaction, connection, timeout, }: {
    signedTransaction: Transaction;
    connection: Connection;
    sendingMessage?: string;
    sentMessage?: string;
    successMessage?: string;
    timeout?: number;
}): Promise<{
    txid: string;
    slot: number;
}>;
