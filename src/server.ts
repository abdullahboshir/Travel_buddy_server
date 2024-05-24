import app from "./app";
import config from "./config";

const main = () => {
   app.listen(config.port || 5000, () => {
    console.log('App running on Port', config.port || 500)
   })
};

main();