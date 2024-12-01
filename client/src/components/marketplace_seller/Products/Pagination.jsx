import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

export default function Pagination({ page, setPage, totalPages }) {
  return (
    <>
      <div className="mt-6 flex justify-center items-center space-x-2">
        <button
          className="btn btn-circle btn-sm btn-ghost"
          disabled={page === 1}
          onClick={() => setPage(1)}
        >
          <FiChevronsLeft className="h-4 w-4" />
        </button>
        <button
          className="btn btn-circle btn-sm btn-ghost"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          <FiChevronLeft className="h-4 w-4" />
        </button>

        <div className="join bg-white rounded-full shadow-sm">
          {[...Array(Math.min(5, totalPages))].map((_, index) => {
            const pageNumber = page - 2 + index;
            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <button
                  key={pageNumber}
                  className={`join-item btn btn-sm ${
                    page === pageNumber
                      ? "btn-primary text-white"
                      : "btn-ghost text-gray-600"
                  }`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}
        </div>

        <button
          className="btn btn-circle btn-sm btn-ghost"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          <FiChevronRight className="h-4 w-4" />
        </button>
        <button
          className="btn btn-circle btn-sm btn-ghost"
          disabled={page === totalPages}
          onClick={() => setPage(totalPages)}
        >
          <FiChevronsRight className="h-4 w-4" />
        </button>
      </div>
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
      </div>
    </>
  );
}
