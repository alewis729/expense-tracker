import React from "react";
import { isEmpty } from "lodash";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@material-ui/core";
import clsx from "clsx";

import { useStyles } from "./style";
import { CategoryChip } from "@/components";
import { CategoryFields } from "@/lib/types";

const defaultExampleFileUrl = `https://github.com/alewis729/expense-tracker/blob/develop/apps/www/public/files/expense-tracker-example-file.xlsx`;

interface Category extends CategoryFields {
  id: string;
}

interface Props {
  className?: string;
  categories?: Array<Category>;
  exampleFileUrl?: string;
}

const XlsxTutorial: React.FC<Props> = ({
  className,
  categories,
  exampleFileUrl = defaultExampleFileUrl,
}) => {
  const classes = useStyles();
  const imgSrc = "/static/xlsx-expenses-example.png";

  return (
    <div className={clsx(classes.root, className)}>
      <Typography>
        In order to correctly import data from an .xlsx file you need to prepare
        your file following the example below (click image to open in a new
        tab):
      </Typography>
      <img
        className={classes.image}
        src={imgSrc}
        alt="XLSX example"
        onClick={() => window.open(imgSrc)}
      />
      <Box my={2}>
        <Typography>
          You can also find{" "}
          <Link href={exampleFileUrl} target="_blank" rel="noopener noreferer">
            the example .xlsx file here
          </Link>
          .
        </Typography>
      </Box>
      <Typography>
        <b>Number</b>, <b>name</b>, <b>amount</b> and <b>currency</b>,
        <b>categoryId</b> are mandatory to register an expense/income. A{" "}
        <b>description</b> is optional, if the <b>date</b> cell is empty the
        expense/income will be registered with today's date. The date cell must
        have the format shown in the example (23 Nov 2020 15:20:00{" "}
        <i>with or without the time)</i>.
      </Typography>
      {!isEmpty(categories) && (
        <Box mt={3}>
          <Box mb={2}>
            <Typography>The valid categoryIds are the following:</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>N°</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Valid ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories?.map?.((obj, index) => (
                  <TableRow key={obj.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <CategoryChip label={obj.name} color={obj.color} />
                    </TableCell>
                    <TableCell>{`${obj.id}-'${obj.name}'`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default XlsxTutorial;
