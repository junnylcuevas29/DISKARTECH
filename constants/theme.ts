import { Colors as ColorsConst } from './colors';

const tintColorLight = ColorsConst.primary;
const tintColorDark = ColorsConst.white;

export const Colors = {
  light: {
    text: ColorsConst.text,
    background: ColorsConst.background,
    tint: tintColorLight,
    icon: ColorsConst.gray500,
    tabIconDefault: ColorsConst.gray400,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: ColorsConst.textDark,
    background: ColorsConst.backgroundDark,
    tint: tintColorDark,
    icon: ColorsConst.gray400,
    tabIconDefault: ColorsConst.gray500,
    tabIconSelected: tintColorDark,
  },
};

