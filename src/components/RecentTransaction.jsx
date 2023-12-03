import React, { useState, useEffect } from "react";
import moment from "moment-jalaali";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import Divider from "@mui/material/Divider";
import NewTransactionBtn from "./NewTransactionBtn";

export default function RecentTransaction() {
  const today = moment().format("jYYYY/jMM/jDD");
  const tommarow = moment().add(1, "day").format("jYYYY/jMM/jDD");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tommarow);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    setLoading(true);
    let response = await axios.get(
      `https://93774183-b3f5-47fc-8411-59f1029e8f6a.mock.pstmn.io/api/transactions/?start=${startDate}&end=${endDate}`
    );
    try {
      if (response.status == 200) {
        setTransactions(response.data.transactions);
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
    <div className="custom-page">
      <h5 className="text-dark-blue mb-3">تراکنش‌های اخیر</h5>
      {/* loading */}
      {loading && (
        <PulseLoader
          color="#180883"
          className="d-flex justify-content-center align-items-center w-100 "
          style={{ height: "80vh" }}
        />
      )}
      {/* list of recent transactions */}
      {!loading && transactions.length != 0 && (
        <div>
          {transactions.map((item, index) => {
            return (
              <div className="d-flex flex-column" key={index}>
                <Divider
                  className=" w-100 "
                  style={{ backgroundColor: "#180883" }}
                />
                <div className="d-flex w-100 p-2">
                  <span>
                    {item.type == "income" ? (
                      <i
                        className="bi bi-plus-circle-dotted text-success"
                        style={{ fontSize: "18px" }}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-dash-circle-dotted text-danger"
                        style={{ fontSize: "18px" }}
                      ></i>
                    )}
                  </span>
                  <span
                    className={`${
                      item.type == "income" ? "text-success" : "text-danger"
                    } col-3`}
                  >
                    {item.category}
                  </span>
                  <span className="col-4">{item.datetime}</span>
                  <span
                    className={`${
                      item.type == "income" ? "text-success" : "text-danger"
                    } col-4`}
                  >
                    {Number(item.amount).toLocaleString()}
                    ریال
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* button for navigate to new transactions */}
      <NewTransactionBtn />
    </div>
  );
}
