export function jsonParse<T>(key: string, val: string, def: T): T {
  let ret: T = def;
  try {
    // If not empty, parse it.
    if (val == '') {
      return ret;
    }
    ret = JSON.parse(val) as T;
  } catch (e) {
    console.log('Failed JSON.parse in features.(value=' + key + ')');
  }
  return ret;
}
