import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import UserSchema from '../Schemas/UserSchema.js';

const User = mongoose.model('users', UserSchema);
const SECRET = process.env.SECRET || 'Secreat123';

const AddContactController = (req, res) => {

    const token = req.headers['x-access-token'];

    jwt.verify(token, SECRET, async (jwtError, decoded) => {

        if (jwtError)
            return res.json({ status: 'error', mssg: jwtError });

        if (!decoded)
            return res.json({ status: 'error', mssg: 'Invalid token' });   
            
        else { 

            try {

                const response = await User.findOne({ email: decoded.email });

                if (response === null)
                    return res.json({ status: 'error', mssg: "Error adding user", user: false});
    
                else {
                    const newContact = {
                        id: new mongoose.Types.ObjectId().toString(),
                        fullName: req.body.fullName,
                        city: req.body.city,
                        email: req.body.email,
                        phoneNumber: req.body.phoneNumber
                    }
    
                    await User.updateOne(
                        {email: response.email},
                        {$push: {contacts: newContact}}
                    );

                    return res.json({ status: 'ok', msgg: 'Contact added'});
                }

            } catch(dbError) {
                console.log(dbError);
                return res.json({ status: 'error', mssg: dbError, user: false});
            }
        }

    });
}

export default AddContactController;
