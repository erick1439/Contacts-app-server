import AddContactController from '../Controllers/AddContactController.js';

const AddContact = (app) => {

    app.route('/addContact')
        .put(AddContactController);
}

export default AddContact;