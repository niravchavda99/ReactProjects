import React from "react";

const NotFound = () => {
  return (
    <div className="container">
      <h1
        className="alert alert-danger"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        Oops...{" "}
        <span role="img" aria-label="oops">
          😵
        </span>{" "}
        <br /> Error 404: Page Not Found
      </h1>
    </div>
  );
};

export default NotFound;
