import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import TermsAndConditions from '../components/TermsAndConditions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

function PlaceOrderScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error } = orderCreate;

    // Calculate prices
    const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [navigate, success, dispatch, order]);

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        }));
    };

    // State for modal visibility
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart && cart.shippingAddress ? (
                                    <>
                                        {cart.shippingAddress.address}, {cart.shippingAddress.city},
                                        {'  '}
                                        {cart.shippingAddress.postalCode}, 
                                        {'  '}
                                        {cart.shippingAddress.country}
                                    </>
                                ) : (
                                    'No shipping address'
                                )}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {cart.paymentMethod}
                            </p>                           
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Cart Items</h2>
                            {cart.cartItems.length === 0 ? <Message variant='info'>
                                Your cart is empty
                            </Message> : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x PLN{item.price} = PLN{item.qty * item.price}
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
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>PLN {itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>PLN {shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>PLN {taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>PLN {totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {error && (
                                <ListGroup.Item>
                                    <Message variant="danger">{error}</Message>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button type="button" 
                                className="btn-block"
                                disabled={cart.cartItems.length === 0}
                                onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <p>
                                    By clicking Place Order button you accept the{' '}
                                    <Button variant="link" onClick={handleShow}>
                                        shop policy
                                    </Button>
                                </p>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

            <TermsAndConditions show={show} handleClose={handleClose} />
        </div>
    );
}

export default PlaceOrderScreen;