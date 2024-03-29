import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  GET_CATEGORIES,
} from "@expense-tracker/graphql";
import { useSnackbar } from "notistack";
import { isNil, pickBy } from "lodash";

import { Dialog, ExpenseForm, Button } from "@/components";
import { ExpenseFields } from "@/lib/types";
import { Props as ExpenseFormProps } from "@/components/ExpenseForm/ExpenseForm";

interface CurrentExpense extends ExpenseFields {
  id: string;
}
interface Props extends Pick<ExpenseFormProps, "defaultCurrencyCode"> {
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

  const handleSubmit = (expenseFields: ExpenseFields) => {
    if (isAddForm) {
      addExpense({
        variables: { addExpenseInput: { ...expenseFields } },
      });
    } else {
      const necesaryFields = pickBy(
        expenseFields,
        (value, key) => currentExpense?.[key as keyof CurrentExpense] !== value
      );
      updateExpense({
        variables: {
          id: currentExpense?.id,
          updateExpenseInput: necesaryFields,
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
      actionsNode={
        <Button type="submit" form="add_expense_form" pending={loading}>
          {isAddForm ? "Register expense" : "Update expense"}
        </Button>
      }
    >
      <ExpenseForm
        categories={data.categories}
        defaultValues={currentExpense}
        onSubmit={handleSubmit}
        {...props}
      />
    </Dialog>
  );
};

export default ExpenseFormDialog;
