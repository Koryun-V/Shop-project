import axios from "axios";

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("token"),

  },
  baseURL:  "https://world-of-construction.onrender.com/",
  params: {
  }

})


export default class Api{


  static getProfile(){
    return api.get("users/profile")
  }

  static async updateUser({data}) {
    return api.put("users/update", {...data});
  };


  static async updateUserPassword({newPassword}) {
    return api.put("users/password", {newPassword});
  };

  static async searchProducts({page, limit, query}) {
    return await api.get('products', {
      params: {
        page,
        limit,
        s: query
      },
    });
  };



  static getAdminCategories(){
    return api.get("admin/categories")
  }









}
