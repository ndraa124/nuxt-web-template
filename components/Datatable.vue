<template>
  <div class="col-12 table-responsive">
    <table class="table table-striped table-hover" id="mytable"></table>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from "nuxt/app";
import { useAuthStore } from "~/stores/useAuthStore";

const auth = useAuthStore();
const props = defineProps({
  path: {
    required: true,
  },
  columns: {
    required: true,
  },
  length: {
    required: true,
  },
  params: {
    required: false,
  },
  toggle: {
    required: false,
  },
});

const { path, columns, params, length } = props;

onMounted(() => {
  getAllData();
});

const getAllData = () => {
  $("#mytable").DataTable({
    destroy: true,
    pageLength: length,
    lengthChange: false,
    ordering: false,
    processing: true,
    searching: false,
    serverSide: true,
    deferRender: true,
    ajax: {
      url: useRuntimeConfig().public.baseApi + path,
      type: "GET",
      data: params,
      beforeSend: (req) => {
        $("#select-all").prop("checked", false);
        const data = useCookie("user");

        if (data.value.token !== undefined) {
          if (data.value.token) {
            req.setRequestHeader("Authorization", "Bearer " + data.value.token);
          }
        }
      },
      error: (xhr, _err, _code) => {
        $(".dataTables_processing").hide();

        if (xhr.status === 401) {
          auth.logout();
        }

        error(xhr.responseJSON.message);
      },
    },
    columns: columns,
  });
};

defineExpose({
  getAllData,
});
</script>
