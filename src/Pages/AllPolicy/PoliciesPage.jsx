import React, { useState, useEffect } from "react";

import UsePaginationHook from "./UsePagination";
import PolicyCard from "../../Components/Policiessection/PoliciessCard/PolicyCard";
import {Input,Pagination,Select,SectionHeader,Container} from '@/CustomComponents/index'
import { useDebounce } from "use-debounce";
const PoliciesPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(""); // ✅ sort state
  const limit = 6;

   const debouncedSearch=useDebounce(searchInput,1000)

  const { data, isLoading, isError, error, isFetching } = UsePaginationHook(
    page,
    limit,
    debouncedSearch,
    category,
    sort 
  );

  const totalPages = data ? Math.ceil(data.totalCount / limit) : 1;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, sort]);

  return (
   <Container>
    {/* header */}
          <SectionHeader className="my-8" title='Our Insurance Plans' subtitle='Find the perfect coverage for your needs with our flexible insurance options.'/>

      {/* Filters */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        
        {/* Search Input */}
        <div className="w-full md:w-1/3">
          <Input placeholder='Search By Title' onChange={(e) => setSearchInput(e.target.value)}  value={searchInput} label={'Title'}/>
          </div>

        {/* custom category  */}
        <div className="w-full md:w-1/3">
         <Select  
         value={category}
            onChange={(e) => setCategory(e.target.value)} placeholder={'All Category'}  options={data?.categories} label='Category'/>
        </div>

        {/*custom Sort Filter */}
        <div className="w-full md:w-1/3">
         
  <Select value={sort} label='Sort By' options={['price-asc','price-desc']} onChange={(e) => setSort(e.target.value)} placeholder='Newest First'/>

        </div>

      </div>

      {/* Results */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>

      ) : isError ? (
        <p className="text-red-600 text-center">{error.message}</p>
      ) : data?.result?.length === 0 ? (
        <p className="text-center text-gray-600">No policies found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.result?.map((policy) => (
              <PolicyCard baserate={true} key={policy._id} policy={policy} />
            ))}
          </div>

          {/* Pagination */}
        
<Pagination page={page} setPage={setPage} totalPages={totalPages} />
          {isFetching && !isLoading && (
            <p className="text-center mt-4 text-sm text-gray-500">
              Loading next page...
            </p>
          )}
        </>
      )}
    </Container>
  );
};

export default PoliciesPage;
