"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approve = exports.ParsedDataLayout = void 0;
var web3_js_1 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
var ids_1 = require("../utils/ids");
var BufferLayout = require("buffer-layout");
exports.ParsedDataLayout = BufferLayout.struct([
    BufferLayout.blob(32, 'amount'),
    BufferLayout.u8('toChain'),
    BufferLayout.blob(32, 'sourceAddress'),
    BufferLayout.blob(32, 'targetAddress'),
    BufferLayout.blob(32, 'assetAddress'),
    BufferLayout.u8('assetChain'),
    BufferLayout.u8('assetDecimals'),
    BufferLayout.seq(BufferLayout.u8(), 1),
    BufferLayout.u32('nonce'),
    BufferLayout.blob(1001, 'vaa'),
    BufferLayout.seq(BufferLayout.u8(), 3),
    BufferLayout.u32('vaaTime'),
    BufferLayout.u32('lockupTime'),
    BufferLayout.u8('pokeCounter'),
    BufferLayout.blob(32, 'signatureAccount'),
    BufferLayout.u8('initialized'),
]);
function approve(instructions, cleanupInstructions, account, owner, amount, autoRevoke, 
// if delegate is not passed ephemeral transfer authority is used
delegate, existingTransferAuthority) {
    if (autoRevoke === void 0) { autoRevoke = true; }
    var tokenProgram = ids_1.TOKEN_PROGRAM_ID;
    var transferAuthority = existingTransferAuthority || web3_js_1.Keypair.generate();
    var delegateKey = delegate !== null && delegate !== void 0 ? delegate : transferAuthority.publicKey;
    instructions.push(spl_token_1.Token.createApproveInstruction(tokenProgram, account, delegate !== null && delegate !== void 0 ? delegate : transferAuthority.publicKey, owner, [], amount));
    if (autoRevoke) {
        cleanupInstructions.push(spl_token_1.Token.createRevokeInstruction(tokenProgram, account, owner, []));
    }
    return transferAuthority;
}
exports.approve = approve;
