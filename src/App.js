import {Route, Routes} from "react-router-dom";
import Layout from "./components/common/Layout";
import Register from "./components/common/Register";
import Users from "./components/pages/Users";
import Admin from "./components/pages/Admin";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/register" element={<Register/>}/>


        <Route path="/user" element={<Users/>}/>
        <Route path="/admin" element={<Admin/>}/>

      </Route>
    </Routes>
  );
}

export default App;
