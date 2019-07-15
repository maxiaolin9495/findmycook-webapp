import HttpService from './HttpService';
import * as emailjs from "emailjs-com";

const service_id = "gmail";
const template_id = "Notification";
const user_id = 'user_dSKdVGR3vH7TctvEXGiI7'
const new_booking = 'You have new booking from findMyCook, please confirm it or cancel it in soon.';
const confirm_booking = 'Your booking has just been confirmed by chef.';
const concel_booking = 'Your booking has just been canceled by ';

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
    static handleNewBookoing(booking){
        this.createBooking(booking).then(this.emailNotification(booking.chefEmail, booking.chefFirstName,
            'New Booking from FindMyCook',
            new_booking)).error(console.log(error))
    }

    static handleCancelBooking(_id, userType, status, chefEmail, customerEmail, chefFirstName, customerFirstName) {
        if(userType === 'Customer') {
            this.cancelBooking(_id, userType, status).then(this.emailNotification(chefEmail, chefFirstName,
                'Booking Canceled',
                concel_booking + customerFirstName + '.')).error(console.log(error))
        }else if(userType === 'Chef'){
            this.cancelBooking(_id, userType, status).then(this.emailNotification(customerEmail, customerFirstName,
                'Booking Canceled',
                concel_booking + chefFirstName + '.')).error(console.log(error))
        }

    }

    static handleConfirmBooking(_id, userType, status, chefEmail, customerEmail, chefFirstName, customerFirstName) {
        this.confirmBooking(_id, userType, status).then(this.emailNotification(chefEmail, customerFirstName,
            'Booking Confirmed',
            confirm_booking)).error(console.log(error))

    }

    static createBooking(booking){
        return new Promise((resolve,reject) =>{
            let suffix = 'create';
            HttpService.post(`${BookingService.baseURL()}${suffix}`,
            {
                chefEmail: booking.chefEmail,
                customerEmail: booking.customerEmail,
                startTime: booking.startTime,
                endTime: booking.endTime,
                city: booking.city,
                address: booking.address,
                price: booking.price,
                status: "inProgress"
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
            emailjs.send(service_id, template_id, {
                "to_email": email,
                "to_name": firstName,
                "subject": subject,
                "message": message
            }, user_id, function (response) {
                console.log('Success', response.status, response.text);
                resolve(response)
            }, function (err) {
                console.log(err);
                reject(err)
            });
        })
    }
}