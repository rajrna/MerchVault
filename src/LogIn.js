import { useContext, useEffect, useState } from "react";
import { MyContext } from "./App";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

const LogIn = () => {
  const context = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For programmatic navigation

  // useEffect(() => {
  //   context.setisHeaderFooterShow(false);
  // }, [context]);

  useEffect(() => {
    context.setisHeaderFooterShow(false);

    return () => {
      // Ensure the header and footer are shown again when navigating away
      context.setisHeaderFooterShow(true);
    };
  }, []);

  const handleLogoClick = () => {
    context.setisHeaderFooterShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        // Replace with your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();

      // Handle success, e.g., store token, update context, redirect
      localStorage.setItem("token", result.token); // Store token
      context.setUser(result.user); // Set user in context
      context.setisLoggedIn(true); // Update login status
      navigate("/"); // Redirect to homepage
      console.log(result);
      navigate("/"); // Redirect on successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Wrapper>
      <section className="section login-page">
        <div className="container">
          <div className="login form">
            <div className="logo-container">
              <NavLink
                to="/cart"
                className="navbar-link"
                onClick={handleLogoClick}
              >
                <img src="./images/logo.png" alt="Logo" className="logo" />
              </NavLink>
            </div>
            <header>Log In</header>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="#" className="forgot-password">
                Forgot password?
              </a>

              //<input type="submit" className="button" value="Log in" />


              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="button">
                {/* Log in */}
              </button>
            </form>
            <div className="signup">
              <span>
                Don't have an account?{" "}
                <NavLink to="/signup" className="navbar-link">
                  Signup
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
  .login-page {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(13, 59, 102);
  }

  .container {
    max-width: 400px;
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
    transition: transform 0.3s ease; /* Adding transition for smooth scaling */
  }

  .logo:hover {
    transform: scale(1.1); /* Scale the logo slightly on hover */
  }

  header {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1.5rem;
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
  .form input[type="password"]:focus {
    border-color: #009579;
    box-shadow: 0 5px 15px rgba(0, 149, 121, 0.3);
  }

  .forgot-password {
    display: block;
    font-size: 14px;
    color: rgb(13, 59, 102);
    text-decoration: none;
    margin-bottom: 1.5rem;
  }

  .forgot-password:hover {
    text-decoration: underline;
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

  .signup {
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
  .error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 1rem;
  }
`;

export default LogIn;
