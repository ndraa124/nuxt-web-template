import { useRuntimeConfig } from "nuxt/app";

export function useApiFetch(path: string, options: any = {}) {
  let headers: any = {};
  const data = useCookie<any>("user");

  if (data.value !== undefined) {
    if (data.value.token) {
      headers["Authorization"] = ("Bearer " + data.value.token) as string;
    }
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["referer", "cookie"]),
    };
  }

  return $fetch(useRuntimeConfig().public.baseApi + path, {
    lazy: true,
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });
}
