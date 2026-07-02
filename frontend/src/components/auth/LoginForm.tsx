import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaApple, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaCheck } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CarouselPlugin } from "@/components/home/ImageCarousel";
import { useNavigate, useLocation, Link } from "react-router-dom";
import httpClient from "@/services/httpClient";
import { useAuth } from "@/contexts/AuthContext";
import "../../styles/LoginForm.css";

/* ─── Design tokens ────────────────────────────────────────────────────── */
const G = {
  /* Forest green ramp */
  g900: "#030F06", g800: "#052A0E", g700: "#092110", g600: "#0F3A1B",
  g500: "#1B6630", g400: "#268C42", g300: "#35A855", g200: "#58C470",
  g150: "#8DD4A0", g100: "#C0E8CC", g50: "#E0F3E8", g10: "#F2FAF5",
  /* Badge white */
  white: "#FFFFFF",
  /* Semantic */
  err: "#E05252", warn: "#E89C2E",
  /* Overlay tints */
  o08: "rgba(255,255,255,0.08)",
  o12: "rgba(255,255,255,0.12)",
  o20: "rgba(255,255,255,0.20)",
  o05: "rgba(27,102,48,0.05)",
  glow: "rgba(88,196,112,0.18)",
};

/* ─── Static data ───────────────────────────────────────────────────────── */
const ROLES = [
  { id: "traveler", icon: "🧳", label: "Traveler", sub: "Explore & discover" },
  { id: "organizer", icon: "🗓️", label: "Organizer", sub: "Plan & manage" },
  { id: "guide", icon: "🗺️", label: "Guide", sub: "Lead adventures" },
];

const TRAVEL_STYLES = ["Adventure", "Backpacking", "Leisure", "Budget", "Luxury"];
const DURATIONS = ["Weekend", "3–5 Days", "1 Week", "2 Weeks", "Month+"];
const AVAILABILITY = ["Weekdays", "Weekends", "Full-time", "Seasonal"];
const T_TAGS = [
  { e: "🏖️", l: "Beaches" }, { e: "💧", l: "Waterfalls" },
  { e: "⛰️", l: "Mountains" }, { e: "🏛️", l: "Historical" },
  { e: "🦁", l: "Wildlife" }, { e: "🧗", l: "Adventure" },
  { e: "🏙️", l: "City Tours" }, { e: "🎭", l: "Cultural" },
];
const S_TAGS = [
  { e: "🥾", l: "Trekking" }, { e: "📸", l: "Photography" },
  { e: "🍜", l: "Culinary" }, { e: "🏰", l: "Heritage" },
  { e: "🦁", l: "Wildlife Safari" }, { e: "🚣", l: "Water Sports" },
  { e: "⛺", l: "Camping" }, { e: "🛕", l: "Spiritual" },
];
const LANGUAGES = ["English", "Hindi", "Marathi", "Gujarati", "Tamil", "Telugu", "French", "Spanish"];
const STATES = ["Maharashtra", "Goa", "Rajasthan", "Kerala", "Himachal Pradesh",
  "Uttarakhand", "Karnataka", "Tamil Nadu", "J&K", "Assam"];

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface FormInputs {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  travelStyle?: string;
  budget?: number;
  duration?: string;
  companyName?: string;
  tripsConducted?: number;
  touristsHelped?: number;
  teamSize?: number;
  nativeLocation?: string;
  pricePerTrek?: number;
  availability?: string[];
  tags: string[];
  statesCovered: string[];
  languagesSpoken: string[];
}

/* ─── Sub-components ────────────────────────────────────────────────────── */

/** Labelled icon input */
const InputField: React.FC<{
  label: string;
  icon: React.ReactNode;
  field: keyof FormInputs;
  type?: string;
  placeholder?: string;
  error?: string;
  register: any;
  rules?: any;
  eyeToggle?: { show: boolean; onToggle: () => void };
}> = ({ label, icon, field, type = "text", placeholder, error, register, rules, eyeToggle }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{
      display: "block", fontSize: 10, fontWeight: 700, color: "#8DD4A0",
      letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 6
    }}>
      {label}
    </label>
    <div style={{ position: "relative" }}>
      <span style={{
        position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
        color: error ? "#E05252" : "rgba(141,212,160,0.6)", fontSize: 14, pointerEvents: "none"
      }}>
        {icon}
      </span>
      <input
        type={eyeToggle ? (eyeToggle.show ? "text" : "password") : type}
        placeholder={placeholder}
        className={`adv-input${error ? " err" : ""}`}
        {...register(field, rules)}
      />
      {eyeToggle && (
        <button type="button" onClick={eyeToggle.onToggle}
          style={{
            position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(141,212,160,0.6)", fontSize: 15, lineHeight: 1
          }}>
          {eyeToggle.show ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
    {error && <p style={{ color: "#E05252", fontSize: 11, margin: "4px 0 0", fontWeight: 500 }}>⚠ {error}</p>}
  </div>
);

/** Range slider with live readout */
const RangeSlider: React.FC<{
  label: string; field: keyof FormInputs;
  min: number; max: number; step?: number;
  value: number; onChange: (v: number) => void;
  fmt?: (v: number) => string;
}> = ({ label, min, max, step = 1, value, onChange, fmt }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
      <label style={{ fontSize: 10, fontWeight: 700, color: "#8DD4A0", letterSpacing: 1.1, textTransform: "uppercase" }}>
        {label}
      </label>
      <span style={{ fontSize: 14, fontWeight: 800, color: "#35A855" }}>
        {fmt ? fmt(value) : value}
      </span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value}
      onChange={e => onChange(+e.target.value)} />
    <div style={{
      display: "flex", justifyContent: "space-between",
      fontSize: 10, color: "rgba(141,212,160,0.4)", marginTop: 4, fontWeight: 500
    }}>
      <span>{fmt ? fmt(min) : min}</span>
      <span>{fmt ? fmt(max) : max}+</span>
    </div>
  </div>
);

/* ─── Main component ────────────────────────────────────────────────────── */
const LoginForm: React.FC = () => {
  const [mode, setMode] = useState<"SignIn" | "SignUp">("SignIn");
  const [role, setRole] = useState<string>("traveler");
  const [step, setStep] = useState<number>(1);
  const [apiError, setApiErr] = useState<string>("");
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [loading, setLoading] = useState(false);

  /* local metric state (not in react-hook-form for sliders) */
  const [budget, setBudget] = useState(25000);
  const [trips, setTrips] = useState(10);
  const [tourists, setTourists] = useState(100);
  const [teamSize, setTeamSize] = useState(5);
  const [avail, setAvail] = useState<string[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuth } = useAuth();

  const {
    register, handleSubmit, watch, setValue,
    formState: { errors }, reset, getValues,
  } = useForm<FormInputs>({
    defaultValues: { tags: [], statesCovered: [], languagesSpoken: [] },
  });

  const watchTags = watch("tags") || [];
  const watchStates = watch("statesCovered") || [];
  const watchLanguages = watch("languagesSpoken") || [];
  const watchStyle = watch("travelStyle");
  const watchDuration = watch("duration");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("error") === "google_auth_failed")
      setApiErr("Google authentication failed. Please try again.");
  }, [location]);

  /* Reset step/role when toggling mode */
  const switchMode = (m: "SignIn" | "SignUp") => {
    setMode(m); setStep(1); setApiErr(""); reset();
  };

  /* Toggle array helpers */
  const toggleArr = (field: "tags" | "statesCovered" | "languagesSpoken", val: string) => {
    const cur: string[] = watch(field) || [];
    setValue(field, cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val]);
  };
  const toggleAvail = (val: string) =>
    setAvail(p => p.includes(val) ? p.filter(v => v !== val) : [...p, val]);

  /* ── Submit handler ──────────────────────────────────────────────────── */
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setApiErr("");
    setLoading(true);
    try {
      if (step === 1) {
        if (mode === "SignUp") {
          const res = await httpClient.post("/register", {
            email: data.email, password: data.password, name: data.name, role,
          });
          if (res.status === 200) { setStep(2); }
        } else {
          /* Sign In → always go to /Onboarding */
          const res = await httpClient.post("/login", {
            email: data.email, password: data.password,
          });
          if (res.status === 200) {
            await checkAuth();
            navigate("/explore");
          }
        }
      } else if (step === 2) {
        await httpClient.put("/api/user/profile/update", {
          step: 2, isSkipped: false, role,
          travelStyle: data.travelStyle, duration: data.duration,
          budget, companyName: data.companyName, tripsConducted: trips,
          touristsHelped: tourists, teamSize,
          nativeLocation: data.nativeLocation,
          pricePerTrek: data.pricePerTrek, availability: avail,
        });
        setStep(3);
      } else if (step === 3) {
        await httpClient.put("/api/user/profile/update", {
          step: 3, isSkipped: false, role,
          tags: data.tags, statesCovered: data.statesCovered,
          languagesSpoken: data.languagesSpoken,
        });
        navigate("/explore");
      }
    } catch (err: any) {
      setApiErr(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Skip ──────────────────────────────────────────────────────────── */
  const handleSkip = async () => {
    setLoading(true);
    try {
      await httpClient.put("/api/user/profile/update", { step, isSkipped: true });
      if (step === 2) setStep(3);
      else navigate("/explore");
    } catch {
      setApiErr("Could not save skip state.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Google ────────────────────────────────────────────────────────── */
  const handleGoogle = async () => {
    try {
      const res = await httpClient.get("/google/login");
      if (res.data.url) window.location.href = res.data.url;
    } catch { setApiErr("Google sign-in unavailable right now."); }
  };

  /* ── Progress values ────────────────────────────────────────────────── */
  const pct = step === 1 ? 33 : step === 2 ? 66 : 100;
  const stepMeta = [
    { n: 1, label: "Credentials" },
    { n: 2, label: "Metrics" },
    { n: 3, label: "Preferences" },
  ];

  /* ═══════════════════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════════════════════ */
  return (
    <div
      className="adv-root"
      style={{
        height: "100vh", width: "100%",
        background: `linear-gradient(155deg, ${G.g900} 0%, ${G.g700} 50%, ${G.g600} 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px 16px",
        overflow: "hidden",
      }}
    >

      {/* ── Outer card ─────────────────────────────────────────────────── */}
      <div style={{
        width: "100%", maxWidth: 980,
        height: "min(640px, 90vh)",
        display: "flex", flexWrap: "nowrap",
        background: "rgba(5,26,10,0.7)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(168,213,181,0.1)",
        borderRadius: 28,
        boxShadow: "0 32px 100px rgba(0,0,0,0.65)",
        overflow: "hidden",
      }}>

        {/* ══════════════════════════════════════════════════════════════
            LEFT PANEL — brand + carousel (unchanged)
        ══════════════════════════════════════════════════════════════ */}
        <div style={{
          flex: "1 1 380px",
          height: "100%",
          padding: "40px 36px",
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          borderRight: "1px solid rgba(168,213,181,0.08)",
          background: "rgba(9,33,16,0.5)",
          overflow: "hidden",
        }}>
          <Link to="/welcome" style={{ textDecoration: "none" }}>
            <h1 style={{
              fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, letterSpacing: -1,
              color:"#ffaa1c", textAlign: "center", margin: "0 0 6px",
            }}
            >
              ADVENTURER
            </h1>
            <p style={{
              fontSize: 13, color: "rgba(141,212,160,0.55)",
              textAlign: "center", margin: "0 0 24px", fontStyle: "italic"
            }}>
              "Plan your destination with Adventurer."
            </p>
          </Link>
          <div style={{ width: "100%", display: "flex", justifyContent: "center", zIndex: 20 }}>
            <CarouselPlugin />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            RIGHT PANEL — redesigned form
        ══════════════════════════════════════════════════════════════ */}
        <div
          className="adv-scroll"
          style={{
            flex: "1 1 440px", padding: "36px 38px",
            display: "flex", flexDirection: "column",
            height: "100%", overflowY: "auto",
          }}
        >

          {/* ── Mode toggle pill ─────────────────────────────────────── */}
          <div style={{
            display: "flex", background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(168,213,181,0.12)",
            borderRadius: 50, padding: 4, marginBottom: 28,
          }}>
            {(["SignIn", "SignUp"] as const).map(m => (
              <button key={m} type="button" onClick={() => switchMode(m)}
                style={{
                  flex: 1, padding: "9px 0", borderRadius: 50, border: "none",
                  fontSize: 13, fontWeight: 700, cursor: "pointer",
                  transition: "all .22s",
                  background: mode === m
                    ? "linear-gradient(to right,#ffaa1c,#ff7757)"
                    : "transparent",
                  color: mode === m ? "#012c18" : "rgba(141,212,160,0.55)",
                  boxShadow: mode === m ? "0 2px 14px rgba(255,170,28,0.25)" : "none",
                }}>
                {m === "SignIn" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* ── Step indicator (sign-up only) ─────────────────────────── */}
          {mode === "SignUp" && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                {stepMeta.map((s, i) => (
                  <React.Fragment key={s.n}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                      <div
                        className={step === s.n ? "sp-pulse" : ""}
                        style={{
                          width: 30, height: 30, borderRadius: "50%",
                          border: `2px solid ${step >= s.n ? "#35A855" : "rgba(168,213,181,0.2)"}`,
                          background: step > s.n
                            ? "#35A855"
                            : step === s.n
                              ? "rgba(53,168,85,0.15)"
                              : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 12, fontWeight: 800, transition: "all .35s",
                          color: step > s.n ? "#fff" : step === s.n ? "#35A855" : "rgba(168,213,181,0.3)",
                        }}>
                        {step > s.n ? <FaCheck size={11} /> : s.n}
                      </div>
                      <span style={{
                        fontSize: 9, fontWeight: step === s.n ? 700 : 500, letterSpacing: .5,
                        color: step >= s.n ? "rgba(192,232,204,0.8)" : "rgba(141,212,160,0.25)",
                        textTransform: "uppercase", whiteSpace: "nowrap",
                      }}>
                        {s.label}
                      </span>
                    </div>
                    {i < stepMeta.length - 1 && (
                      <div style={{
                        flex: 1, height: 2, margin: "0 6px 18px",
                        background: "rgba(168,213,181,0.12)", borderRadius: 1, position: "relative", overflow: "hidden"
                      }}>
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(to right,#35A855,#58C470)",
                          transform: `scaleX(${step > s.n ? 1 : 0})`,
                          transformOrigin: "left",
                          transition: "transform .45s cubic-bezier(.4,0,.2,1)",
                        }} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              {/* thin pct bar */}
              <div style={{ height: 3, background: "rgba(168,213,181,0.1)", borderRadius: 2 }}>
                <div style={{
                  height: "100%", width: `${pct}%`, borderRadius: 2,
                  background: "linear-gradient(to right,#1B6630,#58C470)",
                  transition: "width .5s cubic-bezier(.4,0,.2,1)"
                }} />
              </div>
            </div>
          )}

          {/* ── API error banner ──────────────────────────────────────── */}
          {apiError && (
            <div style={{
              background: "rgba(224,82,82,0.1)", border: "1px solid rgba(224,82,82,0.3)",
              borderRadius: 10, padding: "10px 13px", marginBottom: 16,
              fontSize: 12, color: "#E05252", fontWeight: 500,
            }}>
              ⚠ {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="step-enter" key={`${mode}-${step}`}>

            {/* ═══════════════════════════════════════════════════════════
                STEP 1 — Credentials
            ═══════════════════════════════════════════════════════════ */}
            {step === 1 && (
              <>
                {/* Heading */}
                <div style={{ marginBottom: 22 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: "0 0 4px", letterSpacing: -.4 }}>
                    {mode === "SignIn" ? "Welcome back Adventurer" : "Create account"}
                  </h2>
                  <p style={{ fontSize: 12, color: "rgba(141,212,160,0.55)", margin: 0 }}>
                    {mode === "SignIn"
                      ? "Sign in to continue your adventure"
                      : "Join thousands of adventurers today"}
                  </p>
                </div>

                {/* Name (sign-up only) */}
                {mode === "SignUp" && (
                  <InputField label="Full Name" icon={<FaUser size={13} />} field="name"
                    placeholder="Jane Doe" error={errors.name?.message}
                    register={register} rules={{ required: "Name is required" }} />
                )}

                {/* Email */}
                <InputField label="Email Address" icon={<FaEnvelope size={13} />} field="email"
                  type="email" placeholder="jane@example.com" error={errors.email?.message}
                  register={register}
                  rules={{ required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" } }} />

                {/* Password */}
                <InputField label="Password" icon={<FaLock size={13} />} field="password"
                  placeholder="Minimum 8 characters" error={errors.password?.message}
                  register={register}
                  rules={{ required: "Password is required", minLength: { value: 8, message: "At least 8 characters" } }}
                  eyeToggle={{ show: showPw, onToggle: () => setShowPw(p => !p) }} />

                {/* Confirm password (sign-up only) */}
                {mode === "SignUp" && (
                  <InputField label="Confirm Password" icon={<FaLock size={13} />} field="confirmPassword"
                    placeholder="Re-enter password" error={errors.confirmPassword?.message}
                    register={register}
                    rules={{ validate: (v: string) => v === getValues("password") || "Passwords do not match" }}
                    eyeToggle={{ show: showCPw, onToggle: () => setShowCPw(p => !p) }} />
                )}

                {/* Forgot (sign-in) */}
                {mode === "SignIn" && (
                  <div style={{ textAlign: "right", marginBottom: 20, marginTop: -6 }}>
                    <Link to="/forgot-password"
                      style={{ fontSize: 11, color: "rgba(141,212,160,0.55)", textDecoration: "none", fontWeight: 600 }}>
                      Forgot password?
                    </Link>
                  </div>
                )}

                {/* Role cards (sign-up) */}
                {mode === "SignUp" && (
                  <div style={{ marginBottom: 22 }}>
                    <label style={{
                      display: "block", fontSize: 10, fontWeight: 700, color: "#8DD4A0",
                      letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 10
                    }}>
                      I am a…
                    </label>
                    <div style={{ display: "flex", gap: 10 }}>
                      {ROLES.map(r => (
                        <button key={r.id} type="button"
                          className={`adv-role-card${role === r.id ? " active" : ""}`}
                          onClick={() => setRole(r.id)}>
                          <div style={{ fontSize: 24, marginBottom: 6 }}>{r.icon}</div>
                          <div style={{
                            fontSize: 12, fontWeight: 800,
                            color: role === r.id ? "#C0E8CC" : "rgba(141,212,160,0.7)", marginBottom: 2
                          }}>
                            {r.label}
                          </div>
                          <div style={{ fontSize: 10, color: "rgba(141,212,160,0.4)", lineHeight: 1.3 }}>
                            {r.sub}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary CTA */}
                <button type="submit" className="adv-btn-primary" disabled={loading}>
                  {loading
                    ? "Please wait…"
                    : mode === "SignIn" ? "Sign In →" : "Create Account →"}
                </button>

                {/* Social auth */}
                <div style={{ margin: "18px 0" }}>
                  <div className="adv-divider">or continue with</div>
                </div>
                <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                  <button type="button" className="adv-btn-social adv-btn-google" onClick={handleGoogle}>
                    <FcGoogle size={17} /> Google
                  </button>
                  <button type="button" className="adv-btn-social adv-btn-apple"
                    onClick={() => setApiErr("Apple Sign-In coming soon.")}>
                    <FaApple size={17} /> Apple
                  </button>
                </div>

                {/* Switch mode link */}
                <p style={{ fontSize: 12, textAlign: "center", color: "rgba(141,212,160,0.45)", margin: 0 }}>
                  {mode === "SignIn" ? "Don't have an account? " : "Already have an account? "}
                  <button type="button"
                    onClick={() => switchMode(mode === "SignIn" ? "SignUp" : "SignIn")}
                    style={{
                      background: "none", border: "none", color: "#58C470",
                      fontWeight: 700, cursor: "pointer", fontSize: 12
                    }}>
                    {mode === "SignIn" ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </>
            )}

            {/* ═══════════════════════════════════════════════════════════
                STEP 2 — Profile Metrics
            ═══════════════════════════════════════════════════════════ */}
            {step === 2 && (
              <>
                <div style={{ marginBottom: 20 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 900, color: "#fff", margin: "0 0 4px", letterSpacing: -.3 }}>
                    Profile Metrics
                  </h2>
                  <p style={{ fontSize: 12, color: "rgba(141,212,160,0.55)", margin: 0 }}>
                    {role === "traveler" && "Tell us about your travel style"}
                    {role === "organizer" && "Your business numbers"}
                    {role === "guide" && "Your guide expertise"}
                  </p>
                </div>

                {/* ── Traveler ── */}
                {role === "traveler" && (
                  <>
                    <div style={{ marginBottom: 18 }}>
                      <label style={{
                        display: "block", fontSize: 10, fontWeight: 700, color: "#8DD4A0",
                        letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 9
                      }}>
                        Travel Style
                      </label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                        {TRAVEL_STYLES.map(s => (
                          <button key={s} type="button"
                            className={`adv-chip${watchStyle === s ? " active" : ""}`}
                            onClick={() => setValue("travelStyle", watchStyle === s ? "" : s)}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <RangeSlider label="Budget per Trip" field="budget"
                      min={5000} max={500000} step={5000}
                      value={budget} onChange={setBudget}
                      fmt={v => v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : `₹${v / 1000}K`} />

                    <div style={{ marginBottom: 8 }}>
                      <label style={{
                        display: "block", fontSize: 10, fontWeight: 700, color: "#8DD4A0",
                        letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 9
                      }}>
                        Preferred Duration
                      </label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                        {DURATIONS.map(d => (
                          <button key={d} type="button"
                            className={`adv-chip${watchDuration === d ? " active" : ""}`}
                            onClick={() => setValue("duration", watchDuration === d ? "" : d)}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* ── Organizer ── */}
                {role === "organizer" && (
                  <>
                    <InputField label="Agency / Brand Name" icon={<FaUser size={13} />}
                      field="companyName" placeholder="Adventure Co."
                      error={errors.companyName?.message}
                      register={register} rules={{}} />
                    <RangeSlider label="Trips Conducted" field="tripsConducted"
                      min={0} max={500} step={5}
                      value={trips} onChange={setTrips}
                      fmt={v => `${v}+`} />
                    <RangeSlider label="Tourists Helped" field="touristsHelped"
                      min={0} max={5000} step={50}
                      value={tourists} onChange={setTourists}
                      fmt={v => v >= 1000 ? `${(v / 1000).toFixed(1)}k+` : `${v}+`} />
                    <RangeSlider label="Team Size" field="teamSize"
                      min={1} max={100}
                      value={teamSize} onChange={setTeamSize}
                      fmt={v => `${v} people`} />
                  </>
                )}

                {/* ── Guide ── */}
                {role === "guide" && (
                  <>
                    <InputField label="Location Expertise" icon={<FaUser size={13} />}
                      field="nativeLocation"
                      placeholder="e.g. Western Ghats, Sandhan Valley"
                      error={errors.nativeLocation?.message}
                      register={register} rules={{}} />
                    <InputField label="Booking Price per Day (₹)" icon={<FaLock size={13} />}
                      field="pricePerTrek" type="number"
                      placeholder="e.g. 2500"
                      error={errors.pricePerTrek?.message}
                      register={register} rules={{}} />
                    <div style={{ marginBottom: 18 }}>
                      <label style={{
                        display: "block", fontSize: 10, fontWeight: 700, color: "#8DD4A0",
                        letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 9
                      }}>
                        Availability
                      </label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                        {AVAILABILITY.map(a => (
                          <button key={a} type="button"
                            className={`adv-chip${avail.includes(a) ? " active" : ""}`}
                            onClick={() => toggleAvail(a)}>
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button type="button" className="adv-btn-skip" onClick={handleSkip} disabled={loading}>
                    Skip for Now
                  </button>
                  <button type="submit" className="adv-btn-primary" disabled={loading}
                    style={{ flex: 2 }}>
                    {loading ? "Saving…" : "Next: Preferences →"}
                  </button>
                </div>
                <button type="button" onClick={() => setStep(1)}
                  style={{
                    display: "block", margin: "10px auto 0", background: "none",
                    border: "none", color: "rgba(141,212,160,0.35)", fontSize: 11,
                    cursor: "pointer", fontWeight: 500
                  }}>
                  ← Back to Credentials
                </button>
              </>
            )}

            {/* ═══════════════════════════════════════════════════════════
                STEP 3 — Setup Preferences
            ═══════════════════════════════════════════════════════════ */}
            {step === 3 && (
              <>
                <div style={{ marginBottom: 20 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 900, color: "#fff", margin: "0 0 4px", letterSpacing: -.3 }}>
                    Setup Preferences
                  </h2>
                  <p style={{ fontSize: 12, color: "rgba(141,212,160,0.55)", margin: 0 }}>
                    {role === "traveler" ? "Pick what excites you" : "Define your expertise"}
                  </p>
                </div>

                {/* ── Traveler: interest tiles ── */}
                {role === "traveler" && (
                  <div style={{ marginBottom: 18 }}>
                    <label style={{
                      display: "block", fontSize: 10, fontWeight: 700, color: "#8DD4A0",
                      letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 10
                    }}>
                      Travel Interests
                      <span style={{ color: "rgba(141,212,160,0.4)", fontWeight: 500, textTransform: "none", marginLeft: 6 }}>
                        · {watchTags.length} selected
                      </span>
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {T_TAGS.map(t => (
                        <button key={t.l} type="button"
                          className={`adv-tile${watchTags.includes(t.l) ? " active" : ""}`}
                          onClick={() => toggleArr("tags", t.l)}>
                          <span style={{ fontSize: 20, flexShrink: 0 }}>{t.e}</span>
                          <span style={{
                            fontSize: 13, fontWeight: watchTags.includes(t.l) ? 700 : 500,
                            color: watchTags.includes(t.l) ? "#C0E8CC" : "rgba(141,212,160,0.65)"
                          }}>
                            {t.l}
                          </span>
                          {watchTags.includes(t.l) && (
                            <FaCheck size={10} style={{ color: "#35A855", marginLeft: "auto", flexShrink: 0 }} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Organizer / Guide ── */}
                {(role === "organizer" || role === "guide") && (
                  <>
                    {/* States */}
                    <div style={{ marginBottom: 18 }}>
                      <label style={{
                        display: "block", fontSize: 10, fontWeight: 700, color: "#8DD4A0",
                        letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 9
                      }}>
                        State Coverage
                        <span style={{ color: "rgba(141,212,160,0.4)", fontWeight: 500, textTransform: "none", marginLeft: 6 }}>
                          · {watchStates.length} selected
                        </span>
                      </label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                        {STATES.map(s => (
                          <button key={s} type="button"
                            className={`adv-chip${watchStates.includes(s) ? " active" : ""}`}
                            onClick={() => toggleArr("statesCovered", s)}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Specialty tiles */}
                    <div style={{ marginBottom: 18 }}>
                      <label style={{
                        display: "block", fontSize: 10, fontWeight: 700, color: "#8DD4A0",
                        letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 9
                      }}>
                        Specialty Tags
                        <span style={{ color: "rgba(141,212,160,0.4)", fontWeight: 500, textTransform: "none", marginLeft: 6 }}>
                          · {watchTags.length} selected
                        </span>
                      </label>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {S_TAGS.map(t => (
                          <button key={t.l} type="button"
                            className={`adv-tile${watchTags.includes(t.l) ? " active" : ""}`}
                            onClick={() => toggleArr("tags", t.l)}>
                            <span style={{ fontSize: 18 }}>{t.e}</span>
                            <span style={{
                              fontSize: 12, fontWeight: watchTags.includes(t.l) ? 700 : 500,
                              color: watchTags.includes(t.l) ? "#C0E8CC" : "rgba(141,212,160,0.65)"
                            }}>
                              {t.l}
                            </span>
                            {watchTags.includes(t.l) && (
                              <FaCheck size={9} style={{ color: "#35A855", marginLeft: "auto" }} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div style={{ marginBottom: 8 }}>
                      <label style={{
                        display: "block", fontSize: 10, fontWeight: 700, color: "#8DD4A0",
                        letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 9
                      }}>
                        Languages Spoken
                      </label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                        {LANGUAGES.map(l => (
                          <button key={l} type="button"
                            className={`adv-chip${watchLanguages.includes(l) ? " active" : ""}`}
                            onClick={() => toggleArr("languagesSpoken", l)}>
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                  <button type="button" className="adv-btn-skip" onClick={handleSkip} disabled={loading}>
                    Skip for Now
                  </button>
                  <button type="submit" className="adv-btn-primary" disabled={loading}
                    style={{ flex: 2 }}>
                    {loading ? "Saving…" : "Complete Setup ✓"}
                  </button>
                </div>
                <button type="button" onClick={() => setStep(2)}
                  style={{
                    display: "block", margin: "10px auto 0", background: "none",
                    border: "none", color: "rgba(141,212,160,0.35)", fontSize: 11,
                    cursor: "pointer", fontWeight: 500
                  }}>
                  ← Back to Profile Metrics
                </button>
              </>
            )}

          </form>

          {/* ── Footer ─────────────────────────────────────────────────── */}
          <p style={{
            fontSize: 10, color: "rgba(141,212,160,0.2)", textAlign: "center",
            marginTop: 24, fontWeight: 500, letterSpacing: .4
          }}>
            🔒 Secured & encrypted · Adventurer © 2026
          </p>
        </div>
        {/* /RIGHT PANEL */}

      </div>
    </div>
  );
};

export default LoginForm;
