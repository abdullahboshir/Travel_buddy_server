"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = void 0;
const calculatePagination = (paginateData) => {
    if (paginateData === null || paginateData === void 0 ? void 0 : paginateData.budget) {
        paginateData.budget = Number(paginateData.budget);
    }
    ;
    const page = Number(paginateData.page) || 1;
    const limit = Number(paginateData.limit) || 9;
    const skip = (page - 1) * limit;
    const sortBy = paginateData.sortBy || 'destination';
    const sortOrder = paginateData.sortOrder || 'desc';
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    };
};
exports.calculatePagination = calculatePagination;
