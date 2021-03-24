import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  ADD_INCOME,
  UPDATE_INCOME,
  GET_CATEGORIES,
} from "@expense-tracker/graphql";
import { useSnackbar } from "notistack";
import { isNil, pickBy } from "lodash";

import { Dialog, IncomeForm, Button } from "@/components";
import { IncomeFields } from "@/lib/types";
import { Props as IncomeFormProps } from "@/components/IncomeForm/IncomeForm";

interface CurrentIncome extends IncomeFields {
  id: string;
}
interface Props extends Pick<IncomeFormProps, "defaultCurrencyCode"> {
  open: boolean;
  onClose: () => void;
  refetchIncome?: () => void;
  currentIncome?: CurrentIncome | null;
}

const IncomeFormDialog: React.FC<Props> = ({
  open,
  onClose,
  refetchIncome = () => {},
  currentIncome = null,
  ...props
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const isAddForm = isNil(currentIncome);
  const {
    data,
    loading: categoriesLoading,
    error: categoriesError,
    refetch,
  } = useQuery(GET_CATEGORIES, {
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });
  const [addIncome, { loading: addIncomeLoading }] = useMutation(ADD_INCOME, {
    onCompleted: () => {
      enqueueSnackbar("Income added successfully.", { variant: "success" });
      refetchIncome();
      onClose();
    },
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });
  const [updateIncome, { loading: updateIncomeLoading }] = useMutation(
    UPDATE_INCOME,
    {
      onCompleted: () => {
        enqueueSnackbar("Income updated successfully.", {
          variant: "success",
        });
        refetchIncome();
        onClose();
      },
      onError: error => enqueueSnackbar(error.message, { variant: "error" }),
    }
  );
  const loading = addIncomeLoading || updateIncomeLoading;

  useEffect(() => {
    if (open && !isNil(data)) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSubmit = (incomeFields: IncomeFields) => {
    if (isAddForm) {
      addIncome({
        variables: { addIncomeInput: { ...incomeFields } },
      });
    } else {
      const necesaryFields = pickBy(
        incomeFields,
        (value, key) => currentIncome?.[key as keyof CurrentIncome] !== value
      );
      updateIncome({
        variables: {
          id: currentIncome?.id,
          updateIncomeInput: necesaryFields,
        },
      });
    }
  };

  if (categoriesLoading || categoriesError) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isAddForm ? "Register income" : "Update income"}
      actionsNode={
        <Button type="submit" form="add_income_form" pending={loading}>
          {isAddForm ? "Register income" : "Update income"}
        </Button>
      }
    >
      <IncomeForm
        categories={data.categories}
        defaultValues={currentIncome}
        onSubmit={handleSubmit}
        {...props}
      />
    </Dialog>
  );
};

export default IncomeFormDialog;
