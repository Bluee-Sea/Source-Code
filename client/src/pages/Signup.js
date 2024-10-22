import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify styles
import BLUEESEA_IMG from '../images/blueesea-logo.png';
import { signupUser } from '../api'; // Import the API function

const Signup = () => {
  const navigate = useNavigate(); // useNavigate hook for redirection

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      contactNumber: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      contactNumber: Yup.string()
        .required('Contact number is required')
        .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit phone number'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      termsAccepted: Yup.boolean().oneOf([true], 'You must accept the Terms of Service'),
    }),
    onSubmit: async (values) => {
      try {
        // Call the signupUser function from the API
        const response = await signupUser({
          name: values.name,
          email: values.email,
          contactNumber: values.contactNumber,
          password: values.password,
          termsAccepted: values.termsAccepted,
        });

        // Show success toast and redirect to login
        toast.success('Registration successful! Redirecting to login...', {
          onClose: () => navigate('/login'), // Redirect to login after toast is closed
        });
      } catch (error) {
        // Show error toast
        toast.error(error?.response?.data?.error || 'Registration failed. Please try again.');
        console.error('Signup failed:', error);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center max-w-md w-full">
        <img src={BLUEESEA_IMG} alt="Blueesea" className="w-36 mb-4" /> {/* Logo */}
        <div className="w-full text-center text-blue-600 mb-4">
          <h2 className="text-lg font-bold">Sign Up</h2>
        </div>
        <form onSubmit={formik.handleSubmit} className="w-full">
          {/* Name */}
          <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            className={`border p-2 w-full mb-4 rounded ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'}`}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm mb-4">{formik.errors.name}</div>}

          {/* Email */}
          <label className="block text-gray-700 mb-1" htmlFor="email">Email (User ID)</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            className={`border p-2 w-full mb-4 rounded ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm mb-4">{formik.errors.email}</div>}

          {/* Contact Number */}
          <label className="block text-gray-700 mb-1" htmlFor="contactNumber">Contact Number</label>
          <input
            id="contactNumber"
            type="text"
            name="contactNumber"
            placeholder="Enter your contact number"
            className={`border p-2 w-full mb-4 rounded ${formik.touched.contactNumber && formik.errors.contactNumber ? 'border-red-500' : 'border-gray-300'}`}
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.contactNumber && formik.errors.contactNumber && <div className="text-red-500 text-sm mb-4">{formik.errors.contactNumber}</div>}

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

          {/* Confirm Password */}
          <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            className={`border p-2 w-full mb-4 rounded ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="text-red-500 text-sm mb-4">{formik.errors.confirmPassword}</div>}

          {/* Terms of Service Checkbox */}
          <label className="inline-flex items-start mb-4">
            <input
              type="checkbox"
              name="termsAccepted"
              className="form-checkbox mt-1"
              value={formik.values.termsAccepted}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="ml-2 text-sm text-gray-600">
              I have read and accept the <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
            </span>
          </label>
          {formik.touched.termsAccepted && formik.errors.termsAccepted && <div className="text-red-500 text-sm mb-4">{formik.errors.termsAccepted}</div>}

          {/* Submit Button */}
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition">Sign Up</button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">Already have an account? <a href="/login" className="text-blue-500">Sign In</a>.</p>
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Signup;
