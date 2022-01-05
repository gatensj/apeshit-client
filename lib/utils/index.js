"use strict";
// export * from './eventEmitter';
// export * from './ids';
// export * as Layout from './layout';
// export * from './strings';
// export * as shortvec from './shortvec';
// export * from './borsh';
Object.defineProperty(exports, "__esModule", { value: true });
exports.uriToCid = exports.ipfsUriToGatewayUrl = exports.ipfsUriToCid = void 0;
function ipfsUriToCid(uri) {
    var baseRegex = /^ipfs:\/\//;
    var ipfsRegex = new RegExp(baseRegex.source + ".+");
    if (ipfsRegex.test(uri)) {
        return uri.replace(baseRegex, "");
    }
    return null;
}
exports.ipfsUriToCid = ipfsUriToCid;
function ipfsUriToGatewayUrl(uri) {
    var ipfsHost = "https://ipfs.io";
    var cid = ipfsUriToCid(uri);
    return cid ? ipfsHost + "/ipfs/" + cid : uri;
}
exports.ipfsUriToGatewayUrl = ipfsUriToGatewayUrl;
function uriToCid(uri) {
    var ipfsUriCid = ipfsUriToCid(uri);
    if (ipfsUriCid) {
        return ipfsUriCid;
    }
    var baseRegex = /^https:\/\/.*\/ipfs\//;
    var httpRegex = new RegExp(baseRegex.source + ".+");
    if (httpRegex.test(uri)) {
        return uri.replace(baseRegex, "");
    }
    return null;
}
exports.uriToCid = uriToCid;
