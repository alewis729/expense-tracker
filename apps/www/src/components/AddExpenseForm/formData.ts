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
  categoryId: yup.string().trim().required("This field is required."),
  amount: yup
    .number()
    .min(0, "This must be a non negative value.")
    .required("This field is required.")
    .transform(emptyStringToNull)
    .nullable(),
});

export const initialValues = {
  name: "",
  description: "",
  categoryId: "",
  amount: 0,
};

export const fields = [
  {
    type: "name",
    name: "name",
    label: "Expense name",
    placeholder: "Expense name",
  },
  {
    type: "name",
    name: "description",
    label: "Description",
    placeholder: "Description",
  },
  {
    type: "number",
    name: "amount",
    label: "Amount",
    placeholder: "Amount",
  },
  {
    type: "select",
    name: "categoryId",
    label: "Category",
    placeholder: "Category",
  },
];
