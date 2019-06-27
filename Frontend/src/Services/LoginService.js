import MD5 from "react-native-md5";
import HttpService from './HttpService';

export default class LoginService {
    constructor() {
    }

    static baseURL() {
        return "http://localhost:3000/user/login"
    }
    static login(email, pass) {
        return new Promise((resolve, reject) => {
            let hashedPass = MD5.hex_md5(pass);
            HttpService.post(this.baseURL(), {
                email: email,
                password: hashedPass
            }, function(data){
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
    static logout(){
        window.localStorage.removeItem("jwtTokenFMC")
    }

    //gets data from jwtToken, which is prefilled with user data. Data from database has to be added to token beforehand.
    static getCurrentUser() {
        let token = window.localStorage['jwtTokenFMC'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            id: JSON.parse(window.atob(base64)).id,
            email: JSON.parse(window.atob(base64)).email,
            userType: JSON.parse(window.atob(base64)).userType,
        };
    }

    static isAuthenticated() {
        return window.localStorage.hasOwnProperty('jwtTokenFMC');
    }
}
