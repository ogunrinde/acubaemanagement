

export const login = (data) => {
    return {
        type: 'LOGIN',
        data:data
    }
};
export const logout = () => {
    return {
        type: 'LOGOUT'
    }
};
export const whichpage = (data) => {
    return {
        type: 'WHICHPAGE',
        data:data
    }
};
export const eachproducts = (data) => {
    return {
        type: 'PRODUCTS',
        data:data
    }
};
export const eachcustomer = (data) => {
    return {
        type: 'CUSTOMER',
        data:data
    }
};