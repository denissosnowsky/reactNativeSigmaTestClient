export const onCheckPressHandle = (clb: () => void) => {
  if (clb) {
    clb();
  }
};
