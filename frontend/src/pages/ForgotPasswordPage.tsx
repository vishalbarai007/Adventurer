import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaCopy, FaCheck, FaArrowLeft } from "react-icons/fa";
import httpClient from "@/services/httpClient";

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

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await httpClient.post("/forgot-password", { email });
      if (res.data.temporaryPassword) {
        setTempPassword(res.data.temporaryPassword);
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to process request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(tempPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              Reset Password
            </h2>
            <p style={{ fontSize: 13, color: "rgba(141,212,160,0.55)", marginBottom: 28, lineHeight: 1.5 }}>
              Enter your registered email address and we'll generate a new 16-digit password for you.
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
              <div style={{ marginBottom: 24 }}>
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
                  Email Address
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
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 42px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1.5px solid rgba(168,213,181,0.25)",
                      borderRadius: 12,
                      color: "#fff",
                      fontSize: 14,
                      outline: "none",
                      transition: "border-color .2s, box-shadow .2s, background .2s",
                    }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
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
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Processing..." : "Generate New Password"}
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
              <FaLock />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: "0 0 10px", letterSpacing: -.4 }}>
              New Password Generated!
            </h2>
            <p style={{ fontSize: 13, color: "rgba(141,212,160,0.7)", marginBottom: 24, lineHeight: 1.5 }}>
              A new 16-digit password has been configured for your account. You can use it to sign in immediately.
            </p>

            {tempPassword && (
              <div style={{ marginBottom: 28 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#8DD4A0",
                    letterSpacing: 1.1,
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Temporary Password
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px dashed rgba(168,213,181,0.3)",
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: 1,
                    fontFamily: "monospace",
                    color: "#fff",
                  }}
                >
                  <span>{tempPassword}</span>
                  <button
                    onClick={handleCopy}
                    style={{
                      background: "none",
                      border: "none",
                      color: copied ? "#35A855" : "rgba(141,212,160,0.6)",
                      cursor: "pointer",
                      fontSize: 14,
                      padding: 4,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {copied ? <FaCheck /> : <FaCopy />}
                  </button>
                </div>
              </div>
            )}

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

export default ForgotPasswordPage;
