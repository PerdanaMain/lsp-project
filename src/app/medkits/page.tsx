import { PrismaClient } from "@prisma/client";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import BuyHandler from "../../components/BuyHandler";
import Image from "next/image";

const prisma = new PrismaClient();

const getProduct = async () => {
  const products = await prisma.products.findMany({
    include: {
      categorie: true,
    },
  });

  return products;
};

const Page = async () => {
  const [products] = await Promise.all([getProduct()]);

  return (
    <div>
      <Navbar />
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1631248055158-edec7a3c072b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1461&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                {/* Products Loop */}
                <div className="flex flex-wrap">
                  {products.map((product, index) => (
                    <div
                      className="card w-96 bg-base-100 shadow-xl mr-3 mt-3 mb-3"
                      key={index}
                    >
                      <figure>
                        <Image
                          src="https://images.unsplash.com/photo-1582883040775-f98dd8c04597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                          alt="Shoes"
                          width={500}
                          height={500}
                          style={{
                            width: "400px",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      </figure>

                      <div className="card-body">
                        <h2 className="card-title">{product.product_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>

                        <div className="card-actions justify-start mt-4">
                          <div className="flex">
                            <BuyHandler products={product} />
                            <div className="badge badge-success ms-3 px-5 py-5">
                              Rp. {product.product_price.toLocaleString()}
                            </div>
                            <div className="badge badge-outline ms-2 px-5 py-5">
                              {product.categorie.category_name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* EndProducts Loop */}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
