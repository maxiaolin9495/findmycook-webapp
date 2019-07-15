import HttpService from './HttpService';

export default class UserCalendarService {

    static baseURL() {
        return "http://localhost:3000/user/userCalendar"
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

    static createBooking(userCalendarBooking) {
        userCalendarBooking.id = Math.floor((Math.random() * 100000000) + 1).toString()
        return new Promise((resolve, reject) => {
            HttpService.post(UserCalendarService.baseURL(), userCalendarBooking, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}
