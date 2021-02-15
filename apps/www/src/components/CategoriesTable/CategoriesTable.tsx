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
    color: string;
  }[];
  renderActions?: null | ((id: string) => React.ReactNode);
}

const CategoriesTable: React.FC<Props> = ({ data, renderActions = null }) => {
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
              {/* <TableCell>Total expenses</TableCell>
              <TableCell>Total income</TableCell> */}
              {renderActions && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {map(
              slice(data, page * rowsPerPage, page * rowsPerPage + rowsPerPage),
              ({ id, name, color }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    <CategoryChip label={name} color={color} />
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

export default CategoriesTable;
