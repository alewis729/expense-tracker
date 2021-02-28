import React, { useState, useMemo, useEffect } from "react";
import { isEmpty, isNil, map, find } from "lodash";
import { Bar } from "@reactchartjs/react-chart.js";
import { Box, Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Select } from "@/components";
import { currencies as currenciesData } from "@expense-tracker/data";

import { getMonthName } from "@/lib/utils";

interface Currency {
  value: string;
  label: string;
}

interface Timeline {
  year: number;
  months: number[];
}

interface PaymentPerYear extends Timeline {
  payments: {
    currencyCode: string;
    categories: {
      label: string;
      amounts: number[];
    }[];
  }[];
}

interface Props {
  title?: string;
  expensesPerYear: PaymentPerYear[];
  incomesPerYear: PaymentPerYear[];
  timeline?: Timeline[];
}

const chartOptions = { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } };

const Chart1: React.FC<Props> = ({
  title = "Overall expenses vs income",
  expensesPerYear,
  incomesPerYear,
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
      const expensePayments =
        find(expensesPerYear, obj => obj.year === year)?.payments ?? [];
      const incomePayments =
        find(incomesPerYear, obj => obj.year === year)?.payments ?? [];

      return map(
        [...expensePayments, ...incomePayments],
        ({ currencyCode }) => {
          const currency =
            find(currenciesData, ({ code }) => code === currencyCode) ??
            currenciesData[0];

          return {
            value: currency?.code,
            label: `${currency?.name} (${currency?.symbol})`,
          };
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [year, expensesPerYear, incomesPerYear]
  );
  const [currency, setCurrency] = useState<Currency | null>(null);
  const chartData = useMemo(() => {
    const monthAbrevs = map(months, ({ value: index }) =>
      getMonthName({ index, abrev: true })
    );
    const expense = find(
      find(expensesPerYear, obj => obj.year === year)?.payments,
      ({ currencyCode }) => currencyCode === currency?.value
    );
    const income = find(
      find(incomesPerYear, obj => obj.year === year)?.payments,
      ({ currencyCode }) => currencyCode === currency?.value
    );

    return {
      labels: monthAbrevs,
      datasets: [
        {
          label: `Expenses (${currency?.value ?? "USD"})`,
          data: expense?.categories?.[0]?.amounts, // All categories
          fill: false,
          backgroundColor: theme.palette.error.main,
        },
        {
          label: `Income (${currency?.value ?? "USD"})`,
          data: income?.categories?.[0]?.amounts, // All categories
          fill: false,
          backgroundColor: theme.palette.success.main,
        },
      ],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, months, currency, expensesPerYear, incomesPerYear]);

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
              onChange={newCurrency => setCurrency(newCurrency as Currency)}
            />
          </Grid>
        </Grid>
      </Box>
      <Bar type="bar" data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart1;
