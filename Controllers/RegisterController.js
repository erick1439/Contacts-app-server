import mongoose from 'mongoose';
import UserSchema from '../Schemas/UserSchema.js';

const User = mongoose.model('users', UserSchema);

const RegistrationController = async (req, res) => {

    try {
        const response = await User.findOne({
            email: req.body.email
        });

        if (response) 
            return res.json({status: 'error', mssg: 'User already exists', registration: false });
        
        else {
            let newUser = new User(req.body);
            await newUser.save();

            return res.json({status: 'ok', mssg: 'User created', registration: true });
        }
        
    } catch(dbError) {

        console.log(dbError);
        return res.json({ status: 'error', mssg: dbError, registration: false });
    }
}

export default RegistrationController;