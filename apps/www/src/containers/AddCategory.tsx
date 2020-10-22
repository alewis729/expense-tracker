import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_CATEGORY } from "@expense-tracker/graphql";
import { useSnackbar } from "notistack";

import { Dialog, AddCategoryForm } from "@/components";

interface Props {
  open: boolean;
}

interface categoryInput {
  name: string;
  color: string;
}

const AddCategory: React.FC<Props> = ({ open, ...props }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [addCategory, { loading }] = useMutation(ADD_CATEGORY, {
    onCompleted: () =>
      enqueueSnackbar("Category added successfully.", { variant: "success" }),
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });

  const handleSubmit = ({ name, color }: categoryInput) =>
    addCategory({
      variables: {
        addCategoryInput: {
          name,
          color,
        },
      },
    });

  return (
    <Dialog
      open={open}
      title="Register Category"
      buttonText="Register Category"
      ButtonProps={{
        type: "submit",
        form: "add_category_form",
        pending: loading,
      }}
      {...props}
    >
      <AddCategoryForm onSubmit={handleSubmit} />
    </Dialog>
  );
};

export default AddCategory;
