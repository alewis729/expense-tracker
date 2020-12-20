import React from "react";

import { withAuth } from "@/hocs";
import { DefaultLayout } from "@/layouts";
import { Header } from "@/containers";
import { Link } from "@/components";

const ErrorPage: React.FC = () => {
  return (
    <DefaultLayout header={<Header />}>
      Oops, nothing to see here, go <Link href="/">back to safety.</Link>
    </DefaultLayout>
  );
};

export default withAuth(ErrorPage);
