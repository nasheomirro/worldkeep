// snippets are not yet typed, we'll make do.
export type HasChildren<P = {}> = {
  children?: any,
} & P;