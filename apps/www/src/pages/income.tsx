import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, REMOVE_INCOME } from "@expense-tracker/graphql";
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
import { Header, IncomeFormDialog } from "@/containers";
import { PaperHeader, ExpensesTable } from "@/components";
import { ExpenseFields } from "@/lib/types";

interface CurrentExpense extends ExpenseFields {
  id: string;
}

const Income: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentIncome, setCurrentIncome] = useState<CurrentExpense | null>(
    null
  );
  const [firstApiCall, setFirstApiCall] = useState(true);
  const { data, loading, error, refetch } = useQuery(GET_ME, {
    variables: { withIncome: true, withCategories: true },
    onCompleted: () => setFirstApiCall(false),
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });
  const [removeIncome, { loading: removeLoading }] = useMutation(
    REMOVE_INCOME,
    {
      onCompleted: () => {
        refetch();
        enqueueSnackbar("Income removed successfuly.", { variant: "success" });
      },
      onError: error => enqueueSnackbar(error.message, { variant: "error" }),
    }
  );
  const pending = loading || removeLoading;
  const [showIncomeDialog, hideIncomeDialog] = useModal(
    ({ in: open }) => (
      <IncomeFormDialog
        open={open}
        onClose={() => {
          hideIncomeDialog();
          setCurrentIncome(null);
        }}
        refetchIncome={refetch}
        currentIncome={currentIncome}
        defaultCurrencyCode={data?.me?.incomes?.[0]?.currencyCode}
      />
    ),
    [currentIncome, data?.me?.incomes]
  );

  const handleEditIncome = (id: string) => {
    const income = find(data?.me?.incomes, obj => obj.id === id);
    const incomeFields = {
      id: income.id,
      name: income.name,
      description: income.description,
      date: income.date,
      categoryId: income.category.id,
      amount: income.amount,
      currencyCode: income.currencyCode,
    };

    setCurrentIncome(incomeFields);
    showIncomeDialog();
  };

  const handleRemoveIncome = (id: string) => {
    removeIncome({ variables: { id } });
  };

  if (error) return <p>Error</p>;

  return (
    <DefaultLayout
      header={<Header />}
      loading={pending}
      hideWhileLoading={firstApiCall}
    >
      <PaperHeader
        title="Income"
        actionButtons={
          <Button
            disabled={isEmpty(data?.me?.categories)}
            onClick={showIncomeDialog}
          >
            Add Income
          </Button>
        }
      />
      {!loading && isEmpty(data?.me?.incomes) && (
        <Typography>
          {`Hey ${
            data?.me?.name ?? "friend"
          }, you haven't registered any income sources yet.
          `}
        </Typography>
      )}
      {!loading && !isEmpty(data?.me?.incomes) && (
        <ExpensesTable
          data={data?.me?.incomes}
          renderActions={id => (
            <>
              <IconButton
                disabled={pending}
                size="small"
                onClick={() => handleEditIncome(id)}
              >
                <IconEdit fontSize="small" />
              </IconButton>
              <IconButton
                disabled={pending}
                size="small"
                onClick={() => handleRemoveIncome(id)}
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

export default withAuth(Income);
