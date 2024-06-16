"use client";
import { store } from "@/context";
import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider as ApplicationProvider } from "@/context/applicationContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang='en'>
          <script async src='https://platform.twitter.com/widgets.js' charSet='utf-8'></script>
          <Provider store={store}>
              <ApplicationProvider>
                  <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
                      <body suppressHydrationWarning className={inter.className}>
                          <SnackbarProvider>{children}</SnackbarProvider>
                      </body>
                  </GoogleOAuthProvider>
              </ApplicationProvider>
          </Provider>
      </html>
  );
}
