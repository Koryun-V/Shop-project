import React, {useEffect} from 'react';
import YouTube from "react-youtube";
import {useDispatch, useSelector} from "react-redux";
import {getStore, setStore} from "../../store/actions/storePage";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../mini/Button";
import {setStoreId} from "../../store/actions/home";

const Store = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const store = useSelector(state => state.storePage.store)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setStore([]))
        dispatch(getStore({id}))
    }, [id]);


    console.log(store, "store")


    return (
        <section className="section">
            <article className="section-block">
                <div className="container">
                    {store.name ?
                        <>
                            <div className="store-header">
                                <h1> About the {store.name.charAt(0).toUpperCase() + store.name.slice(1)}</h1>
                            </div>
                            <div className="store-block">
                                <div className="container-video">
                                    <YouTube videoId={store.videoUrl} className="you-tube"/>
                                    <div className="store-link">
                                        <div className="link-block">
                                            <span>Products on the Multify website</span>
                                            <div className="products-button">
                                                <Button text="Products" className="active-button"
                                                        onClick={() => {
                                                            navigate(`/products`)
                                                            dispatch(setStoreId(store.id))
                                                        }}/>
                                            </div>
                                        </div>
                                        <div className="link-block">
                                            <span>Official website</span><a target="_blank"
                                                                            href={store.webSiteUrl}>{store.webSiteUrl}</a>
                                        </div>

                                    </div>
                                </div>
                                <div className="store-info">
                                    <span>{store.about}</span>
                                </div>
                            </div>
                        </>
                        :   <>
                            <div className="store-header">
                                <h1 style={{
                                    width:"100%",
                                }} className="loading-gradient-p"></h1>
                            </div>
                            <div className="store-block">
                                <div className="container-video">
                                    <div className="you-tube loading-gradient-p"/>
                                    <div className="store-link">
                                        <div className="link-block loading-gradient-p" style={{
                                            width:"100%",
                                            height:40,
                                        }} >

                                        </div>
                                        <div className="link-block loading-gradient-p" style={{
                                            width:"100%",
                                            height:40,
                                        }} >

                                        </div>

                                    </div>
                                </div>
                                <div className="store-info">
                                    <div className="span-block">
                                        <span className="span-loading loading-gradient-p"></span>
                                        <span className="span-loading loading-gradient-p"></span>
                                        <span className="span-loading loading-gradient-p"></span>
                                        <span className="span-loading loading-gradient-p"></span>
                                        <span className="span-loading loading-gradient-p"></span>
                                    </div>

                                </div>
                            </div>
                        </>}


                </div>
            </article>
        </section>
    );
};

export default Store;
