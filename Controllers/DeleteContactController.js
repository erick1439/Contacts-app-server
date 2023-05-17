import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import UserSchema from '../Schemas/UserSchema.js';

const User = mongoose.model('users', UserSchema);
const SECRET = process.env.SECRET || 'Secreat123';

const DeleteContactController = (req, res) => {

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
                    return res.json({ status: 'error', mssg: "Error deleting contact", user: false});

                else {
                    await User.updateOne(
                        { email: response.email },
                        { $pull : {contacts: { id: req.body.id, email: req.body.email }}}     
                    );

                    return res.json({ status: 'ok', mssg: 'Contact deleted'}); 
                }
            } catch (dbError) {
                console.log(dbError);
                return res.json({ status: 'error', mssg: dbError, user: false});
            }
        }

    });
}

export default DeleteContactController;