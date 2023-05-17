import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'Enter your first name'
    },
    lastName: {
        type: String, 
        required: 'Enter your last name'
    },
    email: {
        type: String, 
        required: 'Enter your email'
    },
    password: {
        type: String, 
        required: 'Enter your password'
    },
    contacts: {
        type: Array,
        default: []
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});


export default UserSchema;
