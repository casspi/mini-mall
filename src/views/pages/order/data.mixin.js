export default {
  // 0：待付款 1：待收货 2： 已完成
  data: {
    arrStatus: [
      {
        label: "全部",
        status: "",
      },
      {
        label: "待付款",
        status: "0",
      },
      // {
      //   label: "待发货",
      //   status: "2",
      // },
      {
        label: "待收货",
        status: "1",
      },
      {
        label: "已完成",
        status: "2",
      },
    ],
  },
}
