
export const parseDate = (dateString: string): Date => {

    if (!dateString) {
        throw new Error('Invalid date string');
    };

    const [year, month, day ] = dateString?.split('-').map(Number);
    const  dateObject: Date = new Date(Date.UTC(year, month - 1, day ));
    return dateObject;
};
