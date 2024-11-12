import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpPage.css";

const SignUp = () =>{

const [isAccountAlreadyExist, setIsAccountAlreadyExist] = useState(false);
const [errorMessage, setErrorMessage] = useState(null);
const nameRef = useRef(null);
const emailRef = useRef(null);
const passwordRef = useRef(null);
const dobRef = useRef(null);
const navigate = useNavigate(); 

const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        let response;
      
      if (isAccountAlreadyExist) {
        const logInData = {
            emailId: emailRef.current.value,
            password: passwordRef.current.value,
        };
        // Log In
        response = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logInData),
        });
      } else {
        const signUpData = {
            name: nameRef.current.value,
            emailId: emailRef.current.value,
            password: passwordRef.current.value,
            DOB: dobRef.current.value,
          };
        // Sign Up
        response = await fetch("http://localhost:3000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpData),
        });
      }
  
        const data = await response.json();
  
        if (response.status === 200) {
            sessionStorage.setItem("userData", JSON.stringify(data.user));
            navigate("/home");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
      }
  };
    return(
        <div className="sign-up-form-outer-container">
        <div className="sign-up-form-inner-container">
        <h1 className="sign-up-form-heading">{isAccountAlreadyExist ? "Log In" : "Sign Up"}</h1>
        <form className = "sign-up-form">
            {isAccountAlreadyExist? <></> : <input type="text" placeholder="Name" ref={nameRef}/>}
            <input type="Email" placeholder="Email" ref={emailRef}/>
            <input type="password" placeholder="Password" ref={passwordRef}/>
            {isAccountAlreadyExist ? <></> : <input type="date" placeholder="Date of birth" ref={dobRef}/>}
            {errorMessage && <div className="signup-error-message">{errorMessage}</div>}
            <button onClick={handleSubmit}>{isAccountAlreadyExist ? "Log In" : "Sign Up"}</button>
        </form>
        <p className="already-registered-text">{isAccountAlreadyExist ? "Not yet registered?" : "Already registered?"}<button onClick={() => setIsAccountAlreadyExist(!isAccountAlreadyExist)}>{ isAccountAlreadyExist ? "Sign Up" : "Log In"}</button></p>
        </div>
        </div>
    )
};
 
export default SignUp;