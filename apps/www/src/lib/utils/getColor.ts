import { colors } from "@expense-tracker/data";
import { find, isNil } from "lodash";

type Identifier = string | null | undefined;
type Func<I> = (
  identifier: I
) => {
  id: string;
  name: string;
  hex: string;
};

const defaultId = "lightGrey";

const getColor: Func<Identifier> = identifier => {
  if (isNil(identifier)) find(colors, ({ id }) => id === defaultId);

  return (
    find(
      colors,
      ({ id, name, hex }) =>
        id === identifier || name === identifier || hex === identifier
    ) ?? colors[0]
  );
};

export default getColor;
