import {Route, Routes} from "react-router-dom";
import Layout from "./components/common/Layout";
import Register from "./components/common/Register";
import Home from "./components/common/Home";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
            </Route>
        </Routes>
    );
}

export default App;
