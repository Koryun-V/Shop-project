import axios from "axios";


const api = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),

    },

    baseURL: "https://world-of-construction.onrender.com"
})
const token = localStorage.getItem("token");


export default class Api {
    static loginUser({email, password}) {
        return api.post(`/users/login`, {email, password});
    }

    static forgotPasswordUser({email}) {
        return api.post(`/users/forgot/password`, {email});
    }

    static changePasswordUser({newPassword, key}) {
        return api.put(`/users/update/password`, {newPassword, key});
    }

    static registrationUser({firstName, lastName, gender, dateOfBirth, email, password}) {
        return api.post(`/users/registration`,
            {
                firstName,
                lastName,
                gender,
                dateOfBirth,
                email,
                password
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
    }

    static activateUser({key}) {
        return api.post(`/users/activate`, {key});
    }

    static resendActivateUser({email}) {
        return api.post(`/users/resend-activation-key`, {email});
    }

    static resendCode({email}) {
        return api.post(`/users/resend-code`, {email});
    }

    static getOrder() {
        return api.get(`/payment/history`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }

    static getUser() {
        return api.get(`/users/profile`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }


    static async createCard({data}) {
        return api.post("/cards/create", {...data});
    };

    static async getCardList({page, limit,}) {
        return await api.get("cards/list", {
            params: {
                page,
                limit,
            },
        });
    };

    static deleteCart({cardId}) {
        return api.delete(`/cards/delete/${cardId}`)
    }


    static async updateCard({cardId, quantity}) {
        return await api.put(`/cards/update/${cardId}`, {quantity});
    };


    static deleteAllCart() {
        return api.delete("/cards/all")
    }


    static async payment({ products }) {
        return await api.post('payment/place', {
            products,
        });
    }


}


