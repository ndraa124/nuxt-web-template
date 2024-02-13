<template>
  <div>
    <div class="card card-primary" id="card-login">
      <div class="card-body">
        <form id="form" method="POST" @submit.prevent="login">
          <div class="form-group">
            <label for="userid"> User ID <span class="text-danger">*</span> </label>
            <input
              v-model="model.formData.user_id"
              type="text"
              id="userid"
              class="form-control"
              placeholder="Input your user id"
              tabindex="1"
              autofocus
            />
            <span class="help-block" v-if="model.errorList.user_id">
              {{ model.errorList.user_id }}
            </span>
            <span class="help-block" v-else-if="validate.user_id.$error">
              {{ validate.user_id.$errors[0].$message }}
            </span>
          </div>

          <div class="form-group">
            <div class="d-block">
              <label for="password" class="control-label">
                Password <span class="text-danger">*</span>
              </label>
            </div>
            <input
              v-model="model.formData.password"
              type="password"
              id="password"
              class="form-control"
              placeholder="Input your password"
              tabindex="1"
            />
            <span class="help-block" v-if="model.errorList.password">
              {{ model.errorList.password }}
            </span>
            <span class="help-block" v-else-if="validate.password.$error">
              {{ validate.password.$errors[0].$message }}
            </span>
          </div>

          <div class="form-group">
            <button
              v-if="model.isLoading"
              class="btn btn-primary btn-lg btn-block btn-progress disabled"
              tabindex="4"
            >
              Login
            </button>
            <button
              v-else
              type="submit"
              id="btn-login"
              class="btn btn-primary btn-lg btn-block"
              tabindex="4"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

definePageMeta({
  middleware: ["guest"],
});

const auth = useAuthStore();

const model = reactive({
  formData: {
    user_id: "",
    password: "",
  },
  isLoading: false,
  errorList: {},
});

const validationRules = computed(() => {
  return {
    user_id: {
      required: helpers.withMessage("The user id field is required", required),
    },
    password: {
      required: helpers.withMessage("The password field is required", required),
    },
  };
});

const validate = useVuelidate(validationRules, model.formData);

const login = async () => {
  validate.value.$validate();

  if (!validate.value.$error) {
    model.isLoading = true;

    await auth
      .login(model.formData)
      .then((_res) => {
        model.isLoading = false;
        model.errorList = {};
        model.errorMessage = "";

        return useNavigateTo("/");
      })
      .catch((err) => {
        const response = err.response._data;

        if (response.errors !== undefined) {
          model.errorList = response.errors;
        } else {
          model.errorMessage = response.message;
          error(model.errorMessage);
        }

        model.isLoading = false;
      });
  }
};
</script>
