import './signUp.css';
import { IoCloseSharp } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { RegisterUser } from '../../services/userApi';

export const SignUp = ({ hideSignUp }) => {
  const [error, setError] = useState(''); // Single error state for the form
  const [loading, setLoading] = useState(false); // Loading state for spinner

  const {
    register,
    handleSubmit,

    getValues,
  } = useForm({ mode: 'onChange' }); // Enable real-time validation on input change

  const submitData = async (userData) => {
    setError('');
    // Manual field validation
    if (
      !userData.first_name ||
      !userData.last_name ||
      !userData.email ||
      !userData.password ||
      !userData.profession ||
      !userData.school
    ) {
      setError('Please fill all fields'); // Show error if any field is empty
      return;
    }

    // Password length validation (at least 6 characters)
    if (userData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true); // Show spinner

    try {
      const response = await RegisterUser(userData);
      console.log(response);
      if (response) {
        console.log('Registration successful');
        hideSignUp(); // Close the form
      } else {
        setError('user already exist.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="overlay">
      <div className="content">
        <div className="row">
          <form onSubmit={handleSubmit(submitData)}>
            <div className="row">
              <h1 className="text-center my-3 col text-success">Sign Up</h1>
              <button
                onClick={hideSignUp}
                type="button"
                className="btn btn-danger btn-floating"
              >
                <IoCloseSharp size={20} />
              </button>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  {...register('first_name')}
                />
              </div>
              <div className="col">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  {...register('last_name')}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                {...register('email')}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                {...register('password')}
              />
            </div>

            <select {...register('profession')} className="form-select my-4">
              <option value="">Profession</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>

            <select {...register('school')} className="form-select my-4">
              <option value="">School</option>
              <option value="School1">School1</option>
              <option value="School2">School2</option>
              <option value="School3">School3</option>
            </select>

            {/* Conditional Spinner or Submit Button */}
            <div className="d-flex justify-content-center">
              {loading ? (
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="btn btn-success btn-rounded btn-block mb-4"
                >
                  Sign Up
                </button>
              )}
            </div>
            {/* Single Error Message */}
            {error && (
              <p className="text-danger text-center fw-bold">{error}</p>
            )}

            <div className="text-center">
              <p>or sign up with:</p>
              <button
                type="button"
                className="btn btn-secondary btn-floating mx-1"
              >
                <i className="fab fa-facebook-f"></i>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-floating mx-1"
              >
                <i className="fab fa-google"></i>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-floating mx-1"
              >
                <i className="fab fa-twitter"></i>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-floating mx-1"
              >
                <i className="fab fa-github"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
