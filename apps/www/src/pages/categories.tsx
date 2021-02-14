import React from "react";

import { withAuth } from "@/hocs";
import { DefaultLayout } from "@/layouts";
import { Header } from "@/containers";

const Categories: React.FC = () => {
  return <DefaultLayout header={<Header />}></DefaultLayout>;
};

export default withAuth(Categories);
