export function isNumeric(value: unknown): value is string {
  if (typeof value !== "string") return false;

  return !Number.isNaN(Number(value)) && !Number.isNaN(Number.parseFloat(value));
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (!bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KiB", "MiB", "GiB"] as const;
  const index = Math.floor(Math.log(bytes) / Math.log(k));
  const size = sizes[index] ?? "GiB";

  return `${Number.parseFloat((bytes / Math.pow(k, index)).toFixed(dm))} ${size}`;
}

