module.exports = {
  plugins: {
    "postcss-import": {}, // Allows @import of CSS files
    "postcss-nested": {}, // Enables SCSS-like nesting
    tailwindcss: {},
    autoprefixer: {},
    cssnano: { preset: "default" }, // Minifies CSS for production
  },
};
