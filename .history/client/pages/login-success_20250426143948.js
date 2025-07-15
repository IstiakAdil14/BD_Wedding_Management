import React, { useEffect } from "react";

const LoginSuccess = () => {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage(
        { type: "LOGIN_SUCCESS" },
        window.location.origin
      );
      window.close();
    }
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Login Successful</h1>
      <p>You can close this window now.</p>
    </div>
  );
};

export default LoginSuccess;
