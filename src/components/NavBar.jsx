import React, { useEffect, useState } from "react";
import axios from "axios";
export default function NavBar() {
  const [openedMenu, setOpenedMenu] = useState(false);
  const [fullname, setFullname] = useState("");
  const [balance, setBalance] = useState(0);
  const handleOpenedMenu = () => {
    setOpenedMenu(!openedMenu);
  };
  const getUserInfo = async () => {
    let response = await axios.get(
      "https://93774183-b3f5-47fc-8411-59f1029e8f6a.mock.pstmn.io/api/balance/"
    );
    try {
      if (response.status == 200) {
        setFullname(response.data.fullname);
        setBalance(response.data.balance);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="navBar d-flex justify-content-center p-2 flex-column">
      <div>
        <i
          className="bi bi-grid-fill text-white h-100 "
          onClick={handleOpenedMenu}
        ></i>
      </div>
      {openedMenu && (
        <div className="d-flex justify-content-between px-2">
          <div>
            <div className="mt-2">
              <span className="text-white fs-small">خوش آمدید</span>
              <h5 className="text-white mt-2">{fullname}</h5>
            </div>
            <div className="mt-3">
              <span className="text-white fs-small">موجودی </span>
              <h5 className="text-white mt-2">
                {Number(balance).toLocaleString()} ریال
              </h5>
            </div>
          </div>
          <div>
            <img src="./avatar.png" alt="avatar" className="avatar-img" />
          </div>
        </div>
      )}
    </div>
  );
}
