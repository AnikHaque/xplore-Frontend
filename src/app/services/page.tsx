import Header from "@/components/layouts/Header";
import LayoutPage from "@/components/ui/Layout";
import Heading from "@/utils/Heading";
import dynamic from "next/dynamic";
import React from "react";

const Pages = () => {
  return (
    <div className="">
      <Heading
        title="HotelHaven || Services"
        description="HotelHaven is booking platform"
        keywords="Hotel, Property, Du Plex"
      />
      <Header />
      <LayoutPage />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Pages), {
  ssr: false,
});
