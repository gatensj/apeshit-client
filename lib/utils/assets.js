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
exports.getAssetCostToStore = exports.filterModalSolTokens = exports.LAMPORT_MULTIPLIER = void 0;
exports.LAMPORT_MULTIPLIER = Math.pow(10, 9);
var WINSTON_MULTIPLIER = Math.pow(10, 12);
exports.filterModalSolTokens = function (tokens) {
    return tokens;
};
function getAssetCostToStore(files) {
    return __awaiter(this, void 0, void 0, function () {
        var totalBytes, txnFeeInWinstons, _a, byteCostInWinstons, _b, totalArCost, conversionRates, _c, _d, _e, arMultiplier;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    totalBytes = files.reduce(function (sum, f) { return (sum += f.size); }, 0);
                    console.log('Total bytes', totalBytes);
                    _a = parseInt;
                    return [4 /*yield*/, fetch('https://arweave.net/price/0')];
                case 1: return [4 /*yield*/, (_f.sent()).text()];
                case 2:
                    txnFeeInWinstons = _a.apply(void 0, [_f.sent()]);
                    console.log('txn fee', txnFeeInWinstons);
                    _b = parseInt;
                    return [4 /*yield*/, fetch('https://arweave.net/price/' + totalBytes.toString())];
                case 3: return [4 /*yield*/, (_f.sent()).text()];
                case 4:
                    byteCostInWinstons = _b.apply(void 0, [_f.sent()]);
                    console.log('byte cost', byteCostInWinstons);
                    totalArCost = (txnFeeInWinstons * files.length + byteCostInWinstons) / WINSTON_MULTIPLIER;
                    console.log('total ar', totalArCost);
                    conversionRates = JSON.parse(localStorage.getItem('conversionRates') || '{}');
                    if (!(!conversionRates ||
                        !conversionRates.expiry ||
                        conversionRates.expiry < Date.now())) return [3 /*break*/, 7];
                    console.log('Calling conversion rate');
                    _c = {};
                    _e = (_d = JSON).parse;
                    return [4 /*yield*/, fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana,arweave&vs_currencies=usd')];
                case 5: return [4 /*yield*/, (_f.sent()).text()];
                case 6:
                    conversionRates = (_c.value = _e.apply(_d, [_f.sent()]),
                        _c.expiry = Date.now() + 5 * 60 * 1000,
                        _c);
                    if (conversionRates.value.solana)
                        localStorage.setItem('conversionRates', JSON.stringify(conversionRates));
                    _f.label = 7;
                case 7:
                    arMultiplier = conversionRates.value.arweave.usd / conversionRates.value.solana.usd;
                    console.log('Ar mult', arMultiplier);
                    // We also always make a manifest file, which, though tiny, needs payment.
                    return [2 /*return*/, exports.LAMPORT_MULTIPLIER * totalArCost * arMultiplier * 1.1];
            }
        });
    });
}
exports.getAssetCostToStore = getAssetCostToStore;
