import HttpService from './HttpService';
import MD5 from "react-native-md5";

export default class UserService {

    static baseURL() {
        return "http://localhost:3000/user"
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtTokenFMC'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            id: JSON.parse(window.atob(base64)).id,
            email: JSON.parse(window.atob(base64)).email,
            userType: JSON.parse(window.atob(base64)).userType,
            withProfile: JSON.parse(window.atob(base64)).withProfile,
        };
    }

    static getProfile() {

    }

    static addProfile(user) {
        return new Promise((resolve, reject) => {
            let data = user.userType === 'Customer' ? {
                email: user.email,
                userType: user.userType,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber
            } : user.userType === 'Chef' ? {
                email: user.email,
                firstName: user.firstName,
                userType: user.userType,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                foodType: user.foodType,
                city: user.city,
                languages: user.languages,
                introduction: user.introduction,
            } : {}
            HttpService.post(this.baseURL() + '/addProfile', data, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static uploadProfile() {

    }
}