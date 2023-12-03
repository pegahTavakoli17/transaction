import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import TransactionsList from "./components/TransactionsList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewTransaction from "./components/NewTransaction";
import RecentTransaction from "./components/RecentTransaction";

export default function main() {
  const ScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
    return null;
  };
  const theme = createTheme({
    typography: {
      fontFamily: "",
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <ScrollToTop />
          <Routes>
            <Route index element={<TransactionsList />} />
            <Route path="/newtransaction" element={<NewTransaction />} />
            <Route path="/recenttransactions" element={<RecentTransaction />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
