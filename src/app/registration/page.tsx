"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import "./styles.scss";
import Link from "next/link";

const RegistrationPage = () => {
  const [displayErrorMessage, setDisplayErrorMessage] = useState<string | null>(
    null
  );
  const [isFetching, setIsFetching] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: new Yup.ObjectSchema({
      email: Yup.string()
        .email("Введите корректный email-адрес")
        .required("Это поле обязательно!")
        .min(2, "Длина почты должна быть не менее 2")
        .max(80, "Длина почты должна быть не более 80"),
      password: Yup.string()
        .required("Это поле обязательно!")
        .min(5, "Длина пароля должна быть не менее 5")
        .max(80, "Длина пароля должна быть не более 80"),
      username: Yup.string()
        .required("Это поле обязательно!")
        .matches(/^\S*$/gi, "Юзернейм не должен содержать пробелов")
        .min(2, "Длина юзернейма должна быть не менее 2")
        .max(80, "Длина юзернейма должна быть не более 80"),
    }),
    onSubmit: async ({ email, username, password }) => {
      setIsFetching(false);
      console.info("------ REGISTRATION ---------\n", {
        email,
        username,
        password,
      });
      // try {
      //   setIsFetching(true);

      //   // Add triming here as I don't know, how to validate
      //   const status = await gaduka.login(login.trim(), password.trim());

      //   status ? navigate("/") : setDisplayErrorMessage(true);
      // } catch (error) {
      //   if (error instanceof Error) {
      //     console.error(error);
      //     return;
      //   }

      //   const errorMessage = error as IErrorMessage;

      //   gaduka.emit("ui_message", errorMessage.result.message, "error");
      // } finally {
      //   setIsFetching(false);
      // }
    },
  });

  return (
    <div className="login-page-wrapper">
      <div className="login-page-container">
        <h1 className="form-page-header">Регистрация</h1>
        <form
          action=""
          className="form-form"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <p className="error-message">
            {displayErrorMessage ? "Неверные регистрационные данные" : ""}
          </p>
          <table className="credentials-table">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="username">
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Введите юзернейм"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      autoComplete="off"
                      className={
                        formik.touched.username && formik.errors.username
                          ? "invalid"
                          : ""
                      }
                      disabled={isFetching}
                    />
                    <div className="label">Юзернейм</div>
                    {formik.touched.username && formik.errors.username && (
                      <span className="error-message small">
                        {formik.errors.username}
                      </span>
                    )}
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="email">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Введите email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      autoComplete="off"
                      className={
                        formik.touched.email && formik.errors.email
                          ? "invalid"
                          : ""
                      }
                      disabled={isFetching}
                    />
                    <div className="label">Почта</div>
                    {formik.touched.email && formik.errors.email && (
                      <span className="error-message small">
                        {formik.errors.email}
                      </span>
                    )}
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="password">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Введите пароль"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      autoComplete="off"
                      className={
                        formik.touched.password && formik.errors.password
                          ? "invalid"
                          : ""
                      }
                      disabled={isFetching}
                    />
                    <div className="label">Пароль</div>
                    {formik.touched.password && formik.errors.password && (
                      <span className="error-message small">
                        {formik.errors.password}
                      </span>
                    )}
                  </label>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button
                    className="btn-submit"
                    type="submit"
                    disabled={isFetching}
                  >
                    Зарегистрироваться
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <span className="small-text">
                    Уже есть аккаунт? <Link href="/login">Войти</Link>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
