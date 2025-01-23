import axios from "axios";
import {useSelector} from "react-redux";


const api = axios.create({
    baseURL: "https://world-of-construction.onrender.com"
})

export default class Api {
  static getAllProducts(params) {
    return api.get(`/products/list/${params.categoryId}`);
  }

    static loginUser({email, password}) {
        return api.post(`/users/login`, {email, password});
    }


  static getAllCategories(params) {
    return api.get(`/categories/list`, {params})
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
