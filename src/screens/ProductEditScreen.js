import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from 'axios';

function ProductEditScreen() {
    const { id: productId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [numReviews, setNumReviews] = useState(0);
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [model3d, setModel3d] = useState('');
    const [video, setVideo] = useState('');
    const [mainColor, setMainColor] = useState('#FFFFFF');
    const [secColor, setSecColor] = useState('#000000');
    const [productImages, setProductImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate('/admin/productlist');
        } else {
            if (!product || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setMainImage(product.main_image);
                setDescription(product.description);
                setRating(product.rating);
                setNumReviews(product.numReviews);
                setPrice(product.price);
                setCountInStock(product.countInStock);
                setModel3d(product.model_3d);
                setVideo(product.video);
                setMainColor(product.main_color);
                setSecColor(product.sec_color);
                setProductImages(product.images.map(image => image.image));
            }
        }
    }, [dispatch, navigate, productId, product, successUpdate]);

    const uploadFileHandler = async (e, setFile, fileType) => {
        const files = e.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }
        formData.append('file_type', fileType);
        formData.append('product_id', productId);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/api/products/upload/', formData, config);
            if (fileType === 'product_images') {
                setFile(prevImages => [...prevImages, ...data.urls]);
            } else {
                setFile(data.urls[0]); // Ensure the backend returns the URL of the uploaded file
            }
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                main_image: mainImage,
                description,
                rating,
                numReviews,
                price,
                countInStock,
                model_3d: model3d,
                video,
                main_color: mainColor,
                sec_color: secColor,
                images: productImages,
            })
        );
    };

    return (
        <div>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='mainImage'>
                            <Form.Label>Main Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter main image URL'
                                value={mainImage}
                                onChange={(e) => setMainImage(e.target.value)}
                            ></Form.Control>

                            <input
                                type='file'
                                id='image-file'
                                label='Choose File'
                                onChange={(e) => uploadFileHandler(e, setMainImage, 'main_images')}
                            />
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter count in stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='model3d'>
                            <Form.Label>3D Model</Form.Label>
                            <input
                                type='file'
                                label='Choose File'
                                onChange={(e) => uploadFileHandler(e, setModel3d, 'models')}
                            />
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='video'>
                            <Form.Label>Video</Form.Label>
                            <input
                                type='file'
                                label='Choose File'
                                onChange={(e) => uploadFileHandler(e, setVideo, 'videos')}
                            />
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='productImages'>
                            <Form.Label>Product Images</Form.Label>
                            <input
                                type='file'
                                multiple
                                label='Choose Files'
                                onChange={(e) => uploadFileHandler(e, setProductImages, 'product_images')}
                            />
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='mainColor'>
                            <Form.Label>Main Color</Form.Label>
                            <Form.Control
                                type='color'
                                value={mainColor}
                                onChange={(e) => setMainColor(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='secColor'>
                            <Form.Label>Secondary Color</Form.Label>
                            <Form.Control
                                type='color'
                                value={secColor}
                                onChange={(e) => setSecColor(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    );
}

export default ProductEditScreen;