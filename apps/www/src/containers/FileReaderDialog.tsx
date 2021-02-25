import React, { useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_EXPENSES, GET_CATEGORIES } from "@expense-tracker/graphql";
import { useSnackbar } from "notistack";

import { Dialog, Button, XlsxTutorial } from "@/components";
import {
  xlsxFileTypes as allowedFileTypes,
  transformExpenses,
  readFile,
} from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  refetch?: () => void;
}

const FileReaderDialog: React.FC<Props> = ({
  open,
  onClose,
  refetch = () => {},
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const [addExpenses, { loading }] = useMutation(ADD_EXPENSES, {
    onCompleted: () => {
      enqueueSnackbar("Expenses added successfully.", { variant: "success" });
      refetch();
      onClose();
    },
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });

  const handleFileUpload = (
    e: React.SyntheticEvent<HTMLInputElement>
  ): void => {
    e.stopPropagation();
    e.preventDefault();
    const file = e?.currentTarget?.files?.[0];

    if (allowedFileTypes.includes(file?.type ?? "")) {
      readFile(file, data => {
        const expenses = transformExpenses(data);
        addExpenses({ variables: { addExpensesInput: { expenses } } });
      });
    }
  };

  const hiddenInputNode = (
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleFileUpload}
      onClick={e => {
        (e.target as HTMLInputElement).value = "";
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
          Import file
        </Button>
      }
    >
      {hiddenInputNode}
      <XlsxTutorial categories={categoriesData?.categories} />
    </Dialog>
  );
};

export default FileReaderDialog;
