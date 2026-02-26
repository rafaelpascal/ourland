import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface FormState {
  firstName: string;
  lastName: string;
  nyscCertNo: string;
  votersCardNo: string;
  stateOfResidence: string;
  email: string;
  whatsapp: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  nyscCertNo?: string;
  votersCardNo?: string;
  stateOfResidence?: string;
  email?: string;
  whatsapp?: string;
}

interface InputFieldProps {
  label: string;
  name: keyof FormState;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: string;
}

// ── Data ───────────────────────────────────────────────────────────────────────
const NIGERIAN_STATES: string[] = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

// ── Sub-components ─────────────────────────────────────────────────────────────
const CoatOfArms = () => (
  <svg
    viewBox="0 0 120 140"
    className="w-16 h-20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="60" cy="70" rx="50" ry="60" fill="#008751" opacity="0.15" />
    <path
      d="M60 20 L90 50 L90 90 Q60 110 30 90 L30 50 Z"
      fill="#008751"
      stroke="#006400"
      strokeWidth="1.5"
    />
    <path
      d="M45 65 L55 75 L75 55"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="60"
      cy="25"
      r="8"
      fill="#FFD700"
      stroke="#B8860B"
      strokeWidth="1"
    />
    <text
      x="60"
      y="29"
      textAnchor="middle"
      fontSize="8"
      fill="#006400"
      fontWeight="bold"
    >
      ★
    </text>
    <rect x="35" y="95" width="50" height="8" rx="2" fill="#008751" />
    <text
      x="60"
      y="101.5"
      textAnchor="middle"
      fontSize="5"
      fill="white"
      fontWeight="bold"
      letterSpacing="0.5"
    >
      FEDERAL REPUBLIC
    </text>
    <path
      d="M25 85 Q20 75 22 65 Q24 55 30 50"
      stroke="#006400"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M95 85 Q100 75 98 65 Q96 55 90 50"
      stroke="#006400"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="22" cy="62" r="5" fill="#FFD700" />
    <circle cx="98" cy="62" r="5" fill="#FFD700" />
  </svg>
);

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  icon,
}: InputFieldProps) => (
  <div className="group">
    <label className="block text-xs font-semibold text-emerald-800 mb-1.5 tracking-widest uppercase">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 text-base">
          {icon}
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-3 bg-white border-2 border-emerald-200 rounded-lg text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all duration-200 hover:border-emerald-400`}
      />
    </div>
  </div>
);

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    nyscCertNo: "",
    votersCardNo: "",
    stateOfResidence: "",
    email: "",
    whatsapp: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.nyscCertNo.trim())
      newErrors.nyscCertNo = "NYSC Discharge Certificate Number is required";
    if (!form.votersCardNo.trim())
      newErrors.votersCardNo = "Voters Card Number is required";
    if (!form.stateOfResidence)
      newErrors.stateOfResidence = "Please select your state";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Valid email address required";
    }
    if (
      !form.whatsapp.trim() ||
      !/^(\+?234|0)[789][01]\d{8}$/.test(form.whatsapp.replace(/\s/g, ""))
    ) {
      newErrors.whatsapp = "Enter a valid Nigerian phone number";
    }
    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  // ── Success Screen ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2
            className="text-2xl font-bold text-emerald-900 mb-2"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Submission Successful
          </h2>
          <p className="text-gray-500 text-sm mb-2">
            Your information has been received and recorded.
          </p>
          <p className="text-gray-400 text-xs mb-6">
            Reference ID: NGV-
            {Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
          <div className="bg-emerald-50 rounded-lg p-4 text-left text-xs text-emerald-800 space-y-1 mb-6">
            <p>
              <span className="font-semibold">Name:</span> {form.firstName}{" "}
              {form.lastName}
            </p>
            <p>
              <span className="font-semibold">State:</span>{" "}
              {form.stateOfResidence}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {form.email}
            </p>
          </div>
          <p className="text-xs text-gray-400">
            You will be contacted via your registered email and WhatsApp number.
          </p>
        </div>
      </div>
    );
  }

  // ── Registration Form ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-800 relative overflow-hidden">
      {/* Decorative background rings */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-white rounded-full"
            style={{
              width: `${(i + 1) * 120}px`,
              height: `${(i + 1) * 120}px`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
              <CoatOfArms />
            </div>
          </div>
          <p className="text-emerald-300 text-xs tracking-[0.3em] uppercase font-medium mb-1">
            Federal Republic of Nigeria
          </p>
          <h1
            className="text-white text-2xl font-bold mb-1"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            National Citizens Data Registration Portal
          </h1>
          <p className="text-emerald-300 text-xs max-w-md mx-auto leading-relaxed">
            Authorized by the Federal Ministry of Interior • All information is
            protected under the Nigeria Data Protection Act
          </p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="h-px w-16 bg-emerald-600/50" />
            <span className="text-emerald-400 text-xs tracking-widest uppercase">
              Official Registration Form
            </span>
            <span className="h-px w-16 bg-emerald-600/50" />
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-emerald-600 via-green-400 to-emerald-600" />

            <div className="p-8">
              <div className="mb-6 pb-4 border-b border-emerald-100">
                <h2
                  className="text-emerald-900 font-bold text-lg"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Personal Information
                </h2>
                <p className="text-gray-400 text-xs mt-1">
                  All fields marked with <span className="text-red-500">*</span>{" "}
                  are required
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-5">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <InputField
                        label="First Name"
                        name="firstName"
                        placeholder="e.g. Chukwuemeka"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        icon="👤"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <InputField
                        label="Last Name"
                        name="lastName"
                        placeholder="e.g. Okafor"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* NYSC Certificate */}
                  <div>
                    <InputField
                      label="NYSC Discharge Certificate No."
                      name="nyscCertNo"
                      placeholder="e.g. SC/22A/0012345"
                      value={form.nyscCertNo}
                      onChange={handleChange}
                      required
                      icon="📋"
                    />
                    {errors.nyscCertNo && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.nyscCertNo}
                      </p>
                    )}
                  </div>

                  {/* Voters Card */}
                  <div>
                    <InputField
                      label="Voters Card No."
                      name="votersCardNo"
                      placeholder="e.g. 90LSXXXXXXXXXXXXX"
                      value={form.votersCardNo}
                      onChange={handleChange}
                      required
                      icon="🗳️"
                    />
                    {errors.votersCardNo && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.votersCardNo}
                      </p>
                    )}
                  </div>

                  {/* State of Residence */}
                  <div>
                    <label className="block text-xs font-semibold text-emerald-800 mb-1.5 tracking-widest uppercase">
                      State of Residence <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600">
                        📍
                      </span>
                      <select
                        name="stateOfResidence"
                        value={form.stateOfResidence}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-10 py-3 bg-white border-2 border-emerald-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all duration-200 hover:border-emerald-400 appearance-none cursor-pointer"
                      >
                        <option value="">-- Select State --</option>
                        {NIGERIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none">
                        ▾
                      </span>
                    </div>
                    {errors.stateOfResidence && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.stateOfResidence}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="example@mail.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      icon="✉️"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <InputField
                      label="WhatsApp Phone Number"
                      name="whatsapp"
                      type="tel"
                      placeholder="+234 801 234 5678"
                      value={form.whatsapp}
                      onChange={handleChange}
                      required
                      icon="📱"
                    />
                    {errors.whatsapp && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.whatsapp}
                      </p>
                    )}
                    <p className="text-gray-400 text-xs mt-1">
                      Enter Nigerian number (e.g. 08012345678 or +2348012345678)
                    </p>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <span className="text-amber-500 text-lg flex-shrink-0">
                        ⚠️
                      </span>
                      <p className="text-amber-800 text-xs leading-relaxed">
                        By submitting this form, you confirm that all
                        information provided is accurate and truthful. Provision
                        of false or misleading information is an offence
                        punishable under Federal law. Your data will be handled
                        in accordance with the{" "}
                        <strong>
                          Nigeria Data Protection Regulation (NDPR)
                        </strong>
                        .
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-800 hover:to-green-700 text-white font-bold text-sm tracking-widest uppercase rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg
                          className="animate-spin w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Processing Submission...
                      </span>
                    ) : (
                      "Submit Registration"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Card Footer */}
            <div className="bg-emerald-950/5 border-t border-emerald-100 px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-gray-400 text-xs">
                🔒 256-bit SSL Encrypted • Secure Government Portal
              </p>
              <p className="text-gray-400 text-xs">
                © {new Date().getFullYear()} Federal Republic of Nigeria
              </p>
            </div>
          </div>

          <p className="text-center text-emerald-400/60 text-xs mt-4">
            For technical support, contact: support@gov.ng | Helpline:
            0800-NIGERIA
          </p>
        </div>
      </div>
    </div>
  );
}
