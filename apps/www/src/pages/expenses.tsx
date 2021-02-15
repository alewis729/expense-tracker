import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, REMOVE_EXPENSE } from "@expense-tracker/graphql";
import { find, isEmpty } from "lodash";
import { useSnackbar } from "notistack";
import { Button, IconButton, Typography } from "@material-ui/core";
import {
  DeleteForeverRounded as IconDelete,
  EditRounded as IconEdit,
} from "@material-ui/icons";
import { useModal } from "react-modal-hook";

import { withAuth } from "@/hocs";
import { DefaultLayout } from "@/layouts";
import { Header, CategoryFormDialog, ExpenseFormDialog } from "@/containers";
import { PaperHeader, ExpensesTable } from "@/components";

import { ExpenseFields } from "@/components/ExpenseForm/ExpenseForm";

interface CurrentExpense extends ExpenseFields {
  id: string;
}

const Expenses: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentExpense, setCurrentExpense] = useState<CurrentExpense | null>(
    null
  );
  const { data, loading, error, refetch } = useQuery(GET_ME, {
    variables: { withExpenses: true, withCategories: true },
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });
  const [removeExpense, { loading: removeLoading }] = useMutation(
    REMOVE_EXPENSE,
    {
      onCompleted: () => {
        refetch();
        enqueueSnackbar("Expense removed successfuly.", { variant: "success" });
      },
      onError: error => enqueueSnackbar(error.message, { variant: "error" }),
    }
  );
  const pending = loading || removeLoading;
  const [showCategoryDialog, hideCategoryDialog] = useModal(({ in: open }) => (
    <CategoryFormDialog
      open={open}
      onClose={hideCategoryDialog}
      refetchCategories={refetch}
    />
  ));
  const [showExpenseDialog, hideExpenseDialog] = useModal(
    ({ in: open }) => (
      <ExpenseFormDialog
        open={open}
        onClose={() => {
          hideExpenseDialog();
          setCurrentExpense(null);
        }}
        refetchExpenses={refetch}
        currentExpense={currentExpense}
        defaultCurrencyCode={data?.me?.expenses?.[0]?.currencyCode}
      />
    ),
    [currentExpense, data?.me?.expenses]
  );

  const handleEditExpense = (id: string) => {
    const expense = find(data?.me?.expenses, obj => obj.id === id);
    const expenseFields = {
      id: expense.id,
      name: expense.name,
      description: expense.description,
      date: expense.date,
      categoryId: expense.category.id,
      amount: expense.amount,
      currencyCode: expense.currencyCode,
    };

    setCurrentExpense(expenseFields);
    showExpenseDialog();
  };

  const handleRemoveExpense = (id: string) => {
    removeExpense({ variables: { id } });
  };

  if (error) return <p>Error</p>;

  return (
    <DefaultLayout header={<Header />} loading={pending}>
      <PaperHeader
        title="Expenses"
        actionButtons={
          <>
            <Button
              disabled={isEmpty(data?.me?.categories)}
              onClick={showExpenseDialog}
            >
              Add Expense
            </Button>
            <Button onClick={showCategoryDialog} color="default">
              Add Category
            </Button>
          </>
        }
      />
      {!loading && isEmpty(data?.me?.expenses) && (
        <Typography>
          {`Hey ${
            data?.me?.name ?? "friend"
          }, you haven't registered any expenses yet.
          `}
        </Typography>
      )}
      {!loading && !isEmpty(data?.me?.expenses) && (
        <ExpensesTable
          data={data?.me?.expenses}
          renderActions={id => (
            <>
              <IconButton
                disabled={pending}
                size="small"
                onClick={() => handleEditExpense(id)}
              >
                <IconEdit fontSize="small" />
              </IconButton>
              <IconButton
                disabled={pending}
                size="small"
                onClick={() => handleRemoveExpense(id)}
              >
                <IconDelete fontSize="small" />
              </IconButton>
            </>
          )}
        />
      )}
    </DefaultLayout>
  );
};

export default withAuth(Expenses);
