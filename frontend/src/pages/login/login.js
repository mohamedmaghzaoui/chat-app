import '../signUp/signUp';
import { IoCloseSharp } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { LoginUser } from '../../services/userApi';
export const Login = ({ hideLogin }) => {
  const submitData = async (userData) => {
    const response = await LoginUser(userData);
    console.log(response);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="overlay ">
      <div className="content w-50 ">
        <div className="row">
          <div className="col-6">
            <img
              className="img-fluid w-100 h-100 "
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
                class="btn btn-danger btn-floating"
                data-mdb-ripple-init
              >
                <IoCloseSharp size={20} />
              </button>
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
                {...register('email')}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Password"
                {...register('password')}
              />
            </div>

            <button
              data-mdb-ripple-init
              type="submit"
              class="btn btn-primary btn-block mt-5 mb-4"
            >
              Login
            </button>

            <div class="text-center">
              <p>or sign up with:</p>
              <button
                data-mdb-ripple-init
                type="button"
                class="btn btn-secondary btn-floating mx-1"
              >
                <i class="fab fa-facebook-f"></i>
              </button>

              <button
                data-mdb-ripple-init
                type="button"
                class="btn btn-secondary btn-floating mx-1"
              >
                <i class="fab fa-google"></i>
              </button>

              <button
                data-mdb-ripple-init
                type="button"
                class="btn btn-secondary btn-floating mx-1"
              >
                <i class="fab fa-twitter"></i>
              </button>

              <button
                data-mdb-ripple-init
                type="button"
                class="btn btn-secondary btn-floating mx-1"
              >
                <i class="fab fa-github"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
