import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/route_components/Layout'
import About from './components/route_components/about/About'
import Home from './components/route_components/home/Home'
import LoginSignup from './components/route_components/loginsignup/Loginsignup'
import Team from './components/route_components/team/Team'
import Testiomonal from './components/route_components/testiomonal/Testiomonal'
import Page404 from './components/route_components/common/Page404'
import Contact from './components/route_components/contact/Contact'
import BrowseLayOut from './components/route_components/browse/BrowseLayOut'
import BrowseHome from './components/route_components/browse/BrowseHome'
import SerchContents from './components/route_components/browse/SerchContents'
import Content from './components/route_components/browse/content/Content'
import PostVideo from './components/route_components/browse/post/content/PostVideo'
import WatchContent from './components/route_components/browse/content/watch/WatchContent'
import Profile from './components/route_components/browse/profile/Profile'
import ProfileEdit from './components/route_components/browse/profile/edit/ProfileEdit'
import AdminLayout from './components/route_components/browse/Admin/AdminLayout'
import AdminHome from './components/route_components/browse/Admin/AdminHome'
import AdminContent from './components/route_components/browse/Admin/AdminContent'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="team" element={<Team />} />
            <Route path="testiomonal" element={<Testiomonal />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path='/loginsignup' element={<LoginSignup />} />
          <Route path='/browse' element={<BrowseLayOut />} >
            <Route index element={<BrowseHome />} />
            <Route path='content/watch/*' element={<WatchContent/>} />
            <Route path='content/*' element={<Content />} />
            <Route path='post/content' element={<PostVideo />} />
            <Route path='profile/edit' element={<ProfileEdit/>} />
            <Route path='profile/*' element={<Profile />} />
            <Route path='search/*' element={<SerchContents />} />
            <Route path='admin' element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path='content' element={<AdminContent />} />
            </Route>
          </Route>
          <Route path='*' element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
