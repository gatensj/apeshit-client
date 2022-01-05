"use strict";
// import Link from '../components/Link';
Object.defineProperty(exports, "__esModule", { value: true });
exports.notify = void 0;
function notify(_a) {
    // if (txid) {
    //   //   <Link
    //   //     external
    //   //     to={'https://explorer.solana.com/tx/' + txid}
    //   //     style={{ color: '#0000ff' }}
    //   //   >
    //   //     View transaction {txid.slice(0, 8)}...{txid.slice(txid.length - 8)}
    //   //   </Link>
    var _b = _a.message, message = _b === void 0 ? "" : _b, _c = _a.description, description = _c === void 0 ? undefined : _c, _d = _a.txid, txid = _d === void 0 ? "" : _d, _e = _a.type, type = _e === void 0 ? "info" : _e, _f = _a.placement, placement = _f === void 0 ? "bottomLeft" : _f;
    //   description = <></>;
    // }
    // (notification as any)[type]({
    //   message: <span style={{ color: "black" }}>{message}</span>,
    //   description: (
    //     <span style={{ color: "black", opacity: 0.5 }}>{description}</span>
    //   ),
    //   placement,
    //   style: {
    //     backgroundColor: "white",
    //   },
    // });
}
exports.notify = notify;
