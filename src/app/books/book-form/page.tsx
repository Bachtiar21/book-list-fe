"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Menghindari reload halaman

    // Tampilkan dialog konfirmasi dengan SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!'
    }).then((result) => {
      if (result.isConfirmed) {
        submitData();
      }
    });
  };

  const submitData = async () => {
    try {
      const response = await axios.post('https://q74p3160-8082.asse.devtunnels.ms/books/', { title, author });
      // Berhasil menambahkan buku
      Swal.fire(
        'Submitted!',
        'Your book has been added.',
        'success'
      );
      // Opsional: Reload halaman
      window.location.reload();
    } catch (error) {
      console.error('Error adding book:', error);
      Swal.fire(
        'Failed!',
        'Failed to add the book. Please try again.',
        'error'
      );
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Book" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Add Book Form</h3>
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
                  Submit Book
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