import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BLUEESEA_IMG from '../images/blueesea-logo.png'

const Login = () => {
  // Formik and Yup for form validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center max-w-md w-full">
        <img src={BLUEESEA_IMG} alt="Blueesea" className="w-36 mb-4" /> {/* Logo */}
        <div className="w-full text-center text-blue-600 mb-4">
          <h2 className="text-lg font-bold">Log in</h2>
        </div>
        <form onSubmit={formik.handleSubmit} className="w-full">
          {/* Email or User ID */}
          <label className="block text-gray-700 mb-1" htmlFor="email">Email or user ID</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email or user ID"
            className={`border p-2 w-full mb-4 rounded ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm mb-4">{formik.errors.email}</div>}

          {/* Password */}
          <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            className={`border p-2 w-full mb-4 rounded ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && <div className="text-red-500 text-sm mb-4">{formik.errors.password}</div>}

          {/* Remember me & Language Selector */}
          <div className="flex justify-between items-center mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            {/* <select className="border border-gray-300 p-2 rounded">
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select> */}
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition">Sign In</button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">By signing in, you agree to our <a href="#" className="text-blue-500">License Agreement</a>.</p>
          <a href="#" className="text-blue-500 text-sm mt-2 block">I forgot my password.</a>
          <p className="mt-2 text-gray-600 text-sm">New to Blueesea? <a href="/signup" className="text-blue-500">Create an account</a>.</p>
        </div>

        {/* Social Media Icons */}
        {/* <div className="flex justify-center mt-4 space-x-4">
          <a href="#"><img src="facebook-icon.png" alt="Facebook" className="w-8 h-8" /></a>
          <a href="#"><img src="linkedin-icon.png" alt="LinkedIn" className="w-8 h-8" /></a>
          <a href="#"><img src="instagram-icon.png" alt="Instagram" className="w-8 h-8" /></a>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
