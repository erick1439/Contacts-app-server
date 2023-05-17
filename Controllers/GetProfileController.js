import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import UserSchema from '../Schemas/UserSchema.js';

const User = mongoose.model('users', UserSchema);
const SECRET = process.env.SECRET || 'Secreat123';

const GetProfileController = (req, res) => {

    const token = req.headers['x-access-token'];

    jwt.verify(token, SECRET, async (jwtError, decoded) => {

        if (jwtError) 
            return res.json({ status: 'error', mssg: jwtError });

        if (!decoded)
            return res.json({ status: 'error', mssg: 'Invalid token' });

        else {

            const response = await User.findOne({email: decoded.email});

            if (response) {
                return res.json(
                    { status: 'ok',  
                    firstName : response.firstName,
                    lastName : response.lastName,
                    contacts: response.contacts, 
                });
            } else {
                return res.json({ status: 'error', mssg: "Error getting profile data", user: false});
            }
        }
    });

}

export default GetProfileController;