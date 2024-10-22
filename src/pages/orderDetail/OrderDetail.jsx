import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./OrderDetail.scss";
import { useLocation } from "react-router-dom";
import { userRequest } from "../../axios";
const OrderDetail = () => {
  const pathname = useLocation().pathname;
  const [order, setOrder] = useState({});
  const userId = pathname.split("/")[2];
  useEffect(() => {
    const getOrder = async () => {
      const res = await userRequest.get("/api/order/findOrder/" + userId);
      console.log(res.data.data);
      setOrder(res.data.data);
    };
    getOrder();
  }, []);
  const date = new Date(order?.createdAt).toLocaleDateString("en-Gb");
  const quantity = order?.products
    ? order?.products.reduce((acc, product) => acc + product.quantity, 0)
    : null;
  console.log(order);
  
  return (
    
    <div className="order">
      <Header title={ "Order Details" } />

      <div className="mainContainer">
        <div className="top">
          <div className="generalInfo">
            <div className="statusInfo">
              <p>
                Order No: <span>#{ order?._id }</span>
              </p>
              <p className="status">{ order?.orderStatus }</p>
            </div>
            <div className="userInfo">
              <div className="infoItem">
                <h3>Order created at</h3>
                <p>{ date }</p>
              </div>
              <div className="infoItem">
                <h3>Name</h3>
                <p>{ order?.userId?.username }</p>
              </div>
              <div className="infoItem">
                <h3>Email</h3>
                <p>{ order?.userId?.email }</p>
              </div>
            </div>
          </div>
          <div className="priceInfo">
            <h3>Price</h3>
            <p>
              subTotal: <span>${ order?.totalAmount * 0.01 }</span>
            </p>
            <p>
              Total Item: <span>{ quantity }</span>
            </p>
            <p>
              Shipping: <span>Free</span>
            </p>
            <p className="total">
              Total: <span>${ order?.totalAmount * 0.01 }</span>
            </p>
          </div>
        </div>
        <div className="bottom">
          <h3>Order Items</h3>
          <div className="orderItem">
            <div class="cart-container">
              <div class="cart-header">
                <div class="cart-header-photo">PHOTO</div>
                <div class="cart-header-name">NAME</div>
                <div class="cart-header-quantity">QUANTITY</div>
                <div class="cart-header-price">PRICE</div>
                <div class="cart-header-total">TOTAL</div>
              </div>
              { order?.products &&
                order?.products.map((item) => {
                  return (
                    <div class="cart-item">
                      <div class="cart-photo">
                        <img src={ item.productId.img } />
                      </div>
                      <div>{ item.productId.title }</div>
                      <div>{ item.quantity }</div>
                      <div>${ item.price }</div>
                      <div>${ item.quantity * item.price }</div>
                    </div>
                  );
                }) }
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default OrderDetail;
