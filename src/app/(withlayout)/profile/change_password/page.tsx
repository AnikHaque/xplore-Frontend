"use client";

import dynamic from "next/dynamic";

const ChangePassword = () => {
  return (
    <div>
      <ChangePassword />
    </div>
  );
};

export default dynamic(() => Promise.resolve(ChangePassword), {
  ssr: false,
});
