import axios from "axios";

export default class DocumentService {



    getDocuments(myparams) {
        const headers = {
            // mode: "no-cors",

            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYyMDk1MTE1OCwibmJmIjoxNjIwOTUxMTU4LCJqdGkiOiJreUVSVXZ6Vjc5Tm5CTlhTIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.039odY0nhGJNbsEpVogBVpXwqwVGOwLAEWOG3UwacBE",
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

            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYyMDk1MTE1OCwibmJmIjoxNjIwOTUxMTU4LCJqdGkiOiJreUVSVXZ6Vjc5Tm5CTlhTIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.039odY0nhGJNbsEpVogBVpXwqwVGOwLAEWOG3UwacBE",
        };
        return axios.put(path, body, { headers: headers })
            .then((response) => response.data);

    }




    deleteDocuments(id) {
        console.log('my id to be deleted', id);

        var path = 'http://127.0.0.1:8000/api/documents/' + id;
        console.log('path', path);


        const headers = {

            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYyMDk1MTE1OCwibmJmIjoxNjIwOTUxMTU4LCJqdGkiOiJreUVSVXZ6Vjc5Tm5CTlhTIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.039odY0nhGJNbsEpVogBVpXwqwVGOwLAEWOG3UwacBE",
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
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYyMDk1MTE1OCwibmJmIjoxNjIwOTUxMTU4LCJqdGkiOiJreUVSVXZ6Vjc5Tm5CTlhTIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.039odY0nhGJNbsEpVogBVpXwqwVGOwLAEWOG3UwacBE",
        };
        return axios.post(path, formData, { headers: headers })
            .then((response) => response.data);

    }

    getTechnologies() {
        const headers = {
            // mode: "no-cors",

            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYyMDk1MTE1OCwibmJmIjoxNjIwOTUxMTU4LCJqdGkiOiJreUVSVXZ6Vjc5Tm5CTlhTIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.039odY0nhGJNbsEpVogBVpXwqwVGOwLAEWOG3UwacBE",
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

            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYyMDk1MTE1OCwibmJmIjoxNjIwOTUxMTU4LCJqdGkiOiJreUVSVXZ6Vjc5Tm5CTlhTIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.039odY0nhGJNbsEpVogBVpXwqwVGOwLAEWOG3UwacBE",
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

            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYyMDk1MTE1OCwibmJmIjoxNjIwOTUxMTU4LCJqdGkiOiJreUVSVXZ6Vjc5Tm5CTlhTIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.039odY0nhGJNbsEpVogBVpXwqwVGOwLAEWOG3UwacBE",
        };
        return axios.get('http://127.0.0.1:8000/api/getfolders', {
                headers,
                params: { "theme_id": folderParam }

            })
            .then((response) => response.data);

    }



}