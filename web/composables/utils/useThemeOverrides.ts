import type { GlobalThemeOverrides } from 'naive-ui'

export function useThemeOverrides(): GlobalThemeOverrides {
  return {
    Layout: {
      textColor: '#fff',
      headerColor: '#131112',
    },
    Button: {
      heightMedium: '40px',
      heightLarge: '48px',
      color: 'linear-gradient(45deg, #14046B 0%, #F000FE 100%)',
      colorHover: 'linear-gradient(45deg, #14046B 0%, #F000FE 100%)',
      colorPressed: 'linear-gradient(45deg, #14046B 0%, #F000FE 100%)',
      colorFocus: 'linear-gradient(45deg, #14046B 0%, #F000FE 100%)',
      rippleColor: 'none',
      border: 'none',
      borderHover: 'none',
      borderFocus: 'none',
      borderPressed: 'none',
      borderDisabled: 'none',
      borderRadiusMedium: '0',
      borderRadiusLarge: '0',
      textColor: '#fff',
      textColorHover: '#fff',
      textColorPressed: '#fff',
      textColorFocus: '#fff',
    },
    Message: {
      colorError: '#181E2A',
      borderRadius: '2px',
    },
    DataTable: {
      borderRadius: 0,
      thColor: '#131112',
      tdColor: '#131112',
      borderColor: 'rgba(255,255,255,0.4)',
      thTextColor: '#ffffff99',
    },
    Empty: {
      iconSizeMedium: '100px',
    },
    Dialog: {
      color: '#181E2A',
      borderRadius: '0',
      border: '1px solid rgba(255,255,255,0.4)',
      padding: '0',
      titleFontSize: '18px',
      titleFontWeight: '500',
      closeSize: '24px',
      closeMargin: '10px',
      contentMargin: '0px',
    },
    Checkbox: {
      colorChecked: '#D700ED',
      borderChecked: '1px solid #D700ED',
      borderFocus: '1px solid #D700ED',
      checkMarkColor: '#fff',
      boxShadowFocus: 'none',
    },
    Select: {
      peers: {
        InternalSelection: {
          color: '#0000',
          colorActive: '#0000',
          heightMedium: '48px',
          border: '1px solid rgba(255,255,255,0.4)',
          borderFocus: '1px solid #D700ED',
          borderHover: '1px solid #D700ED',
          borderActive: '1px solid #D700ED',
          boxShadowActive: '0 0 8px 0 rgba(215, 0, 237, .4)',
          boxShadowFocus: '0 0 8px 0 rgba(215, 0, 237, .4)',
          caretColor: '#D700ED',
        },
        InternalSelectMenu: {
          color: '#181E2A',
          optionHeightMedium: '48px',
          borderRadius: '0px',
          optionCheckColor: '#272F3E',
          optionTextColorActive: '#fff',
        },
      },
    },
    Input: {
      color: '#0000',
      colorActive: '#0000',
      colorFocus: '0 0 8px 0 rgba(215, 0, 237, .4)',
      heightMedium: '48px',
      border: '1px solid rgba(255,255,255,0.4)',
      borderFocus: '1px solid #D700ED',
      borderHover: '1px solid #D700ED',
      borderActive: '1px solid #D700ED',
      boxShadowActive: '0 0 8px 0 rgba(215, 0, 237, .4)',
      boxShadowFocus: '0 0 8px 0 rgba(215, 0, 237, .4)',
    },
  }
}
