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
        return new Promise((resolve, reject) => {
            HttpService.post(CalendarService.baseURL(), booking, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteBooking(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${CalendarService.baseURL()}/${id}`, function(data) {
                if(data.message != undefined) {
                    resolve(data.message);
                }
                else {
                    reject('Error while deleting');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

}
