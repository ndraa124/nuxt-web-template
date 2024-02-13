import { defineStore } from "pinia";

type User = {
  user_id: string;
  full_name: string;
  valid_to: string;
  station_desc: string;
  employee_id: string;
  station_id: string;
  email: string;
  manifestpod: number;
  department: string;
  description: string;
  token: string;
};

type Credentials = {
  user_id: string;
  password: string;
};

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const data = useCookie<User>("user");
  const isLoggedIn = computed(() => !!user.value);

  async function fetchUser() {
    user.value = data.value;
  }

  async function login(credentials: Credentials) {
    const result = await useApiFetch("/v1/auth/login-web", {
      method: "POST",
      body: credentials,
    });

    user.value = result.data as User;
    data.value = user.value;
    fetchUser();

    return result;
  }

  async function logout() {
    user.value = null;
    data.value = null;
    navigateTo("/auth/login");
  }

  return { user, login, isLoggedIn, fetchUser, logout };
});
