import app from "./app";
import config from "./config";

const main = () => {
   app.listen(config.port, () => {
    console.log('App running on Port', config.port)
   })
};

main();