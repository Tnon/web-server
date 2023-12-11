export const setupPostCss = (): void => {
  // 基准大小
  const baseSize = 24;
  const baseScreen = 1920;
  // 设置 rem 函数
  function setRem(): void {
    // const scale: number = document.documentElement.clientWidth / 750;
    // // 设置页面根节点字体大小
    // const size = baseSize * Math.min(scale, 2) < 25 ? 25 : baseSize * Math.min(scale, 2);
    const viewPortWidth: number = document.documentElement.clientWidth;
    const scaleInit = (viewPortWidth / baseScreen) * baseSize;
    const scale = scaleInit < 12 ? 12 : scaleInit > 24 ? 24 : scaleInit;
    document.documentElement.style.fontSize = scale + 'px';
  }
  // 初始化
  setRem();
  // 改变窗口大小时重新设置 rem
  window.onresize = () => {
    setRem();
  };
};
