import LoginPage from "@/components/Authentication/LoginPage";
import Header from "@/components/layouts/Header";
import Heading from "@/utils/Heading";
import { Metadata } from "next";

const Login = () => {
  return (
    <>
      <Heading
        title="HotelHaven || Login"
        description="HotelHaven is booking platform"
        keywords="Hotel, Property, Du Plex"
      />
      <Header />
      <LoginPage />
    </>
  );
};

export default Login;
