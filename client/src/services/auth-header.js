export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if(user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken }; // For Spring Boot backend
        //return { 'x-access-token': user.accessToken };  // For Node.js Express backend
    } else {
        return {};
    }
}