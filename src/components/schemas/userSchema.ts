import * as Yup from "yup";
import { isImgUrl } from "~/utils/image";

export const userSchema = Yup.object().shape({
  gender: Yup.string().required("Requerido"),
  birthdate: Yup.string()
    .required("Requerido")
    .min(5, "Fecha inválida.")
    .max(10, "Fecha inválida.")
    .test(
      "previous-day",
      "El día no puede ser en el futuro.",
      (value, context) => {
        const bd = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return bd.getTime() < today.getTime();
      },
    ),
  minimumTemperature: Yup.number()
    .min(10, "La temperatura mínima debe ser mayor a igual 10 grados.")
    .max(30, "La temperatura mínima debe ser menor o igual a 30 grados.")
    .required(
      "La temperatura mínima es requerida y debe estar entre 10 y 30 grados.",
    ),
  maximumTemperature: Yup.number()
    .min(10, "La temperatura máxima debe ser mayor a igual 10 grados.")
    .max(30, "La temperatura máxima debe ser menor o igual a 30 grados.")
    .required(
      "La temperatura máxima es requerida y debe estar entre 10 y 30 grados.",
    )
    .test(
      "valid-temperature",
      "La temperatura máxima debe ser mayor a la mínima.",
      (value, context) => {
        const minima = context.parent.minimumTemperature;
        return value > minima;
      },
    ),
});
