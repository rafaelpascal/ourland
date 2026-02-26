import { Outlet } from "react-router-dom";
// import ScrollToTop from "../../../lib/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      {/* <ScrollToTop /> */}
      <Outlet />
    </>
  );
};

export default RootLayout;
