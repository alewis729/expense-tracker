import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_ME,
  REMOVE_EXPENSE,
  FILTER_EXPENSES,
} from "@expense-tracker/graphql";
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
import {
  Header,
  ExpenseFormDialog,
  FileReaderDialog,
  FiltersDialog,
} from "@/containers";
import { PaperHeader, ExpensesTable, ErrorMessage } from "@/components";
import { ExpenseFields, FilterQuery } from "@/lib/types";

interface CurrentExpense extends ExpenseFields {
  id: string;
}

const Expenses: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentExpense, setCurrentExpense] = useState<CurrentExpense | null>(
    null
  );
  const [filterInput, setFilterInput] = useState<FilterQuery>({});
  const [firstApiCall, setFirstApiCall] = useState(true);
  const { data, loading, error } = useQuery(GET_ME, {
    variables: { withExpenses: true, withCategories: true },
    onCompleted: () => {
      if (firstApiCall) {
        setFirstApiCall(false);
      }
    },
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });
  const [
    startFiltering,
    {
      data: filterData,
      loading: filterLoading,
      error: filterError,
      called,
      refetch,
    },
  ] = useLazyQuery(FILTER_EXPENSES, {
    variables: { filterInput, withCategory: true },
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });
  const [removeExpense, { loading: removeLoading }] = useMutation(
    REMOVE_EXPENSE,
    {
      onCompleted: () => {
        execFilterQuery();
        enqueueSnackbar("Expense removed successfuly.", { variant: "success" });
      },
      onError: error => enqueueSnackbar(error.message, { variant: "error" }),
    }
  );
  const pending = loading || removeLoading || filterLoading;
  const expensesLoading = loading || filterLoading;
  const expenses = called ? filterData?.filterExpenses : data?.me?.expenses;
  const [showExpenseDialog, hideExpenseDialog] = useModal(
    ({ in: open }) => (
      <ExpenseFormDialog
        open={open}
        onClose={() => {
          hideExpenseDialog();
          setCurrentExpense(null);
        }}
        refetchExpenses={execFilterQuery}
        currentExpense={currentExpense}
        defaultCurrencyCode={expenses?.[0]?.currencyCode}
      />
    ),
    [currentExpense, expenses]
  );
  const [showFileReaderDialog, hideFileReaderDialog] = useModal(
    ({ in: open }) => (
      <FileReaderDialog
        open={open}
        onClose={hideFileReaderDialog}
        refetch={execFilterQuery}
      />
    ),
    [currentExpense, expenses]
  );
  const [showFiltersDialog, hideFiltersDialog] = useModal(
    ({ in: open }) => (
      <FiltersDialog
        open={open}
        onClose={hideFiltersDialog}
        categories={data?.me?.categories}
        onSubmit={(values: FilterQuery) => setFilterInput({ ...values })}
      />
    ),
    [data?.me?.categories, expenses]
  );

  const execFilterQuery = () => {
    if (!called) {
      startFiltering();
    } else {
      refetch?.({ filterInput, withCategory: true });
    }
  };

  useEffect(() => {
    if (!firstApiCall) {
      execFilterQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterInput]);

  const handleEditExpense = (id: string) => {
    const expense = find(expenses, obj => obj.id === id);
    const expenseFields = {
      id: expense?.id,
      name: expense?.name,
      description: expense?.description,
      date: expense?.date,
      categoryId: expense?.category.id,
      amount: expense?.amount,
      currencyCode: expense?.currencyCode,
    };

    setCurrentExpense(expenseFields as CurrentExpense);
    showExpenseDialog();
  };

  const handleRemoveExpense = (id: string) => {
    removeExpense({ variables: { id } });
  };

  return (
    <DefaultLayout
      header={<Header />}
      loading={pending}
      hideWhileLoading={firstApiCall}
      errorNode={error || filterError ? <ErrorMessage /> : null}
    >
      <PaperHeader
        title="Expenses"
        actionsNode={
          <>
            <Button
              disabled={isEmpty(data?.me?.categories)}
              onClick={showExpenseDialog}
            >
              Add Expense
            </Button>
            <Button onClick={showFileReaderDialog} color="default">
              Import from xlsx
            </Button>
            <Button onClick={showFiltersDialog} color="default">
              Show filters
            </Button>
          </>
        }
      />
      {!expensesLoading && isEmpty(expenses) && (
        <Typography>No expenses found.</Typography>
      )}
      {!expensesLoading && !isEmpty(expenses) && (
        <ExpensesTable
          data={expenses ?? []}
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
