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
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => (
                <th {...column.getHeaderProps()} key={i + '' + j}>
                  {column.render('Header')}
                </th>
              ))}
              <th></th>
              <th></th>
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

                <td>
                  <Button
                    onClick={() => onEdit(row.values)}
                    disabled={disabled}
                    size="xs"
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!data.length && <div className={styles.placeholder}>No data</div>}
    </div>
  );
};

export { Table };
