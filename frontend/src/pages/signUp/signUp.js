import "./signUp.css";
import { IoCloseSharp } from "react-icons/io5";
export const SignUp = ({hideSignUp}) => {


  return (
    <div className="overlay">
      <div className="content">
        <form>
          <div className="row">
          <h1 className="text-center my-3 col">Sign Up</h1>
          <button onClick={hideSignUp} type="button" class="btn btn-danger btn-floating" data-mdb-ripple-init>
<IoCloseSharp   size={20}/>
</button>
          </div>

       
         <div className="row mb-3">
         <div class="col">
            <label for="exampleFormControlInput1" class="form-label">
              FirstName
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="FristName"
            />
          </div>
          <div class="col">
            <label for="exampleFormControlInput1" class="form-label">
              LastName
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="LastName"
            />
          </div>
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
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Password
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Password"
            />
          </div>
          <select class="form-select my-4" aria-label="Default select example">
  <option selected>Proffession</option>
  <option value="1">Student</option>
  <option value="2">Teacher</option>
  <option value="3">Admin</option>
</select>
          <select class="form-select my-4" aria-label="Default select example">
  <option selected>School</option>
  <option value="1">School1</option>
  <option value="2">School2</option>
  <option value="3">School3</option>
</select>

          <button
            data-mdb-ripple-init
            type="button"
            class="btn btn-primary btn-block mb-4"
          >
            Sign up
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
  );
};
