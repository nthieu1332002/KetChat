import React from "react";
import { useNavigate, Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";
import BrandContainer from "../../components/BrandContainer/BrandContainer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validate.js";
import TurnBack from "../../components/TurnBack/TurnBack";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import userAPI from "../../config/api/user/userAPI";
import Cookies from 'js-cookie'

const { loginAPI } = userAPI;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    await loginAPI({
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        console.log(res);
        if (res.status === false) {
          toast.error(res.msg);
        }
        if (res.status === true) {
          const expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);
          Cookies.set("token", res.token, { expires: 1, path: ''})
          Cookies.set("userId", res.user._id, { expires: 1, path: ''})
          toast.success("Login successfully!");
          navigate("/chat");
        }
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.response.data.error.message);
      });
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
        <button>login</button>
        <span>
          Do not have any account?{" "}
          <Link to="/register" className="action">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
