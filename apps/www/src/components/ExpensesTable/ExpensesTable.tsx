import React, { useState } from "react";
import { find, map, slice } from "lodash";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import { format } from "date-fns";

import { useStyles } from "./style";
import { currencies } from "@expense-tracker/data";
import { CategoryChip } from "@/components";

interface Props {
  data: {
    id: string;
    name: string;
    category: {
      name: string;
      color?: string | null;
    };
    date: string;
    amount: number;
    currencyCode: string;
  }[];
  renderActions?: null | ((id: string) => React.ReactNode);
}

const ExpensesTable: React.FC<Props> = ({ data, renderActions = null }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getCurrencySymbol = (code: string) =>
    find(currencies, obj => obj.code === code)?.symbol ?? "";

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table className={classes.table} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Amount</TableCell>
              {renderActions && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {map(
              slice(data, page * rowsPerPage, page * rowsPerPage + rowsPerPage),
              ({ id, name, category, date, currencyCode, amount }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell>
                    <CategoryChip
                      label={category.name}
                      color={category.color}
                    />
                  </TableCell>
                  <TableCell className={classes.grey}>
                    {format(new Date(date), "MMM dd yyyy, @H:mm")}
                  </TableCell>
                  <TableCell align="center">
                    {`${getCurrencySymbol(currencyCode)} ${amount}`}
                  </TableCell>
                  {renderActions && (
                    <TableCell align="center" className={classes.actions}>
                      {renderActions(id)}
                    </TableCell>
                  )}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(_: unknown, newPage: number) => setPage(newPage)}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ExpensesTable;
