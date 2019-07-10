import HttpService from './HttpService';
import * as emailjs from 'emailjs-com';

const service_id = "gmail";
const template_id = "feedbackFindMyCook";

export default class UserService {

    static baseURL() {
        return "http://localhost:3000/"
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
            let data = {
                email: email,
                message: message
            }
            HttpService.post(this.baseURL()+'/contact/saveMessage', data, function (data){
                resolve(data);
            } ,function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static contactUs(email, firstName, message){
        let template_params = {
            "to_email": email,
            "to_name": firstName
        }
        emailjs.send(service_id, template_id, template_params).then(
            function(response){
                console.log('Success', response.status, response.text)
            }, function (err){
                console.log(err)
            })
    }
}