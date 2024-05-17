
export const pick = <T extends Record<string, unknown>, K extends keyof T>(query: T, keys: K[]) => {
    const selectedFiels: Partial<T> = {};

    for(const key of keys){
        if(query && key in query){
            selectedFiels[key] = query[key]
        }
    };

    return selectedFiels;
};