"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sendResponse;
function sendResponse(res, data) {
    return res.status((data === null || data === void 0 ? void 0 : data.statusCode) || 200).send(data);
}
