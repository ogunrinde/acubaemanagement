const initial_state = {
    user:{},
    isloggin:false,
    whichpage:'Home',
    access_token:'',
    siteurl:'http://www.acubae.com',
    //siteurl:'http://localhost/CustomerApp/public',
    products:{},
    orders:[],
    customerdetails:{}
};

const DataReducer = (state = initial_state, action) => {
    switch(action.type){
        case 'LOGIN':
                return Object.assign({}, state, {
                isloggin:true,
                access_token:action.data.access_token,
                user:action.data.user
        });
        case 'LOGOUT':
                return Object.assign({}, state, {
                isloggin:false,
                access_token:'',
                user:{}
        });
        case 'WHICHPAGE':
                return Object.assign({}, state, {
                whichpage:action.data.page
        });
        case 'PRODUCTS':
                return Object.assign({}, state, {
                products:action.data.products
        });
        case 'CUSTOMER':
                return Object.assign({}, state, {
                customerdetails:action.data.details
        });
    }
    return state;
};
export default DataReducer;        