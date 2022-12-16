import type { Column } from 'react-table';
import { useTable } from 'react-table';
import { Button } from '../button';
import styles from './styles.module.scss';

interface ITableProps {
  onEdit: (data: object) => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
  columns: Column<{}>[];
  data: {}[];
}

const Table = ({ columns, data, onEdit, onDelete, disabled }: ITableProps) => {
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
  });

  /*
                  Render the UI for your table
                  - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
                */
  console.log('table data', data);

  console.log(getTableBodyProps());

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column, j) => (
              <th {...column.getHeaderProps()} key={i + '' + j}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()} key={i}>
              {row.cells.map((cell, j) => (
                <td {...cell.getCellProps()} key={i + '' + j}>
                  {cell.render('Cell')}
                </td>
              ))}
              <Button
                onClick={() => onEdit(row.values)}
                disabled={disabled}
                size="xs"
              >
                Edit
              </Button>
              <td>
                <Button
                  onClick={() => onDelete(row.values.id)}
                  disabled={disabled}
                  size="xs"
                  color="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { Table };
