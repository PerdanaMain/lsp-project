import Sidebar from "../../../components/admin/Sidebar";
import Navbar from "../../../components/admin/Navbar";
import Add from "./add";

const Page = () => {
  return (
    <div>
      <Sidebar />

      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
        <Navbar />

        <div className="py-10 px-10">
          <Add />
          <table className="table w-full ">
            <thead>
              <tr>
                <th>No</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th className="tag-center">Actions</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Page;
