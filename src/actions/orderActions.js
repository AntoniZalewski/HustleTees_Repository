import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,

    ORDER_SAVE_SHIPPING_ADDRESS,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,

} from '../constants/orderConstants';

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: ORDER_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const { userLogin: { userInfo }, cart: { shippingAddress } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post('/api/orders/add/', { ...order, shippingAddress }, config);

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: { ...data, shippingAddress } });

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: { ...data, shippingAddress } });

        dispatch({ type: CART_CLEAR_ITEMS });
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/${id}/`, config);

        const shippingAddress = data.shippingAddress || JSON.parse(localStorage.getItem('shippingAddress')) || {};

        const orderDetails = { ...data, shippingAddress };

        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: orderDetails });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.put(`/api/orders/${orderId}/pay/`, paymentResult, config);

        dispatch({ type: ORDER_PAY_SUCCESS });
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get('/api/orders/myorders/', config);

        dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/orders', config)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const deliverOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVER_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/api/orders/${id}/deliver/`, {}, config)

        dispatch({ type: ORDER_DELIVER_SUCCESS })
    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}