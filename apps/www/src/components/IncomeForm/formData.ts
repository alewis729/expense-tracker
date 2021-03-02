import * as yup from "yup";

function emptyStringToNull(value: unknown, originalValue: string) {
  if (typeof originalValue === "string" && originalValue === "") {
    return null;
  }
  return value;
}

export const schema = yup.object().shape({
  name: yup.string().trim().required("This field is required."),
  description: yup.string().trim(),
  date: yup.date(),
  categoryId: yup.string().trim().required("This field is required."),
  currencyCode: yup.string().trim().required("This field is required."),
  amount: yup
    .number()
    .min(0, "This must be a non negative value.")
    .required("This field is required.")
    .transform(emptyStringToNull),
});

export const initialValues = {
  name: "",
  description: "",
  date: new Date(),
  categoryId: "",
  amount: 0,
  currencyCode: "",
};

export const fields = [
  {
    type: "name",
    name: "name",
    label: "Income name",
    placeholder: "Income name",
  },
  {
    type: "name",
    name: "description",
    label: "Description",
    placeholder: "Description",
  },
  {
    type: "date",
    name: "date",
    label: "Date & time",
  },
  {
    type: "number",
    name: "amount",
    label: "Amount",
    placeholder: "Amount",
  },
  {
    type: "select",
    name: "currencyCode",
    label: "Currency",
    placeholder: "Currency",
  },
  {
    type: "select",
    name: "categoryId",
    label: "Category",
    placeholder: "Category",
  },
];
