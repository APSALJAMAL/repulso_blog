import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import { RouteAddCategory, RouteBlog, RouteBlogAdd, RouteBlogByCategory, RouteBlogDetails, RouteBlogEdit, RouteCategoryDetails, RouteCommentDetails, RouteEditCategory, RouteIndex, RouteProfile, RouteSearch, RouteSignIn, RouteSignUp, RouteUser, RouteUserProfile } from './helpers/RouteName'
import Index from './pages/Index'
// import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import AddCategory from './pages/Category/AddCategory'
import CategoryDetails from './pages/Category/CategoryDetails'
import EditCategory from './pages/Category/EditCategory'
import AddBlog from './pages/Blog/AddBlog'
import BlogDetails from './pages/Blog/BlogDetails'
import EditBlog from './pages/Blog/EditBlog'
import SingleBlogDetails from './pages/SingleBlogDetails'
import BlogByCategory from './pages/Blog/BlogByCategory'
import SearchResult from './pages/SearchResult'
import Comments from './pages/Comments'
import User from './pages/User'
import AuthRouteProtechtion from './components/AuthRouteProtechtion'
import OnlyAdminAllowed from './components/OnlyAdminAllowed'
import UserProfile from './pages/UserProfile'
import Info from './pages/Info'
import { useEffect, useState } from 'react';
import OnlyOwner from './components/OnlyOwner'
import Owner from './pages/Owner'
import SplashScreen from './pages/SplashScreen'
import LoadingPage from './pages/LoadingPage'
import Publish from './pages/Publish'
import MainPage from './pages/MainPage'


const App = () => {
  const [loading, setLoading] = useState(true); // State to track loading status
  const [showSplash, setShowSplash] = useState(false); // State for splash screen

  useEffect(() => {
    // Check if the user has seen the splash screen
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash'); // Use sessionStorage to track state

    if (!hasSeenSplash) {
      setShowSplash(true);
      sessionStorage.setItem('hasSeenSplash', 'true'); // Set flag in sessionStorage
    }

    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Show splash screen for 2 seconds

    const loadingTimer = setTimeout(() => {
      setLoading(false); // Hide loading spinner after total loading time
    }, 5000); // 5 seconds total (2 for splash + 3 for loading)

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(loadingTimer);
    };
  }, []);
  return (
    <BrowserRouter>
    {showSplash ? (
        <SplashScreen /> // Show splash screen if showSplash is true
      ) : loading ? (
        <LoadingPage /> // Show loading spinner if loading is true
      ) : (
        <>
      <Routes>
        <Route path={RouteIndex} element={<Layout />} >
          <Route index element={<Index />} />

          

          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchResult />} />


          <Route element={<AuthRouteProtechtion />}>
          {/* <Route path="/addsc" element={<AddSubcategory />} /> */}
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteUserProfile} element={<UserProfile />} />
            
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteBlogEdit()} element={<EditBlog />} />
            <Route path={RouteCommentDetails} element={<Comments />} />
            <Route path="/info/:id" element={<Info />} />
            
          </Route>
          

          <Route element={<OnlyAdminAllowed />}>
          <Route path={RouteBlogAdd} element={<AddBlog />} />
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
            {/* <Route path={RouteUser} element={<User />} /> */}
          </Route>

          <Route element={<OnlyOwner />}>
        <Route path="/owner" element={<Owner />} />
        <Route path="/publish" element={<Publish />} />
          </Route>

        </Route>

        
        <Route path="/mainpage" element={<MainPage />} />

        <Route path={RouteSignIn} element={<SignIn />} />
        {/* <Route path={RouteSignUp} element={<SignUp />} /> */}
      </Routes>
      </>
      )}
    </BrowserRouter>
  )
}

export default App 