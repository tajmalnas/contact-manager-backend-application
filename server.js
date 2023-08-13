const express = require('express');
const dotenv = require('dotenv');  
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');

connectDb();
const app = express();

dotenv.config(); 

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(errorHandler);

app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoute"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
