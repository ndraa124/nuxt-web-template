module.exports = {
  apps: [
    {
      name: "NuxtWebTemplate",
      port: "4600",
      exec_mode: "cluster",
      instances: "1",
      script: "./.output/server/index.mjs",
    },
  ],
};
