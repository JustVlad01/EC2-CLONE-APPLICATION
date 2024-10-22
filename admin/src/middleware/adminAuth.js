import Cookies from 'js-cookie';

export async function authMiddleware(to, from, next) {
    const token = Cookies.get('token');

    console.log('Token:', token);

    if (token && to.path === '/') {
        // If the token exists and the user is at the root '/', redirect them to '/admin'
        return next({ path: '/admin' });
    }

    if (!token && to.path.startsWith('/admin')) {
        // If no token is found and the user tries to access an admin page, redirect to sign-in page
        return next({ path: '/' });
    }

    // Allow the user to proceed to the route
    next();
}