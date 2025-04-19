"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import "./styles.scss";
import Link from "next/link";
import SkillTest from "@/src/components/skill-test";

const ParticipantFormPage = () => {
  const [displayErrorMessage, setDisplayErrorMessage] = useState<string | null>(
    null
  );
  const [isFetching, setIsFetching] = useState(false);
  const [events, setEvents] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      university: "",
    },
    validationSchema: new Yup.ObjectSchema({
      name: Yup.string()
        .required("Это поле обязательно!")
        .min(2, "Длина ФИО должна быть не менее 2")
        .max(80, "Длина ФИО должна быть не более 80"),
      university: Yup.string()
        .required("Это поле обязательно!")
        .min(2, "Длина ВУЗа/университета должна быть не менее 2")
        .max(80, "Длина ВУЗа/университета должна быть не более 80"),
    }),
    onSubmit: async ({ name, university }) => {
      setIsFetching(false);
      console.info("------ FORM ---------\n", { name, university });
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
    <div className="sheet-page-wrapper">
      <div className="sheet-page-container">
        <h1 className="form-page-header">Анкета участника</h1>
        <form
          action="/"
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
                  <h2 className="form-page-subheader">Данные</h2>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="name">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Введите ФИО"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      autoComplete="off"
                      className={
                        formik.touched.name && formik.errors.name
                          ? "invalid"
                          : ""
                      }
                      disabled={isFetching}
                    />
                    <div className="label">ФИО</div>
                    {formik.touched.name && formik.errors.name && (
                      <span className="error-message small">
                        {formik.errors.name}
                      </span>
                    )}
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="university">
                    <input
                      id="university"
                      type="text"
                      name="university"
                      placeholder="ВУЗ/университет, в котором учитесь"
                      value={formik.values.university}
                      onChange={formik.handleChange}
                      autoComplete="off"
                      className={
                        formik.touched.university && formik.errors.university
                          ? "invalid"
                          : ""
                      }
                      disabled={isFetching}
                    />
                    <div className="label">ВУЗ</div>
                    {formik.touched.university && formik.errors.university && (
                      <span className="error-message small">
                        {formik.errors.university}
                      </span>
                    )}
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-checkbox-line">
                    <input
                      id="show_email"
                      type="checkbox"
                      name="show_email"
                      autoComplete="off"
                      disabled={isFetching}
                    />
                    <label htmlFor="show_email" className="checkbox-label">
                      Скрыть почту
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2 className="form-page-subheader">Навыки</h2>
                  <p className="form-page-placeholder">
                    Чтобы добавить навык, пройдите тест
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="test-skills">
                    <SkillTest
                      name="Frontend"
                      score={3}
                      maxScore={4}
                      link={"https://google.com"}
                    />
                    <SkillTest
                      name="Backend"
                      score={null}
                      maxScore={4}
                      link={"https://ya.ru"}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button
                    className="btn-submit"
                    type="submit"
                    disabled={isFetching}
                  >
                    Сохранить
                  </button>
                </td>
              </tr>
              {/* <tr>
                <td colSpan={2}>
                  <span className="small-text">
                    Нет аккаунта?{" "}
                    <Link href="/registration">Зарегестрироваться</Link>
                  </span>
                </td>
              </tr> */}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ParticipantFormPage;
