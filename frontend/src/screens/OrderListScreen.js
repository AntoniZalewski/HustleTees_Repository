import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders, deliverOrder } from '../actions/orderActions'
import { ORDER_DELIVER_RESET } from '../constants/orderConstants'
import { useNavigate } from 'react-router-dom'

function OrderListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders = [] } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { success: successDeliver } = orderDeliver

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }

        if (successDeliver) {
            dispatch({ type: ORDER_DELIVER_RESET })
        }
    }, [dispatch, navigate, userInfo, successDeliver])

    const deliverHandler = (id) => {
        if (window.confirm('Mark this order as delivered?')) {
            dispatch(deliverOrder(id))
        }
    }

    // Sort orders by ID in descending order
    const sortedOrders = orders.slice().sort((a, b) => b._id - a._id)

    return (
        <div>
            <h1>Orders</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                                    ) : (
                                        <Button variant='light' className='btn-sm' onClick={() => deliverHandler(order._id)}>
                                            Mark as Delivered
                                        </Button>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default OrderListScreen