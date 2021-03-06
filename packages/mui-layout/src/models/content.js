import createAllSidebars from './allSidebars';
import { reduceWidths } from './width';
import combineMargin from '../utils/combineMargin';

export default (ctx = {}) => {
  const { content = {} } = ctx;
  const {
    mainEffect,
    subEffect,
    mapSecondaryConfig,
    isEdgeAndInset,
  } = createAllSidebars(ctx);
  const subContent = mapSecondaryConfig(content);
  return {
    getMarginStyle() {
      if (isEdgeAndInset) return undefined;
      return combineMargin(
        mainEffect.getMarginStyle(content),
        subEffect.getMarginStyle(subContent)
      );
    },
    getWidthStyle() {
      if (isEdgeAndInset) return undefined;
      return reduceWidths([
        mainEffect.getWidthObj(content),
        subEffect.getWidthObj(subContent),
      ]).getStyle();
    },
    getStyle() {
      return {
        ...this.getMarginStyle(),
        ...this.getWidthStyle(),
      };
    },
  };
};
