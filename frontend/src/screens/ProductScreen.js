import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form, Carousel, Modal } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';
import ModelViewer from '../components/ModelViewer';
import '../styles/ProductScreen.css'; // Updated import path

function ProductScreen() {
    const [qty, setQty] = useState(1);
    const [showModel, setShowModel] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            document.documentElement.style.setProperty('--main-color', product.main_color);
            document.documentElement.style.setProperty('--secondary-color', product.sec_color);
        }
    }, [product]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row className="product-screen-row">
                        <Col md={7} className="carousel-container">
                            <Carousel
                                prevIcon={<span className="arrow arrow-left" />}
                                nextIcon={<span className="arrow arrow-right" />}
                            >
                                <Carousel.Item>
                                    <Image src={product.main_image_url} alt={product.name} fluid />
                                </Carousel.Item>
                                {product.images && product.images.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <Image src={image} alt={`Product image ${index + 1}`} fluid />
                                    </Carousel.Item>
                                ))}
                                {product.video_url && (
                                    <Carousel.Item>
                                        <video controls controlsList="nodownload" width="100%">
                                            <source src={product.video_url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </Col>
                        <Col md={5}>
                            <div className="product-info-container">
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>Price: PLN{product.price}</ListGroup.Item>
                                    <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                                </ListGroup>
                                <Card className="mt-3">
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>PLN{product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control
                                                            as='select'
                                                            value={qty}
                                                            onChange={(e) => setQty(Number(e.target.value))}
                                                        >
                                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandler}
                                                className='btn-block'
                                                type='button'
                                                disabled={product.countInStock === 0 || qty > product.countInStock}
                                            >
                                                Add To Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                                <div className="round-button" onClick={() => setShowModel(true)}>
                                    3D
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Modal show={showModel} onHide={() => setShowModel(false)} size="lg" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>3D Model Viewer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {product.model_3d ? (
                                <ModelViewer url={product.model_3d} />
                            ) : (
                                <p>No 3D model available for this product.</p>
                            )}
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </>
    );
}

export default ProductScreen;