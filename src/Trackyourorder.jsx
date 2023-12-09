import React from 'react';
import './Trackyourorder.css';
import { FaHeart } from 'react-icons/fa';
const Trackyourorder = () => {
    return (
        <div className="Trackorder">
            <img src="https://www.beyoung.in/desktop/images/customer-shipment-track/trackinng-order-page-desktop-view.jpg" alt='image' className='trackimage' />


            <div className="container">
                <h1 className="heading"> Track your Order or Shipment</h1>
                <div className="tracking-order-details">
                    <p>Enter your Tracking ID or Order ID to track the status of your order. You can find the Tracking ID and Order ID in the Email/SMS confirming that your order has been shipped.</p>
                    <div className="order-checkbox">
                        <div className="order-slect"><strong> Search By :</strong>
                            <div className='orderselect'>
                                <label>
                                    <input type="radio" name="id" checked />Tracking ID</label>
                                <label>
                                    <input type="radio" name="id" />Order ID</label>
                            </div>
                        </div>
                        <div className="order-slect tracking-id">
                            <strong> Enter Details</strong>
                            <div className='submitt'>
                                <input type="text" placeholder="Enter Tracking #ID" value="" />
                                <button>Submit</button>
                            </div>
                            {/* <strong style="color:red;font-weight:400">
                        </strong> */}
                        </div>
                    </div>
                </div>
                <div className="heading-support">
                    <FaHeart style={{ color: 'red' }} />
                    {'\u00a0'}Thank you for shopping at Beyoung, keep loving!{'\u00a0'}
                    <FaHeart style={{ color: 'red' }} />
                </div>
            </div>
        </div>
    )
}
export default Trackyourorder;