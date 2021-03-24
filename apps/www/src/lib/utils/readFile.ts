import * as XLSX from "xlsx";
import { isNil, map, reduce } from "lodash";
import { XLSXRow } from "@/lib/types";

interface Props {
  file?: File;
  allSheets?: boolean;
  callback?: (data: Array<XLSXRow>) => void;
}
type Func<P> = (props: P) => void;

const readFile: Func<Props> = ({ file, allSheets = false, callback }) => {
  if (isNil(file)) return;

  const reader = new FileReader();

  reader.onload = e => {
    const bstr = e?.target?.result;
    const book = XLSX.read(bstr, { type: "binary" });
    const sheetName = book.SheetNames[0];
    const sheet = book.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet) as Array<XLSXRow>;

    if (allSheets) {
      const sheetNames = book.SheetNames;
      const sheets = map(sheetNames, name => book.Sheets[name]);
      const allData = reduce(
        sheets,
        (data, sheet) => {
          const sheetData = XLSX.utils.sheet_to_json(sheet) as Array<XLSXRow>;
          return [...data, ...sheetData];
        },
        []
      );

      callback?.(allData);
      return;
    }

    callback?.(data);
  };
  reader.readAsBinaryString(file);
};

export default readFile;
