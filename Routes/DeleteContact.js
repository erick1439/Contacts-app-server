import DeleteContactController from '../Controllers/DeleteContactController.js';

const DeleteContact = (app) => {

    app.route('/deleteContact')
        .put(DeleteContactController);
}

export default DeleteContact;