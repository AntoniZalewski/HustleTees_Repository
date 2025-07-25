import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

function CartScreen() {
    const { id: productId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        if (userInfo) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=/shipping');
        }
    };

    return (
        <div>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <Message variant='info'>
                            Your cart is empty <Link to='/'>Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>PLN{item.price}</Col>

                                        <Col md={3}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                    // Defensive check to ensure item.countInStock is a valid number
                                                    Number.isInteger(item.countInStock) && item.countInStock > 0
                                                        ? [...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                        : null
                                                }
                                            </Form.Control>
                                        </Col>

                                        <Col md={2}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>

                <Col md={4}>
                    <Card>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                          PLN{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                      </ListGroup>   

                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn-black'
                          disabled={cartItems.length === 0}
                          onClick={checkoutHandler}
                        >
                          Proceed To Checkout
                        </Button>
                      </ListGroup.Item>                 
                    </Card>
                </Col>

            </Row>
        </div>
    );
}

export default CartScreen;