import React from 'react'
import ReactPaginate from 'react-paginate'

export default function Pagination({ page, limit, elements, handlePageClick }) {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ flexWrap: "wrap-reverse" }}>
            <div style={{ paddingTop: "4px" }}>
                <ReactPaginate
                    previousLabel="<<"
                    nextLabel=">>"
                    pageCount={Math.ceil(elements / limit)}
                    breakLabel="..."
                    className="paginate"
                    activeClassName="active"
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    forcePage={page-1}
                    onPageActive={1}
                />
            </div>
        </div>
    )
}
