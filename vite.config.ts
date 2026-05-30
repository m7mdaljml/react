export default {
  server: {
    proxy: {
      "/api": {
        target: "https://react-projects.freedev.app",
        // target: "http://localhost/api", // Put it in the axios request to test in localhost
        changeOrigin: true,
        secure: true,
      },
    },
  },
};
