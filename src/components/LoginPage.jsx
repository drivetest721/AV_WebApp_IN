import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard'

const bCallAPI = false; // Set to true when you want to use real API

// SVG Logo (Placeholder - replace with your actual SVG or image path)
const AccuVelocityLogo = () => (
  <svg width="7424" height="40" viewBox="0 0 7424 1070" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M356.551 140.452L426.206 0L855.554 865.548L182.984 495.007L239.508 381.96L562.09 560.665L356.551 140.452Z" fill="#003654"/>
    <path d="M152.719 560.548L262.911 619.926L140.452 868.856H-0.000140669L152.719 560.548Z" fill="#003654"/>
    <path d="M1480.1 46.7152H1626L1921.28 814H1766.66L1706.79 648.336H1399.88L1338.85 814H1183.64L1480.1 46.7152ZM1447.54 519.874H1659.13L1553.92 222.261H1552.17L1447.54 519.874ZM2236.26 710.533C2261.45 710.533 2281.99 706.27 2297.88 697.745C2313.77 689.219 2324.23 682.825 2329.27 678.563L2397.86 780.286C2392.43 784.549 2382.36 790.555 2367.63 798.306C2352.91 806.056 2334.11 812.837 2311.25 818.65C2288.77 824.85 2263 827.951 2233.94 827.951C2183.56 827.951 2138.42 817.875 2098.5 797.724C2058.59 777.186 2027 748.122 2003.75 710.533C1980.89 672.556 1969.46 627.41 1969.46 575.095C1969.46 522.393 1980.89 477.247 2003.75 439.658C2027 402.069 2058.59 373.199 2098.5 353.048C2138.42 332.897 2183.56 322.822 2233.94 322.822C2262.61 322.822 2288 325.922 2310.09 332.122C2332.56 338.322 2351.36 345.491 2366.47 353.629C2381.58 361.379 2392.05 367.774 2397.86 372.811L2327.52 475.116C2324.81 472.016 2319.58 467.753 2311.83 462.328C2304.08 456.903 2293.81 451.865 2281.02 447.215C2268.62 442.564 2253.7 440.239 2236.26 440.239C2214.95 440.239 2194.61 445.858 2175.23 457.096C2156.24 468.334 2140.74 484.029 2128.73 504.18C2116.71 524.331 2110.71 547.969 2110.71 575.095C2110.71 602.222 2116.71 626.054 2128.73 646.592C2140.74 666.743 2156.24 682.438 2175.23 693.676C2194.61 704.914 2214.95 710.533 2236.26 710.533ZM2726.72 710.533C2751.9 710.533 2772.44 706.27 2788.33 697.745C2804.22 689.219 2814.68 682.825 2819.72 678.563L2888.31 780.286C2882.88 784.549 2872.81 790.555 2858.08 798.306C2843.36 806.056 2824.56 812.837 2801.7 818.65C2779.22 824.85 2753.45 827.951 2724.39 827.951C2674.01 827.951 2628.87 817.875 2588.95 797.724C2549.04 777.186 2517.46 748.122 2494.2 710.533C2471.34 672.556 2459.91 627.41 2459.91 575.095C2459.91 522.393 2471.34 477.247 2494.2 439.658C2517.46 402.069 2549.04 373.199 2588.95 353.048C2628.87 332.897 2674.01 322.822 2724.39 322.822C2753.07 322.822 2778.45 325.922 2800.54 332.122C2823.01 338.322 2841.81 345.491 2856.92 353.629C2872.03 361.379 2882.5 367.774 2888.31 372.811L2817.98 475.116C2815.26 472.016 2810.03 467.753 2802.28 462.328C2794.53 456.903 2784.26 451.865 2771.47 447.215C2759.07 442.564 2744.15 440.239 2726.72 440.239C2705.4 440.239 2685.06 445.858 2665.68 457.096C2646.69 468.334 2631.19 484.029 2619.18 504.18C2607.17 524.331 2601.16 547.969 2601.16 575.095C2601.16 602.222 2607.17 626.054 2619.18 646.592C2631.19 666.743 2646.69 682.438 2665.68 693.676C2685.06 704.914 2705.4 710.533 2726.72 710.533ZM3110.79 565.214C3110.79 607.841 3119.32 641.942 3136.37 667.518C3153.42 692.707 3180.93 705.301 3218.91 705.301C3257.28 705.301 3284.98 692.707 3302.03 667.518C3319.08 641.942 3327.61 607.841 3327.61 565.214V336.772H3472.93V582.071C3472.93 631.285 3463.05 674.494 3443.28 711.695C3423.52 748.51 3394.65 777.186 3356.67 797.724C3319.08 817.875 3273.16 827.951 3218.91 827.951C3165.05 827.951 3119.13 817.875 3081.15 797.724C3043.56 777.186 3014.88 748.51 2995.12 711.695C2975.36 674.494 2965.47 631.285 2965.47 582.071V336.772H3110.79V565.214ZM3986.99 814H3821.32L3545.22 46.7152H3708.55L3904.44 631.479L4100.33 46.7152H4263.67L3986.99 814ZM4389.02 608.228C4390.18 629.929 4396 649.305 4406.46 666.356C4416.92 683.407 4432.03 696.776 4451.8 706.464C4471.95 716.152 4495.97 720.996 4523.88 720.996C4549.06 720.996 4571.15 717.896 4590.14 711.695C4609.52 705.495 4625.79 697.938 4638.97 689.026C4652.53 679.725 4662.61 670.812 4669.2 662.287L4730.23 752.966C4719.38 766.529 4704.85 779.123 4686.63 790.749C4668.81 801.987 4645.94 810.9 4618.04 817.488C4590.53 824.463 4556.04 827.951 4514.58 827.951C4462.26 827.951 4416.34 817.681 4376.81 797.143C4337.29 776.605 4306.48 746.959 4284.39 708.208C4262.3 669.456 4251.26 623.341 4251.26 569.864C4251.26 523.362 4261.14 481.51 4280.9 444.308C4300.67 406.719 4329.34 377.074 4366.93 355.373C4404.91 333.672 4450.44 322.822 4503.53 322.822C4553.52 322.822 4596.73 332.509 4633.16 351.885C4669.97 370.874 4698.45 398.775 4718.6 435.589C4738.75 472.403 4748.83 517.355 4748.83 570.445C4748.83 573.545 4748.64 579.939 4748.25 589.627C4748.25 598.928 4747.86 605.128 4747.09 608.228H4389.02ZM4610.49 516.968C4610.1 504.567 4606.22 491.198 4598.86 476.86C4591.89 462.522 4580.84 450.315 4565.73 440.239C4550.61 430.164 4530.46 425.126 4505.28 425.126C4480.09 425.126 4459.35 429.97 4443.08 439.658C4427.19 449.346 4415.18 461.359 4407.04 475.697C4398.9 489.648 4394.25 503.405 4393.09 516.968H4610.49ZM4997.33 814H4849.11V14.1638H4997.33V814ZM5356.94 827.951C5306.18 827.951 5260.84 817.1 5220.93 795.399C5181.4 773.698 5150.4 744.053 5127.92 706.464C5105.45 668.487 5094.21 625.279 5094.21 576.839C5094.21 528.4 5105.45 485.191 5127.92 447.215C5150.4 408.85 5181.4 378.624 5220.93 356.536C5260.84 334.06 5306.18 322.822 5356.94 322.822C5408.1 322.822 5453.24 334.06 5492.38 356.536C5531.52 378.624 5562.14 408.85 5584.22 447.215C5606.31 485.191 5617.36 528.4 5617.36 576.839C5617.36 625.279 5606.31 668.487 5584.22 706.464C5562.14 744.053 5531.52 773.698 5492.38 795.399C5453.24 817.1 5408.1 827.951 5356.94 827.951ZM5356.94 705.301C5381.36 705.301 5402.48 699.876 5420.3 689.026C5438.52 677.788 5452.47 662.481 5462.16 643.105C5472.23 623.341 5477.27 601.059 5477.27 576.258C5477.27 551.457 5472.23 529.175 5462.16 509.411C5452.47 489.648 5438.52 474.147 5420.3 462.909C5402.48 451.284 5381.36 445.471 5356.94 445.471C5332.53 445.471 5311.22 451.284 5293 462.909C5275.18 474.147 5261.23 489.648 5251.15 509.411C5241.08 529.175 5236.04 551.457 5236.04 576.258C5236.04 601.059 5241.08 623.341 5251.15 643.105C5261.23 662.481 5275.18 677.788 5293 689.026C5311.22 699.876 5332.53 705.301 5356.94 705.301ZM5962.34 710.533C5987.52 710.533 6008.06 706.27 6023.95 697.745C6039.84 689.219 6050.3 682.825 6055.34 678.563L6123.93 780.286C6118.5 784.549 6108.43 790.555 6093.7 798.306C6078.98 806.056 6060.18 812.837 6037.32 818.65C6014.84 824.85 5989.07 827.951 5960.01 827.951C5909.63 827.951 5864.49 817.875 5824.57 797.724C5784.66 777.186 5753.08 748.122 5729.82 710.533C5706.96 672.556 5695.53 627.41 5695.53 575.095C5695.53 522.393 5706.96 477.247 5729.82 439.658C5753.08 402.069 5784.66 373.199 5824.57 353.048C5864.49 332.897 5909.63 322.822 5960.01 322.822C5988.69 322.822 6014.07 325.922 6036.16 332.122C6058.63 338.322 6077.43 345.491 6092.54 353.629C6107.65 361.379 6118.12 367.774 6123.93 372.811L6053.6 475.116C6050.88 472.016 6045.65 467.753 6037.9 462.328C6030.15 456.903 6019.88 451.865 6007.09 447.215C5994.69 442.564 5979.77 440.239 5962.34 440.239C5941.02 440.239 5920.68 445.858 5901.3 457.096C5882.31 468.334 5866.81 484.029 5854.8 504.18C5842.79 524.331 5836.78 547.969 5836.78 575.095C5836.78 602.222 5842.79 626.054 5854.8 646.592C5866.81 666.743 5882.31 682.438 5901.3 693.676C5920.68 704.914 5941.02 710.533 5962.34 710.533ZM6212.77 814V336.772H6359.84V814H6212.77ZM6288.34 213.542C6263.93 213.542 6243.19 205.016 6226.14 187.965C6209.48 170.915 6201.15 150.57 6201.15 126.931C6201.15 103.293 6209.67 82.7544 6226.72 65.3161C6243.78 47.8778 6264.31 39.1586 6288.34 39.1586C6304.23 39.1586 6318.76 43.2276 6331.94 51.3655C6345.11 59.1158 6355.77 69.5788 6363.91 82.7544C6372.04 95.93 6376.11 110.656 6376.11 126.931C6376.11 150.57 6367.39 170.915 6349.96 187.965C6332.9 205.016 6312.37 213.542 6288.34 213.542ZM6453.45 336.772H6539.48V140.882H6685.96V336.772H6798.73V459.421H6685.96V632.061C6685.96 654.924 6689.64 672.75 6697 685.538C6704.37 697.938 6715.99 704.139 6731.88 704.139C6743.89 704.139 6753.78 701.814 6761.53 697.163C6769.28 692.126 6773.93 688.638 6775.48 686.7L6827.79 792.493C6825.47 794.818 6817.91 798.887 6805.12 804.7C6792.72 810.512 6776.64 815.744 6756.88 820.394C6737.5 825.432 6715.61 827.951 6691.19 827.951C6647.4 827.951 6611.17 815.356 6582.49 790.168C6553.82 764.592 6539.48 725.065 6539.48 671.587V459.421H6453.45V336.772ZM7126.09 684.375L7267.34 336.772H7413.24L7087.14 1055.81H6938.92L7048.78 814L6850.56 336.772H6998.21L7126.09 684.375Z" fill="#003654"/>
  </svg>
);

// Eye icon for password visibility toggle
const EyeIcon = () => ( // Removed unused -open prop
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
    </svg>
);


const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    workEmail: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Get navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!formData.workEmail || !formData.password) {
        setError('Email and Password are required.');
        setIsLoading(false);
        return;
    }

    try {
      let data;
      if (!bCallAPI) {
        // Use static data
        data = {
          jwt_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoibWFpbEBhYmhpbmF2aW5mcmFidWlsZC5jb20iLCJyb2xlIjoiR2VuZXJhbCIsIm5hbWUiOiJBYmhpbmF2IEluZnJhYnVpbGQiLCJleHAiOjE3NTE0NjcxODh9.U5rBdAGjIfbDF8P8PFtp9oZVqUIVq7cB_Ke7oG9ig5E",
          role: "General",
          uid: 11,
          email: "mail@abhinavinfrabuild.com",
          name: "Abhinav Infrabuild",
          created_at: "2025-04-03T21:29:48"
        };
      } else {
        // Real API call
      const serverUrl = import.meta.env.VITE_SERVER_IP_PORT || 'http://192.168.1.13:8034/api';
      const response = await fetch(`${serverUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.workEmail,
          password: formData.password
        })
      });
      data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed. Please check your credentials.');
        return;
      }
    }

    // Store JWT and user data
    localStorage.setItem('jwt_token', data.jwt_token);
    localStorage.setItem('user_data', JSON.stringify({
      uid: data.uid,
      email: data.email,
      name: data.name,
      role: data.role,
      created_at: data.created_at
    }));
    if (onLogin) onLogin(data);
    console.log("Login successful:", data);

    } catch (err) {
      // Handle errors from the API call or other issues
      setError(err.message || 'Network error or login failed. Please try again.');
      console.error('Login error:', err); // For debugging
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Effect to load Tailwind CSS and Inter font
  useEffect(() => {
    if (!document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
        const tailwindScript = document.createElement('script');
        tailwindScript.src = 'https://cdn.tailwindcss.com';
        document.head.appendChild(tailwindScript);

        const interFontLink = document.createElement('link');
        interFontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        interFontLink.rel = 'stylesheet';
        document.head.appendChild(interFontLink);
        document.body.style.fontFamily = "'Inter', sans-serif";

        return () => {
            if (tailwindScript.parentNode) tailwindScript.parentNode.removeChild(tailwindScript);
            if (interFontLink.parentNode) interFontLink.parentNode.removeChild(interFontLink);
        };
    }
  }, []);

  return (
    // Main container for the login page, centered with a gradient background
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex flex-col justify-center items-center p-4 font-sans">
      {/* Login form card */}
      <div className="bg-white shadow-2xl rounded-xl p-8 md:p-12 w-full max-w-md transform transition-all duration-500 hover:scale-105">
        {/* Logo section */}
        <div className="flex justify-center mb-8">
          <AccuVelocityLogo /> {/* Replace with your actual logo */}
        </div>

        {/* Header text */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-600 mt-2">Please sign in to continue.</p>
        </div>

        {/* Error message display area */}
        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm" role="alert">
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input field */}
          <div>
            <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700 mb-1">
              AccuVelocity Registered EmailID <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="workEmail"
              name="workEmail"
              placeholder="you@accuvelocity.com"
              value={formData.workEmail}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
              aria-label="Work Email"
            />
          </div>

          {/* Password input field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
                aria-label="Password"
              />
              {/* Button to toggle password visibility */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600 hover:text-blue-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {/* Show loading spinner and text when isLoading is true */}
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : 'Login'}
          </button>
        </form>

        {/* Optional footer */}
        <p className="mt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} AccuVelocity. All rights reserved.
        </p>
      </div>
    </div>
  );
};


// Main App component to render the LoginPage
// This component will now manage user state and navigation
const AppLogic = () => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage if available
    const storedUserData = localStorage.getItem('user_data');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  const navigate = useNavigate();

  // Effect to handle navigation after user state changes
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    } else {
      // If user logs out or session expires, navigate to login
      // This also handles initial load if no user is in localStorage
      if (window.location.pathname !== '/') { // Avoid infinite loop if already on login
          navigate('/');
      }
    }
  }, [user, navigate]);


  const handleSuccessfulLogin = (userData) => {
    console.log("Logged in user data in AppLogic:", userData);
    setUser(userData); // Update user state, which will trigger useEffect for navigation
    // No alert here, navigation will occur via useEffect
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    // Navigation to '/' will be handled by the useEffect hook when user becomes null
    alert('You have been logged out.'); // Optional: keep alert or use a more subtle notification
  };

  // Effect to load Tailwind CSS and Inter font
  useEffect(() => {
    if (!document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
        const tailwindScript = document.createElement('script');
        tailwindScript.src = 'https://cdn.tailwindcss.com';
        document.head.appendChild(tailwindScript);

        const interFontLink = document.createElement('link');
        interFontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        interFontLink.rel = 'stylesheet';
        document.head.appendChild(interFontLink);
        document.body.style.fontFamily = "'Inter', sans-serif";

        return () => {
            if (tailwindScript.parentNode) tailwindScript.parentNode.removeChild(tailwindScript);
            if (interFontLink.parentNode) interFontLink.parentNode.removeChild(interFontLink);
        };
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={!user ? <LoginPage onLogin={handleSuccessfulLogin} /> : <Dashboard user={user} onLogout={handleLogout} />} />
      <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <LoginPage onLogin={handleSuccessfulLogin} />} />
      {/* Add other routes here */}
    </Routes>
  );
};

// Main App component wraps everything with BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <AppLogic />
    </BrowserRouter>
  );
}
export default App;
