import HttpService from './HttpService';


export default class BookingService {

    static baseURL() {
        return "http://localhost:3000/booking"
    }

    static getCustomerName(email) {
        return new Promise((resolve, reject) => {
            let suffix = '/get-customer-name?email=' + email;
            HttpService.get(`${BookingService.baseURL()}${suffix}`, function (data) {
                if (data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while request customer name');
                }
            }, function (textStatus) {
                reject(textStatus);
            });
        })
    }

    static getChefName(email){
        return new Promise((resolve, reject) => {
            let suffix = '/get-chef-name?email=' + email;
            HttpService.get(`${BookingService.baseURL()}${suffix}`, function (data) {
                if (data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while request chef name');
                }
            }, function (textStatus) {
                reject(textStatus);
            });
        })
    }

    static getBookings(userType, email) {
        return new Promise((resolve, reject) => {
            let suffix = userType === 'Chef'?'/bookings-for-chef?email=' + email:userType==='Customer'?'/bookings-for-customer?email='+email:'';
            if (suffix === '') return;

            HttpService.get(`${BookingService.baseURL()}${suffix}`, function (data) {
                if (data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while request booking details');
                }
            }, function (textStatus) {
                reject(textStatus);
            });
        })
    }
}