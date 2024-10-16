import Breadcrumb1 from "@/components/common/Breadcrumb1";
import UserDashBoard from "@/components/dashboard/UserDashBoard";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import InnerPageHeader1 from "@/components/header/InnerPageHeader1";
import React from "react";

export const metadata = {
  title: "Bhargava Auctions",
  icons: {
    // icon: "/assets/img/fav-icon.svg",
    icon: "/assets/img/bh-auction-logo.jpeg",
  },
};
const DashbaordPage = () => {
  return (
    <>
      {/* <InnerPageHeader1 /> */}
      <Header />
      <Breadcrumb1 pagetitle={"Profile"} currentPage={"Profile"} />
      <UserDashBoard />
      <Footer />
    </>
  );
};

export default DashbaordPage;
