import {Route, Routes} from "react-router-dom";
import Layout from "./components/common/Layout";
import Register from "./components/common/Register";
import Home from "./components/common/Home";

import PinInput from "./components/mini/PinInput";
import Order from "./components/common/Order";
import CartList from "./components/pages/CartList";
import OrdersOk from "./components/pages/OrdersOk";
import Shares from "./components/common/Shares";
// import Home from "./components/common/Home";
// import Products from "./components/common/Products";
import Category from "./components/common/Category";
// import Specialist from "./components/common/Specialist";
// import Contact from "./components/common/Contact";
import Products from "./components/common/Products";
import OneProduct from "./components/common/OneProduct";
import Users from "./components/pages/User";



const token = localStorage.getItem("token");
function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="/shares" element={<Shares/>}/>
                {/*<Route index element={<Home/>}/>*/}
                <Route path="/input" element={<PinInput/>}/>
                <Route path="/order" element={<Order/>}/>
                <Route path="/category" element={<Category/>}/>
              <Route path="/basket" element={<CartList/>}/>
              <Route path="/cardok" element={<OrdersOk/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/products/:name" element={<Products/>}/>
                <Route path="/one-product/:productId" element={<OneProduct/>}/>

              {/*<Route path="/products">*/}
              {/*  <Route index element={<Products/>}/>*/}
              {/*  <Route path=":productId" element={<OneProduct/>}/>*/}
              {/*</Route>*/}

              <Route path="/user" element={<Users/>}/>

              {/*<Route path="/specialist" element={<Specialist/>}/>*/}
                <Route path="/register" element={<Register/>}/>
            </Route>
        </Routes>
    );
}

export default App;
