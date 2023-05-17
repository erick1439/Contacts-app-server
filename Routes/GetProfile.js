import GetProfileController from '../Controllers/GetProfileController.js';

const GetProfile = (app) => {

    app.route('/getProfile')
        .get(GetProfileController);

}

export default GetProfile;