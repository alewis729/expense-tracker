import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

const IconGoogle: React.FC<SvgIconProps> = props => (
  <SvgIcon {...props}>
    <clipPath id="a">
      <path d="m44.5 20h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
    </clipPath>
    <path clipPath="url(#a)" d="m0 37v-26l17 13z" fill="#fbbc05" />
    <path
      clipPath="url(#a)"
      d="m0 11 17 13 7-6.1 24-3.9v-14h-48z"
      fill="#ea4335"
    />
    <path
      clipPath="url(#a)"
      d="m0 37 30-23 7.9 1 10.1-15v48h-48z"
      fill="#34a853"
    />
    <path clipPath="url(#a)" d="m48 48-31-24-4-3 35-10z" fill="#4285f4" />
  </SvgIcon>
);

IconGoogle.defaultProps = {
  viewBox: "0 0 48 48",
};

export default IconGoogle;
