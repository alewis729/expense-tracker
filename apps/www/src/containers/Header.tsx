import React from "react";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";

import { isLoggedInVar } from "@/lib/graphql/cache";
import { Header as HeaderComponent } from "@/components";

const Header: React.FC = () => {
  const router = useRouter();
  const client = useApolloClient();

  const handleSignOut = () => {
    client.cache.evict({ fieldName: "me" });
    client.cache.gc();
    localStorage.clear();
    isLoggedInVar(false);
    router.push("/signin");
  };

  return <HeaderComponent onSignout={handleSignOut} />;
};

export default Header;
