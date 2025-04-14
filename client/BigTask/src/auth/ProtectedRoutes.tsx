import { Outlet, Navigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"

const ProtectedRoutes = () => {
    const { isAuthenticated, isLoading } = useAuth0()

    // Check if the Auth0 is loading, return nothing (or a loading spinner) until it's finished
    if (isLoading) {
        return <div>Loading...</div> // You can replace this with a spinner or loading indicator
    }

    // If the user is authenticated, render the Outlet; otherwise, navigate to the home page
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes;
