import HttpService from './HttpService';
import * as emailjs from "emailjs-com";



export default class BookingService {
    static service_id = "gmail";
    static template_id = "Notification";
    static user_id = 'user_dSKdVGR3vH7TctvEXGiI7'
    static new_booking = 'You have new booking from findMyCook, please confirm it or cancel it in soon.';
    static confirm_booking = 'Your booking has just been confirmed by chef ';
    static cancel_booking = 'Your booking has just been canceled by ';
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

    static closeBooking(_id, status){
        return new Promise((resolve, reject) => {
            let suffix = '/close-booking';

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

    static createBooking(booking){
        console.log(booking);
        return new Promise((resolve,reject) =>{
            let suffix = '/create';
            HttpService.post(`${BookingService.baseURL()}${suffix}`,
            {
                chefEmail: booking.chefEmail,
                customerEmail: booking.customerEmail,
                startTime: booking.startTime,
                endTime: booking.endTime,
                city: booking.city,
                address: booking.address,
                price: booking.price,
                status: "inProgress",
                payment:booking.payment
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
    static emailNotification(email, firstName, subject, message) {
        return new Promise((resolve, reject) => {
            emailjs.send(this.service_id, this.template_id, {
                "to_email": email,
                "to_name": firstName,
                "subject": subject,
                "message": message
            }, this.user_id).then(function (response) {
                resolve(response)
            }, function (err) {
                console.log(err);
                reject(err)
            });
        })
    }
}