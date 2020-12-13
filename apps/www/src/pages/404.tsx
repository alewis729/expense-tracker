import React from "react";

import { withAuth } from "@/hocs";
import { DefaultLayout } from "@/layouts";
import { Header } from "@/containers";
import { Link } from "@/components";

const ErrorPage: React.FC = () => {
  return (
    <DefaultLayout header={<Header />}>
      Oops Nothing to see here, go <Link href="/expenses">back to safety.</Link>
    </DefaultLayout>
  );
};

export default withAuth(ErrorPage);
