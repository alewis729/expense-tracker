import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@expense-tracker/graphql";
import { find, isEmpty } from "lodash";
import { useSnackbar } from "notistack";
import { Button, IconButton } from "@material-ui/core";
import { EditRounded as IconEdit } from "@material-ui/icons";
import { useModal } from "react-modal-hook";

import { withAuth } from "@/hocs";
import { DefaultLayout } from "@/layouts";
import { Header, CategoryFormDialog } from "@/containers";
import { PaperHeader, CategoriesTable, ErrorMessage } from "@/components";
import { CategoryFields } from "@/lib/types";

interface CurrentCategory extends CategoryFields {
  id: string;
}

const Categories: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [
    currentCategory,
    setCurrentCategory,
  ] = useState<CurrentCategory | null>(null);
  const { data, loading, error, refetch } = useQuery(GET_CATEGORIES, {
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });
  const pending = loading;
  const [showCategoryDialog, hideCategoryDialog] = useModal(
    ({ in: open }) => (
      <CategoryFormDialog
        open={open}
        onClose={() => {
          hideCategoryDialog();
          setCurrentCategory(null);
        }}
        refetchCategories={refetch}
        currentCategory={currentCategory}
      />
    ),
    [currentCategory]
  );

  const handleEditCategory = (id: string) => {
    const category = find(data?.categories, obj => obj.id === id);
    const categoryFields = {
      id: category.id,
      name: category.name,
      color: category.color,
    };

    setCurrentCategory(categoryFields);
    showCategoryDialog();
  };

  return (
    <DefaultLayout
      header={<Header />}
      loading={pending}
      hideWhileLoading
      errorNode={error ? <ErrorMessage /> : null}
    >
      <PaperHeader
        title="Categories"
        actionButtons={
          <Button onClick={showCategoryDialog} color="default">
            Add Category
          </Button>
        }
      />
      {!loading && !isEmpty(data?.categories) && (
        <CategoriesTable
          data={data?.categories}
          renderActions={id => (
            <>
              <IconButton
                disabled={pending}
                size="small"
                onClick={() => handleEditCategory(id)}
              >
                <IconEdit fontSize="small" />
              </IconButton>
            </>
          )}
        />
      )}
    </DefaultLayout>
  );
};

export default withAuth(Categories);
