import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  console.log("ConfirmEmail component rendered");

  

  useEffect(() => {
    const token = searchParams.get("token");
    console.log("ConfirmEmail mounted with token:", token);
    setLoading(true);

    const confirmEmail = async () => {
      if (!token) {
        setLoading(false);
        navigate("/confirmed");
        return;
      }

      try {
          console.log("📨 Sending confirmation request...");
        await axios.post("/api/users/confirm", { token }, { timeout: 5000 });
      } catch (err) {
          console.error("❌ Confirmation error:", err);
      } finally {
        console.log("✅ Confirmation flow complete");
        setLoading(false);
        navigate("/confirmed");
      }
    };

    confirmEmail();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
        <div className="spinner" />
        <p>Confirming your email...</p>
      </div>
    );
  }

  return null;
};

export default ConfirmEmail;



