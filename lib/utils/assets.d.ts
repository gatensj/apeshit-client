import { TokenInfo } from '@solana/spl-token-registry';
export declare const LAMPORT_MULTIPLIER: number;
export declare const filterModalSolTokens: (tokens: TokenInfo[]) => TokenInfo[];
export declare function getAssetCostToStore(files: File[]): Promise<number>;
