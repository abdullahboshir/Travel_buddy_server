import app from "./app";

const PORT = 5000;

const main = () => {
   app.listen(PORT, () => {
    console.log('App running on Port', PORT)
   })
};

main();