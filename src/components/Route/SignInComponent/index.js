import React, { useState, useEffect } from "react";
import InputComponent from "../../Base/InputComponent";
import Button from "../../Base/ButtonComponent";
import ImgComponent from "../../Base/ImgComponent";
import { useCookies } from 'react-cookie';
import Loader from "../../Base/LoaderComponent";
import { useHistory } from "react-router-dom"
const formStyle = {
  formContainer: {
    height: "calc(100vh - 80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    width: "350px",
    padding: "8px 0px",
    borderRadius: "4px",
    boxShadow: "0px 2px 4px 1px #dcdcdc"
  },
  formContent: {
    padding: "24px 16px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};
export default function () {
  const history = useHistory()
  const [cookies, setCookie] = useCookies(['apertum-logged-in']);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [mailError, setMailError] = useState({ error: false, errorText: "" });
  const [passwordError, setPasswordError] = useState({
    error: false,
    errorText: ""
  });
  const [loaderData, setLoaderData] = useState({
    showLoader: false,
    loaderMessage: ""
  });
  const [buttonState, setButtonState] = useState(false);
  useEffect(() => {
    setMailError({
      error: false,
      errorText: ""
    });
  }, [userId]);
  useEffect(() => {
    setPasswordError({ error: false, errorText: "" });
  }, [password]);
  const validateFields = () => {
    if (!userId) {
      setMailError({ error: true, errorText: "" });
      return false;
    }
    if (!password) {
      setPasswordError({ error: true, errorText: "" });
      return false;
    }
    return true;
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (validateFields()) {
      setButtonState(true);
      setLoaderData({ showLoader: true, loaderMessage: "Signing In" });
      fetch(
        "https://apertum-interview.herokuapp.com/api/user/login", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ accountId: userId, pswd: password })
        }
      )
        .then(res => {
          return res.json();
        })
        .then(
          result => {
            if (result.token) {
              setCookie('apertum-logged-in', result.token, { path: '/' })
            }
            setButtonState(false);
            setLoaderData({ showLoader: false, loaderMessage: "" });
            setTimeout(() => {
              history.push("/users/list")
            })
          },
          error => {
            setButtonState(false);
            setLoaderData({ showLoader: false, loaderMessage: "" });
            alert("Login Failed, Please check your credentials");
          }
        );
    }
  };
  return (
    <div>
      <Loader {...loaderData} />
      <div style={formStyle.formContainer}>
        <form style={formStyle.form} onSubmit={handleSubmit}>
          <div style={formStyle.formContent}>
            <ImgComponent
              alt={"Appertum Online"}
              src={`https://apertumo.com/images/logo-apertum-online-dark-high-res.png`}
            />
            <div
              style={{ fontSize: "18px", padding: "8px", fontWeight: "bold" }}
            >
              Sign in
            </div>
            <div
              style={{ fontSize: "14px", padding: "8px", fontWeight: "500" }}
            >
              Use your Appertum Account
            </div>
            <InputComponent
              value={userId}
              placeholder="Enter User Id"
              {...mailError}
              handleChange={evt => setUserId(evt.target.value)}
            />
            <InputComponent
              value={password}
              type="password"
              placeholder="Enter Your Password"
              {...passwordError}
              handleChange={evt => setPassword(evt.target.value)}
            />
            <Button
              id="test"
              title="Login"
              disabled={buttonState}
              style={{ width: "100%" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
