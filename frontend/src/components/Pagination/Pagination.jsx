import ReactPaginate from 'react-paginate';

function Pagination({ pageCount, onPageChange }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1} // Ajouté pour mobile
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName="flex flex-wrap justify-center space-x-2 mt-4"
      pageClassName="border border-gray-300 rounded cursor-pointer hover:bg-gray-200 flex items-center justify-center"
      pageLinkClassName="px-3 py-1"
      activeClassName="bg-butterscotch font-semibold text-black"
      previousClassName="bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-200 flex items-center justify-center"
      previousLinkClassName="px-3 py-1"
      nextClassName="bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-200 flex items-center justify-center"
      nextLinkClassName="px-3 py-1"
      breakClassName="bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-200 flex items-center justify-center"
      breakLinkClassName="px-3 py-1"
      forcePage={0}
      disabledClassName="bg-gray-200 cursor-not-allowed"
    />
  );
}

export default Pagination;
