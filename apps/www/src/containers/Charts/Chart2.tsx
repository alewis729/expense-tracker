import React, { useState, useMemo, useEffect } from "react";
import { find, isEmpty, isNil, map } from "lodash";
import { Doughnut } from "@reactchartjs/react-chart.js";
import { Box, Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Select } from "@/components";
import { currencies as currenciesData } from "@expense-tracker/data";

import { getMonthName } from "@/lib/utils";
import { SelectOption, Timeline, ChartPayment } from "@/lib/types";

interface Props {
  title?: string;
  payments: ChartPayment[];
  timeline?: Timeline[];
}

const Chart: React.FC<Props> = ({
  title = "Expenses per month",
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
  const [month, setMonth] = useState<SelectOption | null>(months?.[0]);
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
  const chartData = useMemo(() => {
    const payment = find(
      find(payments, obj => obj.year === year)?.payments,
      ({ currencyCode }) => currencyCode === currency?.value
    );
    const categories = payment?.categories ?? [];
    const monthIndex = (month?.value ?? months?.[0]?.value) as number;

    const obj = payment?.categories.reduce(
      (obj, category) => {
        if (
          ["All categories"].includes(category?.name) ||
          category?.amounts?.[monthIndex] <= 0
        ) {
          return obj;
        }

        const newObj = obj;
        newObj.labels.push(category?.name);
        newObj.data.push(category?.amounts?.[monthIndex]);

        return newObj;
      },
      { labels: [], data: [] } as { labels: string[]; data: number[] }
    );

    return {
      labels: obj?.labels ?? [],
      datasets: [
        {
          label: `Expenses (${currency?.value ?? "USD"})`,
          data: obj?.data ?? [],
          backgroundColor: map(categories, () => theme.palette.primary.dark),
          borderColor: map(categories, () => theme.palette.primary.light),
          borderWidth: 2,
        },
      ],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, months, currency, payments]);

  useEffect(() => {
    if (!isEmpty(years)) {
      setYear(lastYearValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [years]);

  useEffect(() => {
    if (!isEmpty(months)) {
      setMonth(months[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [months]);

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
          <Grid item xs={4}>
            <Select
              label="Year"
              options={years}
              value={year}
              onChange={({ value }) => setYear(value as number)}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              label="Month"
              options={months}
              value={month?.value ?? ""}
              disabled={isNil(year)}
              onChange={option => setMonth(option as SelectOption)}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              label="Currency"
              options={currencies}
              value={currency?.value ?? ""}
              disabled={isNil(month)}
              onChange={option => setCurrency(option as SelectOption)}
            />
          </Grid>
        </Grid>
      </Box>
      <Doughnut type="doughnut" data={chartData} />
    </div>
  );
};

export default Chart;
