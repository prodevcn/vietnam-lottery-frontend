import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../../app/containers/Header";
import { login } from "../../app/redux/actions/auth";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: "30%",
    margin: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Login = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const { t } = useTranslation();
  const { handleSubmit } = props;
  const { authenticated } = useSelector((state) => state.auth);

  const handleFormSubmit = (formProps) => {
    dispatch(login(formProps, router));
  };

  useEffect(() => {
    console.log(authenticated);
    if (authenticated) {
      router.push("/");
    }
  }, [authenticated]);

  return (
    <div>
      <Header />
      <Card className={classes.root}>
        <CardContent>
          <form id="login_form" onSubmit={handleSubmit((e) => handleFormSubmit(e))}>
            <div className="form-group">
              <label className="state_text">Email</label>
              <Field name="email" className="form-control" required component="input" type="text" />
            </div>
            <div className="form-group">
              <label className="state_text">Password</label>
              <Field name="password" className="form-control" required component="input" type="password" />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn__contained">
                {t("login")}
              </button>{" "}
              &nbsp;
              <button
                type="button"
                className="btn__outlined"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/auth/register");
                }}
              >
                {t("signup")}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default reduxForm({ form: "login" })(Login);
