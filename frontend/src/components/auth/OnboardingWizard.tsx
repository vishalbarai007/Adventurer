import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, ArrowRight, Heart
} from "lucide-react";
import httpClient from "@/services/httpClient";
import { useAuth } from "@/contexts/AuthContext";

interface OnboardingWizardProps {
  onComplete?: () => void;
  initialStep?: 2 | 3;
}

interface OnboardingFormInputs {
  // Step 2 inputs
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;

  tripsConducted?: number;
  touristsHelped?: number;
  teamSize?: number;
  experienceYears?: number;

  nativeLocation?: string;
  pricePerTrek?: number;
  availability?: 'weekends' | 'weekdays' | 'all';

  // Step 3 inputs
  userTags: string[]; // traveler chips
  specialityTags: string[]; // organizer chips
  statesCovered: string[]; // organizer states
  languagesSpoken: string[]; // guide languages
  isActiveListing?: boolean;
}

const TRAVELER_TAGS = ['Beaches', 'Waterfalls', 'Mountains', 'Historical', 'Forests', 'Caves', 'Wildlife', 'Temples'];
const SPECIALITY_TAGS = ['Extreme Trekking', 'Night Trails', 'Family Camping', 'Waterfall Rappelling', 'Stargazing', 'Fort Exploration'];
const STATES_LIST = ['Maharashtra', 'Goa', 'Karnataka', 'Gujarat', 'Himachal Pradesh', 'Uttarakhand'];
const LANGUAGES_LIST = ['Marathi', 'Hindi', 'English', 'Gujarati', 'Kannada'];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, initialStep }) => {
  const { user, checkAuth } = useAuth();
  const role = user?.role || 'traveler';
  
  // Calculate starting step based on user onboarding progress
  const getStartingStep = () => {
    if (initialStep) return initialStep;
    if (user?.onboardingProgress === 66) return 3;
    return 2; // Default to step 2 (Profile Metrics)
  };

  const [step, setStep] = useState<2 | 3>(getStartingStep());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, setValue, watch } = useForm<OnboardingFormInputs>({
    defaultValues: {
      gender: (user as any)?.travelerProfile?.gender || undefined,
      dateOfBirth: (user as any)?.travelerProfile?.dateOfBirth || '',
      emergencyContactName: (user as any)?.travelerProfile?.emergencyContact?.name || '',
      emergencyContactPhone: (user as any)?.travelerProfile?.emergencyContact?.phone || '',
      emergencyContactRelation: (user as any)?.travelerProfile?.emergencyContact?.relation || '',
      
      tripsConducted: (user as any)?.organizationProfile?.tripsConducted || 0,
      touristsHelped: (user as any)?.organizationProfile?.touristsHelped || 0,
      teamSize: (user as any)?.organizationProfile?.teamSize || 1,
      experienceYears: (user as any)?.organizationProfile?.experienceYears || (user as any)?.guideProfile?.experienceYears || 1,
      
      nativeLocation: (user as any)?.guideProfile?.nativeLocation || '',
      pricePerTrek: (user as any)?.guideProfile?.pricePerTrek || 1000,
      availability: (user as any)?.guideProfile?.availability || 'weekends',
      
      userTags: (user as any)?.travelerProfile?.userTags || [],
      specialityTags: (user as any)?.organizationProfile?.specialityTags || [],
      statesCovered: (user as any)?.organizationProfile?.statesCovered || [],
      languagesSpoken: (user as any)?.guideProfile?.languagesSpoken || [],
      isActiveListing: (user as any)?.guideProfile?.isActiveListing !== undefined ? (user as any)?.guideProfile?.isActiveListing : true,
    }
  });

  const watchedUserTags = watch('userTags') || [];
  const watchedSpecialityTags = watch('specialityTags') || [];
  const watchedStatesCovered = watch('statesCovered') || [];
  const watchedLanguagesSpoken = watch('languagesSpoken') || [];

  const handleChipToggle = (fieldName: keyof OnboardingFormInputs, value: string) => {
    const currentList = watch(fieldName) as string[] || [];
    if (currentList.includes(value)) {
      setValue(fieldName, currentList.filter(item => item !== value) as any);
    } else {
      setValue(fieldName, [...currentList, value] as any);
    }
  };

  const saveProgress = async (completedStep: 2 | 3, isSkipped: boolean = false) => {
    setLoading(true);
    setError("");

    // Calculate onboarding progress metric
    // Step 1 (Account Creation) = 30%
    // Step 2 (Profile Metrics) = 60%
    // Step 3 (Setup Preferences) = 100%
    const progressPercentage = isSkipped 
      ? (completedStep === 2 ? 30 : 60)
      : (completedStep === 2 ? 60 : 100);

    const values = watch();

    const payload: any = {
      role,
      onboardingProgress: progressPercentage
    };

    if (role === 'traveler') {
      payload.travelerProfile = {
        gender: values.gender || null,
        dateOfBirth: values.dateOfBirth || null,
        emergencyContact: {
          name: values.emergencyContactName || '',
          phone: values.emergencyContactPhone || '',
          relation: values.emergencyContactRelation || ''
        },
        userTags: values.userTags
      };
    } else if (role === 'organizer') {
      payload.organizationProfile = {
        companyName: (user as any)?.organizationProfile?.companyName || (user as any)?.companyName || 'My Organization',
        gstNumber: (user as any)?.organizationProfile?.gstNumber || (user as any)?.gstNumber || '',
        tripsConducted: Number(values.tripsConducted || 0),
        touristsHelped: Number(values.touristsHelped || 0),
        teamSize: Number(values.teamSize || 1),
        experienceYears: Number(values.experienceYears || 0),
        specialityTags: values.specialityTags,
        statesCovered: values.statesCovered,
        isVerified: (user as any)?.organizationProfile?.isVerified ?? false
      };
    } else if (role === 'guide') {
      payload.guideProfile = {
        nativeLocation: values.nativeLocation || '',
        languagesSpoken: values.languagesSpoken,
        availability: values.availability || 'all',
        pricePerTrek: Number(values.pricePerTrek || 1000),
        experienceYears: Number(values.experienceYears || 0),
        isActiveListing: values.isActiveListing ?? true
      };
    }

    try {
      await httpClient.post("/api/users/onboarding-progression", payload);
      await checkAuth();

      if (isSkipped || completedStep === 3) {
        if (onComplete) onComplete();
      } else {
        setStep(3);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to update onboarding progress. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    saveProgress(2, false);
  };

  const handleSkipStep = () => {
    saveProgress(step, true);
  };

  const handleFinalSubmit = () => {
    saveProgress(3, false);
  };

  // Slide Animation Variants
  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl bg-[#132d1e]/90 border border-emerald-800/40 p-6 md:p-10 shadow-2xl backdrop-blur-md text-white">
      {/* Progress Line Component */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs md:text-sm font-semibold text-emerald-400">
          <div className="flex items-center gap-1.5 text-emerald-300">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-800 text-white text-xs border border-emerald-500 font-bold">1</span>
            <span>Account</span>
          </div>
          <div className="h-0.5 flex-1 mx-3 bg-emerald-800 rounded">
            <div className="h-full bg-emerald-500 w-full" />
          </div>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-emerald-300' : 'text-emerald-700'}`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${step >= 2 ? 'bg-emerald-700 text-white border border-emerald-400' : 'bg-emerald-950/50 text-emerald-700 border border-emerald-900'}`}>2</span>
            <span>Metrics</span>
          </div>
          <div className="h-0.5 flex-1 mx-3 bg-emerald-800 rounded">
            <div className={`h-full bg-emerald-500 transition-all duration-300 ${step === 3 ? 'w-full' : 'w-0'}`} />
          </div>
          <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-emerald-300' : 'text-emerald-700'}`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${step === 3 ? 'bg-emerald-700 text-white border border-emerald-400' : 'bg-emerald-950/50 text-emerald-700 border border-emerald-900'}`}>3</span>
            <span>Preferences</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-950/50 border border-red-800/30 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 2 && (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl font-serif">
                {role === 'traveler' && "Tell us about yourself"}
                {role === 'organizer' && "Business Operations metrics"}
                {role === 'guide' && "Local Guide Marketplace setup"}
              </h2>
              <p className="mt-2 text-sm text-emerald-400/80">
                {role === 'traveler' && "Provide some quick metrics so we can verify and customize your experience."}
                {role === 'organizer' && "Showcase your agency's capacity to build instant traveler confidence."}
                {role === 'guide' && "Fill out your guiding baseline, location expertise and booking price."}
              </p>
            </div>

            <div className="space-y-4">
              {/* TRAVELER STEP 2 */}
              {role === 'traveler' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Gender</label>
                      <select 
                        {...register("gender")}
                        className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-3 px-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Date of Birth</label>
                      <input 
                        type="date"
                        {...register("dateOfBirth")}
                        className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-3 px-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="border-t border-emerald-900/30 pt-4 mt-4">
                    <h3 className="text-sm font-semibold text-emerald-300 mb-3 flex items-center gap-2">
                      <Heart size={16} /> Emergency Contact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-emerald-400/80 mb-1.5">Contact Name</label>
                        <input 
                          type="text"
                          placeholder="e.g. John Doe"
                          {...register("emergencyContactName")}
                          className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-2.5 px-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-emerald-400/80 mb-1.5">Contact Phone</label>
                        <input 
                          type="tel"
                          placeholder="10-digit number"
                          {...register("emergencyContactPhone")}
                          className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-2.5 px-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-emerald-400/80 mb-1.5">Relation</label>
                        <input 
                          type="text"
                          placeholder="e.g. Father, Spouse"
                          {...register("emergencyContactRelation")}
                          className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-2.5 px-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ORGANIZER STEP 2 */}
              {role === 'organizer' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Trips Conducted</label>
                      <input 
                        type="number" 
                        min="0"
                        placeholder="e.g. 24"
                        {...register("tripsConducted")}
                        className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-3 px-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Tourists Guided/Helped</label>
                      <input 
                        type="number"
                        min="0"
                        placeholder="e.g. 500"
                        {...register("touristsHelped")}
                        className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-3 px-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Team Size</label>
                      <input 
                        type="number"
                        min="1"
                        placeholder="e.g. 5"
                        {...register("teamSize")}
                        className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-3 px-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Years of Experience</label>
                      <input 
                        type="number"
                        min="0"
                        placeholder="e.g. 3"
                        {...register("experienceYears")}
                        className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-3 px-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* GUIDE STEP 2 */}
              {role === 'guide' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Native Guiding Location expertise <span className="text-red-400">*</span></label>
                      <input 
                        type="text" 
                        placeholder="e.g. Matheran, Malshej Ghat"
                        {...register("nativeLocation", { required: role === 'guide' })}
                        className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-3 px-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Price Per Trek (₹) <span className="text-red-400">*</span></label>
                      <input 
                        type="number"
                        min="100"
                        placeholder="e.g. 1000"
                        {...register("pricePerTrek", { required: role === 'guide' })}
                        className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-3 px-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Guiding Availability</label>
                      <select 
                        {...register("availability")}
                        className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-3 px-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                      >
                        <option value="all">All Days Availability</option>
                        <option value="weekends">Weekends Only</option>
                        <option value="weekdays">Weekdays Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Guiding Experience (Years)</label>
                      <input 
                        type="number"
                        min="0"
                        placeholder="e.g. 4"
                        {...register("experienceYears")}
                        className="w-full bg-[#1b3d2b] border border-emerald-900/50 rounded-xl py-3 px-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-6 border-t border-emerald-900/20">
              <button
                type="button"
                onClick={handleSkipStep}
                disabled={loading}
                className="px-5 py-2.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Skip for Now
              </button>
              
              <button
                type="button"
                onClick={handleNextStep}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold rounded-xl shadow-lg transition flex items-center gap-2"
              >
                {loading ? "Saving..." : <>Continue to Preferences <ArrowRight size={16} /></>}
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl font-serif">
                {role === 'traveler' && "Setup your adventure preferences"}
                {role === 'organizer' && "Complete Agency Profile"}
                {role === 'guide' && "Complete Guide Listing"}
              </h2>
              <p className="mt-2 text-sm text-emerald-400/80">
                {role === 'traveler' && "Choose your target preferences so we can recommend the best treks."}
                {role === 'organizer' && "Setup specialty tags and states covered by your agency."}
                {role === 'guide' && "Add your spoken languages to verify traveler communications."}
              </p>
            </div>

            <div className="space-y-4">
              {/* TRAVELER STEP 3 (CHIPS) */}
              {role === 'traveler' && (
                <div>
                  <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">Preferred Destinations / Activities</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TRAVELER_TAGS.map((tag) => {
                      const isSelected = watchedUserTags.includes(tag.toLowerCase());
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleChipToggle('userTags', tag.toLowerCase())}
                          className={`py-3 px-4 rounded-xl text-xs font-bold text-center border transition-all ${
                            isSelected 
                              ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-950/30' 
                              : 'bg-[#1b3d2b]/60 border-emerald-900/40 text-emerald-300 hover:bg-[#1b3d2b] hover:border-emerald-800'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ORGANIZER STEP 3 */}
              {role === 'organizer' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2.5">Speciality Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {SPECIALITY_TAGS.map((tag) => {
                        const isSelected = watchedSpecialityTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleChipToggle('specialityTags', tag)}
                            className={`py-2 px-3.5 rounded-full text-xs font-bold border transition ${
                              isSelected 
                                ? 'bg-emerald-500 border-emerald-400 text-white' 
                                : 'bg-[#1b3d2b]/50 border-emerald-900/40 text-emerald-300 hover:bg-[#1b3d2b]'
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2.5">States Covered</label>
                    <div className="flex flex-wrap gap-2">
                      {STATES_LIST.map((state) => {
                        const isSelected = watchedStatesCovered.includes(state);
                        return (
                          <button
                            key={state}
                            type="button"
                            onClick={() => handleChipToggle('statesCovered', state)}
                            className={`py-2 px-3.5 rounded-full text-xs font-bold border transition ${
                              isSelected 
                                ? 'bg-emerald-500 border-emerald-400 text-white' 
                                : 'bg-[#1b3d2b]/50 border-emerald-900/40 text-emerald-300 hover:bg-[#1b3d2b]'
                            }`}
                          >
                            {state}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* GUIDE STEP 3 */}
              {role === 'guide' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2.5">Languages Spoken</label>
                    <div className="flex flex-wrap gap-2">
                      {LANGUAGES_LIST.map((lang) => {
                        const isSelected = watchedLanguagesSpoken.includes(lang);
                        return (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => handleChipToggle('languagesSpoken', lang)}
                            className={`py-2 px-3.5 rounded-full text-xs font-bold border transition ${
                              isSelected 
                                ? 'bg-emerald-500 border-emerald-400 text-white' 
                                : 'bg-[#1b3d2b]/50 border-emerald-900/40 text-emerald-300 hover:bg-[#1b3d2b]'
                            }`}
                          >
                            {lang}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-[#1b3d2b]/40 border border-emerald-900/30 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-200">Active Listing</h4>
                      <p className="text-xs text-emerald-400/80">Make your guide card discoverable on the marketplace instantly.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        {...register("isActiveListing")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#0c1f15] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-emerald-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-6 border-t border-emerald-900/20">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={loading}
                  className="px-4 py-2.5 text-sm font-semibold text-emerald-400/70 hover:text-emerald-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSkipStep}
                  disabled={loading}
                  className="px-4 py-2.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Skip for Now
                </button>
              </div>

              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold rounded-xl shadow-lg transition flex items-center gap-2"
              >
                {loading ? "Submitting..." : <>Complete Setup <CheckCircle size={16} /></>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default OnboardingWizard;


