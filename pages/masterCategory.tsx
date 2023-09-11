import { Navbar } from "@/components/Navbar";
import React, { useRef, useEffect } from "react";
import axios from "axios";

type Props = {};

export default function MasterCategory({}: Props) {
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const values = {
      name: nameRef.current?.value,
      active: true,
      updated_user: "admin",
      updated_date: new Date(),
      created_user: "admin",
      created_date: new Date().valueOf(),
    };
    axios
      .post("/api/masterCategory", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("/api/masterCategory")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Master Category
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 className="">Masukkan Category</h2>

              <div>
                <form onSubmit={handleSubmit} className="">
                  <div className="p-2">
                    <label
                      htmlFor="Nama Categori"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Nama Categori
                    </label>
                    <div className="mt-2">
                      <input
                        ref={nameRef}
                        id="category"
                        name="category"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="p-2">
                    <label>
                      Status
                      <select name="selectedRole">
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </label>
                  </div>
                  <button>Isi kategori</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
