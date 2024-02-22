 // @ts-nocheck
 // material
 import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import { FC, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from 'react';

import { withStyles } from "@mui/styles";
// ----------------------------------------------------------------------

interface IListHead {
  order:any,
  orderBy: string,
  rowCount: number,
  headLabel: any,
  numSelected: number,
  onRequestSort: any,
  onSelectAllClick: any
};
const StyledTableHead = withStyles((theme: any) => ({
  root: {
    backgroundColor: 'orange'
  }
}))(TableHead);


const TableListHead:FC<IListHead> = ({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick
}) => {
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell> */}
        {headLabel.map((headCell: { id: Key | null | undefined; alignRight: any; label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box  >{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableListHead
