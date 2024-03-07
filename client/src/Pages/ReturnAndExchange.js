import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { NavLink, useParams } from "react-router-dom";
import Header from "../components/Header";
import moment from "moment";

const ReturnAndExchange = () => {
  const [order, setOrder] = useState("");
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState([]);
  const [newOrderStatus, setNewOrderStatus] = useState("");
  const [reason, setReason] = useState("");
  const [reasonSelected, setReasonSelected] = useState(false);
  const { id } = useParams("");

  const orderDetail = async () => {
    const token = localStorage.getItem("usersdatatoken");
    const res = await fetch(`/order/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
    });

    console.log(res);
    const data = await res.json();
    if (res.status !== 201) {
      alert("NO data availble");
    } else {
      setOrder(data?.order);
      setProducts(data?.order?.products);
      setAddress(data?.order?.shipping_address);
    }
  };

  const cancelHandler = () =>{

  }
  const continueButtonHandler = async () => {
    console.log("reason");
    setReasonSelected(true);
    console.log(reasonSelected);

    if(reason === 'option33'){
      returnAddtoBalance()
    }
  };

  const returnAddtoBalance = async()=>{
    const token = localStorage.getItem("usersdatatoken");
    const res = await fetch(`/returnorder/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
     
      credentials: "include",
    });

    console.log(res);
    const data = await res.json();
    if (res.status !== 201) {
      alert("NO data availble");
    } else {
      orderDetail();
    }
  }
  useEffect(() => {
    orderDetail();
    // cancelHandler();
  }, []);
  // console.log(order);
  // console.log(products);
  // console.log(products[0]?.product[0]?.imgpath);
  // console.log(address);

  return (
    <>
      <Header />

      <div className="breadcrumb-section breadcrumb-bg-color--golden">
        <div className="breadcrumb-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="breadcrumb-title">My Order</h3>
                <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                  <nav aria-label="breadcrumb">
                    <ul>
                      <li>
                        <NavLink to={"/"}>Home</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/myaccount"}>Order</NavLink>
                      </li>

                      <li className="active" aria-current="page">
                        #{order._id}
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="wishlish-table-wrapper"
        data-aos="fade-up"
        data-aos-delay="0"
      >
        <div className="container">
          {order?.orderStatus == "processing" ||
          order?.orderStatus == "confirmed" ? (
            <>
              <div className="login_submit">
                <button
                  className="btn btn-md btn-black-default-hover mb-4"
                  type="submit"
                  onClick={cancelHandler}
                >
                  cancel
                </button>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="row">
            <div className="col-12">
              <div className="table_desc">
                <div className="table_page table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th className="product_remove">Date</th>
                        <th className="product_thumb">Image</th>
                        <th className="product_name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product_stock">Status</th>
                        <th className="product_addcart">Total </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td class="product_remove">
                              <a href="#">
                                {moment(order.orderDate).format("L")}{" "}
                              </a>
                            </td>
                            <td class="product_thumb">
                              <a>
                                <img
                                  src={`/uploads/${item.product[0].imgpath}`}
                                  alt=""
                                />
                              </a>
                            </td>
                            <td class="product_name">
                              <a href="product-details-default.html">
                                {item.product[0].product_name}
                              </a>
                            </td>
                            <td class="product-price">
                              ₹{item.product[0].selling_price}.00 X{" "}
                              {item.quantity}
                              <del style={{ fontSize: "10px" }}>
                                ₹{item?.product[0].actual_price}.00
                              </del>
                            </td>
                            <td class="product_stock">{order.orderStatus}</td>
                            <td class="product_addcart">
                              <a
                                href="#"
                                class="btn btn-md btn-golden"
                                data-bs-toggle="modal"
                                data-bs-target="#modalAddcart"
                              >
                                {item.product[0].selling_price * item.quantity}{" "}
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {reasonSelected ? (
            <div className="coupon_area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div
                      className="coupon_code left"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <h3>How can we make it right ? </h3>
                      <div className="coupon_inner">
                        <span class="plan-details">
                          <div class="form-check">
                            <input
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value="option11"
                              onChange={(e) => setReason(e.target.value)}
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
                              Default radio a1
                            </label>
                          </div>
                        </span>
                        <span class="plan-details">
                          <div class="form-check">
                            <input
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value="option22"
                              onChange={(e) => setReason(e.target.value)}
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
                              Default radio a2
                            </label>
                          </div>
                        </span>
                        <span class="plan-details">
                          <div class="form-check">
                            <input
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value="option33"
                              onChange={(e) => setReason(e.target.value)}
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
                              Default radio a3
                            </label>
                          </div>
                        </span>
                        
                        {reason ? (
                          <button
                            class="btn btn-md btn-golden"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAddcart"
                            style={{ marginTop: "15px", width: "100%" }}
                            onClick={() => continueButtonHandler()}
                          >
                            Continue
                          </button>
                        ) : (
                          <button
                            class="btn btn-md btn-golden"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAddcart"
                            style={{ marginTop: "15px", width: "100%" }}
                            onClick={() => continueButtonHandler()}
                            disabled
                          >
                            Continue
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <SubTotal iteam={list}/> */}
                </div>
              </div>
            </div>
          ) : (
            <div className="coupon_area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div
                      className="coupon_code left"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <h3>Why are you returning this ? </h3>
                      <div className="coupon_inner">
                        <span class="plan-details">
                          <div class="form-check">
                            <input
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value="option1"
                              onChange={(e) => setReason(e.target.value)}
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
                              Default radio 1
                            </label>
                          </div>
                        </span>
                        <span class="plan-details">
                          <div class="form-check">
                            <input
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value="option2"
                              onChange={(e) => setReason(e.target.value)}
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
                              Default radio 2
                            </label>
                          </div>
                        </span>
                        <span class="plan-details">
                          <div class="form-check">
                            <input
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value="option3"
                              onChange={(e) => setReason(e.target.value)}
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
                              Default radio 3
                            </label>
                          </div>
                        </span>
                        <span class="plan-details">
                          <div class="form-check">
                            <input
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value="option4"
                              onChange={(e) => setReason(e.target.value)}
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
                              Default radio 4
                            </label>
                          </div>
                        </span>
                        {reason ? (
                          <button
                            class="btn btn-md btn-golden"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAddcart"
                            style={{ marginTop: "15px", width: "100%" }}
                            onClick={() => continueButtonHandler()}
                          >
                            Continue
                          </button>
                        ) : (
                          <button
                            class="btn btn-md btn-golden"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAddcart"
                            style={{ marginTop: "15px", width: "100%" }}
                            onClick={() => continueButtonHandler()}
                            disabled
                          >
                            Continue
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <SubTotal iteam={list}/> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* 

       
    } */}
      <Footer />
    </>
  );
};

export default ReturnAndExchange;
