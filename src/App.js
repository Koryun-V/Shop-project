import {Route, Routes} from "react-router-dom";
import Layout from "./components/common/Layout";
import Register from "./components/common/Register";
import Test from "./components/common/Test";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/*<Route index element={!token ? <Login/> : <Home/>}/>*/}
            <Route path="/register" element={<Register/>}/>
            <Route path="/test" element={<Test/>}/>

        </Route>
      </Routes>
  );
}

export default App;
