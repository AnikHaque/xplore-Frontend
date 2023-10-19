import ActivationPage from "@/components/Authentication/ActivationPage";
import Header from "@/components/layouts/Header";
import Heading from "@/utils/Heading";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HotelHaven | Activate User",
};

const Login = () => {
  return (
    <>
      <Heading
        title="HotelHaven || Active Account"
        description="HotelHaven is booking platform"
        keywords="Hotel, Property, Du Plex"
      />
      <Header />
      <ActivationPage />
    </>
  );
};

export default Login;
