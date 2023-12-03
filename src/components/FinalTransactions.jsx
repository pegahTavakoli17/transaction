import React from "react";
import Divider from "@mui/material/Divider";
export default function FinalTransactions({ transactions }) {
  return (
    <div className="d-flex w-100 text-center mt-4 flex-column">
      <Divider className=" w-100" style={{ backgroundColor: "#180883" }} />

      <div className="d-flex py-2">
        <span className="text-success col-4">واریز</span>
        <span className="text-danger col-4">برداشت</span>
        <span className="text-secondary col-4">مجموع</span>
      </div>
      <Divider className=" w-100" style={{ backgroundColor: "#180883" }} />

      <div className="d-flex mt-2">
        {/* income amount */}
        <span className="col-4">
          {Number(transactions.income_sum).toLocaleString()}
          ریال
        </span>
        {/* expence amount */}
        <span className="col-4">
          {Number(transactions.expense_sum).toLocaleString()}
          ریال
        </span>
        {/* deff of expence and income */}
        <span
          className={`${
            transactions.diff > 0 ? "text-success" : "text-danger"
          } col-4`}
        >
          {Number(transactions.diff).toLocaleString()}
          ریال
        </span>
      </div>
    </div>
  );
}
