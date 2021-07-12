import axios from "axios";

export default class DocumentService {

    getToken() {
        return localStorage.getItem("token");
    }

    getDocumentNumbers() {
        const headers = {


            Authorization: "Bearer " + this.getToken(),
        };

        return axios.get('http://127.0.0.1:8000/api/admin/documentCounter', {
                headers,

            })
            .then((response) => response.data);

    }



    getDocuments(myparams) {
        const headers = {


            Authorization: "Bearer " + this.getToken(),
        };

        return axios.get('http://127.0.0.1:8000/api/documents/', {
                headers,
                params: myparams

            })
            .then((response) => response.data);

    }


    putDocuments(id, name, language) {
        console.log('iddd', id);
        console.log('name', name);
        console.log('language', language);
        var path = 'http://127.0.0.1:8000/api/documents/' + id;
        console.log('path', path);

        var body = {

            "name": name,
            "language": language

        };

        const headers = {

            Authorization: "Bearer " + this.getToken(),

        };
        return axios.put(path, body, { headers: headers })
            .then((response) => response.data);

    }




    deleteDocuments(id) {
        console.log('my id to be deleted', id);

        var path = 'http://127.0.0.1:8000/api/documents/' + id;
        console.log('path', path);


        const headers = {

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.delete(path, { headers: headers })
            .then((response) => response.data);

    }

    postDocuments(formData) {
        console.log('my formdata', formData);
        var path = 'http://127.0.0.1:8000/api/documents/';
        console.log('path', path);



        const headers = {
            'Content-Type': 'multipart/form-data',
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

    getThemes(themeParam) {
        console.log('Services themeParam', themeParam);

        const headers = {
            // mode: "no-cors",

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.get('http://127.0.0.1:8000/api/getthemes', {
                headers,
                params: { "technology_id": themeParam }

            })
            .then((response) => response.data);

    }


    getFolders(folderParam) {
        console.log('Services folderParam', folderParam);

        const headers = {
            // mode: "no-cors",

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.get('http://127.0.0.1:8000/api/getfolders', {
                headers,
                params: { "theme_id": folderParam }

            })
            .then((response) => response.data);

    }



}