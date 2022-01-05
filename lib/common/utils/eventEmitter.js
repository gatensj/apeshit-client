"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = exports.MarketUpdateEvent = exports.CacheDeleteEvent = exports.CacheUpdateEvent = void 0;
var eventemitter3_1 = require("eventemitter3");
var CacheUpdateEvent = /** @class */ (function () {
    function CacheUpdateEvent(id, isNew, parser, isActive) {
        this.id = id;
        this.parser = parser;
        this.isNew = isNew;
        this.isActive = isActive;
    }
    CacheUpdateEvent.type = 'CacheUpdate';
    return CacheUpdateEvent;
}());
exports.CacheUpdateEvent = CacheUpdateEvent;
var CacheDeleteEvent = /** @class */ (function () {
    function CacheDeleteEvent(id) {
        this.id = id;
    }
    CacheDeleteEvent.type = 'CacheUpdate';
    return CacheDeleteEvent;
}());
exports.CacheDeleteEvent = CacheDeleteEvent;
var MarketUpdateEvent = /** @class */ (function () {
    function MarketUpdateEvent(ids) {
        this.ids = ids;
    }
    MarketUpdateEvent.type = 'MarketUpdate';
    return MarketUpdateEvent;
}());
exports.MarketUpdateEvent = MarketUpdateEvent;
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.emitter = new eventemitter3_1.EventEmitter();
    }
    EventEmitter.prototype.onMarket = function (callback) {
        var _this = this;
        this.emitter.on(MarketUpdateEvent.type, callback);
        return function () { return _this.emitter.removeListener(MarketUpdateEvent.type, callback); };
    };
    EventEmitter.prototype.onCache = function (callback) {
        var _this = this;
        this.emitter.on(CacheUpdateEvent.type, callback);
        return function () { return _this.emitter.removeListener(CacheUpdateEvent.type, callback); };
    };
    EventEmitter.prototype.raiseMarketUpdated = function (ids) {
        this.emitter.emit(MarketUpdateEvent.type, new MarketUpdateEvent(ids));
    };
    EventEmitter.prototype.raiseCacheUpdated = function (id, isNew, parser, isActive) {
        this.emitter.emit(CacheUpdateEvent.type, new CacheUpdateEvent(id, isNew, parser, isActive));
    };
    EventEmitter.prototype.raiseCacheDeleted = function (id) {
        this.emitter.emit(CacheDeleteEvent.type, new CacheDeleteEvent(id));
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
