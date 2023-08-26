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
import AdminUread from "./pages/adminUnread/AdminUnread";
import ClassPosts from "./pages/classPosts/ClassPosts";
import File from "./pages/directorPosts/File";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/unread' element={<PrivateRouter> <Layout> <Unread /> </Layout> </PrivateRouter>} />
      <Route path='/director-posts' element={<PrivateRouter> <Layout> <File /> </Layout> </PrivateRouter>} />
      <Route path='/admin-unread' element={<PrivateRouter> <Layout> <AdminUread /> </Layout> </PrivateRouter>} />
      <Route path='/posts' element={<PrivateRouter> <Layout> <Posts /> </Layout> </PrivateRouter>} />
      <Route path='/schools' element={<PrivateRouter> <Layout> <Schools /> </Layout> </PrivateRouter>} />
      <Route path='/category' element={<PrivateRouter> <Layout> <Category /> </Layout> </PrivateRouter>} />
      <Route path='/classes' element={<PrivateRouter> <Layout> <Classes /> </Layout> </PrivateRouter>} />
      <Route path='/rating' element={<PrivateRouter> <Layout> <Rating /> </Layout> </PrivateRouter>} />
      <Route path='/student' element={<PrivateRouter> <Layout> <Student /> </Layout> </PrivateRouter>} />
      <Route path='/class-posts' element={<PrivateRouter> <Layout> <ClassPosts /> </Layout> </PrivateRouter>} />
      {/* <Route path='/student/:id' element={<PrivateRouter> <Layout> <AddReting /> </Layout> </PrivateRouter>} /> */}
    </Routes>
  );
}

export default App;
