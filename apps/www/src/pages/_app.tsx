import React, { useEffect } from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { SnackbarProvider } from "notistack";
import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";

import type { AppProps } from "next/app";

import { theme } from "@/lib/theme";
import { withApollo } from "@/hocs";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Expense tracker</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <SnackbarProvider
            maxSnack={3}
            preventDuplicate
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <ModalProvider rootComponent={TransitionGroup}>
              <Component {...pageProps} />
            </ModalProvider>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </>
  );
};

export default withApollo(App);
