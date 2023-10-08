import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import Card from "../../components/admin/Card";

const Page = () => {
  return (
    <div>
      <Sidebar />

      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
        <Navbar />

        <Card />
      </main>
    </div>
  );
};

export default Page;
