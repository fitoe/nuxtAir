export default defineAppConfig({
  theme: {
    dark: false,
  },
  ui: {
    navigationMenu: {
      slots: {
        item: 'mx-8',
        link: 'lg:text-lg font-normal block',
      },
      variants: {
        active: {
          true: {
            link: 'text-primary font-bold',
          },
          false: {
            link: 'text-black',
          },
        },
      },
    },
    tabs: {
      slots: {
        list: 'border border-primary',
        // trigger: []
      },

    },
  },
})
