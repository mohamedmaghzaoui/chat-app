import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseSharp } from 'react-icons/io5';
import { LoginUser } from '../../services/userApi';
import { UserContext } from '../../Contexts/userContext';

export const Login = ({ hideLogin }) => {
  const { setUsername } = useContext(UserContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // loading state

  const submitData = async (userData) => {
    try {
      setLoading(true); // Show spinner
      setError(''); // Clear previous error
      const response = await LoginUser(userData);

      if (response && response.status !== 401) {
        setUsername((prev) => prev + 'a'); // Update username  after success
      } else {
        setError('Wrong credentials');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="overlay">
      <div className="content w-50">
        <div className="row">
          <div className="col-6">
            <img
              className="img-fluid w-100 h-100"
              src="https://img.freepik.com/vecteurs-premium/illustration-vectorielle-personnage-debout-devant-interface-utilisateur-ecran-mobile-qui-affiche-page-connexion_1108340-493.jpg?w=740"
              alt=""
            />
          </div>
          <form className="col" onSubmit={handleSubmit(submitData)}>
            <div className="row">
              <h1 className="text-center text-primary my-3 col">Login</h1>
              <button
                onClick={hideLogin}
                type="button"
                className="btn btn-danger btn-floating"
              >
                <IoCloseSharp size={20} />
              </button>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </div>

            {/* Conditional Spinner */}
            {loading ? (
              <div className="d-flex justify-content-center my-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                className="btn btn-primary btn-block mt-3 mb-4"
              >
                Login
              </button>
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
