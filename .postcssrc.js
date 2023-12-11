module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 24,
      propList: [],
      unitPrecision: 3,
      selectorBlackList: ['.tabsview'],
      minPixelValue: 5, //px小于5的不会被转换
    },
  },
};
