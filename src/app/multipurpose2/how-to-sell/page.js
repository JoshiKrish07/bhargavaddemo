
import Breadcrumb3 from "@/components/common/Breadcrumb3";
import Footer3 from "@/components/footer/Footer3";
import Header3 from "@/components/header/Header3";
import HowToSell from "@/components/how-to-sell/HowToSell";
export const metadata = {
  icons: {
    icon: "/assets/img/fav-icon.svg",
    title:"Probid- Multi Vendor Auction and Bidding Next js Template."
  },
};

const HowToSellPage = () => {
  return (
    <>
      <Header3 />
      <Breadcrumb3 currentPage={"How To Sell"} pagetitle={"How To Sell"} />
      <HowToSell/>
      <Footer3 />
    </>
  );
};

export default HowToSellPage;
