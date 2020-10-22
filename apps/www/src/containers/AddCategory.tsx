import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_CATEGORY } from "@expense-tracker/graphql";
import { useSnackbar } from "notistack";

import { Dialog, AddCategoryForm } from "@/components";

interface Props {
  open: boolean;
  onClose: () => void;
  refetchCategories: () => void;
}

interface categoryInput {
  name: string;
  color: string;
}

const AddCategory: React.FC<Props> = ({
  open,
  onClose,
  refetchCategories,
  ...props
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [addCategory, { loading }] = useMutation(ADD_CATEGORY, {
    onCompleted: () => {
      enqueueSnackbar("Category added successfully.", { variant: "success" });
      refetchCategories();
      onClose();
    },
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
      onClose={onClose}
      title="Register category"
      buttonText="Register category"
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
