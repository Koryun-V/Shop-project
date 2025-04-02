import axios from "axios";
import user from "../components/pages/User";


const api = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),

    },

    baseURL: "https://world-of-construction.onrender.com"
})
const token = localStorage.getItem("token");


export default class Api {
    static getPopularProducts({id}) {
        let userId
        if (id) {
            userId = id
        }
        return api.get(`/products/popular`, {
            params: {
                userId
            },

        })
    }

    static getRandomReviews() {
        return api.get(`/reviews/random`)
    }

    static sendReview({productId, review, rating}) {
        return api.post(`/reviews/create/${productId}`,
            {
                review,
                rating
            },

            {
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                }
            }
        )
    }


    static getSharesProducts({id}) {
        let userId
        if (id) {
            userId = id
        }
        return api.get(`/products/discounts`, {
            params: {
                userId
            }
        })
    }

    static getReview({paymentId}) {
        return api.get(`/reviews/${paymentId}`, {
            headers: {
                Authorization: `${token}`,
            }
        })
    }


    static loginUser({email, password}) {
        return api.post(`/users/login`, {email, password});
    }

    static getAllCategories(params) {
        return api.get(`/categories/list`, {params})
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


    static getOrder({limit}) {
        return api.get(`/payment/history/`, {
                params: {
                    limit,
                },


                headers: {
                    Authorization: `${token}`
                }
            }
        )
            ;
    }

    static getOrderReceived() {
        return api.get(`/payment/received`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }

    static orderRetry({paymentId}) {
        return api.post(`/payment/retry`, {
                paymentId,
            },

            {
                headers: {
                    Authorization: `${token}`
                }
            }
        );
    }

    static orderConfirm({paymentId}) {
        return api.post(`/payment/confirm-receipt`, {
                paymentId,
            },
            {
                headers: {
                    Authorization: `${token}`
                }
            }
        );
    }


    static getUser() {
        return api.get(`/users/profile`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }

    static userDelete({email}) {
        return api.delete(`/users/delete-user`, {
            data: {email}, // Sending email in request body
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    static getProfile() {
        return api.get("users/profile")
    }

    static async updateUser({data}) {
        console.log(data, "api")
        return api.put("users/update", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: localStorage.getItem("token"),
            },
        });
    };

    static async updateUserPassword({newPassword}) {
        return api.put("users/password", {newPassword});
    };

    // static async createCard({data}) {
    //     return api.post("/cards/create", {...data});
    // };

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


    static deleteAllCart() {
        return api.delete("/cards/all")
    }


    static async payment({products}) {
        return await api.post('payment/place', {
            products,
        });
    }

    static getStores({page, limit}) {
        return api.get(`/products/stores`, {
            params: {
                page,
                limit,
            }
        })
    }


    static getOneProduct({id, userId}) {
        return api.get(`/products/${id}`, {
            params: {
                userId,
            }
        });
    }


    static updateCard({cardId, add, remove}) {
        return api.put(`/cards/update/${cardId}`, {
                add,
                remove
            }, {
                headers: {
                    Authorization: token
                }
            }
        );
    }


    static createCard({productId, quantity}) {
        return api.post(`/cards/create`, {
                productId,
                quantity
            }, {
                headers: {
                    Authorization: token
                }
            }
        );
    }


    static getAllProducts({categoryId, limit, page, minPrice, maxPrice, storeId, s, id}) {
        let category
        let userId
        if (categoryId) {
            category = categoryId
        }
        let store
        if (storeId) {
            store = storeId
        }
        let search
        if (s) {
            search = s
        }
        if (id) {
            userId = id
        }

        return api.get(`/products/list`, {
            params: {
                userId,
                categoryId: category,
                limit,
                page,
                minPrice,
                maxPrice,
                s: search,
                storeId: store
            }
        });
    }
}


// const api = axios.create({
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": localStorage.getItem("token"),
//
//   },
//
//   baseURL: "https://world-of-construction.onrender.com"
// })
// const token = localStorage.getItem("token");
//
//
// export default class Api {
//   static getPopularProducts(params) {
//     return api.get(`/products/popular`, {params})
//   }
//
//   static getRandomReviews() {
//     return api.get(`/reviews/random`)
//   }
//
//   static sendReview({productId, review, rating}) {
//     return api.post(`/reviews/create/${productId}`,
//       {
//         review,
//         rating
//       },
//
//       {
//         headers: {
//           Authorization: `${token}`,
//           "Content-Type": "application/json",
//         }
//       }
//     )
//   }
//
//   static getSharesProducts(params) {
//     return api.get(`/products/discounts`, {params})
//   }
//
//   static getReview({productId}) {
//     return api.get(`/reviews/list/${productId}`)
//   }
//
//
//   static loginUser({email, password}) {
//     return api.post(`/users/login`, {email, password});
//   }
//
//   static getAllCategories(params) {
//     return api.get(`/categories/list`, {params})
//   }
//
//
//   static forgotPasswordUser({email}) {
//     return api.post(`/users/forgot/password`, {email});
//   }
//
//   static changePasswordUser({newPassword, key}) {
//     return api.put(`/users/update/password`, {newPassword, key});
//   }
//
//   static registrationUser({firstName, lastName, gender, dateOfBirth, email, password}) {
//     return api.post(`/users/registration`,
//       {
//         firstName,
//         lastName,
//         gender,
//         dateOfBirth,
//         email,
//         password
//       },
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         }
//       })
//   }
//
//   static activateUser({key}) {
//     return api.post(`/users/activate`, {key});
//   }
//
//   static resendActivateUser({email}) {
//     return api.post(`/users/resend-activation-key`, {email});
//   }
//
//   static resendCode({email}) {
//     return api.post(`/users/resend-code`, {email});
//   }
//
//   static getOrder({limit}) {
//     return api.get(`/payment/history/`, {
//         params: {
//           limit,
//         },
//
//
//         headers: {
//           Authorization: `${token}`
//         }
//       }
//     )
//       ;
//   }
//
//   static getOrderReceived() {
//     return api.get(`/payment/received`, {
//       headers: {
//         Authorization: `${token}`
//       }
//     });
//   }
//
//   static orderRetry({paymentId}) {
//     return api.post(`/payment/retry`, {
//         paymentId,
//       },
//
//       {
//         headers: {
//           Authorization: `${token}`
//         }
//       }
//     );
//   }
//
//   static orderConfirm({paymentId}) {
//     return api.post(`/payment/confirm-receipt`, {
//         paymentId,
//       },
//       {
//         headers: {
//           Authorization: `${token}`
//         }
//       }
//     );
//   }
//
//
//   static getUser() {
//     return api.get(`/users/profile`, {
//       headers: {
//         Authorization: `${token}`
//       }
//     });
//   }
//
//   static userDelete({email}) {
//     return api.delete(`/users/delete-user`, {
//       data: {email}, // Sending email in request body
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });
//   }
//
//   static getProfile() {
//     return api.get("users/profile")
//   }
//
//   static
//   async updateUser({data}) {
//     console.log(data, "api")
//     return api.put("users/update", data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: localStorage.getItem("token"),
//       },
//     });
//   }
//   ;
//
//   static
//   async updateUserPassword({newPassword}) {
//     return api.put("users/password", {newPassword});
//   }
//   ;
//
//   static
//   async createCard({data}) {
//     return api.post("/cards/create", {...data});
//   }
//   ;
//
//   static
//   async getCardList({page, limit,}) {
//     return await api.get("cards/list", {
//       params: {
//         page,
//         limit,
//       },
//     });
//   }
//   ;
//
//   static deleteCart({cardId}) {
//     return api.delete(`/cards/delete/${cardId}`)
//   }
//
//
//   static
//   async updateCard({cardId, quantity}) {
//     return await api.put(`/cards/update/${cardId}`, {quantity});
//   }
//   ;
//
//
//   static deleteAllCart() {
//     return api.delete("/cards/all")
//   }
//
//
//   static
//   async payment({products}) {
//     return await api.post('payment/place', {
//       products,
//     });
//   }
//
//   static getStores({page, limit}) {
//     return api.get(`/products/stores`, {
//       params: {
//         page,
//         limit,
//       }
//     })
//   }
//
//
//   static getOneProduct({id}) {
//     return api.get(`/products/${id}`);
//   }


// static updateCard({cardId, quantity}) {
//     return api.put(`/cards/update/${cardId}`, {
//         quantity
//     }, {
//         headers: {
//             Authorization: token
//         }
//     })
// }

// static getCards({page, limit}) {
//     return api.get(`/cards/list?page=${page}&limit=${limit}`, {
//         headers: {
//             Authorization: token
//         }
//     });
// }
// static createCard({productId, quantity}) {
//     return api.post(`/cards/create`, {
//             productId,
//             quantity
//         }, {
//             headers: {
//                 Authorization: token
//             }
//         }
//     );
// }

//
//   static getAllProducts({categoryId, limit, page, minPrice, maxPrice, storeId, s,}) {
//     let category
//     if (categoryId) {
//       category = categoryId
//     }
//     let store
//     if (storeId) {
//       store = storeId
//     }
//     let search
//     if (s) {
//       search = s
//     }
//     return api.get(`/products/list`, {
//       params: {
//         categoryId: category,
//         limit,
//         page,
//         minPrice,
//         maxPrice,
//         s: search,
//         storeId: store
//       }
//     });
//   }
// }


//
//
//
//
//
//
//
//
//
//
// import axios from "axios";
// import {getReview} from "../store/actions/order";
//
//
// const api = axios.create({
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": localStorage.getItem("token"),
//
//   },
//
//   baseURL: "https://world-of-construction.onrender.com"
// })
// const token = localStorage.getItem("token");
//
//
// export default class Api {
//   static getPopularProducts(params) {
//     return api.get(`/products/popular`, {params})
//   }
//
//   static getRandomReviews() {
//     return api.get(`/reviews/random`)
//   }
//
//   static sendReview({productId, review, rating}) {
//     return api.post(`/reviews/create/${productId}`,
//       {
//         review,
//         rating
//       },
//
//       {
//         headers: {
//           Authorization: `${token}`,
//           "Content-Type": "application/json",
//         }
//       }
//     )
//   }
//
//   static getSharesProducts(params) {
//     return api.get(`/products/discounts`, {params})
//   }
//
//   static getReview({productId}) {
//     return api.get(`/reviews/list/${productId}`)
//   }
//
//
//   static loginUser({email, password}) {
//     return api.post(`/users/login`, {email, password});
//   }
//
//   static getAllCategories(params) {
//     return api.get(`/categories/list`, {params})
//   }
//
//
//   static forgotPasswordUser({email}) {
//     return api.post(`/users/forgot/password`, {email});
//   }
//
//   static changePasswordUser({newPassword, key}) {
//     return api.put(`/users/update/password`, {newPassword, key});
//   }
//
//   static registrationUser({firstName, lastName, gender, dateOfBirth, email, password}) {
//     return api.post(`/users/registration`,
//       {
//         firstName,
//         lastName,
//         gender,
//         dateOfBirth,
//         email,
//         password
//       },
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         }
//       })
//   }
//
//   static activateUser({key}) {
//     return api.post(`/users/activate`, {key});
//   }
//
//   static resendActivateUser({email}) {
//     return api.post(`/users/resend-activation-key`, {email});
//   }
//
//   static resendCode({email}) {
//     return api.post(`/users/resend-code`, {email});
//   }
//
//   static getOrder({limit}) {
//     return api.get(`/payment/history/`, {
//         params: {
//           limit,
//         },
//
//
//         headers: {
//           Authorization: `${token}`
//         }
//       }
//     )
//       ;
//   }
//
//   static getOrderReceived() {
//     return api.get(`/payment/received`, {
//       headers: {
//         Authorization: `${token}`
//       }
//     });
//   }
//
//   static orderRetry({paymentId}) {
//     return api.post(`/payment/retry`, {
//         paymentId,
//       },
//
//       {
//         headers: {
//           Authorization: `${token}`
//         }
//       }
//     );
//   }
//
//   static orderConfirm({paymentId}) {
//     return api.post(`/payment/confirm-receipt`, {
//         paymentId,
//       },
//       {
//         headers: {
//           Authorization: `${token}`
//         }
//       }
//     );
//   }
//
//
//   static getUser() {
//     return api.get(`/users/profile`, {
//       headers: {
//         Authorization: `${token}`
//       }
//     });
//   }
//
//   static userDelete({email}) {
//     return api.delete(`/users/delete-user`, {
//       data: {email}, // Sending email in request body
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });
//   }
//
//   static getProfile() {
//     return api.get("users/profile")
//   }
//
//   static
//   async updateUser({data}) {
//     console.log(data, "api")
//     return api.put("users/update", data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: localStorage.getItem("token"),
//       },
//     });
//   }
//   ;
//
//   static
//   async updateUserPassword({newPassword}) {
//     return api.put("users/password", {newPassword});
//   }
//   ;
//
//   static
//   async createCard({data}) {
//     return api.post("/cards/create", {...data});
//   }
//   ;
//
//   static
//   async getCardList({page, limit,}) {
//     return await api.get("cards/list", {
//       params: {
//         page,
//         limit,
//       },
//     });
//   }
//   ;
//
//   static deleteCart({cardId}) {
//     return api.delete(`/cards/delete/${cardId}`)
//   }
//
//
//   static
//   async updateCard({cardId, quantity}) {
//     return await api.put(`/cards/update/${cardId}`, {quantity});
//   }
//   ;
//
//
//   static deleteAllCart() {
//     return api.delete("/cards/all")
//   }
//
//
//   static
//   async payment({products}) {
//     return await api.post('payment/place', {
//       products,
//     });
//   }
//
//   static getStores({page, limit}) {
//     return api.get(`/products/stores`, {
//       params: {
//         page,
//         limit,
//       }
//     })
//   }
//
//
//   static getOneProduct({id}) {
//     return api.get(`/products/${id}`);
//   }
//
//
//   // static updateCard({cardId, quantity}) {
//   //     return api.put(`/cards/update/${cardId}`, {
//   //         quantity
//   //     }, {
//   //         headers: {
//   //             Authorization: token
//   //         }
//   //     })
//   // }
//
//   // static getCards({page, limit}) {
//   //     return api.get(`/cards/list?page=${page}&limit=${limit}`, {
//   //         headers: {
//   //             Authorization: token
//   //         }
//   //     });
//   // }
//   // static createCard({productId, quantity}) {
//   //     return api.post(`/cards/create`, {
//   //             productId,
//   //             quantity
//   //         }, {
//   //             headers: {
//   //                 Authorization: token
//   //             }
//   //         }
//   //     );
//   // }
//
//
//   static getAllProducts({categoryId, limit, page, minPrice, maxPrice, storeId, s,}) {
//     let category
//     if (categoryId) {
//       category = categoryId
//     }
//     let store
//     if (storeId) {
//       store = storeId
//     }
//     let search
//     if (s) {
//       search = s
//     }
//     return api.get(`/products/list`, {
//       params: {
//         categoryId: category,
//         limit,
//         page,
//         minPrice,
//         maxPrice,
//         s: search,
//         storeId: store
//       }
//     });
//   }
// }


