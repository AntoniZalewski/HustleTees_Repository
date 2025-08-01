import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { 
        productListReducer, 
        productDetailsReducer, 
        productDeleteReducer, 
        productCreateReducer,
        productUpdateReducer,
        productReviewCreateReducer,
        productReviewUpdateReducer,
        productReviewDeleteReducer,

     } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer,  
    userUpdateProfileReducer, 
    userListReducer, 
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers';
import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
 } from './reducers/orderReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productReviewUpdate: productReviewUpdateReducer,
    productReviewDelete: productReviewDeleteReducer,

    cart: cartReducer,
    
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
});


const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : null
    
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ?
    JSON.parse(localStorage.getItem('paymentMethod')) : ''

    const orderDetailsFromStorage = localStorage.getItem('orderDetails')
    ? JSON.parse(localStorage.getItem('orderDetails'))
    : undefined; 

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
    orderDetails: { order: orderDetailsFromStorage }, 
};

const store = configureStore({
    reducer,
    preloadedState: initialState, 
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;