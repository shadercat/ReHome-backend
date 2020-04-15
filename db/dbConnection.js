const mongoose = require('mongoose');
const databaseConnection = mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then((res) => {
        console.log("Connect to database - success.");
    })
    .catch((err) => {
        console.log("Connect to database - fail.");
        console.log(err);
    });