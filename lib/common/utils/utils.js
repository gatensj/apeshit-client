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
exports.sleep = exports.convert = exports.formatPct = exports.formatNumber = exports.formatUSD = exports.formatTokenAmount = exports.formatAmount = exports.tryParseKey = exports.fromLamports = exports.wadToLamports = exports.toLamports = exports.chunks = exports.STABLE_COINS = exports.isKnownMint = exports.getTokenIcon = exports.getTokenByName = exports.getVerboseTokenName = exports.getTokenName = exports.shortenAddress = exports.findProgramAddress = exports.useLocalStorageState = exports.formatPriceNumber = void 0;
var web3_js_1 = require("@solana/web3.js");
var BN = require("bn.js");
var constants_1 = require("../constants");
exports.formatPriceNumber = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
});
function useLocalStorageState(key, defaultState) {
    // const [state, setState] = useState(() => {
    //   // NOTE: Not sure if this is ok
    //   const storedState = localStorage.getItem(key);
    //   if (storedState) {
    //     return JSON.parse(storedState);
    //   }
    //   return defaultState;
    // });
    // const setLocalStorageState = useCallback(
    //   newState => {
    //     const changed = state !== newState;
    //     if (!changed) {
    //       return;
    //     }
    //     setState(newState);
    //     if (newState === null) {
    //       localStorage.removeItem(key);
    //     } else {
    //       localStorage.setItem(key, JSON.stringify(newState));
    //     }
    //   },
    //   [state, key],
    // );
    // return [state, setLocalStorageState];
}
exports.useLocalStorageState = useLocalStorageState;
exports.findProgramAddress = function (seeds, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var key, cached, value, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = 'pda-' +
                    seeds.reduce(function (agg, item) { return agg + item.toString('hex'); }, '') +
                    programId.toString();
                cached = localStorage.getItem(key);
                if (cached) {
                    value = JSON.parse(cached);
                    return [2 /*return*/, [new web3_js_1.PublicKey(value.key), parseInt(value.nonce)]];
                }
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress(seeds, programId)];
            case 1:
                result = _a.sent();
                localStorage.setItem(key, JSON.stringify({
                    key: result[0].toBase58(),
                    nonce: result[1],
                }));
                return [2 /*return*/, result];
        }
    });
}); };
// shorten the checksummed version of the input address to have 4 characters at start and end
function shortenAddress(address, chars) {
    if (chars === void 0) { chars = 4; }
    return address.slice(0, chars) + "..." + address.slice(-chars);
}
exports.shortenAddress = shortenAddress;
function getTokenName(map, mint, shorten) {
    var _a;
    if (shorten === void 0) { shorten = true; }
    var mintAddress = typeof mint === 'string' ? mint : mint === null || mint === void 0 ? void 0 : mint.toBase58();
    if (!mintAddress) {
        return 'N/A';
    }
    var knownSymbol = (_a = map.get(mintAddress)) === null || _a === void 0 ? void 0 : _a.symbol;
    if (knownSymbol) {
        return knownSymbol;
    }
    return shorten ? mintAddress.substring(0, 5) + "..." : mintAddress;
}
exports.getTokenName = getTokenName;
function getVerboseTokenName(map, mint, shorten) {
    var _a;
    if (shorten === void 0) { shorten = true; }
    var mintAddress = typeof mint === 'string' ? mint : mint === null || mint === void 0 ? void 0 : mint.toBase58();
    if (!mintAddress) {
        return 'N/A';
    }
    var knownName = (_a = map.get(mintAddress)) === null || _a === void 0 ? void 0 : _a.name;
    if (knownName) {
        return knownName;
    }
    return shorten ? mintAddress.substring(0, 5) + "..." : mintAddress;
}
exports.getVerboseTokenName = getVerboseTokenName;
function getTokenByName(tokenMap, name) {
    var token = null;
    for (var _i = 0, _a = Array.from(tokenMap.values()); _i < _a.length; _i++) {
        var val = _a[_i];
        if (val.symbol === name) {
            token = val;
            break;
        }
    }
    return token;
}
exports.getTokenByName = getTokenByName;
function getTokenIcon(map, mintAddress) {
    var _a;
    var address = typeof mintAddress === 'string' ? mintAddress : mintAddress === null || mintAddress === void 0 ? void 0 : mintAddress.toBase58();
    if (!address) {
        return;
    }
    return (_a = map.get(address)) === null || _a === void 0 ? void 0 : _a.logoURI;
}
exports.getTokenIcon = getTokenIcon;
function isKnownMint(map, mintAddress) {
    return !!map.get(mintAddress);
}
exports.isKnownMint = isKnownMint;
exports.STABLE_COINS = new Set(['USDC', 'wUSDC', 'USDT']);
function chunks(array, size) {
    return Array.apply(0, new Array(Math.ceil(array.length / size))).map(function (_, index) { return array.slice(index * size, (index + 1) * size); });
}
exports.chunks = chunks;
function toLamports(account, mint) {
    if (!account) {
        return 0;
    }
    var amount = typeof account === 'number' ? account : Number(account.info.amount);
    var precision = Math.pow(10, (mint === null || mint === void 0 ? void 0 : mint.decimals) || 0);
    return Math.floor(amount * precision);
}
exports.toLamports = toLamports;
function wadToLamports(amount) {
    return (amount === null || amount === void 0 ? void 0 : amount.div(constants_1.WAD)) || constants_1.ZERO;
}
exports.wadToLamports = wadToLamports;
function fromLamports(account, mint, rate) {
    if (rate === void 0) { rate = 1.0; }
    if (!account) {
        return 0;
    }
    var amount = Math.floor(typeof account === 'number'
        ? account
        : BN.isBN(account)
            ? account.toNumber()
            : Number(account.info.amount));
    var precision = Math.pow(10, (mint === null || mint === void 0 ? void 0 : mint.decimals) || 9);
    return (amount / precision) * rate;
}
exports.fromLamports = fromLamports;
exports.tryParseKey = function (key) {
    try {
        return new web3_js_1.PublicKey(key);
    }
    catch (error) {
        return null;
    }
};
var SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
var abbreviateNumber = function (number, precision) {
    var tier = (Math.log10(number) / 3) | 0;
    var scaled = number;
    var suffix = SI_SYMBOL[tier];
    if (tier !== 0) {
        var scale = Math.pow(10, tier * 3);
        scaled = number / scale;
    }
    return scaled.toFixed(precision) + suffix;
};
exports.formatAmount = function (val, precision, abbr) {
    if (precision === void 0) { precision = 2; }
    if (abbr === void 0) { abbr = true; }
    return (abbr ? abbreviateNumber(val, precision) : val.toFixed(precision));
};
function formatTokenAmount(account, mint, rate, prefix, suffix, precision, abbr) {
    if (rate === void 0) { rate = 1.0; }
    if (prefix === void 0) { prefix = ''; }
    if (suffix === void 0) { suffix = ''; }
    if (precision === void 0) { precision = 2; }
    if (abbr === void 0) { abbr = false; }
    if (!account) {
        return '';
    }
    return "" + [prefix] + exports.formatAmount(fromLamports(account, mint, rate), precision, abbr) + suffix;
}
exports.formatTokenAmount = formatTokenAmount;
exports.formatUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
var numberFormater = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
exports.formatNumber = {
    format: function (val) {
        if (!val) {
            return '--';
        }
        return numberFormater.format(val);
    },
};
exports.formatPct = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
function convert(account, mint, rate) {
    if (rate === void 0) { rate = 1.0; }
    if (!account) {
        return 0;
    }
    var amount = typeof account === 'number' ? account : Number(account.info.amount);
    var precision = Math.pow(10, (mint === null || mint === void 0 ? void 0 : mint.decimals) || 0);
    var result = (amount / precision) * rate;
    return result;
}
exports.convert = convert;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
