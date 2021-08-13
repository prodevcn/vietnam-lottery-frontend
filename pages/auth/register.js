import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../../app/containers/Header";
import { register } from "../../app/redux/actions/auth";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: "50%",
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

const Register = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const { t } = useTranslation();
  const { handleSubmit } = props;
  const { authenticated } = useSelector((state) => state.auth);

  const handleFormSubmit = (formProps) => {
    dispatch(register(formProps, router));
  };

  useEffect(() => {
    if (authenticated) {
      router.push("/");
    }
  }, [authenticated]);

  return (
    <div>
      <Header />
      <Card className={classes.root}>
        <CardContent>
          <form id="signup_form" onSubmit={handleSubmit((e) => handleFormSubmit(e))}>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="state_text">First Name</label>
                <Field name="firstName" className="form-control" required component="input" type="text" />
              </div>
              <div className="col-md-6 form-group">
                <label className="state_text">Last Name</label>
                <Field name="lastName" className="form-control" required component="input" type="text" />
              </div>
            </div>
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
                {t("signup")}
              </button>{" "}
              &nbsp;
              <button
                type="button"
                className="btn__outlined"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/auth/login");
                }}
              >
                {t("login")}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default reduxForm({ form: "login" })(Register);
