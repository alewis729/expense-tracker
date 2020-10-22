import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().trim().required("This field is required."),
  description: yup.string().trim(),
  category: yup.string().trim().required("This field is required."),
});

export const initialValues = {
  name: "",
  description: "",
  category: "",
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
    type: "select",
    name: "category",
    label: "Category",
    placeholder: "Category",
  },
];
