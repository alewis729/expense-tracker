import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().trim().required("This field is required."),
  color: yup.string().trim().required("This field is required."),
});

export const initialValues = {
  name: "",
  color: "",
};

export const fields = [
  {
    type: "name",
    name: "name",
    label: "Category name",
    placeholder: "Category name",
  },
  {
    type: "select",
    name: "color",
    label: "Category color",
    placeholder: "Category color",
  },
];
