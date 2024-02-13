const success = (message) => {
  iziToast.success({
    title: "Success!",
    message: message,
    position: "bottomRight",
  });
};

const error = (message) => {
  iziToast.error({
    title: "Error!",
    message: message,
    position: "bottomRight",
  });
};

const warning = (message) => {
  iziToast.warning({
    title: "Warning!",
    message: message,
    position: "bottomRight",
  });
};

const info = (message) => {
  iziToast.info({
    title: "Information!",
    message: message,
    position: "bottomRight",
  });
};
