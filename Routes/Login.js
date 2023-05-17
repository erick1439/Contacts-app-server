import LoginController from '../Controllers/LoginController.js';

const Login = (app) => {

    app.route('/login')
        .post(LoginController)
}

export default Login;
