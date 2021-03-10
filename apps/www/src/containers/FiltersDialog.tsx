import React, { useState, useMemo } from "react";
import { isEmpty, isNil, map } from "lodash";
import { Box, TextField, Grid } from "@material-ui/core";
import { KeyboardDatePicker as DatePicker } from "@material-ui/pickers";
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
  dateFrom: null,
  dateTo: null,
};

const absoluteMinDate = new Date("1900-01-01");

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
  const [dateFrom, setDateFrom] = useState<Date | null>(initialValues.dateFrom);
  const [dateTo, setDateTo] = useState<Date | null>(initialValues.dateTo);

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
    if (!isNil(dateFrom)) query.dateFrom = new Date(dateFrom);
    if (!isNil(dateTo)) query.dateTo = dateTo;

    onSubmit(query);
    onClose();

    if (!isNil(dateFrom) && !isNil(dateTo) && dateFrom > dateTo) {
      setDateFrom(initialValues.dateFrom);
      setDateTo(initialValues.dateTo);
    }
  };

  const handleClearFilters = () => {
    setName(initialValues.name);
    setCurrency(initialValues.currency);
    setCategory(initialValues.category);
    setAmountMin(initialValues.amountMin);
    setAmountMax(initialValues.amountMax);
    setDateFrom(initialValues.dateFrom);
    setDateTo(initialValues.dateTo);
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
      <Box mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DatePicker
              autoOk
              variant="inline"
              format="MMM dd yyyy"
              inputVariant="outlined"
              style={{ width: "100%" }}
              label="From"
              value={dateFrom}
              maxDate={dateTo ?? new Date()}
              onChange={setDateFrom}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              autoOk
              variant="inline"
              format="MMM dd yyyy"
              inputVariant="outlined"
              style={{ width: "100%" }}
              label="Up to"
              value={dateTo}
              minDate={dateFrom ?? absoluteMinDate}
              maxDate={new Date()}
              onChange={setDateTo}
            />
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default FiltersDialog;
