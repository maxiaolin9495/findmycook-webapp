import HttpService from './HttpService';

export default class CalendarService {

    static baseURL() {
        return "http://localhost:3000/user/calendar"
    }

    static getBookings() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL(), function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static createBooking(booking) {
        booking.id = Math.floor((Math.random() * 100000000) + 1).toString()
        return new Promise((resolve, reject) => {
            HttpService.post(CalendarService.baseURL(), booking, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}
