// @ts-ignore
export function resolve(obj, path) {
    const properties = Array.isArray(path) ? path : path.split(".");
    // @ts-ignore
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
}