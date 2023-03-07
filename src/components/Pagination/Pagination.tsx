import Pagination from 'react-bootstrap/Pagination';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageSet: (page: number) => void;
};
export function PaginationPanel({ totalPages, currentPage, onPageSet }: Props) {
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => onPageSet(number)}
        key={number}
        active={number === currentPage}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return <Pagination>{items}</Pagination>;
}
