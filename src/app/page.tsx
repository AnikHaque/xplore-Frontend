import AllCategory from "@/components/Category/AllCategory";
import AvailableServiceSection from "@/components/Services/AvailabeService";
import UpComingService from "@/components/Services/UpcommingService";
import Header from "@/components/layouts/Header";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/ui/Hero";
import OfferSection from "@/components/ui/OffersSection";
import OverviewForm from "@/components/ui/OverView";
import UserReviews from "@/components/ui/Reviews";
import TrendingDestination from "@/components/ui/TrendingDestination";
import Heading from "@/utils/Heading";
import dynamic from "next/dynamic";

const RootPage = () => {
  return (
    <div>
      <Heading
        title="HotelHaven || Home"
        description="HotelHaven is booking platform"
        keywords="Hotel, Property, Du Plex"
      />
      <Header />
      <Hero />
      <OfferSection />
      <TrendingDestination />
      <AvailableServiceSection />
      <UpComingService />
      <AllCategory />
      <OverviewForm />
      <UserReviews />
      <Footer />
    </div>
  );
};

export default dynamic(() => Promise.resolve(RootPage), {
  ssr: false,
});
