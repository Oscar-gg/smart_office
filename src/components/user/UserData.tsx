import { Formik, Field, Form, ErrorMessage } from "formik";
import { userSchema } from "~/components/schemas/userSchema";
import { useState, type ChangeEvent } from "react";
import { api } from "~/utils/api";
import { env } from "~/env.mjs";
import ValidImage from "../general/ValidImage";
import { twMerge } from "tailwind-merge";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { RouterOutputs } from "~/utils/api";
import makeAnimated from "react-select/animated";
import { getDefaultTime, computeDate } from "~/utils/dates";

const errorStyle = "text-red-500 bg-tertiary p-2 rounded-lg font-bold";

export const UserData = ({
  defaultValues,
}: {
  defaultValues?: RouterOutputs["user"]["getUserProfileById"];
}) => {
  const context = api.useContext();

  const mutation = api.user.modifyUserProfile.useMutation({
    onSuccess: (result) => {
      alert(result);
      void context.user.invalidate();
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <Formik
      initialValues={{
        gender: defaultValues?.gender ?? "",
        birthdate: getDefaultTime({ date: defaultValues?.birthday }),
        minimumTemperature: defaultValues?.Preferences?.temp_val_min ?? -1,
        maximumTemperature: defaultValues?.Preferences?.temp_val_max ?? -1,
      }}
      validationSchema={userSchema}
      onSubmit={(values) => {
        console.log("Called mutation method!");
        mutation.mutate({
          id: defaultValues?.id ?? "-1",
          gender: values.gender,
          birthdate: computeDate(values.birthdate),
          maximumTemperature: values.maximumTemperature,
          minimumTemperature: values.minimumTemperature,
        });
      }}
      validateOnChange={false}
    >
      {({ getFieldProps, setFieldValue }) => (
        <Form>
          <div className="container mt-5 flex max-w-[100%] flex-col items-center justify-center">
            <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 edit_information">
              <div className="row p-4">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text font-smart text-lg">
                      Nombre:
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {console.log(e)}}
                      className="form-control m-3 rounded border-solid p-3 shadow-lg"
                      value={defaultValues?.name ?? "Sin nombre asociado"}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row p-4">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text font-smart text-lg">
                      Correo:
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {console.log(e)}}
                      className="form-control m-3 rounded border-solid p-3 shadow-lg"
                      value={defaultValues?.email ?? "Sin correo asociado"}
                      disabled
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row p-4">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text font-smart text-lg">
                      RFID:
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control m-3 rounded border-solid p-3 shadow-lg"
                      value={
                        defaultValues?.rfid?.id_RFID ?? "Sin RFID asociado"
                      }
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row p-4">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text font-smart text-lg">
                      Temperatura Minima Preferencial:
                    </label>
                    <input
                      type="number"
                      className="form-control m-3 rounded border-solid p-3 shadow-lg"
                      {...getFieldProps("minimumTemperature")}
                    />
                    <div className="my-4">
                      <ErrorMessage
                        component="a"
                        className={errorStyle}
                        name="minimumTemperature"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row p-4">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text font-smart text-lg">
                      Temperatura Maxima Preferencial:
                    </label>
                    <input
                      type="number"
                      {...getFieldProps("maximumTemperature")}
                      className="form-control m-3 rounded border-solid p-3 shadow-lg"
                    />
                    <div className="my-4">
                      <ErrorMessage
                        component="a"
                        className={errorStyle}
                        name="maximumTemperature"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row p-4">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text font-smart text-lg">
                      Fecha de Nacimiento:
                    </label>
                    <input
                      type="date"
                      {...getFieldProps("birthdate")}
                      className="form-control m-3 p-3 shadow-lg"
                    />
                    <div className="my-4">
                      <ErrorMessage
                        component="a"
                        className={errorStyle}
                        name="birthdate"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row p-4">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text font-smart text-lg">
                      Género:
                    </label>
                    <select
                      {...getFieldProps("gender")}
                      className="form-control m-3 p-3 shadow-lg"
                      onChange={async (e: ChangeEvent<HTMLSelectElement>) => {
                        await setFieldValue("gender", e.target.value, true);
                      }}
                    >
                      <option value="Mujer">Mujer</option>
                      <option value="Hombre">Hombre</option>
                      <option value="Otro">Otro</option>
                    </select>
                    <div className="my-4">
                      <ErrorMessage
                        component="a"
                        className={errorStyle}
                        name="gender"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row p-4">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 submit">
                  <button
                    type="submit"
                    className="btn btn-success m-3 rounded-lg border-2 bg-blue-400 p-5 font-smart text-lg shadow-lg"
                  >
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
