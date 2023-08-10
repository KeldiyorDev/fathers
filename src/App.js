import { Route, Routes } from "react-router-dom";
import Layout from "./utils/Layout";
import PrivateRouter from "./utils/PrivateRouter";
import Login from "./pages/login/Login";
import Unread from "./pages/unread/Unread";
import Posts from "./pages/posts/Posts";
import Schools from "./pages/schools/Schools";
import Category from "./pages/category/Category";
import Classes from "./pages/classes/Classes";
import Rating from "./pages/rating/Rating";
import Student from "./pages/student/Student";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/unread' element={<PrivateRouter> <Layout> <Unread /> </Layout> </PrivateRouter>} />
      <Route path='/posts' element={<PrivateRouter> <Layout> <Posts /> </Layout> </PrivateRouter>} />
      <Route path='/schools' element={<PrivateRouter> <Layout> <Schools /> </Layout> </PrivateRouter>} />
      <Route path='/category' element={<PrivateRouter> <Layout> <Category /> </Layout> </PrivateRouter>} />
      <Route path='/classes' element={<PrivateRouter> <Layout> <Classes /> </Layout> </PrivateRouter>} />
      <Route path='/rating' element={<PrivateRouter> <Layout> <Rating /> </Layout> </PrivateRouter>} />
      <Route path='/student' element={<PrivateRouter> <Layout> <Student /> </Layout> </PrivateRouter>} />
    </Routes>
  );
}

export default App;
