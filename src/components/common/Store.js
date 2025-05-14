import React, {useEffect} from 'react';
import YouTube from "react-youtube";
import orderBg from "../../assets/background/order.jpg";
import {useDispatch} from "react-redux";

const Store = () => {
    const dipatch = useDispatch()

    useEffect(() => {

    }, []);





    return (
        <section className="section">
            <article className="section-block">
                <div className="container">
                    <div className="store-header">
                        <h1> About the ideal store</h1>
                    </div>
                    <div className="store-block">
                        <div className="container-video">
                            <YouTube videoId="8JaFaJSfoX8" className="you-tube"/>
                            <div className="store-link">
                                <div className="link-block">
                                    <span>Official website</span><a target="_blank"  href="https://www.idealsystem.am/">idealsystem.am</a>
                                </div>
                                <div className="link-block">
                                    <span>Products on the Multify website</span><a
                                    href="#">idealsystem.am</a>
                                </div>
                            </div>
                        </div>
                        <div className="store-info">
                            <span>Ideal System is today the largest chain of building materials stores in the region. It is represented by spacious and comfortable stores, 14 of which operate in the regions of Armenia: Gyumri, Vanadzor, Artashat, Armavir, Echmiadzin, Martuni, Ijevan, Artik, Ararat, Masis Kapan and Hrazdan, in the cities of Ashtarak. Ideal System presents more than 30,000 product types to the population of the republic and provides more than 100 high-quality services.

Ideal System cooperates with more than 180 European companies. Ideal System presents itself to Armenian consumers with stores that, with their size, range, level of service and convenience of choice, form a new culture of choosing construction products and services in Armenia.</span>
                        </div>
                    </div>




                </div>
            </article>
        </section>
    );
};

export default Store;
