import axios from "axios";


const api = axios.create({
baseURL: "https://world-of-construction.onrender.com"
})

export default class Api{
    static getAllProducts(params){
        return api.get(`/products/list`, {params})
    }


    static getAllCategories(params){
        return api.get(`/categories/list`, {params})
    }
}

