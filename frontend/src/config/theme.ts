const fontFamily =
  "'Outfit',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'"

export const lightThemeConfig = {
  fontFamily,
  borderRadius: 10,
  borderRadiusSM: 8,
  borderRadiusXS: 4,
  // colorPrimary: '#ff0374',
  colorPrimary: '#ff246d',
  colorSuccess: '#00ff7d',
  colorWarning: '#ffc041',
  colorBgContainer: '#fff',
  controlOutline: '#48484823',
  boxShadowSecondary:
    '0 0 0 1px rgba(0,0,0,0.05) ,     0 6px 16px 0 rgba(0, 0, 0, 0.08),      0 3px 6px -4px rgba(0, 0, 0, 0.12),      0 9px 28px 8px rgba(0, 0, 0, 0.05)    ',
  boxShadow:
    ' 0 0 0 1px rgba(0,0,0,0.05) ,     0 6px 16px 0 rgba(0, 0, 0, 0.08),      0 3px 6px -4px rgba(0, 0, 0, 0.12),      0 9px 28px 8px rgba(0, 0, 0, 0.05)    '
}

export const darkThemeConfig = {
  fontFamily,
  borderRadius: 10,
  borderRadiusSM: 8,
  borderRadiusXS: 4,
  colorBgBase: '#040304',
  // colorTextBase: '#fce3ff',
  colorTextBase: '#fef1ff',
  // colorPrimary: '#ff0374',
  colorPrimary: '#ff246d',
  colorSuccess: '#00ff7d',
  colorWarning: '#ffc041',
  colorBgElevated: 'rgb(28, 21, 28)',
  colorBgContainer: '#151015',
  boxShadow:
    '0 0 0 1px rgb(52, 40, 52), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);',
  boxShadowSecondary:
    '  0 0 0 1px rgb(52, 40, 52),    0 6px 16px 0 rgba(0, 0, 0, 0.08),      0 3px 6px -4px rgba(0, 0, 0, 0.12),      0 9px 28px 8px rgba(0, 0, 0, 0.05)    ',
  controlOutline: '#ffaace33'
}
