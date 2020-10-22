import { colors } from "@expense-tracker/data";
import { find, isNil } from "lodash";

type Identifier = string | null | undefined;

type Color = {
  id: string;
  name: string;
  hex: string;
};

const getColor = (identifier: Identifier): Color => {
  const defaultId = "lightGrey";

  if (isNil(identifier)) find(colors, ({ id }) => id === defaultId);

  return find(
    colors,
    ({ id, name, hex }) =>
      id === identifier || name === identifier || hex === identifier
  );
};

export default getColor;
