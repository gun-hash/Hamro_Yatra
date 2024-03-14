import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  console.log("Token:", token);
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/verify?token=${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);

        if (response.ok) {
          setVerificationStatus("Email successfully verified!");
        } else {
          setVerificationStatus("Email verification failed.");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setVerificationStatus("Error verifying email. Please try again.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{verificationStatus}</p>
    </div>
  );
};

export default VerifyEmail;
