export function initResize() {
  const onResize = event => {};

  window.onresize = onResize;

  setTimeout(() => {
    onResize();
  }, 200);
}
