import LoginPage from "@/components/Authentication/LoginPage";
import SignUpPage from "@/components/Authentication/SignUpPage";
import Header from "@/components/layouts/Header";
import Heading from "@/utils/Heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HotelHaven | SignUp",
};

const Login = () => {
  return (
    <>
      <Heading
        title="HotelHaven || SignUp"
        description="HotelHaven is booking platform"
        keywords="Hotel, Property, Du Plex"
      />
      <Header />
      <SignUpPage />
    </>
  );
};

export default Login;
