async function lol() {
  const result = await Promise.resolve(15);
  return result;
}

lol();
