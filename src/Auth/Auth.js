export default {
    //this user, will let us check authentication status
    user: {
        isAuthenticated: false
    },
    setAuth(token, user) {
        localStorage.setItem('tokiuz', token);
        localStorage.setItem('usuario', user)

    },
    deleteAuth() {
        localStorage.removeItem('tokiuz');
    },
    checkAuth() {
        var jwt = localStorage.getItem('tokiuz');
        if (jwt) {
            this.user.authenticated = true;
        }
        else {
            this.user.authenticated = false;
        }
    },

    // The object to be passed as a header for authenticated requests
    getAuthHeader() {
        return {
            'Authorization': localStorage.getItem('tokiuz')
        }
    },
    tokenSSo() {
        var values = '; ' + document.cookie;
        var parts = values.split('; tokiuz=');
        if (parts.length == 2) {
            return parts.pop().split(';').shift();
        }
        return null;
    }

}