import { CreateButton } from "@/components/Button";
import Search from "@/components/Search";
import Table from "@/components/Table";

const ContactPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        {/* <h1>ContactPage Page</h1> */}
        <Search />
        <CreateButton />
      </div>
      <Table query={query} currentPage={currentPage} />
    </div>
  );
};

export default ContactPage;
