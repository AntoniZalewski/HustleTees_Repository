// OrderScreen.js
import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import PayPalIntegration from '../components/PayPalIntegration';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

function OrderScreen() {
    const { id: orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading = true, error, order } = orderDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay = false, success: successPay } = orderPay;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else if (!order || order._id !== orderId || successPay) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, orderId, userInfo, navigate, successPay, order]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    const itemsPrice = order?.orderItems
        ? order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
        : 0;

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <h1>Order {order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong> {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                    </p>
                                    <p>
                                        <strong>Address:</strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                        {order.shippingAddress.postalCode},{' '}
                                        {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ? (
                                        <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                    ) : (
                                        <Message variant='danger'>Not Delivered</Message>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant='success'>Paid on {order.paidAt}</Message>
                                    ) : (
                                        <Message variant='danger'>Not Paid</Message>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? (
                                        <Message>Order is empty</Message>
                                    ) : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x PLN{item.price} = PLN{(item.qty * item.price).toFixed(2)}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>PLN{itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>PLN{order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>PLN{order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>PLN{order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            <PayPalIntegration
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            />
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
}

export default OrderScreen;