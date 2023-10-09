import Sidebar from "../../../components/admin/Sidebar";
import Navbar from "../../../components/admin/Navbar";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getCategories = async () => {
  const categories = await prisma.categories.findMany();
  return categories;
};

const getProduct = async () => {
  const products = await prisma.products.findMany({
    include: {
      categorie: true,
    },
  });
  return products;
};
const Page = async () => {
  const [products, categories] = await Promise.all([
    getProduct(),
    getCategories(),
  ]);

  return (
    <div>
      <Sidebar />

      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
        <Navbar />

        <div className="py-10 px-10">
          <Add categories={categories} />
          <table className="table w-full ">
            <thead>
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th className="tag-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.product_id}>
                  <td>{index + 1}</td>
                  <td>{product.product_name}</td>
                  <td>Rp. {product.product_price.toLocaleString()}</td>
                  <td>{product.product_stock}</td>
                  <td>{product.categorie.category_name}</td>
                  <td className="flex">
                    <Edit product={product} categories={categories} />
                    <Delete product={product} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Page;
