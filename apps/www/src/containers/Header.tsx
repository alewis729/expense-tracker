import React, { useState } from "react";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { useModal } from "react-modal-hook";

import { isLoggedInVar } from "@/lib/graphql/cache";
import { Header as HeaderComponent, Navigation } from "@/components";

const Header: React.FC = () => {
  const router = useRouter();
  const client = useApolloClient();
  const [openNavigation, setOpenNavigation] = useState(false);

  const handleShowNavigation = () => {
    if (openNavigation) hideNavigation();
    else showNavigation();
    setOpenNavigation(!openNavigation);
  };

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const handleClose = () => {
    setOpenNavigation(false);
    hideNavigation();
  };

  const handleSignOut = () => {
    client.cache.evict({ fieldName: "me" });
    client.cache.evict({ fieldName: "chartData" });
    client.cache.evict({ fieldName: "categories" });
    client.cache.gc();
    localStorage.clear();
    isLoggedInVar(false);
    router.push("/signin");
  };

  const [showNavigation, hideNavigation] = useModal(({ in: open }) => (
    <Navigation
      open={open}
      onNavigate={handleNavigation}
      onClose={handleClose}
    />
  ));

  return (
    <HeaderComponent
      onOpenNavigation={handleShowNavigation}
      onSignout={handleSignOut}
    />
  );
};

export default Header;
