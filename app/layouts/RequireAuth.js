import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const RequireAuth = (ComposedPage) => {
  const Authentication = (props) => {
    const { authenticated } = useSelector((state) => state.auth);
    const router = useRouter();
    const [cookies] = useCookies();

    useEffect(() => {
      if (!cookies.token)
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
