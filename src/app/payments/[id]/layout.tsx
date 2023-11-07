import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments | Medical Kits",
};

const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default PaymentLayout;
