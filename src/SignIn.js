import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

function SignIn() {
  const [isLoad, setIsLoad] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const getUserDetails = {
      email: data.email,
      password: data.password,
    };
    console.log(getUserDetails);
    setIsLoad(true);
    try {
      const response = await axios.post("url", getUserDetails);
      const data = response.data;
      setIsLoad(false);
      setIsUserLogin(true);
      setTimeout(() => {
        setIsUserLogin(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setIsLoad(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-sec">
        <div className="form-title">
          <h1>Login</h1>
        </div>
        <div className="form-control">
          <input
            type="text"
            name="username"
            placeholder="Username"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && errors.name.type === "required" && (
            <p className="errorMsg">Name is required.</p>
          )}
        </div>
        <div className="form-control">
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="errorMsg">Password is required.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="errorMsg">
              Password should be at-least 6 characters.
            </p>
          )}
        </div>
        <div className="">
          {isLoad && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          <button type="submit" className="submitbtn">
            Submit
          </button>
        </div>
        {isUserLogin && (
          <p className="alert alert-success" role="alert">
            User has been Login Successfully!!!
          </p>
        )}
      </form>
    </>
  );
}

export default SignIn;
