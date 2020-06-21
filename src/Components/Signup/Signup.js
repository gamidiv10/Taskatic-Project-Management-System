import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { NavLink } from "react-router-dom";
import "../Form/Form.scss";
import { Button } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import { TextField } from "mui-rff";

const Signup = ({ history }) => {
  const [isLoading, setLoading] = useState(false);
  let buttonDisable = true;

  useEffect(() => {
    if (isLoading) {
      request().then(() => {
        setLoading(false);
        history.push("/login");
      });
    }
  }, [isLoading]);

  const validEmailRegex = RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
  );

  const validPasswordRegex = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 5) {
      errors.name = "Name must be atleast 5 characters long!";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!validEmailRegex.test(values.email)) {
      errors.email = "Email is not valid!";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (!validPasswordRegex.test(values.password)) {
      errors.password =
        "Password must contain atleast one capital letter, small letter, special character, digit and must contain atleast 8 letters!";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "Required";
    } else if (values.password !== values.confirmpassword) {
      errors.confirmpassword = "Password does not match";
    }

    buttonDisable = Object.keys(errors).length ? true : false;
    return errors;
  };

  const formFields = [
    {
      size: 12,
      field: (
        <TextField
          type="text"
          label="Name"
          name="name"
          margin="none"
          required={true}
          variant="outlined"
        />
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          type="email"
          label="Email"
          name="email"
          margin="none"
          required={true}
          variant="outlined"
        />
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          type="password"
          label="Password"
          name="password"
          margin="none"
          required={true}
          variant="outlined"
        />
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          type="password"
          label="Confirm Password"
          name="confirmpassword"
          margin="none"
          required={true}
          variant="outlined"
        />
      ),
    },
  ];

  function request() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const onSubmit = () => {
    setLoading(true);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
      }}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="formField">
          <Grid container alignItems="flex-start" spacing={2}>
            {formFields.map((item, id) => (
              <Grid item xs={item.size} key={id}>
                {item.field}
              </Grid>
            ))}
            <div className="buttons">
              <Button
                variant="primary"
                disabled={isLoading}
                type="submit"
                block
                disabled={buttonDisable}
              >
                {isLoading ? "SIGN UP...." : "SIGN UP"}
              </Button>
            </div>
          </Grid>
          <NavLink to="/login" className="link">
            <p>Already have an account? Login here.</p>
          </NavLink>
          <div className="jointLinks">
            <NavLink to="/forgotpassword" className="link">
              <p>Forgot Password?</p>
            </NavLink>
            <NavLink to="/resetpassword" className="link">
              <p>Reset Password?</p>
            </NavLink>
          </div>
        </form>
      )}
    />
  );
};

export default Signup;
