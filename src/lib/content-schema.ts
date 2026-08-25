export type ContentField = { path: string[]; type: "string" | "string[]" };

export const MAX_FIELD_LENGTH = 4000;

/** Flattens a messages object (es.json/en.json shape) into a list of editable leaf fields. */
export function walkSchema(node: unknown, path: string[] = []): ContentField[] {
  if (typeof node === "string") {
    return [{ path, type: "string" }];
  }
  if (Array.isArray(node)) {
    return [{ path, type: "string[]" }];
  }
  if (node && typeof node === "object") {
    return Object.entries(node as Record<string, unknown>).flatMap(([key, value]) => walkSchema(value, [...path, key]));
  }
  return [];
}

export function getAtPath(obj: unknown, path: string[]): unknown {
  return path.reduce<unknown>((acc, key) => {
    if (acc == null || typeof acc !== "object") return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj);
}

/** Returns a new object with `value` set at `path`, cloning only the nodes along the way. */
export function setAtPath<T>(obj: T, path: string[], value: unknown): T {
  if (path.length === 0) return value as T;
  const [key, ...rest] = path;
  const record = obj as Record<string, unknown>;
  return {
    ...record,
    [key]: setAtPath(record[key], rest, value),
  } as T;
}

/**
 * Verifies `candidate` has the same shape as `reference`: same object keys at every level,
 * string leaves stay strings, array leaves stay string arrays (any length/content).
 * Used to stop the admin from adding/removing message keys that the rest of the app relies on.
 */
export function validateContentShape(reference: unknown, candidate: unknown, path = "root"): string | null {
  if (typeof reference === "string") {
    return typeof candidate === "string" ? null : `${path}: se esperaba texto`;
  }

  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate)) return `${path}: se esperaba una lista`;
    for (const item of candidate) {
      if (typeof item !== "string") return `${path}: los elementos de la lista deben ser texto`;
    }
    return null;
  }

  if (reference && typeof reference === "object") {
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
      return `${path}: se esperaba un objeto`;
    }
    const refKeys = Object.keys(reference as object).sort();
    const candKeys = Object.keys(candidate as object).sort();
    if (refKeys.length !== candKeys.length || refKeys.some((k, i) => k !== candKeys[i])) {
      return `${path}: no se pueden añadir ni quitar claves desde el admin`;
    }
    for (const key of refKeys) {
      const err = validateContentShape(
        (reference as Record<string, unknown>)[key],
        (candidate as Record<string, unknown>)[key],
        `${path}.${key}`,
      );
      if (err) return err;
    }
    return null;
  }

  return null;
}

export function validateFieldLengths(candidate: unknown, path = "root"): string | null {
  if (typeof candidate === "string") {
    return candidate.length > MAX_FIELD_LENGTH ? `${path}: demasiado largo (máx ${MAX_FIELD_LENGTH} caracteres)` : null;
  }
  if (Array.isArray(candidate)) {
    for (let i = 0; i < candidate.length; i++) {
      const err = validateFieldLengths(candidate[i], `${path}[${i}]`);
      if (err) return err;
    }
    return null;
  }
  if (candidate && typeof candidate === "object") {
    for (const [key, value] of Object.entries(candidate as Record<string, unknown>)) {
      const err = validateFieldLengths(value, `${path}.${key}`);
      if (err) return err;
    }
  }
  return null;
}
