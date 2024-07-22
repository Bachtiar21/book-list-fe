"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useSearchParams } from 'next/navigation';

const BookForm = () => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const searchParams = useSearchParams();
  const [booksId, setBooksId] = useState<string | null>(null);

  useEffect(() => {
    const books_id = searchParams.get('books_id');
    if (books_id) {
      setBooksId(books_id);
      fetchBookById(books_id);
    }
  }, [searchParams]);

  const fetchBookById = async (id: string) => {
    try {
      const response = await axios.get(`https://q74p3160-8082.asse.devtunnels.ms/books/${id}`);
      const { title, author } = response.data.Data;
      setTitle(title);
      setAuthor(author);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!booksId) return;

    try {
      const response = await axios.put(`https://q74p3160-8082.asse.devtunnels.ms/books/update/${booksId}`, {
        title,
        author,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Book updated successfully!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update book.',
        });
      }
    } catch (error) {
      console.error('Error updating book:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update book.',
      });
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Book" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Edit Book Form</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter book title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Author
                  </label>
                  <input
                    type="text"
                    placeholder="Enter author's name"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90">
                  Edit Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default BookForm;