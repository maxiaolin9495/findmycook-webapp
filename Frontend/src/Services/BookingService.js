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

    static getChefNameAndImg(email){
        return new Promise((resolve, reject) => {
            let suffix = '/get-chef-name-and-image?email=' + email;
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

    static confirmBooking(_id, userType, status){
        return new Promise((resolve, reject) => {
            let suffix = userType === 'Chef'?'/confirm-booking':'';
            if (suffix === '') return;

            HttpService.post(`${BookingService.baseURL()}${suffix}`, {
                _id: _id,
                status: status,
            }, function (data) {
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
    static cancelBooking(_id, userType, status){
        return new Promise((resolve, reject) => {
            let suffix = '/cancel-booking';

            HttpService.post(`${BookingService.baseURL()}${suffix}`, {
                _id: _id,
                status: status,
            }, function (data) {
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