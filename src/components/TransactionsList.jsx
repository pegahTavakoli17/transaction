import React, { useState, useEffect } from "react";
import PersianDatePicker from "./PersianDatePicker";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import FinalTransactions from "./FinalTransactions";
import NewTransactionBtn from "./NewTransactionBtn";
import moment from "moment-jalaali";
export default function TransactionsList() {
  const today = moment().format("jYYYY/jMM/jDD");
  const tommarow = moment().add(1, "day").format("jYYYY/jMM/jDD");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tommarow);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState({});
  const isDatesSet = startDate != "" && endDate != "";
  const [selectedType, setSelectedType] = useState("today");
  const handleStartDate = (date) => {
    setStartDate(date);
  };
  const handleEndDate = (date) => {
    setEndDate(date);
  };
  const handleSpecialDates = () => {
    setTransactions({});
    setStartDate("");
    setEndDate("");
    setSelectedType("specialDays");
  };

  const handleTodayType = () => {
    setSelectedType("today");
    setStartDate(today);
    setEndDate(tommarow);
    getTransactions();
  };
  const getTransactions = async () => {
    setLoading(true);
    let response = await axios.get(
      `https://93774183-b3f5-47fc-8411-59f1029e8f6a.mock.pstmn.io/api/transactions/?start=${startDate}&end=${endDate}`
    );
    try {
      if (response.status == 200) {
        setTransactions(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <div className="custom-page w-100 d-flex flex-column align-items-center">
      <div className="d-flex w-90  text-center mx-auto">
        <button
          onClick={handleTodayType}
          className={`${
            selectedType == "today" ? "dark-blue-btn" : "light-blue-btn"
          } col-6`}
        >
          امروز
        </button>

        <button
          onClick={handleSpecialDates}
          className={`${
            selectedType == "specialDays" ? "dark-blue-btn" : "light-blue-btn"
          } col-6`}
        >
          بازه خاص
        </button>
      </div>
      {selectedType == "specialDays" && (
        <div className="mt-3">
          <div className="d-flex ">
            <span className=" text-dark-blue col-5">
              <i className="bi bi-calendar2-event text-dark-blue  ml-1"></i>
              تاریخ شروع:
            </span>
            <div className="col-7 w-100 px-0">
              <PersianDatePicker onDateSelect={handleStartDate} />
            </div>
          </div>
          <div className="d-flex  mt-4">
            <span className=" text-dark-blue col-5">
              <i className="bi bi-calendar2-event text-dark-blue  ml-1"></i>
              تاریخ پایان:
            </span>
            <div className="col-7 w-100 px-0">
              <PersianDatePicker onDateSelect={handleEndDate} />
            </div>
          </div>
          <button
            className={`${
              isDatesSet ? "dark-blue-btn" : "grey-btn"
            } mt-4 w-100`}
            onClick={getTransactions}
            disabled={!isDatesSet}
          >
            {loading && <PulseLoader color="#fff" />}
            {!loading && (
              <span>
                <i className="bi bi-search ml-2"></i>
                اعمال
              </span>
            )}
          </button>
        </div>
      )}
      {transactions.diff && <FinalTransactions transactions={transactions} />}
      <NewTransactionBtn />
      {loading && (
        <PulseLoader
          color="#180883"
          className="d-flex justify-content-center align-items-center w-100 "
          style={{ height: "80vh" }}
        />
      )}
    </div>
  );
}
