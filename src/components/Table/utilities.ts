interface TableData {
  [key: string]: string;
}

export const isLinkField = (
  header: string,
  linkField: string | undefined
): boolean =>
  Boolean(linkField && header.toLowerCase() === linkField.toLowerCase());

export const getValue = (
  row: TableData,
  header: string,
  isLeft: boolean
): string => {
  const key = header.toLowerCase();
  return (
    row[key] || (isLeft ? row[Object.keys(row)[0]] : row[Object.keys(row)[1]])
  );
};
