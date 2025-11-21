export const appConfig = {
  raindrop: {
    apiUrl: 'https://api.raindrop.io/rest/v1',
    revalidate: 60 * 60 * 24, // 1 day
  },
} as const;
