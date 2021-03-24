import React, { useState, useMemo, useEffect } from "react";
import { find, isEmpty, isNil, map } from "lodash";
import { Pie } from "@reactchartjs/react-chart.js";
import { Box, Grid, Typography } from "@material-ui/core";
import { Select } from "@/components";
import { currencies as currenciesData } from "@expense-tracker/data";
import { colors } from "@expense-tracker/data";

import { getMonthName } from "@/lib/utils";
import { SelectOption, Timeline, ChartPayment } from "@/lib/types";

interface CategoryChartInfo {
  labels: string[];
  data: number[];
  backgroundColor: string[];
}
interface Props {
  title?: string;
  payments: ChartPayment[];
  timeline?: Timeline[];
}

const getHex = (id: string | null): string =>
  find(colors, color => color.id === id)?.hex ?? colors[0].hex;

const Chart: React.FC<Props> = ({
  title = "Expenses per month",
  payments,
  timeline,
}) => {
  const years = useMemo(
    () => map(timeline, obj => ({ value: obj?.year, label: obj?.year })),
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
    [timeline, year]
  );
  const [month, setMonth] = useState<SelectOption | null>(months?.[0]);
  const currencies = useMemo(() => {
    const currencies = find(payments, obj => obj.year === year)?.payments ?? [];

    return map(currencies, ({ currencyCode }) => {
      const currency =
        find(currenciesData, ({ code }) => code === currencyCode) ??
        currenciesData[0];

      return {
        value: currency?.code,
        label: `${currency?.name} (${currency?.symbol})`,
      };
    });
  }, [year, payments]);
  const [currency, setCurrency] = useState<SelectOption | null>(null);
  const chartData = useMemo(() => {
    const payment = find(
      find(payments, obj => obj.year === year)?.payments,
      ({ currencyCode }) => currencyCode === currency?.value
    );
    const monthIndex = (month?.value ?? months?.[0]?.value) as number;

    const info = payment?.categories?.reduce(
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
        newObj.backgroundColor.push(getHex(category?.color));

        return newObj;
      },
      { labels: [], data: [], backgroundColor: [] } as CategoryChartInfo
    );

    return {
      labels: info?.labels ?? [],
      datasets: [
        {
          label: `Expenses (${currency?.value ?? "USD"})`,
          data: info?.data ?? [],
          backgroundColor: info?.backgroundColor ?? [],
          borderColor: map(payment?.categories, () => "#fff") ?? [],
          borderWidth: 2,
        },
      ],
    };
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
  }, [months]);

  useEffect(() => {
    if (!isEmpty(currencies)) {
      setCurrency(currencies[0]);
    }
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
      <Pie type="pie" data={chartData} />
    </div>
  );
};

export default Chart;
