import axios from "axios";

export default class DocumentService {



    getDocuments() {
        const headers = {
            // mode: "no-cors",
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYyMDk1MTE1OCwibmJmIjoxNjIwOTUxMTU4LCJqdGkiOiJreUVSVXZ6Vjc5Tm5CTlhTIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.039odY0nhGJNbsEpVogBVpXwqwVGOwLAEWOG3UwacBE",
        };
        return axios.get('http://127.0.0.1:8000/api/documents/', {
                headers,
            })
            .then((response) => response.data);

    }


}