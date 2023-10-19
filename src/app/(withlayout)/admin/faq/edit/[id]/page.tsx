import React from "react";

const page = ({ params }: any) => {
  console.log(params.id);
  return (
    <div>
      <h1>Update</h1>
    </div>
  );
};

export default page;
