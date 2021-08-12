import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { checkAuth } from "../redux/actions/auth";

const RequireAuth = (ComposedPage) => {
  const Authentication = () => {
    const { authenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(async() => {
      dispatch(checkAuth()).then(status => 
        {
          if (!status) {
            router.push({ pathname: "/", query: { message: "unAuthorized" } });
          }
        }
      );
    }, []);

    return (
      <>
        {authenticated && (
          <ComposedPage />
        )}
      </>
    );
  };
  return Authentication;
};

export default RequireAuth;
