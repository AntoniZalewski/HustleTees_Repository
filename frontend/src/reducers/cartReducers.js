import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);

            const updatedCartItems = existItem
                ? state.cartItems.map(x => x.product === existItem.product ? item : x)
                : [...state.cartItems, item];

            // Zapisujemy koszyk do localStorage
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

            return {
                ...state,
                cartItems: updatedCartItems
            };

        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems:state.cartItems.filter(x => x.product !== action.payload)
            }

        default:
            return state;
    }
}
