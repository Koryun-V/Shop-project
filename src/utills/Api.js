import axios from "axios";


const api = axios.create({
    baseURL: "https://world-of-construction.onrender.com"
})



export default class Api {
    static getAllProducts(params) {
        return api.get(`/products/list`, {params})
    }
    static loginUser({email, password}) {
        return api.post(`/users/login`, {email, password});
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
}
