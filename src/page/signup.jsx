import React, { useEffect, useState } from "react";
import { Typography, Grid, Button, Alert, Snackbar } from "@mui/material";
import "../css/signup.css";
import { TextField, Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      width: "25ch",
    },
    "& label.Mui-focused": {
      color: "#121212",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#121212",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#121212",
      },
      "&:hover fieldset": {
        borderColor: "#121212",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#121212",
      },
    },
  },
}));

const Signup = () => {
  const [activeForm, setActiveForm] = useState("signup");
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginAlertExist, setLoginAlertExist] = useState(false);
  const [loginPasswordAlert, setLoginPasswordAlert] = useState(false);
  const [signupExistAlert, setSignupExistAlert] = useState(false);
  const [state, setState] = useState({
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal } = state;

  const [nameHandling, setNameHandling] = useState({
    name: "",
    error: false,
    errorMsg: "",
  });
  const [userNameHandling, setUserNameHandling] = useState({
    userName: "",
    error: false,
    errorMsg: "",
  });
  const [emailHandling, setEmailHandling] = useState({
    email: "",
    error: false,
    errorMsg: "",
  });
  const [passwordHandling, setPasswordHandling] = useState({
    password: "",
    error: false,
    errorMsg: "",
  });
  const [loginPasswordHandling, setLoginPasswordHandling] = useState({
    password: "",
  });
  const [loginEmailHandling, setLoginEmailHandling] = useState({
    email: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoginSuccess(false);
    setLoginAlertExist(false);
    setLoginPasswordAlert(false)
    setOpen(false);
    setSignupExistAlert(false)
  };

  const handleSignup = async (state) => {
    try {
      const userData = {
        name: nameHandling.name,
        username: userNameHandling.userName,
        email: emailHandling.email,
        password: passwordHandling.password,
      };

      const data = await fetch("http://localhost:5000/registerUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(userData),
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      if (data.status == 201) {
        setOpen(true);
        setTimeout(() => {
          navigate("/post");
        }, 2000);
      }else if(data.status == 404){
        setSignupExistAlert(true);
        setOpen(false)
      }
    
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async () => {
    try {
      const userData = {
        email: loginEmailHandling.email,
        password: loginPasswordHandling.password,
      };

      const data = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(userData),
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      if (data.status == 400) {
        console.log("400");
        setLoginAlertExist(true);
      } else if (data.status == 200) {
        setLoginAlertExist(false);
        setLoginSuccess(true);
        setInterval(()=>[
          navigate("/post")
        ], 2000)
      } else if (data.status == 401) {
        setLoginPasswordAlert(true);
        setLoginAlertExist(false);
        setLoginSuccess(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Successfully Signup
        </Alert>
      </Snackbar>
      <Snackbar
        open={signupExistAlert}
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          User Already Exist
        </Alert>
      </Snackbar>
      <Snackbar
        open={loginSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Successfully Login
        </Alert>
      </Snackbar>
      <Snackbar
        open={loginAlertExist}
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          User not exist
        </Alert>
      </Snackbar>
      <Snackbar
        open={loginPasswordAlert}
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Password is not correct
        </Alert>
      </Snackbar>
      <div className="wrapper">
        {/* container */}
        <div className="container">
          {/* Sign Up */}
          <div className="formWrapper">
            <div
              className={`signupContainer ${
                activeForm === "signup" ? "active" : "inactive"
              }`}
            >
              <Grid>
                <div className="form">
                  <Typography
                    variant="h4"
                    align="left"
                    style={{ fontWeight: "520", marginBottom: "7px" }}
                  >
                    Sign Up
                  </Typography>
                  <Box sx={{ "& > :not(style)": { marginBottom: 1 } }}>
                    <TextField
                      InputLabelProps={{
                        sx: {
                          color: "#121212",
                        },
                      }}
                      className={classes.root}
                      sx={{ input: { color: "black" } }}
                      label="Name"
                      variant="standard"
                      fullWidth
                      required
                      value={nameHandling.name}
                      onChange={(e) => {
                        const { target: { value: nameValue = "" } = {} } =
                          e || {};

                        if (nameValue) {
                          setNameHandling({
                            name: nameValue,
                            error: false,
                            errorMsg: "",
                          });
                        } else {
                          setNameHandling({
                            name: nameValue,
                            error: true,
                            errorMsg: "Name is required",
                          });
                        }
                      }}
                      error={nameHandling.error}
                      helperText={nameHandling.errorMsg}
                    />
                    <TextField
                      InputLabelProps={{
                        sx: {
                          color: "#121212",
                        },
                      }}
                      className={classes.root}
                      sx={{ input: { color: "black" } }}
                      label="User Name"
                      variant="standard"
                      fullWidth
                      required
                      value={userNameHandling.name}
                      onChange={(e) => {
                        const { target: { value: nameValue = "" } = {} } =
                          e || {};
                        if (nameValue) {
                          setUserNameHandling({
                            userName: nameValue,
                            error: false,
                            errorMsg: "",
                          });
                        } else {
                          setUserNameHandling({
                            name: nameValue,
                            error: true,
                            errorMsg: "User Name is required",
                          });
                        }
                      }}
                      error={userNameHandling.error}
                      helperText={userNameHandling.errorMsg}
                    />
                    <TextField
                      className={classes.root}
                      sx={{ input: { color: "black" } }}
                      InputLabelProps={{
                        sx: {
                          color: "#121212",
                        },
                      }}
                      label=" Email"
                      variant="standard"
                      required
                      fullWidth
                      value={emailHandling.email}
                      onChange={(e) => {
                        const { target: { value: emailValue = "" } = {} } =
                          e || {};
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        const validEmail = emailRegex.test(emailValue);
                        if (validEmail) {
                          setEmailHandling({
                            email: emailValue,
                            error: false,
                            errorMsg: "",
                          });
                        } else {
                          setEmailHandling({
                            email: emailValue,
                            error: true,
                            errorMsg: "Invalid Email",
                          });
                        }
                      }}
                      error={emailHandling.error}
                      helperText={emailHandling.errorMsg}
                    />
                    <TextField
                      className={classes.root}
                      InputLabelProps={{
                        sx: {
                          color: "#121212",
                        },
                      }}
                      type="password"
                      required
                      sx={{ input: { color: "black" } }}
                      label="Password"
                      variant="standard"
                      fullWidth
                      value={passwordHandling.password}
                      onChange={(e) => {
                        const { target: { value: passwordValue = "" } = {} } =
                          e || {};
                        const passwordRegex =
                          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/;
                        const validPassword = passwordRegex.test(passwordValue);
                        if (validPassword) {
                          setPasswordHandling({
                            password: passwordValue,
                            error: false,
                            errorMsg: "",
                          });
                        } else {
                          setPasswordHandling({
                            password: passwordValue,
                            error: true,
                            errorMsg: "Invalid password",
                          });
                        }
                      }}
                      error={passwordHandling.error}
                      helperText={passwordHandling.errorMsg}
                    />
                    <div></div>
                  </Box>
                  <Box style={{ display: "flex", justifyContent: "right" }}>
                    <Button
                      onClick={() => {
                        handleSignup({ vertical: "top", horizontal: "center" });
                      }}
                      disabled={
                        !nameHandling.name ||
                        !emailHandling.email ||
                        !userNameHandling.userName ||
                        !passwordHandling.password ||
                        nameHandling.error ||
                        emailHandling.error ||
                        userNameHandling.error ||
                        passwordHandling.error
                      }
                      style={{
                        color: "#fff",
                        justifyContent: "right",
                        padding: "10px 20px 10px 20px",
                        fontSize: "16px",
                        marginTop: "30px",
                      }}
                      color="dark"
                      variant="contained"
                    >
                      Sign up
                    </Button>
                  </Box>
                </div>
              </Grid>
            </div>
            <div
              className={` SignupContent signupContainer ${
                activeForm === "signup" ? "inactive" : "active"
              }`}
            >
              <div className="signinText">
                <Typography variant="h4" align="left">
                  Welcome to SocialSphere!
                </Typography>

                <Typography sx={{ fontSize: "18px", marginTop: "15px" }}>
                  If you don't have an account yet, you can register here
                </Typography>
                <Button
                  onClick={() => {
                    setActiveForm(activeForm === "signup" ? "login" : "signup");
                  }}
                  type="submit"
                  style={{
                    borderColor: "#ffffff",
                    backgroundColor: "#121212",
                    color: "#fff",
                    justifyContent: "right",
                    marginTop: "30px",
                    padding: "10px 20px 10px 20px",
                    fontSize: "16px",
                  }}
                  variant="outlined"
                >
                  Sign up
                </Button>
              </div>
            </div>
          </div>

          {/* Log In */}
          <div className="formWrapper">
            <div
              className={`  loginContainer ${
                activeForm === "signup" ? "inactive" : "active"
              }`}
            >
              <Grid>
                <div className="form1">
                  <Box sx={{ "& > :not(style)": { marginBottom: 2 } }}>
                    <Typography
                      variant="h4"
                      align="left"
                      marginBottom={2}
                      style={{ fontWeight: "520" }}
                    >
                      Sign In
                    </Typography>
                    <TextField
                      className={classes.root}
                      sx={{ input: { color: "black" } }}
                      InputLabelProps={{
                        sx: {
                          color: "#121212",
                        },
                      }}
                      label=" Email or Username"
                      variant="standard"
                      fullWidth
                      required
                      value={loginEmailHandling.email}
                      onChange={(e) => {
                        const { target: { value: emailValue = "" } = {} } =
                          e || {};
                        setLoginEmailHandling({
                          email: emailValue,
                        });
                      }}
                    />
                    <TextField
                      className={classes.root}
                      InputLabelProps={{
                        sx: {
                          color: "#121212",
                        },
                      }}
                      sx={{ input: { color: "black" } }}
                      label="Password"
                      variant="standard"
                      fullWidth
                      type="password"
                      required
                      value={loginPasswordHandling.password}
                      onChange={(e) => {
                        const { target: { value: passwordValue = "" } = {} } =
                          e || {};
                        setLoginPasswordHandling({
                          password: passwordValue,
                        });
                      }}
                    />
                  </Box>

                  <Box style={{ display: "flex", justifyContent: "right" }}>
                    <Button
                      onClick={() => {
                        handleLogin();
                      }}
                      disabled={
                        !loginEmailHandling.email ||
                        !loginPasswordHandling.password
                      }
                      style={{
                        color: "#fff",
                        justifyContent: "right",
                        padding: "10px 20px 10px 20px",
                        fontSize: "16px",
                      }}
                      color="dark"
                      variant="contained"
                    >
                      Sign In
                    </Button>
                  </Box>
                </div>
              </Grid>
            </div>
            <div
              className={` SignupContent1 signupContainer ${
                activeForm === "signup" ? "active" : "inactive"
              }`}
            >
              <div className="signinText1">
                <Typography variant="h4" align="left">
                  Have an Account?
                </Typography>
                <Typography sx={{ fontSize: "20px", marginTop: "20px" }}>
                  Join our community and connect with friends, family, and
                  people around the world.
                </Typography>

                <Typography sx={{ fontSize: "18px", marginTop: "5px" }}>
                  If you have an account yet, you can login here
                </Typography>
                <Button
                  onClick={() => {
                    setActiveForm(activeForm == "signup" ? "login" : "signup");
                  }}
                  style={{
                    borderColor: "#ffffff",
                    backgroundColor: "#121212",
                    color: "#fff",
                    justifyContent: "right",
                    marginTop: "30px",
                    padding: "10px 20px 10px 20px",
                    fontSize: "16px",
                  }}
                  variant="outlined"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
