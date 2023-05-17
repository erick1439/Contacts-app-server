
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Login from './Routes/Login.js';
import GetProfile from './Routes/GetProfile.js';
import AddContact from './Routes/AddContact.js';
import Registration from './Routes/Registration.js'
import DeleteContact from './Routes/DeleteContact.js';
import UpdateContact from './Routes/UpdateContact.js'

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

const connectToDb = async () => {
    // mongoose.Promise = global.Promise;
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ContactsDatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    } catch (error) {
        console.log("Error connecting to db: ", error);
    }
}

Login(app);
Registration(app);
GetProfile(app);
AddContact(app);
DeleteContact(app);
UpdateContact(app);

connectToDb();
app.listen(PORT);


export default app;