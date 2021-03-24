import React, { useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_CATEGORIES,
  ADD_EXPENSES,
  ADD_INCOMES,
} from "@expense-tracker/graphql";
import { useSnackbar } from "notistack";

import { Dialog, Button, XlsxTutorial } from "@/components";
import {
  xlsxFileTypes as allowedFileTypes,
  transformExpenses,
  readFile,
} from "@/lib/utils";

interface Props {
  type?: "expenses" | "incomes";
  open: boolean;
  onClose: () => void;
  refetch?: () => void;
}

const FileReaderDialog: React.FC<Props> = ({
  type = "expenses",
  open,
  onClose,
  refetch = () => {},
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const [addExpenses, { loading: loadingExpenses }] = useMutation(
    ADD_EXPENSES,
    {
      onCompleted: () => {
        enqueueSnackbar("Expenses added successfully.", { variant: "success" });
        refetch();
        onClose();
      },
      onError: error => enqueueSnackbar(error.message, { variant: "error" }),
    }
  );
  const [addIncomes, { loading: loadingIncomes }] = useMutation(ADD_INCOMES, {
    onCompleted: () => {
      enqueueSnackbar("Incomes added successfully.", { variant: "success" });
      refetch();
      onClose();
    },
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });
  const loading = loadingExpenses || loadingIncomes;

  const handleImportFromFile = (
    e: React.SyntheticEvent<HTMLInputElement>
  ): void => {
    e.stopPropagation();
    e.preventDefault();
    const file = e?.currentTarget?.files?.[0];

    if (allowedFileTypes.includes(file?.type ?? "")) {
      readFile({
        file,
        allSheets: true,
        callback: fileData => {
          const data = transformExpenses(fileData);

          if (type === "expenses") {
            addExpenses({
              variables: { addExpensesInput: { expenses: data } },
            });
          } else if (type === "incomes") {
            addIncomes({ variables: { addIncomesInput: { incomes: data } } });
          }
        },
      });
    }
  };

  const hiddenInputNode = (
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleImportFromFile}
      onClick={e => {
        (e.target as HTMLInputElement).value = ""; // that's to force a read of the same file
      }}
      style={{ display: "none" }}
    />
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Import from xlsx"
      actionsNode={
        <Button
          onClick={() => {
            fileInputRef?.current?.click?.();
          }}
          pending={loading}
        >
          Upload file
        </Button>
      }
    >
      {hiddenInputNode}
      <XlsxTutorial categories={categoriesData?.categories} />
    </Dialog>
  );
};

export default FileReaderDialog;
