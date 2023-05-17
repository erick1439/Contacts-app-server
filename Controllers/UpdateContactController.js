import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import UserSchema from '../Schemas/UserSchema.js';

const User = mongoose.model('users', UserSchema);
const SECRET = process.env.SECRET || 'Secreat123';

const UpdateContactController = (req, res) => {

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
                    return res.json({ status: 'error', mssg: 'Error updating contact', user: false});
    
                else {

                    await User.updateOne(
                        { email: response.email, 'contacts.id': req.body.id },
                        { $set : { 
                            'contacts.$.fullName': req.body.newFullName, 
                            'contacts.$.city': req.body.newCity,
                            'contacts.$.email': req.body.newEmail,
                            'contacts.$.phoneNumber': req.body.newPhoneNumber
                        }}
                    );

                    return res.json({ status: 'ok', msgg: 'Contact Updated'});
                }

            } catch (dbError) {
                console.log(dbError);
                return res.json({ status: 'error', mssg: dbError, user: false});   
            }
        }
    })
}

export default UpdateContactController;