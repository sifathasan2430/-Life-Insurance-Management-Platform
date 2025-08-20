import React from "react";
import { Button } from "@/components/ui/button"

const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
      <Button
        onClick={() => setPage((p) => p - 1)}
        disabled={page === 1}
        className="px-3 py-1.5 border text-black rounded-lg bg-white hover:bg-orange-50 disabled:opacity-50"
      >
        Prev
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
        <Button
          key={pg}
          onClick={() => setPage(pg)}
          className={`px-3 py-1.5 text-black rounded-lg border ${
            pg === page
              ? "bg-[#ff8c00] text-white border-[#ff8c00]"
              : "bg-white hover:bg-orange-50"
          }`}
        >
          {pg}
        </Button>
      ))}

      <Button
        onClick={() => setPage((p) => p + 1)}
        disabled={page === totalPages}
        className="px-3 text-black py-1.5 border rounded-lg bg-white hover:bg-orange-50 disabled:opacity-50"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;