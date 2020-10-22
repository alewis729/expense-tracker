import React, { useState } from "react";
import { map, slice } from "lodash";
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

import { useStyles } from "./style";
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
  }[];
  renderActions?: null | ((id: string) => React.ReactNode);
  currencySymbol: string;
}

const DataTable: React.FC<Props> = ({
  data,
  renderActions = null,
  currencySymbol,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
              ({ id, name, category, date, amount }) => (
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
                  <TableCell>{date}</TableCell>
                  <TableCell align="center">{`${currencySymbol} ${amount}`}</TableCell>
                  {renderActions && (
                    <TableCell align="center">{renderActions(id)}</TableCell>
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

export default DataTable;
