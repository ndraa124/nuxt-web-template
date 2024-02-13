<template>
  <div>
    <div class="section-header">
      <h1>Home</h1>

      <div class="section-header-breadcrumb">
        <div class="breadcrumb-item">
          <a href="javascript:void(0)">Home</a>
        </div>
      </div>
    </div>

    <div class="section-body">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-2">
                  <input
                    v-model="model.params.sj_no"
                    type="text"
                    class="form-control"
                    placeholder="SJ Number"
                  />
                </div>
                <div class="col-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="fa fa-calendar-alt"></i>
                      </div>
                    </div>
                    <input
                      v-model="model.params.start_date"
                      type="text"
                      id="start-date"
                      class="form-control datepicker"
                      placeholder="Pick Date From"
                      readonly
                    />
                  </div>
                </div>
                <div class="col-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="fa fa-calendar-alt"></i>
                      </div>
                    </div>
                    <input
                      v-model="model.params.end_date"
                      type="text"
                      id="end-date"
                      class="form-control datepicker"
                      placeholder="Pick Date To"
                      readonly
                    />
                  </div>
                </div>
                <div class="col-2">
                  <button
                    class="btn btn-primary btn-lg btn-icon icon-left btn-block"
                    @click="getAllData"
                  >
                    <i class="fa fa-search"></i> &nbsp; Search
                  </button>
                </div>
                <div class="col-2">
                  <button
                    v-if="!model.isLoadingDownload"
                    class="btn btn-light btn-lg btn-icon icon-left btn-block"
                    @click="generateExcel"
                  >
                    <i class="fa fa-file-excel"></i> &nbsp; Export
                  </button>
                  <button
                    v-else
                    class="btn btn-light btn-lg btn-block btn-progress disabled"
                  >
                    Export
                  </button>
                </div>
              </div>

              <div class="row mt-4">
                <Datatable
                  :path="model.pathDataPick"
                  :columns="model.columns"
                  :length="model.length"
                  :params="model.params"
                  ref="actionSearch"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Nuxt Web Template | Home",
});

onMounted(() => {
  initDatePicker();
});

const actionSearch = ref(null);

const getAllData = () => {
  actionSearch.value.getAllData();
};

const model = reactive({
  pathDataPick: "/v1/pick/datatable",
  length: 10,
  columns: [
    {
      data: "sj_no",
      title: "SJ Number",
      width: "10%",
    },
    {
      data: "total_item",
      title: "Total Item",
    },
    {
      data: "total_order",
      title: "Total Order Qty",
    },
    {
      data: "total_actual",
      title: "Total Actual Qty",
      width: "15%",
    },
    {
      data: "total_delivery",
      title: "Total Delivered Qty",
      width: "15%",
    },
    {
      data: "flag_all_load_completed",
      title: "Status Loading",
      width: "20%",
    },
    {
      data: "flag_all_delivery_completed",
      title: "Status Delivery",
      width: "20%",
    },
  ],
  params: {
    sj_no: "",
    start_date: "",
    end_date: "",
  },
  isLoadingDownload: false,
  isSearch: false,
});

const initDatePicker = () => {
  $(".datepicker").daterangepicker({
    autoUpdateInput: false,
    locale: { cancelLabel: "Clear", format: "YYYY-MM-DD" },
    singleDatePicker: true,
    showDropdowns: true,
    maxDate: new Date(),
  });

  $("#start-date").on("apply.daterangepicker", (_ev, pick) => {
    model.params.start_date = pick.startDate.format("YYYY-MM-DD");
  });

  $("#end-date").on("apply.daterangepicker", (_ev, pick) => {
    model.params.end_date = pick.endDate.format("YYYY-MM-DD");
  });

  $("#start-date").on("cancel.daterangepicker", (_ev, _pick) => {
    model.params.start_date = "";
  });

  $("#end-date").on("cancel.daterangepicker", (_ev, _pick) => {
    model.params.end_date = "";
  });
};

const generateExcel = async () => {
  model.isLoadingDownload = true;

  await useApiFetch("/v1/pick/generate-excel", {
    method: "GET",
    query: model.params,
  })
    .then((result) => {
      model.isLoadingDownload = false;
      useDownloadFile(result.data.file_name);
    })
    .catch((err) => {
      const response = err.response._data;
      data.errorMessage = response.message;
      model.isLoadingDownload = false;

      error(data.errorMessage);
    });
};
</script>

<style>
#start-date,
#end-date {
  cursor: pointer;
  caret-color: transparent;
  background-color: #ffffff;
}
</style>
