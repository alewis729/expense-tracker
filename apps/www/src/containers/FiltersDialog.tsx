import React, { useState, useMemo } from "react";
import { isEmpty, isNil, map } from "lodash";
import { Box, TextField } from "@material-ui/core";
import { currencies as currenciesData } from "@expense-tracker/data";

import { Select, Dialog, Button } from "@/components";
import { SelectOption, FilterQuery } from "@/lib/types";

interface Props {
  open: boolean;
  onClose: () => void;
  categories: {
    id: string;
    name: string;
  }[];
  onSubmit: (query: FilterQuery) => void;
}

const initialValues = {
  name: "",
  currency: null,
  category: null,
  amountMin: 0,
  amountMax: null,
};

const FiltersDialog: React.FC<Props> = ({
  open,
  onClose = () => {},
  categories: propCategories,
  onSubmit,
}) => {
  const [name, setName] = useState(initialValues.name);
  const [currency, setCurrency] = useState<SelectOption | null>(
    initialValues.currency
  );
  const [category, setCategory] = useState<SelectOption | null>(
    initialValues.category
  );
  const [amountMin, setAmountMin] = useState<number | null>(
    initialValues.amountMin
  );
  const [amountMax, setAmountMax] = useState<number | null>(
    initialValues.amountMax
  );
  const currencies = [
    { value: "all", label: "All currencies" },
    ...map(currenciesData, ({ code, name, symbol }) => ({
      value: code,
      label: `${name}, (${symbol})`,
    })),
  ];
  const categories = useMemo(
    () => [
      { value: "all", label: "All categories" },
      ...map(propCategories, ({ id, name }) => ({ value: id, label: name })),
    ],
    [propCategories]
  );

  const handleSubmit = () => {
    const query: FilterQuery = {};

    if (!isEmpty(name)) query.name = name;
    if (!isEmpty(currency?.value) && currency?.value !== "all") {
      query.currencyCode = currency?.value as string;
    }
    if (!isEmpty(category?.value) && category?.value !== "all") {
      query.categoryId = category?.value as string;
    }
    if (!isNil(amountMin) && amountMin > 0) query.amountMin = amountMin;
    if (!isNil(amountMax) && amountMax > 0) query.amountMax = amountMax;

    onSubmit(query);
    onClose();
  };

  const handleClearFilters = () => {
    setName(initialValues.name);
    setCurrency(initialValues.currency);
    setCategory(initialValues.category);
    setAmountMin(initialValues.amountMin);
    setAmountMax(initialValues.amountMax);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Filters"
      actionsNode={
        <>
          <Button onClick={handleSubmit}>Filter</Button>
          <Button onClick={handleClearFilters} color="default">
            Clear filters
          </Button>
        </>
      }
    >
      <Box mb={3}>
        <TextField
          label="Name"
          placeholder="Name"
          value={name}
          fullWidth
          onChange={e => setName(e.target?.value as string)}
        />
      </Box>
      <Box mb={3}>
        <Select
          label="Currency"
          options={currencies}
          value={currency?.value ?? ""}
          onChange={option => setCurrency(option as SelectOption)}
        />
      </Box>
      <Box mb={3}>
        <Select
          label="Category"
          options={categories}
          value={category?.value ?? ""}
          onChange={option => setCategory(option as SelectOption)}
        />
      </Box>
      <Box mb={3}>
        <TextField
          label="From"
          type="number"
          placeholder="From amount"
          value={amountMin ?? ""}
          fullWidth
          onChange={e => setAmountMin(Number(e.target?.value))}
        />
      </Box>
      <Box mb={3}>
        <TextField
          label="To"
          type="number"
          placeholder="To amount"
          value={amountMax ?? ""}
          fullWidth
          onChange={e => setAmountMax(Number(e.target?.value))}
        />
      </Box>
    </Dialog>
  );
};

export default FiltersDialog;
