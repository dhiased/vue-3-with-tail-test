import axios from "axios";

export default class TechnologyService {



    getTechnologies(myparams) {
        const headers = {
            // mode: "no-cors",

            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYyMDk1MTE1OCwibmJmIjoxNjIwOTUxMTU4LCJqdGkiOiJreUVSVXZ6Vjc5Tm5CTlhTIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.039odY0nhGJNbsEpVogBVpXwqwVGOwLAEWOG3UwacBE",
        };
        return axios.get('http://127.0.0.1:8000/api/technologies/', {
                headers,
                params: myparams

            })
            .then((response) => response.data);

    }
    putTechnologies(id, name) {
        console.log('iddd', id);
        console.log('name', name);

        var path = 'http://127.0.0.1:8000/api/technologies/' + id;
        console.log('path', path);

        var body = {

            "name": name,


        };

        const headers = {

            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYyMDk1MTE1OCwibmJmIjoxNjIwOTUxMTU4LCJqdGkiOiJreUVSVXZ6Vjc5Tm5CTlhTIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.039odY0nhGJNbsEpVogBVpXwqwVGOwLAEWOG3UwacBE",
        };
        return axios.put(path, body, { headers: headers })
            .then((response) => response.data);

    }
    deleteTechnologies(id) {
        console.log('my id to be deleted', id);

        var path = 'http://127.0.0.1:8000/api/technologies/' + id;
        console.log('path', path);


        const headers = {

            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYyMDk1MTE1OCwibmJmIjoxNjIwOTUxMTU4LCJqdGkiOiJreUVSVXZ6Vjc5Tm5CTlhTIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.039odY0nhGJNbsEpVogBVpXwqwVGOwLAEWOG3UwacBE",
        };
        return axios.delete(path, { headers: headers })
            .then((response) => response.data);

    }
    postTechnologies(formData) {
        console.log('my formdata', formData);
        var path = 'http://127.0.0.1:8000/api/technologies';
        console.log('path', path);



        const headers = {

            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYyMDk1MTE1OCwibmJmIjoxNjIwOTUxMTU4LCJqdGkiOiJreUVSVXZ6Vjc5Tm5CTlhTIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.039odY0nhGJNbsEpVogBVpXwqwVGOwLAEWOG3UwacBE",
        };
        return axios.post(path, formData, { headers: headers })
            .then((response) => response.data);

    }

}