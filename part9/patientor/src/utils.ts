export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled type member: ${JSON.stringify(value)}`
  );
};