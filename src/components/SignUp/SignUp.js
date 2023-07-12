import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "./signup.css";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const host = "http://localhost:8000/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password } = credentials;
    const response = await fetch(`${host}api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    setLoading(false);
    if (json.success) {
      //save the auth token and redirect
      history("/login");
      props.showAlert(
        "Signed in successfully!! Please login to continue.",
        "success"
      );
    } else {
      alert("Invalid credentials");
      props.showAlert("Invalid credentials", "danger");
    }
  };
  const handle = (e) => {
    e.preventDefault();
    history("/login");
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container" id="cl">
      <div className="ma">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form onSubmit={handleSubmit}>
            <label for="chk" aria-hidden="true" className="la">
              Sign up
            </label>
            <input
              type="text"
              className="cnt"
              id="name"
              onChange={onChange}
              name="name"
              aria-describedby="emailHelp"
              placeholder="Name"
            />
            <input
              type="email"
              className="cnt"
              id="email"
              onChange={onChange}
              name="email"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
            <input
              type="password"
              className="cnt"
              id="password"
              onChange={onChange}
              name="password"
              minLength={5}
              required
              placeholder="Password"
            />
            <input
              type="password"
              className="cnt"
              id="cpassword"
              onChange={onChange}
              name="cpassword"
              minLength={5}
              required
              placeholder="Confirm Password"
            />
            <button type="submit" className="bnm">
              SignUp
            </button>
            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "15px 0",
                  color: "white",
                }}
              >
                <Spinner animation="border" />
              </div>
            )}
          </form>
        </div>

        <div class="login">
          <form onSubmit={handleSubmit}>
            <label for="chk" aria-hidden="true" onClick={handle} className="la">
              LogIn
            </label>
            <input
              type="email"
              value={credentials.email}
              onChange={onChange}
              className="cnt"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
            <input
              type="password"
              value={credentials.password}
              onChange={onChange}
              className="cnt"
              id="password"
              name="password"
              placeholder="Password"
            />
            <button type="submit" className="bnm">
              LogIn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
