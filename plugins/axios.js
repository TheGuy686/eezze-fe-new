export default function ({ $axios, app, redirect, store }) {
  // $axios.onRequest((config) => {
  //   const token = app.$auth.strategy.token.get()

  //   if (!config.headers.common) {
  //     config.headers.common = {}
  //   }

  //   if (token) {
  //     config.headers.common.Authorization = token
  //   }
  // })

  $axios.onError((err) => {
    const code = +err.response?.status

    if (code === 401) {
      app.$auth.logout('local');
      setTimeout(() => {
        redirect({ name: 'index' })
      }, 0);
    }
  })
}