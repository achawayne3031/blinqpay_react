import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';
import Overview from './pages/post/Overview';
import AddPost from './pages/post/AddPost';
import ViewPost from './pages/post/ViewPost';
import UpdatePost from './pages/post/UpdatePost';
import UserLayout from './pages/layout/UserLayout';







function App() {
  return (
      <>
        <Routes>
          <Route path='/'>
            <Route index element={<Login />} />
          </Route>
      
          {/* User */}
          <Route path="/auth">
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>


          <Route path="/user" element={ <UserLayout /> }>
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="add-post" element={<AddPost />} />
            <Route path="view-post/:postId" element={<ViewPost />} />
            <Route path="update-post/:postId" element={<UpdatePost />} />
          </Route>


          {/* Post */}
          {/* <Route path="/post">
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="add-post" element={<AddPost />} />
            <Route path="view-post/:postId" element={<ViewPost />} />
          </Route> */}


          <Route path='*' element={<NotFound />} />
        </Routes>
      </>
  );
}

export default App;
