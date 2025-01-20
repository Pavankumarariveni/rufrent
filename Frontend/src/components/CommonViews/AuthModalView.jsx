import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";

import { Check, X } from "lucide-react";
import { LuEyeOff, LuEye } from "react-icons/lu";

import { useRoleStore } from "../../store/roleStore";
import { apiUrl } from "../../config/apiRoute";

import useActionsListingsStore from "../../store/userActionsListingsStore";

const EmailSuggestions = ({
  inputValue,
  onSelect,
  show,
  focusIndex,
  onKeyNavigation,
}) => {
  const emailDomains = [
    "@gmail.com",
    "@outlook.com",
    "@yahoo.com",
    "@hotmail.com",
    "@icloud.com",
  ];
  const lastAtIndex = inputValue.lastIndexOf("@");
  const beforeAt =
    lastAtIndex !== -1 ? inputValue.slice(0, lastAtIndex) : inputValue;

  if (!show) return null;
  return (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
      {emailDomains.map((domain, index) => (
        <div
          key={domain}
          className={`px-3 py-1.5 cursor-pointer text-sm ${
            focusIndex === index
              ? "bg-blue-50 text-blue-700"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onSelect(beforeAt + domain)}
          onMouseEnter={() => onKeyNavigation(index)}
        >
          {beforeAt + domain}
        </div>
      ))}
    </div>
  );
};

const PasswordValidation = ({ password }) => {
  const criteria = [
    { label: "8+ characters", valid: password.length >= 8 },
    { label: "Uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "Lowercase letter", valid: /[a-z]/.test(password) },
    { label: "Special character", valid: /[\W]/.test(password) },
  ];

  if (!password) return null;

  return (
    <div className="absolute left-0 top-10  ml-2 bg-white p-2 rounded-md shadow-lg border border-gray-200 w-48 text-xs">
      {criteria.map((criterion, index) => (
        <div key={index} className="flex items-center gap-2 mb-1">
          {criterion.valid ? (
            <Check size={14} className="text-green-500" />
          ) : (
            <X size={14} className="text-red-500" />
          )}
          <span className={criterion.valid ? "text-green-600" : "text-red-600"}>
            {criterion.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const AuthModal = ({ isOpen, onClose }) => {
  const { setUserData } = useRoleStore();
  const { fetchActionsListings } = useActionsListingsStore();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [suggestionFocusIndex, setSuggestionFocusIndex] = useState(-1);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);

  const emailInputRef = useRef(null);
  const history = useNavigate();
  const emailDomains = [
    "@gmail.com",
    "@outlook.com",
    "@yahoo.com",
    "@hotmail.com",
    "@icloud.com",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emailInputRef.current &&
        !emailInputRef.current.contains(event.target)
      ) {
        setShowEmailSuggestions(false);
        setSuggestionFocusIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmailKeyDown = (e) => {
    if (!showEmailSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSuggestionFocusIndex((prev) =>
          prev < emailDomains.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSuggestionFocusIndex((prev) =>
          prev > 0 ? prev - 1 : emailDomains.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (suggestionFocusIndex >= 0) {
          const lastAtIndex = formData.email.lastIndexOf("@");
          const beforeAt =
            lastAtIndex !== -1
              ? formData.email.slice(0, lastAtIndex)
              : formData.email;
          handleEmailSelect(beforeAt + emailDomains[suggestionFocusIndex]);
        }
        break;
      case "Escape":
        setShowEmailSuggestions(false);
        setSuggestionFocusIndex(-1);
        break;
      default:
        break;
    }
  };
  const validate = () => {
    const formErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!isLogin && !formData.username)
      formErrors.username = "Name is required";
    if (!formData.email || !emailRegex.test(formData.email))
      formErrors.email = "Invalid email";
    if (!formData.password || !passwordRegex.test(formData.password)) {
      formErrors.password = "Invalid password format";
    }
    // if (!captchaVerified) {
    //   formErrors.captcha = "Please verify captcha";
    // }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    const shouldShowSuggestions = value.includes("@") && !value.includes(".");
    setShowEmailSuggestions(shouldShowSuggestions);
    if (shouldShowSuggestions && suggestionFocusIndex === -1) {
      setSuggestionFocusIndex(0);
    }
  };

  const handleEmailSelect = (email) => {
    setFormData({ ...formData, email });
    setShowEmailSuggestions(false);
    setSuggestionFocusIndex(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    setLoading(true);
    setMessage("");
    setErrors({ ...errors, auth: "" });

    try {
      const endpoint = isLogin ? `${apiUrl}/login` : `${apiUrl}/signup`;
      const response = await axios({
        method: "POST",
        url: endpoint,
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      });

      const data = response.data;
      console.log("Login", data);

      setMessage(
        isLogin ? "Login successful!" : "Account created successfully!"
      );

      if (data.token) {
        await setUserData({
          id: data.id,
          role: data.role.toLowerCase(),
          userName: data.userName,
        });
        const id = data.id;
        fetchActionsListings(id);

        Cookies.set("jwtToken", data.token, { expires: 1 });
      }

      if (isLogin) {
        history(`/${data.role.toLowerCase()}`);
        onClose(true);
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred. Please try again.";

      setErrors({
        ...errors,
        auth: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg relative">
        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {message && <p className="text-sm text-green-500 mb-3">{message}</p>}
          {errors.auth && (
            <p className="text-sm text-red-500 mb-3">{errors.auth}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="Name"
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
            )}

            <div ref={emailInputRef} className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={handleEmailChange}
                onKeyDown={handleEmailKeyDown}
                onFocus={() => {
                  if (
                    formData.email.includes("@") &&
                    !formData.email.includes(".")
                  ) {
                    setShowEmailSuggestions(true);
                    setSuggestionFocusIndex(0);
                  }
                }}
                placeholder="Email"
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <EmailSuggestions
                inputValue={formData.email}
                onSelect={handleEmailSelect}
                show={showEmailSuggestions}
                focusIndex={suggestionFocusIndex}
                onKeyNavigation={setSuggestionFocusIndex}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                onFocus={() => setShowPasswordValidation(true)}
                onBlur={() => setShowPasswordValidation(false)}
                placeholder="Password"
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-3 flex items-center text-sm"
              >
                {showPassword ? (
                  <LuEyeOff className="w-5 h-5" />
                ) : (
                  <LuEye className="w-5 h-5" />
                )}
              </div>
              {showPasswordValidation && (
                <PasswordValidation password={formData.password} />
              )}
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Compact Captcha */}
            <div className="border rounded-md p-2">
              <div className="text-xs text-gray-600 mb-1">
                Verify you're human:
              </div>
              <div className="bg-gray-50 h-4 flex items-center justify-center text-sm text-gray-500">
                Captcha placeholder
              </div>
              {errors.captcha && (
                <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-4">
            {isLogin ? "Need an account?" : "Have an account?"}{" "}
            <span
              onClick={() => {
                setIsLogin(!isLogin), setMessage(""), setErrors({});
              }}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>

          {isLogin && (
            <div className="mt-4">
              <div className="relative flex items-center justify-center text-xs text-gray-500">
                <div className="border-t w-full absolute"></div>
                <span className="bg-white px-2 relative">or continue with</span>
              </div>

              <div className="mt-3 space-y-2">
                <button className="w-full py-2 px-3 text-sm border rounded-md hover:bg-gray-50 flex items-center justify-center gap-2">
                  <img
                    src="https://e7.pngegg.com/pngimages/704/688/png-clipart-google-google.png"
                    alt="Google"
                    className="w-4 h-4"
                  />
                  Google
                </button>
                <button className="w-full py-2 px-3 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2">
                  Facebook
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
