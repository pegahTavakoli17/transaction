import React from "react";
import { useNavigate } from "react-router-dom";
export default function NewTransactionBtn() {
  const navigate = useNavigate();
  const goToNewTransaction = () => {
    navigate("/newtransaction");
  };
  return (
    <div>
      <button className="new-btn" onClick={goToNewTransaction}>
        <span style={{ fontSize: "20px" }}>+</span>
      </button>
    </div>
  );
}
