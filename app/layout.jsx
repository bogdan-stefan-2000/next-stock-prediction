import "@styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Stock Prediction",
  description: "Stock Prediction App Demo",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main"></div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
