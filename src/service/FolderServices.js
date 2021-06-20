import axios from "axios";

export default class FolderService {

    getToken() {
        return localStorage.getItem("token");
    }

    getFolders(myparams) {
        const headers = {
            // mode: "no-cors",

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.get('http://127.0.0.1:8000/api/folders/', {
                headers,
                params: myparams

            })
            .then((response) => response.data);

    }
    putFolders(id, name) {
        console.log('iddd', id);
        console.log('name', name);

        var path = 'http://127.0.0.1:8000/api/folders/' + id;
        console.log('path', path);

        var body = {

            "name": name,


        };

        const headers = {

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.put(path, body, { headers: headers })
            .then((response) => response.data);

    }
    deleteFolders(id) {
        console.log('my id to be deleted', id);

        var path = 'http://127.0.0.1:8000/api/folders/' + id;
        console.log('path', path);


        const headers = {

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.delete(path, { headers: headers })
            .then((response) => response.data);

    }
    postFolders(formData) {
        console.log('my formdata', formData);
        var path = 'http://127.0.0.1:8000/api/folders';
        console.log('path', path);



        const headers = {

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.post(path, formData, { headers: headers })
            .then((response) => response.data);

    }

    getTechnologies() {
        const headers = {
            // mode: "no-cors",

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.get('http://127.0.0.1:8000/api/technologies/', {
                headers,


            })
            .then((response) => response.data);

    }

    getThemes() {
        const headers = {
            // mode: "no-cors",

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.get('http://127.0.0.1:8000/api/themes/', {
                headers,


            })
            .then((response) => response.data);

    }

}