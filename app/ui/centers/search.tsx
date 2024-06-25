"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useContext, useState } from "react";

type SearchProps = {
  placeholder: string;
  page: string;
  onSearch: (query: string) => void;
};

export default function Search({ placeholder, page, onSearch }: SearchProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  let contentComponent = null;

  return (
    <form className="relative flex flex-1 flex-shrink-0 gap-x-4">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-outline-medium dark:border-outline-medium-dark dark:bg-surface-extra-light-dark py-[9px] pl-10 text-sm outline-2 placeholder:on-light focus:outline-none focus:border-primary-primary dark:focus:border-primary-primary"
        placeholder={placeholder}
        onChange={handleSearchChange}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-outline-medium dark:text-on-surface-dark" />
      <Link
        href="/centers/create"
        className="text-white dark:text-primary-light-dark text-sm font-bold text-nowrap border-1 bg-primary-primary dark:bg-primary-primary-dark px-8 py-1 rounded-xl"
      >
        Create New
      </Link>
    </form>
  );
}
