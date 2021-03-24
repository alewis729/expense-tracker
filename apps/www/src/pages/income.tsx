import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_ME,
  FILTER_INCOMES,
  REMOVE_INCOME,
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
  IncomeFormDialog,
  FileReaderDialog,
  FiltersDialog,
} from "@/containers";
import { PaperHeader, ExpensesTable, ErrorMessage } from "@/components";
import { IncomeFields, FilterQuery } from "@/lib/types";

interface CurrentIncome extends IncomeFields {
  id: string;
}

const Income: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentIncome, setCurrentIncome] = useState<CurrentIncome | null>(
    null
  );
  const [filterInput, setFilterInput] = useState<FilterQuery>({});
  const [firstApiCall, setFirstApiCall] = useState(true);
  const { data, loading, error } = useQuery(GET_ME, {
    variables: { withIncome: true, withCategories: true },
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
  ] = useLazyQuery(FILTER_INCOMES, {
    variables: { filterInput, withCategory: true },
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });
  const [removeIncome, { loading: removeLoading }] = useMutation(
    REMOVE_INCOME,
    {
      onCompleted: () => {
        execFilterQuery();
        enqueueSnackbar("Income removed successfuly.", { variant: "success" });
      },
      onError: error => enqueueSnackbar(error.message, { variant: "error" }),
    }
  );
  const pending = loading || removeLoading || filterLoading;
  const incomesLoading = loading || filterLoading;
  const incomes = called ? filterData?.filterIncomes : data?.me?.incomes;
  const [showIncomeDialog, hideIncomeDialog] = useModal(
    ({ in: open }) => (
      <IncomeFormDialog
        open={open}
        onClose={() => {
          hideIncomeDialog();
          setCurrentIncome(null);
        }}
        refetchIncome={execFilterQuery}
        currentIncome={currentIncome}
        defaultCurrencyCode={incomes?.[0]?.currencyCode}
      />
    ),
    [currentIncome, incomes]
  );
  const [showFileReaderDialog, hideFileReaderDialog] = useModal(
    ({ in: open }) => (
      <FileReaderDialog
        type="incomes"
        open={open}
        onClose={hideFileReaderDialog}
        refetch={execFilterQuery}
      />
    ),
    [currentIncome, incomes]
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
    [data?.me?.categories, incomes]
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

  const handleEditIncome = (id: string) => {
    const income = find(data?.me?.incomes, obj => obj.id === id);
    const incomeFields = {
      id: income?.id,
      name: income?.name,
      description: income?.description,
      date: income?.date,
      categoryId: income?.category.id,
      amount: income?.amount,
      currencyCode: income?.currencyCode,
    };

    setCurrentIncome(incomeFields as CurrentIncome);
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
      errorNode={error || filterError ? <ErrorMessage /> : null}
    >
      <PaperHeader
        title="Income"
        actionsNode={
          <>
            <Button
              disabled={isEmpty(data?.me?.categories)}
              onClick={showIncomeDialog}
            >
              Add Income
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
      {!incomesLoading && isEmpty(incomes) && (
        <Typography>No incomes found.</Typography>
      )}
      {!incomesLoading && !isEmpty(incomes) && (
        <ExpensesTable
          data={incomes ?? []}
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
