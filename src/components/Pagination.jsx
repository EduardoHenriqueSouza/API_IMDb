export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300"
      >
        Anterior
      </button>

      <span className="font-semibold">
        Página {currentPage} de {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300"
      >
        Próxima
      </button>
    </div>
  );
}
