export const startEruda = () => {
  try {
    if (window.localStorage) {
      import('eruda')
        .then((eruda) => {
          eruda.default.init();
          eruda.default.position({ x: 10, y: 10 });
        });
    }
  } catch (error) {
    console.error('[Eruda]', error);
  }
};
