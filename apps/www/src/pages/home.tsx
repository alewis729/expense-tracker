import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CHART_DATA } from "@expense-tracker/graphql";
import { useSnackbar } from "notistack";
import { Box } from "@material-ui/core";

import { withAuth } from "@/hocs";
import { DefaultLayout } from "@/layouts";
import { Header } from "@/containers";
import { Chart1, Chart4 } from "@/containers/Charts";

const Home: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error } = useQuery(GET_CHART_DATA, {
    variables: { expensesPerYear: true, incomesPerYear: true },
    onError: error => {
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  if (error) return <p>Something went wrong... Try refreshing the page</p>;

  return (
    <DefaultLayout header={<Header />} loading={loading} hideWhileLoading>
      <Box mb={8}>
        <Chart1
          expensesPerYear={data?.chartData?.expensesPerYear}
          incomesPerYear={data?.chartData?.incomesPerYear}
          timeline={data?.chartData?.timeline}
        />
      </Box>
      <Box mb={8}>
        <Chart4
          expensesPerYear={data?.chartData?.expensesPerYear}
          timeline={data?.chartData?.timeline}
        />
      </Box>
    </DefaultLayout>
  );
};

export default withAuth(Home);
