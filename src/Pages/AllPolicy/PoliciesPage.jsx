import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
 // Your existing card component

const PoliciesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  // Get current query parameters
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const currentPage = parseInt(searchParams.get('page')) || 1;

  // Fetch policies with TanStack Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['policies', { searchQuery, categoryFilter, currentPage }],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append('search', searchQuery);
      if (categoryFilter) queryParams.append('category', categoryFilter);
      queryParams.append('page', currentPage);

      const response = await fetch(`/api/policies?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch policies');
      return response.json();
    },
    keepPreviousData: true, // Smooth pagination transitions
  });

  // Handle search with debounce (better UX)
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    // Update URL after a small delay
    const timer = setTimeout(() => {
      setSearchParams(prev => {
        if (value) {
          prev.set('search', value);
        } else {
          prev.delete('search');
        }
        prev.set('page', '1');
        return prev;
      });
    }, 300);

    return () => clearTimeout(timer);
  };

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSearchParams(prev => {
      if (category) {
        prev.set('category', category);
      } else {
        prev.delete('category');
      }
      prev.set('page', '1');
      return prev;
    });
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setSearchParams(prev => {
      prev.set('page', newPage.toString());
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate total pages
  const policiesPerPage = 6;
  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / policiesPerPage) : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Our Insurance Plans</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find the perfect coverage for your needs with our flexible insurance options
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-end">
          <div className="w-full md:w-1/2">
            <label htmlFor="policy-search" className="block text-sm font-medium text-gray-700 mb-2">
              Search policies
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                id="policy-search"
                placeholder="Search by policy name or keywords..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#ff8c00] focus:border-[#ff8c00] outline-none transition-all duration-200"
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/3">
            <label htmlFor="policy-category" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by category
            </label>
            <select
              id="policy-category"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#ff8c00] focus:border-[#ff8c00] outline-none transition-all duration-200"
              value={categoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              {data?.categories?.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="mt-6 h-10 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading policies</h3>
              <div className="mt-2 text-sm text-red-700">
                {error.message}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success state */}
      {!isLoading && !isError && (
        <>
          {/* Results count */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{(currentPage - 1) * policiesPerPage + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(currentPage * policiesPerPage, data?.totalCount || 0)}
              </span>{' '}
              of <span className="font-medium">{data?.totalCount || 0}</span> policies
            </p>
          </div>

          {/* Policy grid */}
          {data?.policies?.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No policies found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data?.policies?.map(policy => (
               <PolicyCard key={policy._id} policy={policy} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="flex-1 flex justify-start">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-[#ff8c00]'
                  }`}
                >
                  Previous
                </button>
              </div>
              <div className="hidden md:flex">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? 'z-10 bg-[#ff8c00] border-[#ff8c00] text-white'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      } ${pageNum === 1 ? 'rounded-l-md' : ''} ${
                        pageNum === totalPages ? 'rounded-r-md' : ''
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-[#ff8c00]'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PoliciesPage;