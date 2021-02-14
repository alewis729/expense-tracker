import React from "react";

import { withAuth } from "@/hocs";
import { DefaultLayout } from "@/layouts";
import { Header } from "@/containers";

const Income: React.FC = () => {
  return <DefaultLayout header={<Header />}></DefaultLayout>;
};

export default withAuth(Income);
