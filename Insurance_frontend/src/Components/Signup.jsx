import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [hasText, setHasText] = useState(false);
  const [hasEmailText, setEmailHasText] = useState(false);
  const [hasPhoneText, setPhoneHasText] = useState(false);
  const [hasAddress, setAddressHasText] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const handleToggleClick = () => {
    setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handleToggleConfirmPassword = () => {
    setConfirmPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPasswordInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate passwords
    if (passwordInput !== confirmPasswordInput) {
      toast.error("Passwords do not match");
      return;
    }

    // Prepare data to be sent to the backend
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: passwordInput,
    };

   
    try {
      // Make the API call to the backend
      const response = await axios.post('http://localhost:8000/api/register', formData);
      console.log(response.data); // Handle the response as needed
      // Redirect or show success message
      toast.success("Signup successful!");
      navigate("/"); // Redirect to a protected route
    } catch (error) {
      console.error(error);
      // Handle errors appropriately
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        toast.error(`Signup failed: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Request data:", error.request);
        toast.error("Signup failed: No response from server.");
      } else {
        // Something else caused the error
        console.error("Error message:", error.message);
        toast.error(`Signup failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex justify-center mt-60">
      <div className="w-full flex gap-[129px] items-center justify-center xl:max-w-[1220px] lg:max-w-[1220px] md:max-w-[1220px] mt-16 rounded-br-3xl">
        <div className="bg-customseablue w-[600px] h-[400px] flex items-end justify-center rounded-br-3xl rounded-tl-3xl ">
        </div>
        <div className="w-full h-[530px] flex flex-col gap-12 ">
          <span className="flex flex-col gap-6">
            <h3 className="font-inter font-medium text-4xl text-black">
              Create an account
            </h3>
            <h3 className="font-poppins font-light text-base">
              Enter your details below
            </h3>
          </span>
          <form onSubmit={handleSubmit} action="" className="flex gap-8 flex-col group">
            <span className="flex  gap-4">
              <div className="relative w-full">
                <label
                  htmlFor="name"
                  className={`absolute left-4 top-6 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all ${
                    hasText ? "-top-9  text-xs" : ""
                  }`}
                >
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  required
                  className="w-full h-[50px] bg-customgray pl-4 outline-none pt-4 pb-1 peer"
                  type="text"
                  placeholder=" "
                  onChange={(e) => setHasText(e.target.value !== "")}
                />
                <span className="hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Enter valid name
                </span>
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="email"
                  className={`absolute left-4 top-6 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all ${
                    hasEmailText ? "-top-9  text-xs" : ""
                  }`}
                >
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  required
                  className="w-full h-[50px] bg-customgray pl-4 outline-none pt-4 pb-1 peer"
                  type="email"
                  placeholder=" "
                  pattern="[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  onChange={(e) => setEmailHasText(e.target.value !== "")}
                />
                <span className="hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Enter valid email <span className="text-gray-400">(e.g: 1234@gmail.com)</span>
                </span>
              </div>
            </span>
            <span className="flex gap-4">
            </span>
            <span className="flex gap-4">
              <div className="relative w-full">
                <label
                  htmlFor="phone"
                  className={`absolute left-4 top-0 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all ${
                    hasPassword ? "-top-9  text-xs" : ""
                  }`}
                >
                  Password<span className="text-red-500">*</span>
                </label>
                <span className=" w-full h-[50px] bg-customgray flex items-center">
                  <input
                    required
                    id="password"
                    className="w-full h-[50px] bg-customgray pl-4 outline-none pt-4 pb-1 peer"
                    type={passwordType}
                    value={passwordInput}
                    placeholder=" "
                    onChange={handlePasswordChange}
                    
                  />
                  <span id="show_password" className=" ">
                    <svg
                      onClick={handleToggleClick}
                      className="mr-2 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15.58 12c0 1.98-1.6 3.58-3.58 3.58S8.42 13.98 8.42 12s1.6-3.58 3.58-3.58 3.58 1.6 3.58 3.58Z"
                        stroke="#191e28"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M12 20.27c3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-2.29-3.6-5.58-5.68-9.11-5.68-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68Z"
                        stroke="#191e28"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      {passwordType === "password" ? "Show" : "Hide"} Password
                    </svg>
                  </span>
                  <span id="hide_password" className="hidden">
                    <svg
                      onClick={handleToggleClick}
                      
                      className="cursor-pointer mr-2 "
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="m14.53 9.47-5.06 5.06a3.576 3.576 0 1 1 5.06-5.06Z"
                        stroke="#191e28"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17.82 5.77C16.07 4.45 14.07 3.73 12 3.73c-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19.79 1.24 1.71 2.31 2.71 3.17M8.42 19.53c1.14.48 2.35.74 3.58.74 3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-.33-.52-.69-1.01-1.06-1.47"
                        stroke="#191e28"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M15.51 12.7a3.565 3.565 0 0 1-2.82 2.82M9.47 14.53 2 22M22 2l-7.47 7.47"
                        stroke="#191e28"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      {passwordType === "password" ? "Hide" : "Show"}
                    </svg>
                  </span>
                </span>
                <span className="hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Enter valid password
                </span>
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="phone"
                  className={`absolute left-4 top-0 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all ${
                    confirmPassword ? "-top-4  text-xs" : ""
                  }`}
                >
                  Confirm Password<span className="text-red-500">*</span>
                </label>
                <span className=" w-full h-[50px] bg-customgray flex items-center    ">
                  <input
                    required
                    id="confirm_password"
                    className="w-full h-[50px] bg-customgray pl-4 outline-none pt-4 pb-1 peer"
                    type={confirmPasswordType}
                    value={confirmPasswordInput}
                    placeholder=" "
                    onChange={handleConfirmPasswordChange}
                  />
                  <span className="hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    Password mismatch
                  </span>

                  <span id="show_confirm_password" className=" ">
                    <svg
                      onClick={handleToggleConfirmPassword}
                      className="mr-2 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15.58 12c0 1.98-1.6 3.58-3.58 3.58S8.42 13.98 8.42 12s1.6-3.58 3.58-3.58 3.58 1.6 3.58 3.58Z"
                        stroke="#191e28"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M12 20.27c3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-2.29-3.6-5.58-5.68-9.11-5.68-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68Z"
                        stroke="#191e28"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      {confirmPasswordType === "password" ? "Show" : "Hide"} 
                    </svg>
                  </span>
                  <span id="hide_confirm_password" className="hidden">
                    <svg
                      onClick={handleToggleConfirmPassword}
                      
                      className="cursor-pointer mr-2 "
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="m14.53 9.47-5.06 5.06a3.576 3.576 0 1 1 5.06-5.06Z"
                        stroke="#191e28"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17.82 5.77C16.07 4.45 14.07 3.73 12 3.73c-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19.79 1.24 1.71 2.31 2.71 3.17M8.42 19.53c1.14.48 2.35.74 3.58.74 3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-.33-.52-.69-1.01-1.06-1.47"
                        stroke="#191e28"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M15.51 12.7a3.565 3.565 0 0 1-2.82 2.82M9.47 14.53 2 22M22 2l-7.47 7.47"
                        stroke="#191e28"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      {confirmPasswordType === "password" ? "Hide" : "Show"}
                    </svg>
                  </span>
                </span>
              </div>
            </span>
            <span className="flex flex-col gap-4">
              <button className="flex w-48 items-center justify-center bg-blue-500 hover:bg-blue-900 h-14 rounded-md text-white text-base font-poppins font-medium group-invalid:pointer-events-none group-invalid:opacity-30">
                Create Account
              </button>
            </span>
          </form>
          <span className="flex gap-4 items-center justify-center ">
            <h3 className="font-popins font-light text-base">
              Already have an acoount?
            </h3>
            <h3 className="font-poppins font-medium text-base hover:text-customred hover:underline">
              <Link
                to="/"
                className="text-blue-500 font-semibold underline"
              >
                Log in
              </Link>
            </h3>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;