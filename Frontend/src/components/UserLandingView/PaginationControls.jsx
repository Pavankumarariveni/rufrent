// PaginationControls.js
import React from "react";
import tailwindStyles from "../../utils/tailwindStyles";
import useListingStore from "../../store/listingsStore";

const PaginationControls = () => {
  const { currentPage, pagination, setCurrentPage } = useListingStore();
  const { totalPages } = pagination;

  const handlePageChange = async (newPage) => {
    if (newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
      await setCurrentPage(newPage);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-md ${
          currentPage === 1
            ? `${tailwindStyles.thirdButton} cursor-not-allowed`
            : tailwindStyles.secondaryButton
        }`}
      >
        Previous
      </button>

      {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
        const page = Math.max(1, currentPage - 2) + index;
        if (page > totalPages) return null;

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border rounded-md ${
              page === currentPage
                ? tailwindStyles.secondaryButton
                : "bg-gray-100 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-md ${
          currentPage === totalPages
            ? `${tailwindStyles.thirdButton} cursor-not-allowed`
            : tailwindStyles.secondaryButton
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
