import Link from "next/link"
import React from "react"

type PaginationPropsType = {
    currentPage: number,
    totalPages: number
}

const Pagination = ({ currentPage, totalPages }: PaginationPropsType) => {
    const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10))
    const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9))

    const numberedPageTitems: JSX.Element[] = []

    for (let page = minPage; page <= maxPage; page++) {
        numberedPageTitems.push(
            <Link
                href={`?page=${page}`}
                key={page}
                className={`join-item btn ${currentPage === page ? "btn-active pointer-events-none" : ""}`}
            >
                {page}
            </Link>
        )

    }

    return (
        <>
            <div className="join hidden sm:block">
                {numberedPageTitems}
            </div>
            <div className="join block sm:hidden">
                {currentPage > 1 &&
                    <Link
                        href={`?pages=${currentPage - 1}`}
                        className="join-item btn"
                    >
                        «
                    </Link>
                }

                <button className="join-item btn pointer-events-none">
                    Страница {currentPage}
                </button>
                {currentPage < totalPages &&
                    <Link
                        href={`?pages=${currentPage + 1}`}
                        className="join-item btn"
                    >
                        »
                    </Link>
                }


            </div>


        </>


    )
}

export default Pagination