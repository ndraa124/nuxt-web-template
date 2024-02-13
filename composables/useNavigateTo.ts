export const useNavigateTo = (path: string) => {
  reloadNuxtApp({
    path: path,
    force: true,
    ttl: 2000,
  });

  return navigateTo(path);
};
