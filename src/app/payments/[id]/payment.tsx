"use client";
import { useParams } from "next/navigation";

const Payment = () => {
  const params = useParams();
  return (
    <section className="relative py-16 bg-gray-300">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
          <div className="mx-auto px-10 py-10">
            {/* Transactions Detail */}
            {/* component */}
            <div className="flex-wrap md:flex mx-auto">
              <div className="mx-3 px-5 py-5">
                <img
                  className="mx-auto mt-12 h-52 w-52 rounded-lg border p-2 md:mt-0"
                  src="https://i.imgur.com/FQS7fFC.png"
                  alt="step"
                />
                <div>
                  <h1 className="font-laonoto mt-4 text-center text-xl font-bold">
                    BANK CENTRAL ASIA
                  </h1>
                  <p className="mt-2 text-center font-semibold text-gray-600">
                    FIRMAN PERDANA
                  </p>
                  <p className="mt-1 text-center font-medium text-red-500">
                    040-12-00-01166166-001
                  </p>
                </div>
                {/* component */}
                <div className="mx-auto w-52">
                  <div className="m-4">
                    <div className="flex w-full items-center justify-center">
                      <label className="flex h-14 w-full cursor-pointer flex-col border-4 border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-100">
                        <div className="mt-4 flex items-center justify-center space-x-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6 text-gray-400"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                            />
                          </svg>
                          <p className="font-laonoto text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Payment Slip
                          </p>
                        </div>
                        <input type="file" className="opacity-0" />
                      </label>
                    </div>
                  </div>
                </div>
                <button className="mx-auto block rounded-md border bg-blue-500 px-6 py-2 text-white outline-none">
                  Upload
                </button>
              </div>
              {/* Step Checkout */}
              <div className="mt-8 max-w-sm md:mt-0 md:ml-10 md:w-2/3">
                <div className="relative flex pb-12">
                  <div className="absolute inset-0 flex h-full w-10 items-center justify-center">
                    <div className="pointer-events-none h-full w-1 bg-gray-200" />
                  </div>
                  <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">
                      STEP 1
                    </h2>
                    <p className="font-laonoto leading-relaxed">
                      Scan the QR Code <br />
                      <b>With Your </b> Favorite Banking App.
                    </p>
                  </div>
                </div>
                <div className="relative flex pb-12">
                  <div className="absolute inset-0 flex h-full w-10 items-center justify-center">
                    <div className="pointer-events-none h-full w-1 bg-gray-200" />
                  </div>
                  <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">
                      STEP 2
                    </h2>
                    <p className="font-laonoto leading-relaxed">
                      Input the ammount based on
                      <b> Total Payment</b>.
                    </p>
                  </div>
                </div>
                <div className="relative flex pb-12">
                  <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle cx={12} cy={5} r={3} />
                      <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3" />
                    </svg>
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">
                      STEP 3
                    </h2>
                    <p className="font-laonoto leading-relaxed">
                      Upload the <b>Payment Slip</b> and waiting for the admin
                      to confirm the payment.
                      <span>
                        {" "}
                        <b>Payments</b>
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* End Transactions Detail */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
