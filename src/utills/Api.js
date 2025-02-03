import axios from "axios";
import {useSelector} from "react-redux";


const api = axios.create({
  baseURL: "https://world-of-construction.onrender.com"
})

const token = localStorage.getItem("token");




export default class Api {
  static getAllProducts({categoryId, limit, page}) {

    return api.get(`/products/list/${categoryId}?limit=${limit}&page=${page}` );
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

  static createCard({productId, quantity}){
    return api.post(`/cards/create`,  {
      productId,
      quantity
    },{
      headers: {
        Authorization: token
      }
      }
      );
  }

  static getCards({page, limit}) {
    return api.get(`/cards/list?page=${page}&limit=${limit}`,{
      headers: {
        Authorization: token
      }
    });
  }


  static getOneProduct({id}) {
    return api.get(`/products/${id}`);
  }
}
