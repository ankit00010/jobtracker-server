"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ThrowError extends Error {
    constructor(code, title, message) {
        super(message);
        this.title = title;
        this.code = code;
        Object.setPrototypeOf(this, ThrowError.prototype);
    }
}
exports.default = ThrowError;
