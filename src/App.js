import {Route, Routes} from "react-router-dom";
import Layout from "./components/common/Layout";
import Register from "./components/common/Register";
import Home from "./components/common/Home";
import Products from "./components/common/Products";
import Category from "./components/common/Category";
import Specialist from "./components/common/Specialist";
import Contact from "./components/common/Contact";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/category" element={<Category/>}/>
                <Route path="/specialist" element={<Specialist/>}/>
                <Route path="/Contact" element={<Contact/>}/>




                <Route path="/register" element={<Register/>}/>
            </Route>
        </Routes>
    );
}

export default App;
