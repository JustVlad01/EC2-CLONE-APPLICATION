import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

export async function authMiddleware(to, from, next) {
    const token = Cookies.get('token');
    console.log('Token:', token);

    if (token) {
        // Decode the token to extract user information
        let decodedToken;
        try {
            decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken);

            // Redirect to '/admin' if the user has a token and is at the root '/'
            if (to.path === '/') {
                return next({ path: '/admin' });
            }

            // Example: Role-based access
            if (to.meta.requiresAdmin && decodedToken.role !== 'admin') {
                // If route requires admin and the user is not admin, redirect to '/'
                return next({ path: '/' });
            }

            if (to.meta.requiresManager && decodedToken.role !== 'manager' && decodedToken.role !== 'admin') {
                // If route requires manager and the user is not manager/admin, redirect to '/'
                return next({ path: '/' });
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            // If decoding fails, treat as no token and redirect to sign-in
            return next({ path: '/' });
        }
    } else if (!token && to.path.startsWith('/admin')) {
        // If no token is found and the user tries to access an admin page, redirect to sign-in page
        return next({ path: '/' });
    }

    // Allow the user to proceed to the route
    next();
}
