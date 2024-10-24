import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form, Carousel, Modal } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails, createProductReview, updateProductReview, deleteProductReview } from '../actions/productActions';
import ModelViewer from '../components/ModelViewer';
import '../styles/ProductScreen.css'; 
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

function ProductScreen() {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [reviewId, setReviewId] = useState(null);
    const [showModel, setShowModel] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate;

    const productReviewUpdate = useSelector((state) => state.productReviewUpdate);
    const {
        success: successProductReviewUpdate,
    } = productReviewUpdate;

    const productReviewDelete = useSelector((state) => state.productReviewDelete);
    const {
        success: successProductReviewDelete,
    } = productReviewDelete;

    useEffect(() => {
        dispatch(listProductDetails(id));
        return () => {
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        };
    }, [dispatch, id, successProductReview, successProductReviewUpdate, successProductReviewDelete]);

    useEffect(() => {
        if (product) {
            document.documentElement.style.setProperty('--main-color', product.main_color);
            document.documentElement.style.setProperty('--secondary-color', product.sec_color);
        }
    }, [product]);

    useEffect(() => {
        if (successProductReviewUpdate) {
            setEditMode(false);
        }
    }, [successProductReviewUpdate]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (editMode) {
            dispatch(updateProductReview(reviewId, { rating, comment }));
        } else {
            dispatch(createProductReview(id, { rating, comment }));
        }
    };

    const editReviewHandler = (review) => {
        setEditMode(true);
        setReviewId(review._id);
        setRating(review.rating);
        setComment(review.comment);
    };

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteProductReview(reviewId));
    };

    const userHasReviewed = product && product.reviews && product.reviews.some(review => review.user === userInfo?._id);

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
                product && (
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
                                            <Rating value={Number(product.rating)} text={`${product.numReviews} reviews`} />
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

                        <Row className="mt-5">
                            <Col md={6}>
                                <h2>Reviews</h2>
                                {product.reviews && product.reviews.length === 0 && <Message>No Reviews</Message>}
                                <ListGroup variant='flush'>
                                    {userInfo && (!userHasReviewed || editMode) && (
                                        <ListGroup.Item>
                                            <h2>{editMode ? 'Edit Your Review' : 'Write a Customer Review'}</h2>
                                            {successProductReview && (
                                                <Message variant='success'>Review submitted successfully</Message>
                                            )}
                                            {loadingProductReview && <Loader />}
                                            {errorProductReview && (
                                                <Message variant='danger'>{errorProductReview}</Message>
                                            )}
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <div className="star-rating">
                                                        {[...Array(5)].map((_, index) => (
                                                            <React.Fragment key={index}>
                                                                <input
                                                                    type="radio"
                                                                    id={`star${5 - index}`}
                                                                    name="rating"
                                                                    value={5 - index}
                                                                    onChange={(e) => setRating(Number(e.target.value))}
                                                                    checked={rating === 5 - index}
                                                                />
                                                                <label htmlFor={`star${5 - index}`}>&#9733;</label>
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                </Form.Group>
                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        row='3'
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>
                                                <Button
                                                    disabled={loadingProductReview}
                                                    type='submit'
                                                    variant='primary'
                                                >
                                                    {editMode ? 'Update' : 'Submit'}
                                                </Button>
                                            </Form>
                                        </ListGroup.Item>
                                    )}
                                    {product.reviews && product.reviews.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={Number(review.rating)} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                            {userInfo && review.user === userInfo._id && (
                                                <>
                                                    <Button
                                                        variant='light'
                                                        onClick={() => editReviewHandler(review)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant='danger'
                                                        onClick={() => deleteReviewHandler(review._id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </>
                                            )}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
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
                )
            )}
        </>
    );
}

export default ProductScreen;