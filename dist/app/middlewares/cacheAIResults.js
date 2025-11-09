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
Object.defineProperty(exports, "__esModule", { value: true });
const redisClient_1 = require("../utils/redisClient");
class RedisCacheHandler {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield redisClient_1.redisClient.connect();
        });
    }
    cacheHandler() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const redisId = String(req.params.id);
            if (redisId) {
                const isExist = yield redisClient_1.redisClient.exists(redisId);
                if (isExist === 1) {
                    const previousResult = yield redisClient_1.redisClient.get(redisId);
                    return res.send({
                        summary: previousResult,
                        cachedResult: true,
                    });
                }
                else {
                    next();
                }
            }
            else {
                next();
            }
        });
    }
}
exports.default = RedisCacheHandler;
