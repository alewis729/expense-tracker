import React from "react";
import { useRouter } from "next/router";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { Link as MuiLink } from "@material-ui/core";
import clsx from "clsx";

const NextComposed = React.forwardRef<HTMLAnchorElement, NextLinkProps>(
  function NextComposed(props, ref) {
    const { as, href, ...other } = props;

    return (
      <NextLink href={href} as={as}>
        <a ref={ref} {...other} />
      </NextLink>
    );
  }
);

interface Props {
  activeClassName?: string;
  className?: string;
  href?: NextLinkProps["href"];
}

const Link: React.FC<Props> = props => {
  const {
    href,
    activeClassName = "active",
    className: classNameFromProps,
    ...other
  } = props;
  const router = useRouter();
  const pathname = typeof href === "string" ? href : href?.pathname;
  const className = clsx(classNameFromProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      href={href as string}
      {...other}
    />
  );
};

export default Link;
