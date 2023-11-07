import Sidebar from "../../../components/admin/Sidebar";
import Navbar from "../../../components/admin/Navbar";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getRoles = async () => {
  const roles = await prisma.roles.findMany();
  return roles;
};

const getUsers = async () => {
  const users = await prisma.users.findMany({
    include: {
      role: true,
    },
  });
  return users;
};
const Page = async () => {
  const [users, roles] = await Promise.all([getUsers(), getRoles()]);

  return (
    <div>
      <Sidebar />

      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
        <Navbar />

        <div className="py-10 px-10">
          <Add roles={roles} />
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
            {users.length !== 0 ? (
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.user_id}>
                    <td>{index + 1}</td>
                    <td>{user.user_name}</td>
                    <td>{user.user_phone}</td>
                    <td>{user.user_address}</td>
                    <td>{user.user_email}</td>
                    <td className="flex">
                      <Edit user={user} roles={roles} />
                      <Delete user={user} />
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <div>
                <span className="loading loading-spinner loading-xs mr-2"></span>
                Loading...
              </div>
            )}
          </table>
        </div>
      </main>
    </div>
  );
};

export default Page;
