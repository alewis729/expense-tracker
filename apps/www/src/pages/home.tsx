import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CHART_DATA } from "@expense-tracker/graphql";
import { useSnackbar } from "notistack";
import { Box, Grid } from "@material-ui/core";

import { withAuth } from "@/hocs";
import { DefaultLayout } from "@/layouts";
import { Header } from "@/containers";
import { ErrorMessage } from "@/components";
import { Chart1, Chart2, Chart3 } from "@/containers/Charts";

const Home: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error } = useQuery(GET_CHART_DATA, {
    variables: { withExpenses: true, withIncomes: true },
    onError: error => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  return (
    <DefaultLayout
      header={<Header />}
      loading={loading}
      hideWhileLoading
      errorNode={error ? <ErrorMessage /> : null}
    >
      <Box mb={8}>
        <Chart1
          expenses={data?.chartData?.expenses}
          incomes={data?.chartData?.incomes}
          timeline={data?.chartData?.timeline}
        />
      </Box>
      <Box mb={8}>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={6}>
            <Chart2
              payments={data?.chartData?.expenses}
              timeline={data?.chartData?.timeline}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Chart2
              title="Income per month"
              payments={data?.chartData?.incomes}
              timeline={data?.chartData?.timeline}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mb={8}>
        <Chart3
          payments={data?.chartData?.expenses}
          timeline={data?.chartData?.timeline}
        />
      </Box>
      <Box mb={8}>
        <Chart3
          title="Overall income"
          payments={data?.chartData?.incomes}
          timeline={data?.chartData?.timeline}
        />
      </Box>
    </DefaultLayout>
  );
};

export default withAuth(Home);
