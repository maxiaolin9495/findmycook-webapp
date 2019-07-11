import HttpService from './HttpService';

export default class CalendarService {

    static baseURL() {
        return "http://localhost:3000/user/calendar"
    }

    static addAppointment(date) {
        return new Promise((resolve, reject) => {
            HttpService.post(this.baseURL(),{
            }, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}