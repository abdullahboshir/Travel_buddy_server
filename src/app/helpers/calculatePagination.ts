
type TPaginate = {
    page: number;
    limit: number;
    budget: number;
    sortBy: string;
    sortOrder :string
}


export const calculatePagination = (paginateData: TPaginate) => {

    if(paginateData?.budget){
        paginateData.budget = Number(paginateData.budget)
    };

    const page = Number(paginateData.page) || 1;
    const limit = Number(paginateData.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = paginateData.sortBy || 'destination';
    const sortOrder = paginateData.sortOrder || 'desc';

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
};