import * as XLSX from "xlsx";
import { isNil } from "lodash";
import { XLSXRow } from "@/lib/types";

type T = (file?: File, callback?: (data: Array<XLSXRow>) => void) => void;

const readFile: T = (file, callback) => {
  if (isNil(file)) return;

  const reader = new FileReader();

  reader.onload = e => {
    const bstr = e?.target?.result;
    const book = XLSX.read(bstr, { type: "binary" });
    const sheetName = book.SheetNames[0];
    const sheet = book.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet) as Array<XLSXRow>;

    callback?.(data);
  };
  reader.readAsBinaryString(file);
};

export default readFile;
