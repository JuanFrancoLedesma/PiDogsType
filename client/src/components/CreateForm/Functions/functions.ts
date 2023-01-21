import { errorInterface, inputInterface } from "../../../types";

export const validate = ({
  name,
  password,
  minWeight,
  maxWeight,
  minHeight,
  maxHeight,
  minLifeSpan,
  maxLifeSpan,
  image,
  temperaments,
}: inputInterface) => {
  let errors: errorInterface = {};

  if (!name) errors.name = "Ingresa el nombre!";
  else if (!/[a-zA-Z]+/.test(name)) errors.name = "Solo letras!";
  else errors.name = ""
  //Contraseña
  if (!password) errors.password = "Ingresa una contraseña!";
  //Peso
  if (!minWeight || !maxWeight) errors.weight = "Ingresa los pesos!";
  else if (Number(minWeight) === Number(maxWeight))
    errors.weight = "Los pesos minimos y maximos deben ser diferentes";
  else if (Number(minWeight) > Number(maxWeight))
    errors.weight = "El peso minimo debe ser menor que el maximo";
  else if (/[a-zA-Z]+]+/.test(minWeight) || /[[a-zA-Z]+]+/.test(maxWeight))
    errors.weight = "Solo números!";
  //Altura
  if (!minHeight || !maxHeight) errors.height = "Ingresa las alturas!";
  else if (/[[a-zA-Z]+]+/.test(minHeight) || /[[a-zA-Z]+]+/.test(maxHeight))
    errors.height = "Solo números!";
  else if (Number(minHeight) === Number(maxHeight))
    errors.height = "Las alturas minimas y maximas deben ser diferentes";
  else if (Number(minHeight) > Number(maxHeight))
    errors.height = "La altura minima debe ser menor que la maxima";
  //Esperanza de vida
  if (!minLifeSpan || !maxLifeSpan)
    errors.life_span = "Ingresa los años de vida!(Opcional)";
  else if (Number(minLifeSpan) === Number(maxLifeSpan))
    errors.life_span =
      "Los años de vida minimos y maximos deben ser diferentes";
  else if (Number(minLifeSpan) > Number(maxLifeSpan))
    errors.life_span =
      "Los años de vida minimos debe ser menores que los maximos";
  //Temperamentos
  if (temperaments?.length === 0)
    errors.temperaments = "Debes seleccionar al menos un temperamento!";

  return errors;
};
