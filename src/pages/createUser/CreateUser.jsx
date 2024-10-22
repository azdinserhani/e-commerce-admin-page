import { useState } from "react";
import Header from "../../components/Header/Header";
import "./CreateUser.scss";
import { userRequest } from "../../axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateUser = () => {
  
  //validation Schema

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleCreate = async (data) => {
    const { confirmPassword, ...info } = data;

    try {
      const res = await userRequest.post("/api/auth/register", info);

      toast.success("User has been created", {
        theme: "colored",
        pauseOnFocusLoss: false,
        toastId: 1,
      });
    } catch (error) {
      //TODO: HANDLE DUPLICATE USER ERROR

      if (error.response.data.details) {
        error.response.data.details.map((item) => {
          return toast.error(item.msg, {
            theme: "colored",
            pauseOnFocusLoss: false,
            toastId: 1,
          });
        });
      }
    }
  };
  const showToast = (message) => {
    toast.error(message, {
      theme: "colored",
      pauseOnFocusLoss: false,
      toastId: 1,
    });
  };
  return (
    <div className="createUser">
      <Header title={"Create User"} />
      <div className="mainContainer">
        <form onSubmit={handleSubmit(handleCreate)}>
          <div className="inputItem">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="username"
              {...register("username")}
            />
            {errors.username && showToast(errors.username.message)}
          </div>
          <div className="inputItem">
            <label htmlFor="email">Email:</label>
            <input type="email" placeholder="Email" {...register("email")} />
            {errors.email && showToast(errors.email.message)}
          </div>{" "}
          <div className="inputItem">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && showToast(errors.password.message)}
          </div>{" "}
          <div className="inputItem">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword &&
              showToast(errors.confirmPassword.message)}
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
