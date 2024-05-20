"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDate = void 0;
const parseDate = (dateString) => {
    if (!dateString) {
        throw new Error('Invalid date string');
    }
    ;
    const [year, month, day] = dateString === null || dateString === void 0 ? void 0 : dateString.split('-').map(Number);
    const dateObject = new Date(Date.UTC(year, month - 1, day));
    return dateObject;
};
exports.parseDate = parseDate;
