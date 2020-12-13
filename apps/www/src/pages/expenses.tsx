import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, REMOVE_EXPENSE } from "@expense-tracker/graphql";
import { isEmpty } from "lodash";
import { useSnackbar } from "notistack";
import { Button, IconButton, Typography } from "@material-ui/core";
import { DeleteForeverRounded as IconDelete } from "@material-ui/icons";
import { useModal } from "react-modal-hook";

import { withAuth } from "@/hocs";
import { DefaultLayout } from "@/layouts";
import { Header, AddCategory, AddExpense } from "@/containers";
import { PaperHeader, DataTable } from "@/components";

const currencySymbol = "$";

const Home: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
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
  const [showCategoryDialog, hideCategoryDialog] = useModal(({ in: open }) => (
    <AddCategory
      open={open}
      onClose={hideCategoryDialog}
      refetchCategories={refetch}
    />
  ));
  const [showExpenseDialog, hideExpenseDialog] = useModal(({ in: open }) => (
    <AddExpense
      open={open}
      onClose={hideExpenseDialog}
      updateExpenses={refetch}
    />
  ));

  const handleRemoveExpense = (id: string) => {
    removeExpense({ variables: { id } });
  };

  if (error) return <p>Error</p>;

  return (
    <DefaultLayout header={<Header />} loading={loading || removeLoading}>
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
        <Typography>No expenses registered.</Typography>
      )}
      {!loading && !isEmpty(data?.me?.expenses) && (
        <DataTable
          data={data?.me?.expenses}
          renderActions={id => (
            <IconButton
              disabled={loading || removeLoading}
              size="small"
              onClick={() => handleRemoveExpense(id)}
            >
              <IconDelete fontSize="small" />
            </IconButton>
          )}
          currencySymbol={currencySymbol}
        />
      )}
    </DefaultLayout>
  );
};

export default withAuth(Home);
