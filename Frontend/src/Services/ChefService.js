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

    /*static getChef(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ChefService.baseURL()}/readdetail/${id}`, function (data) {
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

    static deleteAttractions(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${AttractionService.baseURL()}/${id}`, function (data) {
                if (data != undefined) {
                    resolve(data);
                }
                else {
                    reject('Error while deleting');
                }
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static approveAttractions(id) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${AttractionService.baseURL()}/approve/${id}`, {}, function (data) {
                /*console.log(data);
                if (data != undefined) {
                    resolve(data);
                }
                else {
                    reject('Error while approving');
                }
            }, function (textStatus) {
                console.log(textStatus)
                reject(textStatus);
            });
        });
    }

    static updateAttractions(attraction) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${attraction._id}`, attraction, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static createAttractions(attraction) {
        attraction.posters = {
            detailed: "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1530467488&di=045b47d23a2cdff2582a159c7864053a&src=http://image.naic.org.cn/uploadfile/2017/0731/1501481954471681.jpg",
            original: "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1530467488&di=045b47d23a2cdff2582a159c7864053a&src=http://image.naic.org.cn/uploadfile/2017/0731/1501481954471681.jpg"
        };
        return new Promise((resolve, reject) => {
            HttpService.post(AttractionService.baseURL(), attraction, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getAttractionsUser(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${AttractionService.baseURL()}/visitor/${id}`, function (data) {
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

    static getAttractionidbytitle(title) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ChefService.baseURL()}/name/${name}`, function (data) {
                if (data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving attractionId');
                }
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }*/

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
              city,
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
