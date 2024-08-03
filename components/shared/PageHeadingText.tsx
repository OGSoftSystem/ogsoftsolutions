import React from "react";

const PageHeadingText = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h1 className="main-heading">{title}</h1>
      <h3 className="main-desc">{description}</h3>
    </div>
  );
};

export default PageHeadingText;
