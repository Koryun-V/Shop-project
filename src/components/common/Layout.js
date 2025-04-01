import React, {useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import ModalRegister from "./Modal/ModalRegister";
import ModalLogin from "./Modal/ModalLogin";
import axios from "axios";
//main
const token = localStorage.getItem("token");

function Layout() {
    const [user, setUser] = useState({});
    const [isOpenRegister, setIsOpenRegister] = useState(false)
    const [isOpenLogin, setIsOpenLogin] = useState(false)

    const [files, setFiles] = useState([])
    const [previewImg, setPreviewImg] = useState([])

    //
    // useEffect(() => {
    //     const previewUrls = files.map((file) => URL.createObjectURL(file));
    //     setPreviewImg(previewUrls);
    // }, [files]);

    // useEffect(() => {
    //     let x = previewImg.forEach(url => URL.revokeObjectURL(url))
    //     console.log(x)
    // }, [files]);

    console.log(files)
    // const func = async () => {
    //     try {
    //         const params = {
    //             name: "sxoc",
    //             size: "230 мм",
    //             price: "120",
    //             description: "Электрическая болгарка для резки и шлифовки различных материалов.",
    //             brandName: "sovet",
    //             productImage: files,
    //         }
    //
    //
    //         const {data} = await axios.post(`https://world-of-construction.onrender.com/admin/product/24`, params,
    //             {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                     Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYxLCJlbWFpbCI6ImFkbWluQG1haWwucnUiLCJpYXQiOjE3NDIzMTM1OTEsImV4cCI6MTc0NDkwNTU5MX0.tU8a9i8JQJJ36KARoHuEiftBYoP9KirrLQ_DBM8DCXs",
    //                 },
    //                 // formSerializer: {indexes: true}
    //             })
    //         console.log(data, "products")
    //         return data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    useEffect(() => {
        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setPreviewImg(previewUrls);


        return () => previewUrls.forEach(url => URL.revokeObjectURL(url));
    }, [files]);


    const func = async () => {
        try {
            const formData = new FormData();
            formData.append("name", "sxoc");
            formData.append("size", "230 мм");
            formData.append("price", "120");
            formData.append("description", "Электрическая болгарка для резки и шлифовки различных материалов.");
            formData.append("brandName", "sovet");
            formData.append("quantity", "2");

            Array.from(files).forEach((file, index) => {
                formData.append("productImage", file);
            });

            const {data} = await axios.post(
                `https://world-of-construction.onrender.com/admin/product/24`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYxLCJlbWFpbCI6ImFkbWluQG1haWwucnUiLCJpYXQiOjE3NDIzMTM1OTEsImV4cCI6MTc0NDkwNTU5MX0.tU8a9i8JQJJ36KARoHuEiftBYoP9KirrLQ_DBM8DCXs",
                    }
                }
            );
            console.log(data, "products");
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const get = async () => {
        try {
            const {data} = await axios.get(`https://world-of-construction.onrender.com/home`,
                {
                    headers: {
                        Authorization: token,
                    }
                })
            console.log(data, "category")
            return data
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="wrapper">
                <header className="header">
                    <div className="container">
                        <Link to="/" className="logo-block">
                            <div className="logo">
                                Logo
                            </div>
                        </Link>

                        <label htmlFor="avatar">
                            <input type="file" id="avatar" onChange={(e) => setFiles(Array.from(e.target.files))}
                                   multiple/>
                        </label>


                        <button onClick={get}>get</button>

                        <button onClick={func}>update</button>

                        <div>
                            <p>...navigation...</p>
                        </div>

                        <>
                            {!token ?
                                <div className="login-block">
                                    <button className="login" onClick={() => setIsOpenLogin(true)}>LOGIN</button>
                                    {/*<button className="register" onClick={() => setIsOpenRegister(true)}>REGISTER*/}
                                    {/*</button>*/}
                                    <Link className="register" to="/register">REGISTER
                                    </Link>
                                </div>
                                :
                                <div className="user-block">
                                    <div className="user"></div>
                                </div>
                            }
                        </>


                    </div>
                </header>

                <main className="main">
                    <Outlet/>
                </main>

                <footer className="footer">

                </footer>
            </div>

            <ModalRegister
                open={isOpenRegister} onClose={() => {
                setIsOpenRegister(false)
            }}/>
            <ModalLogin
                open={isOpenLogin} onClose={() => {
                setIsOpenLogin(false)
            }}/>
        </>

    );
}

export default Layout;
