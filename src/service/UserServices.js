import axios from "axios";

export default class UserService {

    getToken() {
        return localStorage.getItem("token");
    }

    // get Numbers
    getUserNumbers() {
        const headers = {


            Authorization: "Bearer " + this.getToken(),
        };

        return axios.get('http://127.0.0.1:8000/api/admin/myusersnumbers', {
                headers,

            })
            .then((response) => response.data);

    }

    getManagerNumbers() {
        const headers = {


            Authorization: "Bearer " + this.getToken(),
        };

        return axios.get('http://127.0.0.1:8000/api/admin/mymanagersnumbers', {
                headers,

            })
            .then((response) => response.data);

    }

    getAdminNumbers() {
        const headers = {


            Authorization: "Bearer " + this.getToken(),
        };

        return axios.get('http://127.0.0.1:8000/api/admin/myadminsnumbers', {
                headers,

            })
            .then((response) => response.data);

    }



    //Admin CRUD
    getAdmins(myparams) {
        const headers = {


            Authorization: "Bearer " + this.getToken(),
        };

        return axios.get('http://127.0.0.1:8000/api/admin/showadmins', {
                headers,
                params: myparams

            })
            .then((response) => response.data);

    }


    postAdmins(formData) {
        console.log('my formdata', formData);
        var path = 'http://127.0.0.1:8000/api/admin/createadmin';
        console.log('path', path);



        const headers = {
            Authorization: "Bearer " + this.getToken(),
        };
        return axios.post(path, formData, { headers: headers })
            .then((response) => response.data);

    }


    putAdmins(id, name, last_name, registration_number, profession, email, password) {
        console.log('iddd', id);
        console.log('name', name);
        console.log('last_name', last_name);
        console.log('registration_number', registration_number);
        console.log('profession', profession);
        console.log('email', email);
        console.log('password', password);

        var path = 'http://127.0.0.1:8000/api/admin/updateadmin/' + id;
        console.log('path', path);

        var body = {

            "name": name,
            "last_name": last_name,
            "registration_number": registration_number,
            "profession": profession,
            "email": email,
            "password": password,


        };

        const headers = {

            Authorization: "Bearer " + this.getToken(),

        };
        return axios.put(path, body, { headers: headers })
            .then((response) => response.data);

    }


    deleteAdmins(id) {
        console.log('my id to be deleted', id);

        var path = 'http://127.0.0.1:8000/api/admin/destroyadmin/' + id;
        console.log('path', path);


        const headers = {

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.delete(path, { headers: headers })
            .then((response) => response.data);

    }

    //Manager CRUD

    getManagers(myparams) {
        const headers = {


            Authorization: "Bearer " + this.getToken(),
        };

        return axios.get('http://127.0.0.1:8000/api/admin/showmanagers', {
                headers,
                params: myparams

            })
            .then((response) => response.data);

    }


    postManagers(formData) {
        console.log('my formdata', formData);
        var path = 'http://127.0.0.1:8000/api/admin/createmanager';
        console.log('path', path);



        const headers = {
            Authorization: "Bearer " + this.getToken(),
        };
        return axios.post(path, formData, { headers: headers })
            .then((response) => response.data);

    }


    putManagers(id, name, last_name, registration_number, profession, email, password) {
        console.log('iddd', id);
        console.log('name', name);
        console.log('last_name', last_name);
        console.log('registration_number', registration_number);
        console.log('profession', profession);
        console.log('email', email);
        console.log('password', password);

        var path = 'http://127.0.0.1:8000/api/admin/updatemanager/' + id;
        console.log('path', path);

        var body = {

            "name": name,
            "last_name": last_name,
            "registration_number": registration_number,
            "profession": profession,
            "email": email,
            "password": password,


        };

        const headers = {

            Authorization: "Bearer " + this.getToken(),

        };
        return axios.put(path, body, { headers: headers })
            .then((response) => response.data);

    }


    deleteManagers(id) {
        console.log('my id to be deleted', id);

        var path = 'http://127.0.0.1:8000/api/admin/destroymanager/' + id;
        console.log('path', path);


        const headers = {

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.delete(path, { headers: headers })
            .then((response) => response.data);

    }


    //User CRUD

    getUsers(myparams) {
        const headers = {


            Authorization: "Bearer " + this.getToken(),
        };

        return axios.get('http://127.0.0.1:8000/api/admin/showusers', {
                headers,
                params: myparams

            })
            .then((response) => response.data);

    }


    postUsers(formData) {
        console.log('my formdata', formData);
        var path = 'http://127.0.0.1:8000/api/admin/createuser';
        console.log('path', path);



        const headers = {
            Authorization: "Bearer " + this.getToken(),
        };
        return axios.post(path, formData, { headers: headers })
            .then((response) => response.data);

    }


    putUsers(id, name, last_name, registration_number, profession, email, password) {
        console.log('iddd', id);
        console.log('name', name);
        console.log('last_name', last_name);
        console.log('registration_number', registration_number);
        console.log('profession', profession);
        console.log('email', email);
        console.log('password', password);

        var path = 'http://127.0.0.1:8000/api/admin/updateuser/' + id;
        console.log('path', path);

        var body = {

            "name": name,
            "last_name": last_name,
            "registration_number": registration_number,
            "profession": profession,
            "email": email,
            "password": password,


        };

        const headers = {

            Authorization: "Bearer " + this.getToken(),

        };
        return axios.put(path, body, { headers: headers })
            .then((response) => response.data);

    }


    deleteUsers(id) {
        console.log('my id to be deleted', id);

        var path = 'http://127.0.0.1:8000/api/admin/destroyuser/' + id;
        console.log('path', path);


        const headers = {

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.delete(path, { headers: headers })
            .then((response) => response.data);

    }
}