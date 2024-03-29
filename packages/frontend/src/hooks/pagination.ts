import { useState } from 'react';

interface UsePaginationProps {
  contentPerPage: number;
  count: number;
}

const usePagination = ({ contentPerPage, count }: UsePaginationProps) => {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(count / contentPerPage);

  const lastContentIndex = page * contentPerPage;

  const firstContentIndex = lastContentIndex - contentPerPage;

  const changePage = (direction: boolean) => {
    setPage((state) => {
      if (direction) {
        if (state === pageCount) {
          return state;
        }

        return state + 1;
      } else {
        if (state === 1) {
          return state;
        }

        return state - 1;
      }
    });
  };

  const setPageSafe = (num: number) => {
    if (num > pageCount) {
      setPage(pageCount);

      return;
    }

    if (num < 1) {
      setPage(1);

      return;
    }

    setPage(num);
  };

  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSafe,
    firstContentIndex,
    lastContentIndex,
    page,
  };
};

export { usePagination };
