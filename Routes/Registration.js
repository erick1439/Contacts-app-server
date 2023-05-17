import RegistrationController from '../Controllers/RegisterController.js';

const Registration = (app) => {

    app.route('/register')
        .post(RegistrationController);
}

export default Registration;