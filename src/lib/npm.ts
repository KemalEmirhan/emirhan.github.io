export type PackageStats = {
  version: string;
  weeklyDownloads: number;
};

const compact = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

export const formatDownloads = (n: number) => compact.format(n).toLowerCase();

export const getPackageStats = async (
  name: string
): Promise<PackageStats | null> => {
  try {
    const options = { next: { revalidate: 3600 } };
    const [latest, downloads] = await Promise.all([
      fetch(`https://registry.npmjs.org/${name}/latest`, options),
      fetch(`https://api.npmjs.org/downloads/point/last-week/${name}`, options),
    ]);
    if (!latest.ok || !downloads.ok) return null;
    const { version } = (await latest.json()) as { version?: string };
    const { downloads: weekly } = (await downloads.json()) as {
      downloads?: number;
    };
    if (typeof version !== 'string' || typeof weekly !== 'number') return null;
    return { version, weeklyDownloads: weekly };
  } catch {
    return null;
  }
};
