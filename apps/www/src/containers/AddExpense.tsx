import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_EXPENSE, GET_CATEGORIES } from "@expense-tracker/graphql";
import { useSnackbar } from "notistack";
import { isNil } from "lodash";

import { Dialog, AddExpenseForm } from "@/components";

interface Props {
  open: boolean;
  onClose: () => void;
  updateExpenses?: () => void;
}

interface AddExpenseFields {
  name: string;
  description: string | null;
  categoryId: string;
  amount: number;
}

const AddExpense: React.FC<Props> = ({
  open,
  onClose,
  updateExpenses = () => {},
  ...props
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    data,
    loading: categoriesLoading,
    error: categoriesError,
    refetch,
  } = useQuery(GET_CATEGORIES, {
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });
  const [addExpense, { loading }] = useMutation(ADD_EXPENSE, {
    onCompleted: () => {
      enqueueSnackbar("Expense added successfully.", { variant: "success" });
      updateExpenses();
      onClose();
    },
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });

  useEffect(() => {
    if (open && !isNil(data)) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSubmit = (data: AddExpenseFields) =>
    addExpense({ variables: { addExpenseInput: { ...data } } });

  if (categoriesLoading || categoriesError) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Register expense"
      buttonText="Register expense"
      ButtonProps={{
        type: "submit",
        form: "add_expense_form",
        pending: loading,
      }}
      {...props}
    >
      <AddExpenseForm categories={data.categories} onSubmit={handleSubmit} />
    </Dialog>
  );
};

export default AddExpense;
