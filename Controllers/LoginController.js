import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import UserSchema from '../Schemas/UserSchema.js';

const User = mongoose.model('users', UserSchema);
const SECRET = process.env.SECRET || 'Secreat123';

const LoginController = async (req, res) => {

    try {

        const response = await User.findOne({
            email: req.body.email,
            password: req.body.password

        });

        if (response) {
            const token = jwt.sign(
                {
                    email: response.email
                }, SECRET
            );

            return res.json({ status: 'ok', mssg: 'User Found', user: token});

        } else {

            return res.json({status: 'error', mssg: 'Wrong email or password', user: false})
        }

    } catch(error) {

        console.log(error);
        return res.json({ status: 'error', mssg: error, user: false});
    }
}

export default LoginController;
