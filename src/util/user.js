/**
 * Small wrapper around localStorage to save information about
 * what user is currently logged in.
 */
class User {
    static MERCHANT = 'Merchant';
    static CUSTOMER = 'Customer';

    static save(username, type) {
        localStorage.setItem('username', username);
        localStorage.setItem('type', type);
    }

    static isLoggedIn() {
        return localStorage.getItem('username') !== null;
    }

    static getType() {
        return localStorage.getItem('type');
    }

    static isMerchant() {
        return localStorage.getItem('type') === User.MERCHANT;
    }

    static isCustomer() {
        return localStorage.getItem('type') === User.CUSTOMER;
    }

    static getUsername() {
        return localStorage.getItem('username');
    }

    static clear() {
        localStorage.clear();
    }
}

export default User;
