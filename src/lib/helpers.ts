/* eslint-disable @typescript-eslint/no-explicit-any */
function setDeep(obj: any, path: string, value: any) {
  const keys = path.split(".");
  const copy = structuredClone(obj);

  let current = copy;

  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;

  return copy;
}

export { setDeep };
