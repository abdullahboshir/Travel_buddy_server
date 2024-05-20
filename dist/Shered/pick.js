"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = void 0;
const pick = (query, keys) => {
    const selectedFiels = {};
    for (const key of keys) {
        if (query && key in query) {
            selectedFiels[key] = query[key];
        }
    }
    ;
    return selectedFiels;
};
exports.pick = pick;
