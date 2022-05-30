import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { AppProps } from "next/app";
import { getCookie, setCookies } from "cookies-next";
import Head from "next/head";
import { MantineProvider, ColorScheme, ColorSchemeProvider, Global } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

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
        <title>Mantine next example</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <link rel='shortcut icon' href='/favicon.svg' />
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
                src: `url('/fonts/Comfortaa-Regular.ttf')`
              }
            },
            {
              "@font-face": {
                fontFamily: "Nunito",
                src: `url('/fonts/Nunito-Regular.ttf')`
              }
            },
            {
              "@font-face": {
                fontFamily: "Nunito",
                src: `url('/fonts/Nunito-ExtraBold.ttf')`,
                fontWeight: "bold"
              }
            }
          ]}
        />
        <MantineProvider
          theme={{
            colorScheme,
            colors: {
              dark: [
                "#dedee4",
                "#b6b8bc",
                "#909296",
                "#5C5F66",
                "#373A40",
                "#2C2E33",
                "#25262B",
                "#101113",
                "#101113",
                "#101113"
              ]
            },
            fontFamily: "Nunito",
            headings: { fontFamily: "Nunito" },
            primaryColor: "teal",
            primaryShade: { light: 7, dark: 5 },
            other: {
              errorColor: "orange",
              highlightAnimation: "all 0.25s cubic-bezier(0.33, 0, 0, 1)"
            }
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
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light"
});
