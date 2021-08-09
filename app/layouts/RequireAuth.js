import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const RequireAuth = (ComposedPage) => {
  const Authentication = (props) => {
    const { authenticated } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!authenticated)
        router.push({ pathname: "/", query: { message: "unAuthorized" } });
    }, []);

    return (
      <>
        <ComposedPage />
      </>
    );
  };
  return Authentication;
};

export default RequireAuth;
