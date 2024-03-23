import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import AdminHeader from "../AdminHeader";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";

import { useNavigate } from "react-router-dom";

const Add = () => {
  const [coupanName, setCoupanName] = useState("");
  const [coupanNameError, setCoupanNameError] = useState("");
  const [coupanDiscount, setCoupanDiscount] = useState("");
  const [coupanDiscountError, setCoupanDiscountError] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDisplay, setIsDisplay] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [endDateError, setEndDateError] = useState("");
  const moment = require("moment");
  
  const navigate = useNavigate();

  const addInputData = async (e) => {
    e.preventDefault();
    let submit = true;
    if (selectedIndex === "") {
      if (moment(startDate).format("DD-MM") > moment(endDate).format("DD-MM")) {
        console.log("satrtdate");
        setEndDateError("Please Select Valid Dates");
        submit = false;
      } else if (
        moment(startDate).format("DD-MM") < moment(endDate).format("DD-MM")
      ) {
        setEndDateError("");
        submit = true;
        console.log("enddate");
      } else {
        setEndDateError("");
        submit = true;
        console.log("same");
      }
      if (coupanName === "") {
        setCoupanNameError("Please Enter Coupan Name");
        submit = false;
      } else {
        setCoupanNameError("");
        submit = true;
      }
      if (coupanDiscount === "") {
        setCoupanDiscountError("Please Enter Discount");
        submit = false;
      } else {
        setCoupanDiscountError("");
        submit = true;
      }

      if (submit == true) {
        let sd = moment(startDate).format("YYYY/MM/DD");
        let ed = moment(endDate).format("YYYY/MM/DD");
        const res = await fetch("/addcoupan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coupanName,
            coupanDiscount,
            sd,
            ed,
            isDisplay,
            isActive,
          }),
        });
        console.log(res);
        const data = await res.json();
        console.log(data);
        if (data.status == 422 || !res) {
          console.log("error");
        } else if (data.status == 424) {
          setCoupanNameError("This Name is Already Exist..!");
        } else {
          setCoupanName("");
          setCoupanDiscount("");

          alert("done");
          navigate("/coupan");
        }
      }
    }
  };
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
            <Form.Group className="mb-3" controlid="formGroupPassword">
              <Form.Label>Coupan Name</Form.Label>
              <Form.Control
                type="text"
                class="form-control"
                controlId="exampleInputUsername1"
                value={coupanName || ""}
                onChange={(e) => setCoupanName(e.target.value)}
                placeholder="Enter Coupan Name"
                name="coupanName"
              />
              <div style={{ color: "red" }}>{coupanNameError}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlid="formGroupPassword">
              <Form.Label>Discount(%)</Form.Label>
              <Form.Control
                type="text"
                class="form-control"
                controlId="exampleInputUsername2"
                value={coupanDiscount || ""}
                onChange={(e) => setCoupanDiscount(e.target.value)}
                placeholder="Enter Coupan Discount"
                name="coupanDiscount"
              />
              <div style={{ color: "red" }}>{coupanDiscountError}</div>
            </Form.Group>
            <div style={{ display: "flex" }}></div>
            <div style={{ display: "flex" }}>
              <Form.Group className="mb-3">
                <label
                  htmlFor="exampleInputUsername1"
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                >
                  Start Date
                </label>
                <div
                  style={{
                    width: "12rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.7rem",
                  }}
                >
                  <DatePicker
                    className="form-control"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <label
                  htmlFor="exampleInputUsername1"
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                >
                  Expiry Date
                </label>

                <div
                  style={{
                    width: "12rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.7rem",
                  }}
                >
                  <DatePicker
                    selected={endDate}
                    className="form-control"
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
                <div style={{ color: "red" }}>{endDateError}</div>
              </Form.Group>
              <Form.Group className="mb-3">
                <label
                  htmlFor="exampleInputUsername1"
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                >
                  Display
                </label>
                <select
                  value={isDisplay || ""}
                  onChange={(e) => setIsDisplay(e.target.value)}
                  selected
                  name="isFeatured"
                  className="form-control"
                  style={{
                    width: "11rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.7rem",
                  }}
                >
                  <>
                    <option value="false">Disable</option>
                    <option value="true">Enable</option>
                  </>
                </select>
              </Form.Group>
              <Form.Group className="mb-3">
                <label
                  htmlFor="exampleInputUsername1"
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                >
                  Active & Inactive
                </label>
                <select
                  value={isActive || ""}
                  onChange={(e) => setIsActive(e.target.value)}
                  selected
                  name="isActive"
                  className="form-control"
                  style={{
                    width: "11rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.7rem",
                  }}
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
              onClick={addInputData}
            >
              Add
            </Button>{" "}
          </Form>
        </div>
      </form>
    </>
  );
};

export default Add;
