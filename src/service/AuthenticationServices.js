import axios from "axios";

export default class AuthenticationService {
    postLogin(email, password) {

        console.log('my email', email);
        console.log('my password', password);

        var path = 'http://127.0.0.1:8000/api/auth/login';

        var body = {

            "email": email,
            "password": password

        };



        return axios.post(path, body)
            .then((response) => response.data);

    }

    getToken() {
        return localStorage.getItem("token");
    }

    postLogOut() {


        var path = 'http://127.0.0.1:8000/api/auth/logout';



        const header = {

            Authorization: "Bearer " + this.getToken(),

        };



        return axios.post(path, {}, { headers: header })
            .then((response) => response.data);

    }
}