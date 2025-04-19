"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import "./styles.scss";
import Link from "next/link";
import SkillTest from "@/src/components/skill-test";
import TeamParticipant from "@/src/components/team-participant";

const TeamFormPage = () => {
  const [displayErrorMessage, setDisplayErrorMessage] = useState<string | null>(
    null
  );
  const [isFetching, setIsFetching] = useState(false);
  const [events, setEvents] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      event: "",
      description: "",
    },
    validationSchema: new Yup.ObjectSchema({
      name: Yup.string()
        .required("Это поле обязательно!")
        .min(2, "Длина названия команды должна быть не менее 2")
        .max(80, "Длина названия команды должна быть не более 80"),
      event: Yup.string()
        .required("Это поле обязательно!")
        .min(2, "Длина мероприятия должна быть не менее 2")
        .max(80, "Длина мероприятия должна быть не более 80"),
      description: Yup.string()
        .required("Это поле обязательно!")
        .min(2, "Длина описания должна быть не менее 2")
        .max(1024, "Длина описания должна быть не более 1024"),
    }),
    onSubmit: async ({ name, event, description }) => {
      setIsFetching(false);
      console.info("------ FORM ---------\n", { name, event, description });
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
        <h1 className="form-page-header">Анкета команды</h1>
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
                      placeholder="Название команды"
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
                  <label htmlFor="event">
                    <input
                      id="event"
                      type="text"
                      name="event"
                      placeholder="Название мероприятия"
                      value={formik.values.event}
                      onChange={formik.handleChange}
                      autoComplete="off"
                      className={
                        formik.touched.event && formik.errors.event
                          ? "invalid"
                          : ""
                      }
                      disabled={isFetching}
                    />
                    <div className="label">Мероприятие</div>
                    {formik.touched.event && formik.errors.event && (
                      <span className="error-message small">
                        {formik.errors.event}
                      </span>
                    )}
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="description">
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Описание команды"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      autoComplete="off"
                      className={
                        formik.touched.description && formik.errors.description
                          ? "invalid"
                          : ""
                      }
                      disabled={isFetching}
                    />
                    <div className="label">Описание</div>
                    {formik.touched.description &&
                      formik.errors.description && (
                        <span className="error-message small">
                          {formik.errors.description}
                        </span>
                      )}
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <h2 className="form-page-subheader">Добавить участника</h2>
                  <div className="sheet-row">
                    <select className="team-participants-select">
                      <option value="Иванов Иван">Иванов Иван</option>
                      <option value="Петров Петр">Петров Петр</option>
                      <option value="Продов Упалович">Продов Упалович</option>
                    </select>
                    <button onClick={(e) => e.preventDefault()}>
                      Добавить
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2 className="form-page-subheader">Список участников</h2>
                  <div className="team-members">
                    <TeamParticipant
                      name="Иванов Иван"
                      isLead={true}
                      scores={[
                        {
                          level: 3,
                          name: "Frontend",
                        },
                        {
                          level: 2,
                          name: "Backend",
                        },
                      ]}
                    />
                    <TeamParticipant
                      name="Петров Петр"
                      isLead={false}
                      scores={[
                        {
                          level: 2,
                          name: "Frontend",
                        },
                        {
                          level: 3,
                          name: "Backend",
                        },
                      ]}
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

export default TeamFormPage;
