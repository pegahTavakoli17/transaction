import React, { useState } from "react";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import PersianDatePicker from "./PersianDatePicker";
import { useNavigate } from "react-router-dom";
export default function NewTransaction() {
  const [category, setCategory] = useState("واریز");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isFormValid = price != "" && description != "" && date != "";
  const handleSelectedDate = (date) => {
    setDate(date);
  };
  const handleDepositCategory = () => {
    setCategory("واریز");
  };
  const handleWithDrawCategory = () => {
    setCategory("برداشت");
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const sendNewTransaction = async () => {
    setLoading(true);
    const transactionData = {
      type: category == "واریز" ? "deposit" : "expose",
      amount: price,
      datetime: date,
      note: description,
      category: category,
    };
    try {
      const response = await axios.post(
        "https://93774183-b3f5-47fc-8411-59f1029e8f6a.mock.pstmn.io/api/transactions/",
        transactionData
      );
      if (response.status == 201) {
        setLoading(false);
        navigate("/recenttransactions");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="custom-page">
      <i
        className="bi bi-arrow-right text-right text-dark-blue"
        onClick={() => navigate("/")}
      ></i>
      {/* category button */}
      <div className="d-flex justify-content-center ">
        <button
          className={`${
            category == "واریز" ? "dark-blue-btn" : "light-blue-btn"
          } `}
          onClick={handleDepositCategory}
        >
          واریز جدید
        </button>
        <button
          className={`${
            category == "برداشت" ? "dark-blue-btn" : "light-blue-btn"
          } `}
          onClick={handleWithDrawCategory}
        >
          برداشت جدید
        </button>
      </div>

      <div className="d-flex flex-column align-items-center mt-4">
        {/* select date */}
        <div className="d-flex justify-content-between w-100">
          <span className="text-dark-blue col-5">
            <i className="bi bi-calendar2-event text-dark-blue  ml-1"></i>
            تاریخ:
          </span>
          <div className="col-7 p-0">
            <PersianDatePicker onDateSelect={handleSelectedDate} />
          </div>
        </div>
        {/* amount */}
        <div className="d-flex w-100 justify-content-between mt-4">
          <span className="text-dark-blue col-5">
            <i className="bi bi-cash text-dark-blue  ml-1"></i>
            مبلغ(ریال):
          </span>
          <input
            type="number"
            className="col-7 "
            value={price}
            onChange={handlePrice}
          />
        </div>
        {/* category */}
        <div className="d-flex w-100 justify-content-between mt-4">
          <span className="text-dark-blue col-5">
            <i className="bi bi-bookmark text-dark-blue  ml-1"></i>
            دسته‌بندی:
          </span>
          <input
            type="text"
            className="col-7"
            readOnly
            disabled
            value={category}
          />
        </div>
        {/* description */}
        <div className="d-flex w-100 justify-content-between mt-4">
          <span className="text-dark-blue col-5">
            <i className="bi bi-file-text text-dark-blue  ml-1"></i>
            یادداشت:
          </span>
          <textarea
            rows="4"
            cols={100}
            value={description}
            onChange={handleDescription}
          ></textarea>
        </div>
      </div>
      {/* save changes */}
      <div className="d-flex justify-content-center">
        <button
          className={`${isFormValid ? "dark-blue-btn" : "grey-btn"}  mt-5`}
          style={{ width: "80%" }}
          onClick={sendNewTransaction}
          disabled={!isFormValid}
        >
          {loading && <PulseLoader color="#fff" />}
          {!loading && <span>ذخیره</span>}
        </button>
      </div>
    </div>
  );
}
