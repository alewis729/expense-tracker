import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_CATEGORY, UPDATE_CATEGORY } from "@expense-tracker/graphql";
import { isNil } from "lodash";
import { useSnackbar } from "notistack";

import { Dialog, CategoryForm } from "@/components";
import { CategoryFields } from "@/lib/types";

interface CurrentCategory extends CategoryFields {
  id: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  refetchCategories?: () => void;
  currentCategory?: CurrentCategory | null;
}

interface categoryInput {
  name: string;
  color: string;
}

const CategoryFormDialog: React.FC<Props> = ({
  open,
  onClose,
  refetchCategories = () => {},
  currentCategory = null,
  ...props
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const isAddForm = isNil(currentCategory);
  const [addCategory, { loading: addCategoryLoading }] = useMutation(
    ADD_CATEGORY,
    {
      onCompleted: () => {
        enqueueSnackbar("Category added successfully.", { variant: "success" });
        refetchCategories();
        onClose();
      },
      onError: error => enqueueSnackbar(error.message, { variant: "error" }),
    }
  );
  const [updateCategory, { loading: updateCategoryLoading }] = useMutation(
    UPDATE_CATEGORY,
    {
      onCompleted: () => {
        enqueueSnackbar("Expense updated successfully.", {
          variant: "success",
        });
        refetchCategories();
        onClose();
      },
      onError: error => enqueueSnackbar(error.message, { variant: "error" }),
    }
  );
  const loading = addCategoryLoading || updateCategoryLoading;

  const handleSubmit = (categoryFields: categoryInput) => {
    if (isAddForm) {
      addCategory({
        variables: {
          addCategoryInput: {
            ...categoryFields,
          },
        },
      });
    } else {
      updateCategory({
        variables: {
          id: currentCategory?.id,
          updateCategoryInput: { ...categoryFields },
        },
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isAddForm ? "Register category" : "Update category"}
      buttonText={isAddForm ? "Register category" : "Update category"}
      ButtonProps={{
        type: "submit",
        form: "add_category_form",
        pending: loading,
      }}
    >
      <CategoryForm
        defaultValues={currentCategory}
        onSubmit={handleSubmit}
        {...props}
      />
    </Dialog>
  );
};

export default CategoryFormDialog;
