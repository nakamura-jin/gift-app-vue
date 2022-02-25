import Cookies from 'js-cookie'

export default {
  auth(to: any, from: any , next: any) {
    const token = Cookies.get('_myapp_token');
    if (!token) {
      return next('/login');
    }
    next();
  }
}