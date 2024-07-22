import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import BookList from "@/components/BookList/BookList";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Book List",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />
      <div className="flex flex-col gap-10">
        <BookList />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
