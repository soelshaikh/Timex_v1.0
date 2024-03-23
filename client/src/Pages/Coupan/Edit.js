import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import AdminHeader from "../AdminHeader";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

const Edit = () => {
  const [coupanName, setCoupanName] = useState("");
  const [coupanNameError, setCoupanNameError] = useState("");
  const [coupanDiscount, setCoupanDiscount] = useState("");
  const [coupanDiscountError, setCoupanDiscountError] = useState("");
  const [sd, setStartDate] = useState(new Date());
  const [ed, setEndDate] = useState(new Date());
  const [isDisplay, setIsDisplay] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("");
  const navigate = useNavigate();
  const [list, setList] = useState("");
  const moment = require("moment");

  const { id } = useParams("");
  const getData = async () => {
    const res = await fetch(`/getcoupan/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.status === 422 || !res) {
      console.log("error");
    } else {
      setCoupanName(data.coupan.coupanName);
      setCoupanDiscount(data.coupan.coupanDiscount);
    }
  };

  const updatecoupan = async () => {
    let startDate = moment(sd).format("YYYY/MM/DD");
    let endDate = moment(ed).format("YYYY/MM/DD");
    console.log(coupanName, coupanDiscount,startDate,endDate,isDisplay,isActive);
    const res = await fetch(`/updatecoupan/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coupanName,
        coupanDiscount,
        startDate,
        endDate,
        isDisplay,
        isActive,
      }),
    });

    console.log(res);
    const data = await res.json();

    if (data.status == 422 || !res) {
      console.log("error");
    } else {
      alert("done");
      navigate("/coupan");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AdminHeader />

      <form>
        <div style={{ width: "80%" }}>
          <Form
            style={{
              marginLeft: "24rem",
              marginTop: "4rem",
              marginRight: "10rem",
            }}
          >
            <Form.Group className="mb-3" controlId="formGroupCoupanName">
              <Form.Label>Coupon Name</Form.Label>
              <Form.Control
                type="text"
                class="form-control"
                controlId="exampleInputCoupanName"
                value={coupanName || ""}
                onChange={(e) => setCoupanName(e.target.value)}
                placeholder="Enter Coupon Name"
                name="coupanName"
              />
              <div style={{ color: "red" }}>{coupanNameError}</div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupDiscount">
              <Form.Label>Discount (%)</Form.Label>
              <Form.Control
                type="number" // Changed data type to number
                class="form-control"
                controlId="exampleInputDiscount"
                value={coupanDiscount || ""}
                onChange={(e) => setCoupanDiscount(e.target.value)}
                placeholder="Enter Coupon Discount"
                name="coupanDiscount"
              />
              <div style={{ color: "red" }}>{coupanDiscountError}</div>
            </Form.Group>

            <div style={{ display: "flex" }}></div>

            <div style={{ display: "flex" }}>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={sd}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Expiry Date</Form.Label>
                <div>
                  <DatePicker
                    selected={ed}
                    className="form-control"
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Display</Form.Label>
                <select
                  value={isDisplay || ""}
                  onChange={(e) => setIsDisplay(e.target.value)}
                  selected
                  name="isFeatured"
                  className="form-control"
                >
                  <>
                    <option value="false">Disable</option>
                    <option value="true">Enable</option>
                  </>
                </select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Active & Inactive</Form.Label>
                <select
                  value={isActive || ""}
                  onChange={(e) => setIsActive(e.target.value)}
                  selected
                  name="isActive"
                  className="form-control"
                >
                  <>
                    <option value="false">Inactive</option>
                    <option value="true">Active</option>
                  </>
                </select>
              </Form.Group>
            </div>

            <Button
              variant="primary"
              style={{ width: "17rem", marginLeft: "13rem" }}
              onClick={updatecoupan} // Change the function name for update
            >
              Update
            </Button>
          </Form>
        </div>
      </form>
    </>
  );
};

export default Edit;
