import HttpService from './HttpService';

export default class ChefService {

    constructor() {
    }

    static baseURL() {
        return "http://localhost:3000/chef"
    }

    static getChefs() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL(), function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getPreChefs() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ChefService.baseURL()}/pre`, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }


   static getChefBySearch(name) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ChefService.baseURL()}/search?firstName=${name}`, function (data) {
                if (data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving attraction');
                }
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getChefBySearchCity(city) {
      return new Promise((resolve, reject) => {
          HttpService.post(`${ChefService.baseURL()}/searchCity`, {
              city,
          }, function (data) {
              resolve(data);
          }, function (textStatus) {
              reject(textStatus);
          });
      });
  }

     static getChefDetail(chefid) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ChefService.baseURL()}/readdetail/${chefid}`, function (data) {
                if (data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving chef');
                }
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
    
    static getChefBySearchCity(city) {
      return new Promise((resolve, reject) => {
          HttpService.post(`${ChefService.baseURL()}/searchCity`, {
              city: city,
          }, function (data) {
             resolve(data);
          }, function (textStatus) {
              reject(textStatus);
          });
      });
  }


    static filterChef(chefIds, city, foodType, price) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${ChefService.baseURL()}/filter`, {
                chefIds,
                city,
                foodType,
                price
            }, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}
