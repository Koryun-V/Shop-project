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
    const func = async () => {
        try {
            const params = {
                name: "sxoc",
                size: "230 мм",
                price: "120",
                description: "Электрическая болгарка для резки и шлифовки различных материалов.",
                brandName: "sovet",

                productImage: files,
            }


            const {data} = await axios.post(`https://world-of-construction.onrender.com/admin/product/28`, params,

                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: token,
                    },
                    // formSerializer: {indexes: true}
                })
            console.log(data, "products")
            return data
        } catch (error) {
            console.log(error)
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

    const file = (e) => {
        const file = e.target.files;
        setFiles([...file])
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
                            <input type="file" id="avatar" onChange={file} multiple/>
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
