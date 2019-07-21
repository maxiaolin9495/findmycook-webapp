import HttpService from './HttpService';
import * as emailjs from 'emailjs-com';

const service_id = "gmail";
const template_id = "feedbackFindMyCook";
const user_id = 'user_dSKdVGR3vH7TctvEXGiI7'
export default class UserService {

    static baseURL() {
        return "http://localhost:3000"
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtTokenFMC'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            id: JSON.parse(window.atob(base64)).id,
            firstName: JSON.parse(window.atob(base64)).firstName,
            lastName: JSON.parse(window.atob(base64)).lastName,
            email: JSON.parse(window.atob(base64)).email,
            userType: JSON.parse(window.atob(base64)).userType,
            withProfile: JSON.parse(window.atob(base64)).withProfile,
            address: JSON.parse(window.atob(base64)).address,
            city: JSON.parse(window.atob(base64)).city
        };
    }

    static getProfile() {

    }

    static addProfile(user) {
        console.log(user);
        return new Promise((resolve, reject) => {
            let data = user.userType === 'Customer' ? {
                email: user.email,
                userType: user.userType,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                city: user.city,
                phoneNumber: user.phoneNumber
            } : user.userType === 'Chef' ? {
                email: user.email,
                firstName: user.firstName,
                userType: user.userType,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                foodType: user.foodType,
                price: user.price,
                photo: user.photo,
                city: user.city,
                languages: user.languages,
                introduction: user.introduction,
            } : {}
            HttpService.post(this.baseURL() + '/user/addProfile', data, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
    static uploadProfile() {

    }

    static uploadMessage(message, email) {
        return new Promise((resolve, reject) => {
            HttpService.post(this.baseURL()+'/contact/saveMessage', {
                email: email,
                message: message
            }, function (data){
                resolve(data);
            } ,function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static contactUs(email, firstName) {
        return new Promise((resolve, reject) => {
            emailjs.send(service_id, template_id, {
                "to_email": email,
                "to_name": firstName
            }, user_id).then (function (response) {
                resolve(response)
            }, function (err) {
                console.log(err);
                reject(err)
            });
        })
    }
}