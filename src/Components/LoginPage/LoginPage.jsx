import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/logo.png";
import login_bg from "../../assets/login_bg.jpg";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function LoginPage({ isOpen, handleModal }) {
  const [screenSize, setScreensize] = useState(window.innerWidth > 960);

  useEffect(() => {
    const handleScreenSize = () => {
      setScreensize(window.innerWidth > 960);
    };
    window.addEventListener("resize", handleScreenSize);

    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, []);

  const [login, setLogin] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userNameChecking, setUserNameChecking] = useState(false);
  const [emailChecking, setEmailChecking] = useState(false);
  const [passwordChecking, setPasswordChecking] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (localStorageCheck !== 0) {
      setEmail(userData.emailFromFetch);
      setPassword(userData.passwordFromFetch);
      setUserName(userData.userNameFromFetch);
      setCurrentPassword(userData.passwordFromFetch);
      fetchingFromServer();
    }
  }, []);

  const [btnDisable, setBtnDisable] = useState(true);

  useEffect(() => {
    if (login === "Sign Up") {
      if (userNameChecking && emailChecking && passwordChecking) {
        setBtnDisable(false);
      }
    } else {
      if (emailChecking && passwordChecking) {
        setBtnDisable(false);
      }
    }
  }, [userNameChecking, emailChecking, passwordChecking, login]);

  const handleUserName = (e) => {
    setUserName(e.target.value);
    setUserNameChecking(isValidUserName(e.target.value));
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailChecking(isValidEmail(e.target.value));
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordChecking(isValidPassword(e.target.value));
  };

  const isValidUserName = (value) => {
    return /^[A-Za-z0-9_]+$/.test(value);
  };

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const isValidPassword = (value) => {
    return value.length >= 8;
  };

  const handleToggleLogging = () => {
    clearInput();
    setLogin(login === "Sign Up" ? "Log In" : "Sign Up");
  };

  const handleLogOut = () => {
    localStorage.setItem("userData", []);
    window.location.reload();
  };

  const clearInput = () => {
    setUserName("");
    setPassword("");
    setEmail("");
    setUserNameChecking(false);
    setEmailChecking(false);
    setPasswordChecking(false);
    setBtnDisable(true);
    setNewPassword("");
    setCurrentPassword("");
  };

  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const [successStatus, setSuccessStatus] = useState("fail");
  const [token, setToken] = useState("");
  const [fetching, setFetching] = useState(0);
  const [userNameFromFetch, setUserNameFromFetch] = useState("");
  const [passwordFromFetch, setPasswordFromFetch] = useState("");
  const [messageFromFetch, setMessageFromFetch] = useState("");
  const [emailFromFetch, setEmailFromFetch] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("fail");
  const [passwordChangeError, setPasswordChangeError] = useState(false);

  const handleStartFetch = async () => {
    const responseFetch = await fetchingFromServer();
    setTimeout(() => {
      if (responseFetch === "success") {
        window.location.reload();
      }
    }, [1000]);

    setFetching((prev) => prev + 1);
  };

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString || "{}");

  const localStorageCheck = Object.keys(userData).length;

  const handlePasswordUpdate = () => {
    setEmail(userData.emailFromFetch);
    setPassword(userData.passwordFromFetch);
    setUserName(userData.userNameFromFetch);
    setCurrentPassword(userData.passwordFromFetch);
    setToken(userData.token);
    updatePassword();
    setTimeout(() => {
      setPasswordChangeError(true);
    }, [1000]);
    setTimeout(() => {
      clearInput();
      setPasswordChangeError(false);
    }, 3000);
    setFetching((prev) => prev + 1);
  };

  const fetchingFromServer = async () => {
    if (successStatus === "fail" && login === "Sign Up") {
      const fetchingSignin = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",{
        method: "POST",
        headers: {
         "projectID": "1rttedsgsuaj",
          "Content-Type": "application/json",
        },
          body: JSON.stringify({
            "name": `${userName}`,
            "email": `${email}`,
            "password": `${password}`,
            "appType": "music",
        }),
      });
      const res = await fetchingSignin.json();
      const result = await res;
      setSuccessStatus(result.status);
      setMessageFromFetch(result.message);
      setUserNameFromFetch( result && result.data && result.data.user ? result.data.user.name : "");
      setEmailFromFetch(result && result.data && result.data.user.email ? result.data.user.email : "");
      if (result.status === "success") {
        setToken(result.token);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            login: result.status || "",
            token: result.token || "",
            userNameFromFetch: result.data.user.name || "",
            messageFromFetch: result.message || "",
            emailFromFetch: result.data.user.email || "",
            passwordFromFetch: password || "",
          })
        );
        return result.status;
      }
    }
    else if (!userData.login && login === "Log In") {
      const fetchingSignin = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
        headers: {
          "projectID": "1rttedsgsuaj",
          "Content-Type": "application/json",},
          body: JSON.stringify({
           email: `${email}`,
            password: `${password}`,
            appType: "music",
        }),
      });
      const response = await fetchingSignin.json();
      const result = await response;

      setSuccessStatus(result.status);
      setMessageFromFetch(result.message);
      setUserNameFromFetch(result.data.name);
      setPasswordFromFetch(result.data.password);
      setEmailFromFetch(result.data.email);
      if (result.status === "success") {
        setToken(result.token);

        localStorage.setItem(
          "userData",
          JSON.stringify({
            login: result.status || "",
            token: result.token || "",
            userNameFromFetch: result.data.name || "",
            messageFromFetch: result.message || "",
            emailFromFetch: result.data.email || "",
            passwordFromFetch: password || "",
          })
        );
      }
      return result.status;
    }
  }

  const updatePassword = async () => {
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/updateMyPassword",
        {
          method: "PATCH",
          headers: {
            'projectID': "1rttedsgsuaj",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: `${userName}`,
            email: `${email}`,
            passwordCurrent: `${currentPassword}`,
            password: `${newPassword}`,
            appType: "music",
          }), redirect: "follow",
        }
      );
  
      const result = await response.json();
  
      setPasswordStatus(result.status);
  
      if (result.status === "success") {
        setToken(result.token);
        userData.passwordFromFetch = newPassword;
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      if (result.status === "fail") {
        setErrorMessage("Password Not Matching");
        setShowErrorMessage(true);
  
        // Clear the error message after 3 seconds (3000 milliseconds)
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <div className="login-page">
        <Modal
          isOpen={isOpen}
          onRequestClose={() => handleModal(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <AiOutlineClose onClick={() => handleModal(false)} className="close-btn-icon" />
          <div className="login-container">
            <div className="login-section1">
              <img src={logo} alt="" />
              <h2 className="login-title">
                {!userData.login && <div>Login/Signup</div>}
                {userData.login === "success" && (
                  <div style={{ textAlign: "center" }}>
                    Hi, <span style={{color:"red"}}>{userData.userNameFromFetch}</span>
                    <div>Welcome</div>
                  </div>
                )}
              </h2>
              <p className="login-info">
                Get a personalized experience, and access all your music
              </p>
              {!userData.login && login === "Sign Up" && (
                <>
                  <TextField
                    type="text"
                    placeholder="User Name"
                    className="user-id"
                    value={userName}
                    variant="standard"
                    onChange={handleUserName}
                    InputProps={{ style: { color: 'red' } }}
                  />
                  {!userNameChecking && (
                    <p className="error-messages">
                      Please Enter Your UserName
                    </p>
                  )}
                </>
              )}
              {userData.login === "success" && (
                <>
                  <TextField
                    type="password"
                    placeholder="Current Password"
                    className="user-id"
                    variant="standard"
                    value={currentPassword}
                    onChange={handleCurrentPassword}
                    InputProps={{ style: { color: 'red' } }}
                  />
                  {!passwordChecking && (
                    <p className="error-messages">
                      Please Enter Your Current Password
                    </p>
                  )}
                  <TextField
                    type="password"
                    placeholder="New Password"
                    variant="standard"
                    className="user-id"
                    value={newPassword}
                    onChange={handleNewPassword}
                    InputProps={{ style: { color: 'red' } }}
                  />
                  {!passwordChecking && (
                    <p className="error-messages">
                      Please Enter New Password
                    </p>
                  )}
                  <Button
                    onClick={handlePasswordUpdate}
                    className="login-btn google-btn"
                  >
                    Update Password
                  </Button>
                  {passwordChangeError && (
                    <>
                      {userData.login === "success" &&
                        passwordStatus === "success" && (
                          <p className="success-message" style={{color:"blue"}}>Password Updated</p>
                        )}
                      {userData.login === "success" &&
                        passwordStatus === "fail" && (
                          <p className="error-messages">
                            Password Not Matching
                          </p>
                        )}
                    </>
                  )}
                </>
              )}

              {!userData.login && (
                <>
                  <TextField
                    type="email"
                    placeholder="Enter Email"
                    className="user-id"
                    variant="standard"
                    value={email}
                    onChange={handleEmail}
                    InputProps={{ style: { color: 'red' } }}
                  />
                  {!emailChecking && (
                    <p className="error-messages">
                      Please Enter Valid Email Id
                    </p>
                  )}
                  <TextField
                    type="password"
                    placeholder="Password"
                    className="user-id"
                    variant="standard"
                    value={password}
                    onChange={handlePassword}
                    InputProps={{ style: { color: 'red' } }}
                  />
                  {!passwordChecking && (
                    <p className="error-messages">
                      Password should contain minimum 8 Characters
                    </p>
                  )}
                  <Button
                    className="login-btn"
                    disabled={btnDisable}
                    onClick={handleStartFetch}
                  >
                    Continue to {login === "Sign Up" ? "Sign Up" : "Log In"}
                  </Button>

                  {password.length > 0 &&
                    !userData.login &&
                    login === "Log In" && (
                      <p className="error-messages">
                        {messageFromFetch === "Incorrect EmailId or Password"
                          ? "Incorrect EmailId or Password"
                          : ""}
                      </p>
                    )}
                  {password.length > 0 &&
                    !userData.login &&
                    login === "Sign Up" && (
                      <p className="error-messages">
                        {messageFromFetch === "Incorrect EmailId or Password"
                          ? "Enter proper details"
                          : messageFromFetch === "User already exists"
                          ? "User already exists"
                          : ""}
                      </p>
                    )}

                  {userData.login === "success" && (
                    <p className="success-message">Logged In</p>
                  )}
                </>
              )}

              <div className="line-break">
                <p className="empty-line"></p>
                {successStatus === "fail" && (
                  <p className="empty-line-content"> OR </p>
                )}
                {successStatus === "success" && (
                  <p className="empty-line-content"></p>
                )}
                <p className="empty-line"></p>
              </div>

              {!userData.login && (
                <Button
                  onClick={handleToggleLogging}
                  className="login-btn google-btn"
                >
                  {login === "Sign Up" ? "Log In" : "Sign Up"}
                </Button>
              )}
              {userData.login === "success" && (
                <Button
                  onClick={handleLogOut}
                  className="login-btn google-btn"
                  style={{backgroundColor:"black"}}
                >
                  Log Out
                </Button>
              )}
            </div>

            {screenSize && (
              <div className="login-section2">
                <img src={login_bg} alt="" />
              </div>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
}

export default LoginPage;
