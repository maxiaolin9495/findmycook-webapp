import HttpService from './HttpService';

export default class ChefCalendarService {

    static baseURL() {
        return "http://localhost:3000/chef/chefCalendar"
    }

    static getWorkTimeEntries() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL(), function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static saveWorkTimeEntry(workTime) {
        workTime.id = Math.floor((Math.random() * 100000000) + 1).toString()
        return new Promise((resolve, reject) => {
            HttpService.post(ChefCalendarService.baseURL(), workTime, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteWorktime(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${ChefCalendarService.baseURL()}/${id}`, function(data) {
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
