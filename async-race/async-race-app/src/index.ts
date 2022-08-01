async function lol(): Promise<number> {
  const result = await Promise.resolve(15);
  return result;
}

lol();
