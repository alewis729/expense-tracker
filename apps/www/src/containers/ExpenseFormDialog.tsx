import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  GET_CATEGORIES,
} from "@expense-tracker/graphql";
import { useSnackbar } from "notistack";
import { isNil } from "lodash";

import { Dialog, ExpenseForm } from "@/components";
import { AddExpenseFields } from "@/components/ExpenseForm/ExpenseForm";

interface CurrentExpense extends AddExpenseFields {
  id: string;
}
interface Props {
  open: boolean;
  onClose: () => void;
  refetchExpenses?: () => void;
  currentExpense?: CurrentExpense | null;
}

const ExpenseFormDialog: React.FC<Props> = ({
  open,
  onClose,
  refetchExpenses = () => {},
  currentExpense = null,
  ...props
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const isAddForm = isNil(currentExpense);
  const {
    data,
    loading: categoriesLoading,
    error: categoriesError,
    refetch,
  } = useQuery(GET_CATEGORIES, {
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });
  const [addExpense, { loading: addExpenseLoading }] = useMutation(
    ADD_EXPENSE,
    {
      onCompleted: () => {
        enqueueSnackbar("Expense added successfully.", { variant: "success" });
        refetchExpenses();
        onClose();
      },
      onError: error => enqueueSnackbar(error.message, { variant: "error" }),
    }
  );
  const [updateExpense, { loading: updateExpenseLoading }] = useMutation(
    UPDATE_EXPENSE,
    {
      onCompleted: () => {
        enqueueSnackbar("Expense updated successfully.", {
          variant: "success",
        });
        refetchExpenses();
        onClose();
      },
      onError: error => enqueueSnackbar(error.message, { variant: "error" }),
    }
  );
  const loading = addExpenseLoading || updateExpenseLoading;

  useEffect(() => {
    if (open && !isNil(data)) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSubmit = (expenseFields: AddExpenseFields) => {
    if (isAddForm) {
      addExpense({
        variables: { addExpenseInput: { ...expenseFields } },
      });
    } else {
      updateExpense({
        variables: {
          id: currentExpense?.id,
          updateExpenseInput: { ...expenseFields },
        },
      });
    }
  };

  if (categoriesLoading || categoriesError) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isAddForm ? "Register expense" : "Update expense"}
      buttonText={isAddForm ? "Register expense" : "Update expense"}
      ButtonProps={{
        type: "submit",
        form: "add_expense_form",
        pending: loading,
      }}
      {...props}
    >
      <ExpenseForm
        categories={data.categories}
        onSubmit={handleSubmit}
        defaultValues={currentExpense}
      />
    </Dialog>
  );
};

export default ExpenseFormDialog;
