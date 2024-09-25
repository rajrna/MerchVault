import { useState, useContext, useEffect } from "react";
import { MyContext } from "./App";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const context = useContext(MyContext);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);

  const handleLogoClick = () => {
    context.setisHeaderFooterShow(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/signup", {
        fname: formData.fname,
        lname: formData.lname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        alert(response.data.message);
        navigate("/login"); // Redirect to login or desired route
      }
    } catch (error) {
      console.error("There was an error creating the user:", error);
      alert("Failed to sign up. Please try again.");
    }
  };

  // http://localhost:8080/user/signup
  return (
    <Wrapper>
      <section className="section signup-page">
        <div className="container">
          <div className="signup form">
            <div className="logo-container">
              <NavLink to="/" className="navbar-link" onClick={handleLogoClick}>
                <img src="./images/logo.png" alt="Logo" className="logo" />
              </NavLink>
            </div>
            <header>Sign Up</header>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <div className="input-column">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    type="text"
                    id="fname"
                    placeholder="Enter your first name"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-column">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    type="text"
                    id="lname"
                    placeholder="Enter your last name"
                    value={formData.lname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="input-column">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-column">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="input-column">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-column">
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <input type="submit" className="button" value="Sign Up" />
            </form>

            <div className="login">
              <span>
                Already have an account?{" "}
                <NavLink to="/login" className="navbar-link">
                  Log In
                </NavLink>
              </span>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .signup-page {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(13, 59, 102);
  }

  .container {
    max-width: 600px;
    width: 100%;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form {
    width: 100%;
    text-align: center;
  }

  .logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .logo {
    width: 130px;
    transition: transform 0.3s ease;
  }

  .logo:hover {
    transform: scale(1.1);
  }

  header {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1.5rem;
  }

  .input-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .input-column {
    flex: 1;
    min-width: 200px; /* Minimum width to keep inputs in two columns */
    margin: 0 0.5rem;
  }

  .form label {
    display: block;
    font-size: 14px;
    text-align: left;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
  }

  .form input[type="text"],
  .form input[type="email"],
  .form input[type="password"] {
    width: 100%;
    height: 50px;
    padding: 0 15px;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    text-transform: none;
    transition: all 0.3s ease;
  }

  .form input[type="text"]:focus,
  .form input[type="email"]:focus,
  .form input[type="password"]:focus {
    border-color: #009579;
    box-shadow: 0 5px 15px rgba(0, 149, 121, 0.3);
  }

  .form input.button {
    width: 100%;
    height: 50px;
    border: 1px solid rgb(13, 59, 102);
    background: rgb(13, 59, 102);
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .form input.button:hover {
    background-color: #fff;
    color: rgb(13, 59, 102);
    border: 1px solid rgb(13, 59, 102);
  }

  .login {
    margin-top: 1.5rem;
    font-size: 16px;
    color: #333;
  }

  .navbar-link {
    color: rgb(13, 59, 102);
    font-weight: bold;
    text-decoration: none;
    margin-left: 0.5rem;
  }

  .navbar-link:hover {
    text-decoration: underline;
  }
`;

export default SignUp;
