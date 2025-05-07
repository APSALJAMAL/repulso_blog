import { RouteIndex, RouteSignIn } from '@/helpers/RouteName'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const OnlyOwner = () => {
    const user = useSelector(state => state.user)
    if (user && user.isLoggedIn && user.user.role === 'owner') {
        return (
            <Outlet />
        )
    } else {
        return <Navigate to='/'/>
    }

}

export default OnlyOwner