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

}