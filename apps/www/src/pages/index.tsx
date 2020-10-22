import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "@expense-tracker/graphql";
import { isEmpty } from "lodash";
import { useSnackbar } from "notistack";
import { Button } from "@material-ui/core";
import { useModal } from "react-modal-hook";

import { withAuth } from "@/hocs";
import { DefaultLayout } from "@/layouts";
import { Header, AddCategory, AddExpense } from "@/containers";
import { PaperHeader, DataTable } from "@/components";

const currencySymbol = "$";

const Home: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error, refetch } = useQuery(GET_ME, {
    variables: { withExpenses: true },
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });
  const [showCategoryDialog, hideCategoryDialog] = useModal(({ in: open }) => (
    <AddCategory open={open} onClose={hideCategoryDialog} />
  ));
  const [showExpenseDialog, hideExpenseDialog] = useModal(({ in: open }) => (
    <AddExpense
      open={open}
      onClose={hideExpenseDialog}
      updateExpenses={refetch}
    />
  ));

  if (error) return <p>Error</p>;

  return (
    <DefaultLayout header={<Header />} loading={loading}>
      <PaperHeader
        title="Expenses"
        actionButtons={
          <>
            <Button onClick={showExpenseDialog}>Add Expense</Button>
            <Button onClick={showCategoryDialog} color="default">
              Add Category
            </Button>
          </>
        }
      />
      {!loading && !isEmpty(data) && (
        <DataTable data={data?.me?.expenses} currencySymbol={currencySymbol} />
      )}
    </DefaultLayout>
  );
};

export default withAuth(Home);
