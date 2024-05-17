export const dateFinder = (dateString: string) => {
    let dateObject;

    if(dateString){
        const [year, month, day ] = dateString?.split('-').map(Number);
        dateObject = new Date(Date.UTC(year, month - 1, day ));
    }

    return dateObject;
};
