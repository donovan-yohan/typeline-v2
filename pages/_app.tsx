import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { AppProps } from "next/app";
import { getCookie, setCookies } from "cookies-next";
import Head from "next/head";
import { MantineProvider, ColorScheme, ColorSchemeProvider, Global } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { DefaultTheme } from "../styles/themes";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookies("mantine-color-scheme", nextColorScheme);
  };

  return (
    <>
      <Head>
        <title>typeline Typing Test</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <Global
          styles={[
            {
              "@font-face": {
                fontFamily: "Comfortaa",
                src: `url('/fonts/Comfortaa-Regular.ttf')`,
              },
            },
            {
              "@font-face": {
                fontFamily: "Nunito",
                src: `url('/fonts/Nunito-Regular.ttf')`,
              },
            },
            {
              "@font-face": {
                fontFamily: "Nunito",
                src: `url('/fonts/Nunito-ExtraBold.ttf')`,
                fontWeight: "bold",
              },
            },
          ]}
        />
        <MantineProvider
          theme={{
            ...DefaultTheme,
            colorScheme,
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
