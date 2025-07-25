import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS, 
    CART_CLEAR_ITEMS,
    CART_SAVE_PAYMENT_METHOD,

} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);

            const updatedCartItems = existItem
                ? state.cartItems.map(x => x.product === existItem.product ? item : x)
                : [...state.cartItems, item];

            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

            return {
                ...state,
                cartItems: updatedCartItems
            };

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            };

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            };


        case CART_CLEAR_ITEMS:
            return { 
                cartItems: [], 
                shippingAddress: {} 
            };

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            };

        default:
            return state;
    }
};