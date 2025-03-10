import {Route, Routes} from "react-router-dom";
import Layout from "./components/common/Layout";
import Register from "./components/common/Register";
import PinInput from "./components/mini/PinInput";
import Order from "./components/common/Order";
// import Home from "./components/common/Home";
// import Products from "./components/common/Products";
// import Category from "./components/common/Category";
// import Specialist from "./components/common/Specialist";
// import Contact from "./components/common/Contact";


const token = localStorage.getItem("token");
function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/*<Route index element={<Home/>}/>*/}
                <Route path="/input" element={<PinInput/>}/>
                <Route path="/order" element={<Order/>}/>
                {/*<Route path="/specialist" element={<Specialist/>}/>*/}
                <Route path="/register" element={<Register/>}/>
            </Route>
        </Routes>
    );
}

export default App;
