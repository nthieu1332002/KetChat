import React from "react";
import { useNavigate, Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";
import BrandContainer from "../../components/BrandContainer/BrandContainer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validate.js";
import TurnBack from "../../components/TurnBack/TurnBack";
import { toast } from "react-toastify";

import "./style.scss";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    const dataRegister = {
      username: value.username,
      email: value.email,
      password: value.password,
    };
    // const { data } = await axios.post(registerRoute, dataRegister);
    // if (data.status === false) {
    //   toast.error(data.msg);
    // }
    // if (data.status === true) {
    //   toast.success("Register successfully!");
    //   navigate("/login");
    // }
  };

  return (
    <div className="register-page">
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="register-page__container"
      >
        <TurnBack />
        <BrandContainer />
        <CustomInput
          id="username"
          placeholder="Username"
          type="text"
          register={register}
        />
        {errors.username && (
          <div id="error-message">{errors.username?.message}</div>
        )}
        <CustomInput
          id="email"
          placeholder="Email"
          type="email"
          register={register}
        />
        {errors.email && <div id="error-message">{errors.email?.message}</div>}
        <CustomInput
          id="password"
          placeholder="Password"
          type="password"
          register={register}
        />
        {errors.password && (
          <div id="error-message">{errors.password?.message}</div>
        )}
        <CustomInput
          id="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          register={register}
        />
        {errors.confirmPassword && (
          <div id="error-message">{errors.confirmPassword?.message}</div>
        )}
        <button>create</button>
        <span>
          Already have an account? <Link to="/login" className="action">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
