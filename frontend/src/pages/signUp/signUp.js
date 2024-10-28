import "./signUp.css";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { RegisterUser } from "../../services/userApi";
export const SignUp = ({hideSignUp}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

const submitData=async(userData)=>{
  
    const response= await RegisterUser(userData)

 
}
  return (
    <div className="overlay">
      <div className="content">
      <form onSubmit={handleSubmit(submitData)}>
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
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="FristName"
              {...register("first_name")}
            />
          </div>
          <div class="col">
            <label for="exampleFormControlInput1" class="form-label">
              LastName
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="LastName"
              {...register("last_name")}
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
              {...register("email")}
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
              {...register("password")}
            />
          </div>
          <select  {...register("profession")} class="form-select my-4" aria-label="Default select example">
  <option selected>Proffession</option>
  <option value="1">Student</option>
  <option value="2">Teacher</option>
  <option value="3">Admin</option>
</select>
          <select  {...register("school")} class="form-select my-4" aria-label="Default select example">
  <option selected>School</option>
  <option value="1">School1</option>
  <option value="2">School2</option>
  <option value="3">School3</option>
</select>

          <button
            data-mdb-ripple-init
            type="submit"
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
