import {Route, Routes} from "react-router-dom";
import Layout from "./components/common/Layout";
import Register from "./components/common/Register";
import Test from "./components/common/Test";
import Products from "./components/common/Products";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/*<Route index element={!token ? <Login/> : <Home/>}/>*/}
            <Route path="/register" element={<Register/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/products" element={<Products/>}/>
        </Route>
      </Routes>
  );
}

export default App;
