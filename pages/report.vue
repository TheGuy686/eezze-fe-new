<template>
  <div>
    <a-page-header title="Reports" :breadcrumb="{ props: { routes: breadcrumb } }" />
    <h1>This is report page</h1>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  middleware: 'auth',

  data() {
    return {
      breadcrumb: [
        {
          to: { name: 'reports' },
          breadcrumbName: 'reports',
        },
      ],
    }
  },
}
</script>
