import axios from "axios";

export default class ReportService {

    getToken() {
        return localStorage.getItem("token");
    }

    getUser() {

        return localStorage.getItem("user");


    }

    getReportNumbers() {
        const headers = {


            Authorization: "Bearer " + this.getToken(),
            // getRole: this.getUser(),




        };

        return axios.get('http://127.0.0.1:8000/api/admin/reportCounter', {
                headers,

            })
            .then((response) => response.data);

    }




    getReports(myparams) {
        const headers = {
            // mode: "no-cors",

            Authorization: "Bearer " + this.getToken(),
            // myRole: this.getUser(),

        };
        return axios.get('http://127.0.0.1:8000/api/reports/', {
                headers,
                params: myparams,
                // role: this.getUser(),

            })
            .then((response) => response.data);

    }
    putReports(id, title, description) {
        console.log('iddd', id);
        console.log('title', title);
        console.log('description', description);


        var path = 'http://127.0.0.1:8000/api/reports/' + id;
        console.log('path', path);

        var body = {

            "title": title,
            "description": description,

        };

        const headers = {

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.put(path, body, { headers: headers })
            .then((response) => response.data);

    }
    deleteReports(id) {
        console.log('my id to be deleted', id);

        var path = 'http://127.0.0.1:8000/api/reports/' + id;
        console.log('path', path);


        const headers = {

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.delete(path, { headers: headers })
            .then((response) => response.data);

    }
    postReports(formData) {
        console.log('my formdata', formData);
        var path = 'http://127.0.0.1:8000/api/reports';
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


    getReportsByTech(techParam) {
        console.log('Services techParam', techParam);

        const headers = {
            // mode: "no-cors",

            Authorization: "Bearer " + this.getToken(),
        };
        return axios.get('http://127.0.0.1:8000/api/getReportsByTech', {
                headers,
                params: { "technology_id": techParam }

            })
            .then((response) => response.data);

    }

}