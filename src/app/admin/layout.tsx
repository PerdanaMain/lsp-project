import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// nucleo css and icons
import "../../assets/css/nucleo-icons.css";
import "../../assets/css/nucleo-svg.css";

// main css
import "../../assets/css/soft-ui-dashboard-tailwind.css?v=1.0.5";

export const metadata: Metadata = {
  title: "Admin | Medical Store",
};

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        {/* <!-- Font Awesome Icons --> */}
        <Script src="https://kit.fontawesome.com/42d5adcbca.js"></Script>

        {/* <!-- Popper --> */}
        <Script src="https://unpkg.com/@popperjs/core@2"></Script>

        {/* <!-- Nepcha Analytics (nepcha.com) Nepcha is a easy-to-use web analytics. No cookies and fully compliant with GDPR, CCPA and PECR.  */}
        <Script
          src="https://api.nepcha.com/js/nepcha-analytics.js"
          defer
        ></Script>
      </head>

      <body className={inter.className}>{children}</body>
      {/* <!-- plugin for charts  --> */}
      <Script src="../../assets/js/plugins/chartjs.min.js" async></Script>

      {/* <!-- plugin for scrollbar  --> */}
      <Script
        src="../../assets/js/plugins/perfect-scrollbar.min.js"
        async
      ></Script>

      {/* <!-- github button --> */}
      <Script src="https://buttons.github.io/buttons.js" async defer></Script>

      {/* <!-- main script file  --> */}
      <Script
        src="../../assets/js/soft-ui-dashboard-tailwind.js?v=1.0.5"
        async
      ></Script>
    </html>
  );
};

export default LayoutAdmin;
