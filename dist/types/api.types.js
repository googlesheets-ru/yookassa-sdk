"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YooKassaErr = void 0;
class YooKassaErr extends Error {
    constructor(err) {
        super(err.description);
        this.name = err.code;
        this.id = err.id;
    }
}
exports.YooKassaErr = YooKassaErr;
//# sourceMappingURL=api.types.js.map