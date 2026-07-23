import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaLock, FaCheck, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import httpClient from "@/services/httpClient";
import useSEO from "@/hooks/useSEO";

const G = {
  g900: "#030F06",
  g800: "#052A0E",
  g700: "#092110",
  g600: "#0F3A1B",
  g500: "#1B6630",
  g400: "#268C42",
  g300: "#35A855",
  g200: "#58C470",
  g150: "#8DD4A0",
  g100: "#C0E8CC",
  g50: "#E0F3E8",
  white: "#FFFFFF",
  err: "#E05252",
};

const ResetPasswordPage: React.FC = () => {
  useSEO({
    title: 'Reset Password | Adventurer',
    description: 'Set a new password for your Adventurer account.',
    noindex: true // Do not index this page
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlToken = queryParams.get("token") || "";
    const urlEmail = queryParams.get("email") || "";
    
    setToken(urlToken);
    setEmail(urlEmail);

    if (!urlToken || !urlEmail) {
      setError("Invalid or missing password reset token. Please request a new link.");
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token || !email) {
      setError("Missing token or email. Please check your reset link.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await httpClient.post("/reset-password", {
        email,
        token,
        password,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to reset password. Please try requesting a new link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: `linear-gradient(155deg, ${G.g900} 0%, ${G.g700} 50%, ${G.g600} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          padding: "40px 36px",
          background: "rgba(5,26,10,0.7)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(168,213,181,0.1)",
          borderRadius: 28,
          boxShadow: "0 32px 100px rgba(0,0,0,0.65)",
          color: "#fff",
        }}
      >
        <Link
          to="/login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "rgba(141,212,160,0.55)",
            textDecoration: "none",
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 24,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C0E8CC")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(141,212,160,0.55)")}
        >
          <FaArrowLeft size={10} /> Back to Login
        </Link>

        {!success ? (
          <>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: -.4 }}>
              Set New Password
            </h2>
            <p style={{ fontSize: 13, color: "rgba(141,212,160,0.55)", marginBottom: 28, lineHeight: 1.5 }}>
              Choose a strong password containing at least 8 characters.
            </p>

            {error && (
              <div
                style={{
                  background: "rgba(224,82,82,0.1)",
                  border: "1px solid rgba(224,82,82,0.3)",
                  borderRadius: 10,
                  padding: "10px 13px",
                  marginBottom: 20,
                  fontSize: 12,
                  color: G.err,
                  fontWeight: 500,
                }}
              >
                ⚠ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* New Password */}
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#8DD4A0",
                    letterSpacing: 1.1,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  New Password
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "rgba(141,212,160,0.6)",
                      fontSize: 14,
                      pointerEvents: "none",
                    }}
                  >
                    <FaLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 42px 12px 42px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1.5px solid rgba(168,213,181,0.25)",
                      borderRadius: 12,
                      color: "#fff",
                      fontSize: 14,
                      outline: "none",
                      transition: "border-color .2s",
                    }}
                    required
                    disabled={!token || !email}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "rgba(141,212,160,0.6)",
                      cursor: "pointer",
                      fontSize: 14,
                      padding: 0,
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: 28 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#8DD4A0",
                    letterSpacing: 1.1,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Confirm New Password
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "rgba(141,212,160,0.6)",
                      fontSize: 14,
                      pointerEvents: "none",
                    }}
                  >
                    <FaLock />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 42px 12px 42px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1.5px solid rgba(168,213,181,0.25)",
                      borderRadius: 12,
                      color: "#fff",
                      fontSize: 14,
                      outline: "none",
                      transition: "border-color .2s",
                    }}
                    required
                    disabled={!token || !email}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: "absolute",
                      right: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "rgba(141,212,160,0.6)",
                      cursor: "pointer",
                      fontSize: 14,
                      padding: 0,
                    }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !token || !email}
                style={{
                  width: "100%",
                  padding: 13,
                  border: "none",
                  borderRadius: 13,
                  background: "linear-gradient(to right, #ffaa1c 0%, #ff7757 100%)",
                  color: "#012c18",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 24px rgba(255, 170, 28, 0.25)",
                  transition: "transform .15s, box-shadow .15s, opacity .15s",
                  opacity: (loading || !token || !email) ? 0.7 : 1,
                }}
              >
                {loading ? "Resetting Password..." : "Update Password"}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(53,168,85,0.15)",
                border: "2px solid #35A855",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "#35A855",
                fontSize: 20,
              }}
            >
              <FaCheck />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: "0 0 10px", letterSpacing: -.4 }}>
              Password Reset Complete!
            </h2>
            <p style={{ fontSize: 13, color: "rgba(141,212,160,0.7)", marginBottom: 28, lineHeight: 1.5 }}>
              Your new password is now configured. You can use it to log in immediately.
            </p>

            <button
              onClick={() => navigate("/login")}
              style={{
                width: "100%",
                padding: 13,
                border: "none",
                borderRadius: 13,
                background: "linear-gradient(to right, #ffaa1c 0%, #ff7757 100%)",
                color: "#012c18",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(255, 170, 28, 0.25)",
              }}
            >
              Proceed to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
