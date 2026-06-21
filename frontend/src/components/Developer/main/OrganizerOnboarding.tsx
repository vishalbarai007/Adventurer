import React, { useState } from "react";
import { Building, Phone, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import httpClient from "../../../services/httpClient";
import { useAuth } from "../../../Contexts/AuthContext";

export const OrganizerOnboarding: React.FC = () => {
  const { checkAuth } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      setError("Company Name is required.");
      return;
    }
    if (!contactPhone.trim()) {
      setError("Contact Phone Number is required.");
      return;
    }
    // Simple phone verification (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contactPhone.replace(/\s+/g, ""))) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await httpClient.put("/api/user/profile", {
        onboardingCompleted: true,
        businessDetails: {
          companyName: companyName.trim(),
          gstNumber: gstNumber.trim(),
          isVerified: false,
          contactPhone: contactPhone.trim(),
        },
      });
      // Refresh user auth context state to bypass guard
      await checkAuth();
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.error || "Failed to save details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1f14] p-4 text-white overflow-y-auto">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(5,150,105,0.08),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-lg rounded-3xl bg-[#132d1e]/80 border border-emerald-900/30 p-8 md:p-10 shadow-2xl backdrop-blur-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-950 border border-emerald-800/40 rounded-2xl mb-4">
            <Building className="h-8 w-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Business Details
          </h2>
          <p className="mt-2 text-sm text-emerald-400/80">
            Let's setup your organization profile to begin listing adventures.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-950/50 border border-red-800/30 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name */}
          <div>
            <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              Company / Agency Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-600">
                <Building size={18} />
              </span>
              <input
                type="text"
                placeholder="e.g. Summit Seekers Ltd"
                className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-emerald-700/60 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Contact Phone */}
          <div>
            <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              Business Contact Phone <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-600">
                <Phone size={18} />
              </span>
              <input
                type="tel"
                placeholder="e.g. 9876543210"
                className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-emerald-700/60 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* GST Number */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                GST Identification Number
              </label>
              <span className="text-xs text-emerald-500/60">Optional</span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-600">
                <FileText size={18} />
              </span>
              <input
                type="text"
                placeholder="e.g. 27AAAAA1111A1Z1"
                className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-emerald-700/60 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition uppercase"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-950/50 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>Saving Profiles...</>
              ) : (
                <>
                  Complete Setup <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </div>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-emerald-500/60">
          <CheckCircle size={14} className="text-emerald-400" />
          <span>Information is verified securely</span>
        </div>
      </motion.div>
    </div>
  );
};
export default OrganizerOnboarding;
