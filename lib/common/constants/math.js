"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZERO = exports.RAY = exports.WAD = exports.HALF_WAD = exports.TEN = void 0;
var BN = require("bn.js");
exports.TEN = new BN(10);
exports.HALF_WAD = exports.TEN.pow(new BN(18));
exports.WAD = exports.TEN.pow(new BN(18));
exports.RAY = exports.TEN.pow(new BN(27));
exports.ZERO = new BN(0);
