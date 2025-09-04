import React from "react";

const Pagination = ({ currentPage, totalPages, onChange }) => {
  return (
    <div className="pagination-container">
      {currentPage > 1 && <button onClick={() => onChange(currentPage - 1)}>Anterior</button>}
      <span>{currentPage} / {totalPages}</span>
      {currentPage < totalPages && <button onClick={() => onChange(currentPage + 1)}>Próxima</button>}
    </div>
  );
};

export default Pagination;