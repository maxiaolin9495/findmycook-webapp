import HttpService from './HttpService';

export default class ReviewChefService {

    static baseURL() {
        return "http://localhost:3000/user/review"
    }

    static getReviews() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL(), function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getReview(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ReviewChefService.baseURL()}/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving review');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static createReview(review) {
        review.id = Math.floor((Math.random() * 100000000) + 1).toString()
        return new Promise((resolve, reject) => {
            HttpService.post(ReviewChefService.baseURL(), review, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteReview(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${ReviewChefService.baseURL()}/${id}`, function(data) {
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