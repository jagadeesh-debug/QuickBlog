
// .then(() => {
//     console.log("App connected to database");
    
// })
// .catch((error) => {
//     console.log(error);
// });
const app = require("./index");
app.listen(8080, () => {
        console.log(`listening:${8080}`);
    });

