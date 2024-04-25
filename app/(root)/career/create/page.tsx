import MaxWidthContainer from "@/components/MaxWidthContainer";
import CareerForm from "@/components/atom/CareerForm";
import React from "react";

const CreateCareerPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <div className="grid grid-cols-5">
        <div className="grid-cols-1 md:col-span-2">
          <CareerForm type="Create" />
        </div>
        <div className="col-span-1 md:col-span-3"></div>
      </div>
    </MaxWidthContainer>
  );
};

export default CreateCareerPage;
