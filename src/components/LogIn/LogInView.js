import React from 'react'
import { Link } from 'react-router-dom'

const LogInView = ({ onSubmit }) => {
  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email
          <input
            style={{ width: "100%" }}
            name="email"
            type="email"
            placeholder="Email"
          />
        </label>
        <label>
          Password
          <input
            style={{ width: "100%" }}
            name="password"
            type="password"
            placeholder="Password"
          />
        </label>
        <button type="submit">Log in</button>
        <Link to="/signup">Sign Up</Link>
      </form>
    </div>
  );
};

export default LogInView;