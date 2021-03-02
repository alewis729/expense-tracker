import React, { useState, useMemo, useEffect } from "react";
import { isEmpty, isNil, map, find } from "lodash";
import { Line } from "@reactchartjs/react-chart.js";
import { Box, Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Select } from "@/components";
import { currencies as currenciesData } from "@expense-tracker/data";

import { getMonthName } from "@/lib/utils";
import { SelectOption, Timeline, ChartPayment } from "@/lib/types";

interface CategoryOption extends SelectOption {
  id: string;
}

interface Props {
  title?: string;
  payments: ChartPayment[];
  timeline?: Timeline[];
}

const chartOptions = { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } };

const Chart: React.FC<Props> = ({
  title = "Overall expenses",
  payments,
  timeline,
}) => {
  const theme = useTheme();
  const years = useMemo(
    () => map(timeline, obj => ({ value: obj?.year, label: obj?.year })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timeline]
  );
  const lastYearValue = years?.[(years?.length ?? 1) - 1]?.value;
  const [year, setYear] = useState<number | null>(lastYearValue ?? null);
  const months = useMemo(
    () =>
      map(find(timeline, obj => obj.year === year)?.months, index => ({
        value: index,
        label: getMonthName({ index }),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timeline, year]
  );
  const currencies = useMemo(
    () => {
      const currencies =
        find(payments, obj => obj.year === year)?.payments ?? [];

      return map(currencies, ({ currencyCode }) => {
        const currency =
          find(currenciesData, ({ code }) => code === currencyCode) ??
          currenciesData[0];

        return {
          value: currency?.code,
          label: `${currency?.name} (${currency?.symbol})`,
        };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [year, payments]
  );
  const [currency, setCurrency] = useState<SelectOption | null>(null);
  const categories = useMemo(() => {
    const currentPayment = find(payments, obj => obj.year === year);
    const currentExpense = find(
      currentPayment?.payments,
      ({ currencyCode }) => currencyCode === currency?.value
    );

    return map(currentExpense?.categories, ({ id, name }) => ({
      id,
      value: id,
      label: name,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, currency, payments]);
  const [category, setCategory] = useState<CategoryOption | null>(null);
  const chartData = useMemo(() => {
    const monthAbrevs = map(months, ({ value: index }) =>
      getMonthName({ index, abrev: true })
    );
    const payment = find(
      find(payments, obj => obj.year === year)?.payments,
      ({ currencyCode }) => currencyCode === currency?.value
    );

    return {
      labels: monthAbrevs,
      datasets: [
        {
          label: `Expenses (${currency?.value ?? "USD"})`,
          data: find(payment?.categories, ({ id }) => id === category?.id)
            ?.amounts,
          fill: false,
          backgroundColor: theme.palette.error.dark,
          borderColor: theme.palette.error.light,
        },
      ],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, months, currency, category, payments]);

  useEffect(() => {
    if (!isEmpty(years)) {
      setYear(lastYearValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [years]);

  useEffect(() => {
    if (!isEmpty(currencies)) {
      setCurrency(currencies[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies]);

  useEffect(() => {
    if (!isEmpty(categories)) {
      setCategory(categories[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  return (
    <div>
      {!isEmpty(title) && (
        <Box mb={3} textAlign="center">
          <Typography variant="h4">{title}</Typography>
        </Box>
      )}
      <Box mb={3}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={3} lg={2}>
            <Select
              label="Year"
              options={years}
              value={year}
              onChange={({ value }) => setYear(value as number)}
            />
          </Grid>
          <Grid item xs={3} lg={2}>
            <Select
              label="Currency"
              options={currencies}
              value={currency?.value ?? ""}
              disabled={isNil(year)}
              onChange={option => setCurrency(option as SelectOption)}
            />
          </Grid>
          <Grid item xs={3} lg={2}>
            <Select
              label="Category"
              options={categories}
              value={category?.value ?? ""}
              disabled={isNil(currency)}
              onChange={option => setCategory(option as CategoryOption)}
            />
          </Grid>
        </Grid>
      </Box>
      <Line type="line" data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
