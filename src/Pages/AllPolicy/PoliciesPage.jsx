import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import UsePaginationHook from "./UsePagination";
import PolicyCard from "../../Components/Policiessection/PoliciessCard/PolicyCard";

const PoliciesPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(""); // ✅ sort state
  const limit = 6;

  const [debouncedSearch] = useDebounce(searchInput, 400);

  const { data, isLoading, isError, error, isFetching } = UsePaginationHook(
    page,
    limit,
    debouncedSearch,
    category,
    sort // ✅ pass sort into hook
  );

  const totalPages = data ? Math.ceil(data.totalCount / limit) : 1;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, sort]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Our Insurance Plans
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find the perfect coverage for your needs with our flexible insurance options.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        
        {/* Search Input */}
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#ff8c00] focus:border-[#ff8c00]"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#ff8c00] focus:border-[#ff8c00]"
          >
            <option value="">All Categories</option>
            {data?.categories?.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#ff8c00] focus:border-[#ff8c00]"
          >
            <option value="">Newest First</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
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
          <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="px-3 py-1.5 border rounded-lg bg-white hover:bg-orange-50 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                className={`px-3 py-1.5 rounded-lg border ${
                  pg === page
                    ? "bg-[#ff8c00] text-white border-[#ff8c00]"
                    : "bg-white hover:bg-orange-50"
                }`}
              >
                {pg}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="px-3 py-1.5 border rounded-lg bg-white hover:bg-orange-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {isFetching && !isLoading && (
            <p className="text-center mt-4 text-sm text-gray-500">
              Loading next page...
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PoliciesPage;
