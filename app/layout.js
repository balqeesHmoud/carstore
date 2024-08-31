'use client';
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeWrapper from "./context/theme";
import AuthWrapper from "./context/auth";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeWrapper>
          <AuthWrapper>
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthWrapper>
        </ThemeWrapper>
      </body>
    </html>
  );
}