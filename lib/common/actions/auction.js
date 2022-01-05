"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBid = exports.getAuctionExtended = exports.getBidderPotKey = exports.placeBid = exports.setAuctionAuthority = exports.startAuction = exports.createAuction = exports.decodeAuctionData = exports.AUCTION_SCHEMA = exports.CreateAuctionArgs = exports.WinnerLimit = exports.WinnerLimitType = exports.BidderPot = exports.BIDDER_POT_LEN = exports.BidderMetadata = exports.BIDDER_METADATA_LEN = exports.AuctionData = exports.AuctionDataExtended = exports.PriceFloor = exports.PriceFloorType = exports.BASE_AUCTION_DATA_SIZE = exports.decodeBidderMetadata = exports.BidderMetadataParser = exports.decodeAuctionDataExtended = exports.AuctionDataExtendedParser = exports.decodeBidderPot = exports.BidderPotParser = exports.decodeAuction = exports.AuctionParser = exports.BidState = exports.Bid = exports.BidStateType = exports.AuctionState = exports.MAX_AUCTION_DATA_EXTENDED_SIZE = exports.EXTENDED = exports.METADATA = exports.AUCTION_PREFIX = void 0;
var web3_js_1 = require("@solana/web3.js");
var ids_1 = require("../utils/ids");
var borsh_1 = require("borsh");
var BN = require("bn.js");
var moment = require("moment");
var utils_1 = require("../utils");
exports.AUCTION_PREFIX = 'auction';
exports.METADATA = 'metadata';
exports.EXTENDED = 'extended';
exports.MAX_AUCTION_DATA_EXTENDED_SIZE = 8 + 9 + 2 + 200;
var AuctionState;
(function (AuctionState) {
    AuctionState[AuctionState["Created"] = 0] = "Created";
    AuctionState[AuctionState["Started"] = 1] = "Started";
    AuctionState[AuctionState["Ended"] = 2] = "Ended";
})(AuctionState = exports.AuctionState || (exports.AuctionState = {}));
var BidStateType;
(function (BidStateType) {
    BidStateType[BidStateType["EnglishAuction"] = 0] = "EnglishAuction";
    BidStateType[BidStateType["OpenEdition"] = 1] = "OpenEdition";
})(BidStateType = exports.BidStateType || (exports.BidStateType = {}));
var Bid = /** @class */ (function () {
    function Bid(args) {
        this.key = args.key;
        this.amount = args.amount;
    }
    return Bid;
}());
exports.Bid = Bid;
var BidState = /** @class */ (function () {
    function BidState(args) {
        this.type = args.type;
        this.bids = args.bids;
        this.max = args.max;
    }
    BidState.prototype.getWinnerIndex = function (bidder) {
        if (!this.bids)
            return null;
        var index = this.bids.findIndex(function (b) { return b.key.toBase58() === bidder.toBase58(); });
        // auction stores data in reverse order
        if (index !== -1) {
            var zeroBased = this.bids.length - index - 1;
            return zeroBased < this.max.toNumber() ? zeroBased : null;
        }
        else
            return null;
    };
    return BidState;
}());
exports.BidState = BidState;
exports.AuctionParser = function (pubkey, account) { return ({
    pubkey: pubkey,
    account: account,
    info: exports.decodeAuction(account.data),
}); };
exports.decodeAuction = function (buffer) {
    return borsh_1.deserializeUnchecked(exports.AUCTION_SCHEMA, AuctionData, buffer);
};
exports.BidderPotParser = function (pubkey, account) { return ({
    pubkey: pubkey,
    account: account,
    info: exports.decodeBidderPot(account.data),
}); };
exports.decodeBidderPot = function (buffer) {
    return borsh_1.deserializeUnchecked(exports.AUCTION_SCHEMA, BidderPot, buffer);
};
exports.AuctionDataExtendedParser = function (pubkey, account) { return ({
    pubkey: pubkey,
    account: account,
    info: exports.decodeAuctionDataExtended(account.data),
}); };
exports.decodeAuctionDataExtended = function (buffer) {
    return borsh_1.deserializeUnchecked(exports.AUCTION_SCHEMA, AuctionDataExtended, buffer);
};
exports.BidderMetadataParser = function (pubkey, account) { return ({
    pubkey: pubkey,
    account: account,
    info: exports.decodeBidderMetadata(account.data),
}); };
exports.decodeBidderMetadata = function (buffer) {
    return borsh_1.deserializeUnchecked(exports.AUCTION_SCHEMA, BidderMetadata, buffer);
};
exports.BASE_AUCTION_DATA_SIZE = 32 + 32 + 32 + 9 + 9 + 9 + 9 + 1 + 32 + 1 + 8 + 8;
var PriceFloorType;
(function (PriceFloorType) {
    PriceFloorType[PriceFloorType["None"] = 0] = "None";
    PriceFloorType[PriceFloorType["Minimum"] = 1] = "Minimum";
    PriceFloorType[PriceFloorType["BlindedPrice"] = 2] = "BlindedPrice";
})(PriceFloorType = exports.PriceFloorType || (exports.PriceFloorType = {}));
var PriceFloor = /** @class */ (function () {
    function PriceFloor(args) {
        this.type = args.type;
        this.hash = args.hash || new Uint8Array(32);
        if (this.type === PriceFloorType.Minimum) {
            if (args.minPrice) {
                this.hash.set(args.minPrice.toArrayLike(Buffer, 'le', 8), 0);
            }
            else {
                this.minPrice = new BN((args.hash || new Uint8Array(0)).slice(0, 8), 'le');
            }
        }
    }
    return PriceFloor;
}());
exports.PriceFloor = PriceFloor;
var AuctionDataExtended = /** @class */ (function () {
    function AuctionDataExtended(args) {
        this.totalUncancelledBids = args.totalUncancelledBids;
        this.tickSize = args.tickSize;
        this.gapTickSizePercentage = args.gapTickSizePercentage;
    }
    return AuctionDataExtended;
}());
exports.AuctionDataExtended = AuctionDataExtended;
var AuctionData = /** @class */ (function () {
    function AuctionData(args) {
        this.authority = args.authority;
        this.tokenMint = args.tokenMint;
        this.lastBid = args.lastBid;
        this.endedAt = args.endedAt;
        this.endAuctionAt = args.endAuctionAt;
        this.auctionGap = args.auctionGap;
        this.priceFloor = args.priceFloor;
        this.state = args.state;
        this.bidState = args.bidState;
        this.totalUncancelledBids = args.totalUncancelledBids;
    }
    AuctionData.prototype.timeToEnd = function () {
        var _a;
        var now = moment().unix();
        var ended = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        var endAt = ((_a = this.endedAt) === null || _a === void 0 ? void 0 : _a.toNumber()) || 0;
        if (this.auctionGap && this.lastBid) {
            endAt = Math.max(endAt, this.auctionGap.toNumber() + this.lastBid.toNumber());
        }
        var delta = endAt - now;
        if (!endAt || delta <= 0)
            return ended;
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        var seconds = Math.floor(delta % 60);
        return { days: days, hours: hours, minutes: minutes, seconds: seconds };
    };
    AuctionData.prototype.ended = function () {
        var now = moment().unix();
        if (!this.endedAt)
            return false;
        if (this.endedAt.toNumber() > now)
            return false;
        if (this.endedAt.toNumber() < now) {
            if (this.auctionGap && this.lastBid) {
                var newEnding = this.auctionGap.toNumber() + this.lastBid.toNumber();
                return newEnding < now;
            }
            else
                return true;
        }
    };
    return AuctionData;
}());
exports.AuctionData = AuctionData;
exports.BIDDER_METADATA_LEN = 32 + 32 + 8 + 8 + 1;
var BidderMetadata = /** @class */ (function () {
    function BidderMetadata(args) {
        this.bidderPubkey = args.bidderPubkey;
        this.auctionPubkey = args.auctionPubkey;
        this.lastBid = args.lastBid;
        this.lastBidTimestamp = args.lastBidTimestamp;
        this.cancelled = args.cancelled;
    }
    return BidderMetadata;
}());
exports.BidderMetadata = BidderMetadata;
exports.BIDDER_POT_LEN = 32 + 32 + 32 + 1;
var BidderPot = /** @class */ (function () {
    function BidderPot(args) {
        this.bidderPot = args.bidderPot;
        this.bidderAct = args.bidderAct;
        this.auctionAct = args.auctionAct;
        this.emptied = args.emptied;
    }
    return BidderPot;
}());
exports.BidderPot = BidderPot;
var WinnerLimitType;
(function (WinnerLimitType) {
    WinnerLimitType[WinnerLimitType["Unlimited"] = 0] = "Unlimited";
    WinnerLimitType[WinnerLimitType["Capped"] = 1] = "Capped";
})(WinnerLimitType = exports.WinnerLimitType || (exports.WinnerLimitType = {}));
var WinnerLimit = /** @class */ (function () {
    function WinnerLimit(args) {
        this.type = args.type;
        this.usize = args.usize;
    }
    return WinnerLimit;
}());
exports.WinnerLimit = WinnerLimit;
var CreateAuctionArgs = /** @class */ (function () {
    function CreateAuctionArgs(args) {
        this.instruction = 1;
        this.winners = args.winners;
        this.endAuctionAt = args.endAuctionAt;
        this.auctionGap = args.auctionGap;
        this.tokenMint = args.tokenMint;
        this.authority = args.authority;
        this.resource = args.resource;
        this.priceFloor = args.priceFloor;
        this.tickSize = args.tickSize;
        this.gapTickSizePercentage = args.gapTickSizePercentage;
    }
    return CreateAuctionArgs;
}());
exports.CreateAuctionArgs = CreateAuctionArgs;
var StartAuctionArgs = /** @class */ (function () {
    function StartAuctionArgs(args) {
        this.instruction = 4;
        this.resource = args.resource;
    }
    return StartAuctionArgs;
}());
var PlaceBidArgs = /** @class */ (function () {
    function PlaceBidArgs(args) {
        this.instruction = 6;
        this.resource = args.resource;
        this.amount = args.amount;
    }
    return PlaceBidArgs;
}());
var CancelBidArgs = /** @class */ (function () {
    function CancelBidArgs(args) {
        this.instruction = 0;
        this.resource = args.resource;
    }
    return CancelBidArgs;
}());
var SetAuthorityArgs = /** @class */ (function () {
    function SetAuthorityArgs() {
        this.instruction = 5;
    }
    return SetAuthorityArgs;
}());
exports.AUCTION_SCHEMA = new Map([
    [
        CreateAuctionArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['winners', WinnerLimit],
                ['endAuctionAt', { kind: 'option', type: 'u64' }],
                ['auctionGap', { kind: 'option', type: 'u64' }],
                ['tokenMint', 'pubkey'],
                ['authority', 'pubkey'],
                ['resource', 'pubkey'],
                ['priceFloor', PriceFloor],
                ['tickSize', { kind: 'option', type: 'u64' }],
                ['gapTickSizePercentage', { kind: 'option', type: 'u8' }],
            ],
        },
    ],
    [
        WinnerLimit,
        {
            kind: 'struct',
            fields: [
                ['type', 'u8'],
                ['usize', 'u64'],
            ],
        },
    ],
    [
        StartAuctionArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['resource', 'pubkey'],
            ],
        },
    ],
    [
        PlaceBidArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['amount', 'u64'],
                ['resource', 'pubkey'],
            ],
        },
    ],
    [
        CancelBidArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['resource', 'pubkey'],
            ],
        },
    ],
    [
        SetAuthorityArgs,
        {
            kind: 'struct',
            fields: [['instruction', 'u8']],
        },
    ],
    [
        AuctionData,
        {
            kind: 'struct',
            fields: [
                ['authority', 'pubkey'],
                ['tokenMint', 'pubkey'],
                ['lastBid', { kind: 'option', type: 'u64' }],
                ['endedAt', { kind: 'option', type: 'u64' }],
                ['endAuctionAt', { kind: 'option', type: 'u64' }],
                ['auctionGap', { kind: 'option', type: 'u64' }],
                ['priceFloor', PriceFloor],
                ['state', 'u8'],
                ['bidState', BidState],
            ],
        },
    ],
    [
        AuctionDataExtended,
        {
            kind: 'struct',
            fields: [
                ['totalUncancelledBids', 'u64'],
                ['tickSize', { kind: 'option', type: 'u64' }],
                ['gapTickSizePercentage', { kind: 'option', type: 'u8' }],
            ],
        },
    ],
    [
        PriceFloor,
        {
            kind: 'struct',
            fields: [
                ['type', 'u8'],
                ['hash', [32]],
            ],
        },
    ],
    [
        BidState,
        {
            kind: 'struct',
            fields: [
                ['type', 'u8'],
                ['bids', [Bid]],
                ['max', 'u64'],
            ],
        },
    ],
    [
        Bid,
        {
            kind: 'struct',
            fields: [
                ['key', 'pubkey'],
                ['amount', 'u64'],
            ],
        },
    ],
    [
        BidderMetadata,
        {
            kind: 'struct',
            fields: [
                ['bidderPubkey', 'pubkey'],
                ['auctionPubkey', 'pubkey'],
                ['lastBid', 'u64'],
                ['lastBidTimestamp', 'u64'],
                ['cancelled', 'u8'],
            ],
        },
    ],
    [
        BidderPot,
        {
            kind: 'struct',
            fields: [
                ['bidderPot', 'pubkey'],
                ['bidderAct', 'pubkey'],
                ['auctionAct', 'pubkey'],
                ['emptied', 'u8'],
            ],
        },
    ],
]);
exports.decodeAuctionData = function (buffer) {
    return borsh_1.deserializeUnchecked(exports.AUCTION_SCHEMA, AuctionData, buffer);
};
function createAuction(settings, creator, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var auctionProgramId, data, auctionKey, keys, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    auctionProgramId = ids_1.programIds().auction;
                    data = Buffer.from(borsh_1.serialize(exports.AUCTION_SCHEMA, settings));
                    return [4 /*yield*/, utils_1.findProgramAddress([
                            Buffer.from(exports.AUCTION_PREFIX),
                            auctionProgramId.toBuffer(),
                            settings.resource.toBuffer(),
                        ], auctionProgramId)];
                case 1:
                    auctionKey = (_c.sent())[0];
                    _a = [{
                            pubkey: creator,
                            isSigner: true,
                            isWritable: true,
                        },
                        {
                            pubkey: auctionKey,
                            isSigner: false,
                            isWritable: true,
                        }];
                    _b = {};
                    return [4 /*yield*/, getAuctionExtended({
                            auctionProgramId: auctionProgramId,
                            resource: settings.resource,
                        })];
                case 2:
                    keys = _a.concat([
                        (_b.pubkey = _c.sent(),
                            _b.isSigner = false,
                            _b.isWritable = true,
                            _b),
                        {
                            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SystemProgram.programId,
                            isSigner: false,
                            isWritable: false,
                        }
                    ]);
                    instructions.push(new web3_js_1.TransactionInstruction({
                        keys: keys,
                        programId: auctionProgramId,
                        data: data,
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
exports.createAuction = createAuction;
function startAuction(resource, creator, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var auctionProgramId, data, auctionKey, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    auctionProgramId = ids_1.programIds().auction;
                    data = Buffer.from(borsh_1.serialize(exports.AUCTION_SCHEMA, new StartAuctionArgs({
                        resource: resource,
                    })));
                    return [4 /*yield*/, utils_1.findProgramAddress([
                            Buffer.from(exports.AUCTION_PREFIX),
                            auctionProgramId.toBuffer(),
                            resource.toBuffer(),
                        ], auctionProgramId)];
                case 1:
                    auctionKey = (_a.sent())[0];
                    keys = [
                        {
                            pubkey: creator,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: auctionKey,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY,
                            isSigner: false,
                            isWritable: false,
                        },
                    ];
                    instructions.push(new web3_js_1.TransactionInstruction({
                        keys: keys,
                        programId: auctionProgramId,
                        data: data,
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
exports.startAuction = startAuction;
function setAuctionAuthority(auction, currentAuthority, newAuthority, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var auctionProgramId, data, keys;
        return __generator(this, function (_a) {
            auctionProgramId = ids_1.programIds().auction;
            data = Buffer.from(borsh_1.serialize(exports.AUCTION_SCHEMA, new SetAuthorityArgs()));
            keys = [
                {
                    pubkey: auction,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: currentAuthority,
                    isSigner: true,
                    isWritable: false,
                },
                {
                    pubkey: newAuthority,
                    isSigner: false,
                    isWritable: false,
                },
            ];
            instructions.push(new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: auctionProgramId,
                data: data,
            }));
            return [2 /*return*/];
        });
    });
}
exports.setAuctionAuthority = setAuctionAuthority;
function placeBid(bidderPubkey, bidderTokenPubkey, bidderPotTokenPubkey, tokenMintPubkey, transferAuthority, payer, resource, amount, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var auctionProgramId, data, auctionKey, bidderPotKey, bidderMetaKey, keys, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    auctionProgramId = ids_1.programIds().auction;
                    data = Buffer.from(borsh_1.serialize(exports.AUCTION_SCHEMA, new PlaceBidArgs({
                        resource: resource,
                        amount: amount,
                    })));
                    return [4 /*yield*/, utils_1.findProgramAddress([
                            Buffer.from(exports.AUCTION_PREFIX),
                            auctionProgramId.toBuffer(),
                            resource.toBuffer(),
                        ], auctionProgramId)];
                case 1:
                    auctionKey = (_c.sent())[0];
                    return [4 /*yield*/, getBidderPotKey({
                            auctionProgramId: auctionProgramId,
                            auctionKey: auctionKey,
                            bidderPubkey: bidderPubkey,
                        })];
                case 2:
                    bidderPotKey = _c.sent();
                    return [4 /*yield*/, utils_1.findProgramAddress([
                            Buffer.from(exports.AUCTION_PREFIX),
                            auctionProgramId.toBuffer(),
                            auctionKey.toBuffer(),
                            bidderPubkey.toBuffer(),
                            Buffer.from('metadata'),
                        ], auctionProgramId)];
                case 3:
                    bidderMetaKey = (_c.sent())[0];
                    _a = [{
                            pubkey: bidderPubkey,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: bidderTokenPubkey,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: bidderPotKey,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: bidderPotTokenPubkey,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: bidderMetaKey,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: auctionKey,
                            isSigner: false,
                            isWritable: true,
                        }];
                    _b = {};
                    return [4 /*yield*/, getAuctionExtended({ auctionProgramId: auctionProgramId, resource: resource })];
                case 4:
                    keys = _a.concat([
                        (_b.pubkey = _c.sent(),
                            _b.isSigner = false,
                            _b.isWritable = true,
                            _b),
                        {
                            pubkey: tokenMintPubkey,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: transferAuthority,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: payer,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SystemProgram.programId,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: ids_1.programIds().token,
                            isSigner: false,
                            isWritable: false,
                        }
                    ]);
                    instructions.push(new web3_js_1.TransactionInstruction({
                        keys: keys,
                        programId: auctionProgramId,
                        data: data,
                    }));
                    return [2 /*return*/, {
                            amount: amount,
                        }];
            }
        });
    });
}
exports.placeBid = placeBid;
function getBidderPotKey(_a) {
    var auctionProgramId = _a.auctionProgramId, auctionKey = _a.auctionKey, bidderPubkey = _a.bidderPubkey;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, utils_1.findProgramAddress([
                        Buffer.from(exports.AUCTION_PREFIX),
                        auctionProgramId.toBuffer(),
                        auctionKey.toBuffer(),
                        bidderPubkey.toBuffer(),
                    ], auctionProgramId)];
                case 1: return [2 /*return*/, (_b.sent())[0]];
            }
        });
    });
}
exports.getBidderPotKey = getBidderPotKey;
function getAuctionExtended(_a) {
    var auctionProgramId = _a.auctionProgramId, resource = _a.resource;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, utils_1.findProgramAddress([
                        Buffer.from(exports.AUCTION_PREFIX),
                        auctionProgramId.toBuffer(),
                        resource.toBuffer(),
                        Buffer.from(exports.EXTENDED),
                    ], auctionProgramId)];
                case 1: return [2 /*return*/, (_b.sent())[0]];
            }
        });
    });
}
exports.getAuctionExtended = getAuctionExtended;
function cancelBid(bidderPubkey, bidderTokenPubkey, bidderPotTokenPubkey, tokenMintPubkey, resource, instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var auctionProgramId, data, auctionKey, bidderPotKey, bidderMetaKey, keys, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    auctionProgramId = ids_1.programIds().auction;
                    data = Buffer.from(borsh_1.serialize(exports.AUCTION_SCHEMA, new CancelBidArgs({
                        resource: resource,
                    })));
                    return [4 /*yield*/, utils_1.findProgramAddress([
                            Buffer.from(exports.AUCTION_PREFIX),
                            auctionProgramId.toBuffer(),
                            resource.toBuffer(),
                        ], auctionProgramId)];
                case 1:
                    auctionKey = (_c.sent())[0];
                    return [4 /*yield*/, getBidderPotKey({
                            auctionProgramId: auctionProgramId,
                            auctionKey: auctionKey,
                            bidderPubkey: bidderPubkey,
                        })];
                case 2:
                    bidderPotKey = _c.sent();
                    return [4 /*yield*/, utils_1.findProgramAddress([
                            Buffer.from(exports.AUCTION_PREFIX),
                            auctionProgramId.toBuffer(),
                            auctionKey.toBuffer(),
                            bidderPubkey.toBuffer(),
                            Buffer.from('metadata'),
                        ], auctionProgramId)];
                case 3:
                    bidderMetaKey = (_c.sent())[0];
                    _a = [{
                            pubkey: bidderPubkey,
                            isSigner: true,
                            isWritable: false,
                        },
                        {
                            pubkey: bidderTokenPubkey,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: bidderPotKey,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: bidderPotTokenPubkey,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: bidderMetaKey,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: auctionKey,
                            isSigner: false,
                            isWritable: true,
                        }];
                    _b = {};
                    return [4 /*yield*/, getAuctionExtended({ auctionProgramId: auctionProgramId, resource: resource })];
                case 4:
                    keys = _a.concat([
                        (_b.pubkey = _c.sent(),
                            _b.isSigner = false,
                            _b.isWritable = true,
                            _b),
                        {
                            pubkey: tokenMintPubkey,
                            isSigner: false,
                            isWritable: true,
                        },
                        {
                            pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: web3_js_1.SystemProgram.programId,
                            isSigner: false,
                            isWritable: false,
                        },
                        {
                            pubkey: ids_1.programIds().token,
                            isSigner: false,
                            isWritable: false,
                        }
                    ]);
                    instructions.push(new web3_js_1.TransactionInstruction({
                        keys: keys,
                        programId: auctionProgramId,
                        data: data,
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
exports.cancelBid = cancelBid;
