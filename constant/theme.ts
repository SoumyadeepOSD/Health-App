import { MD3DarkTheme as DarkThemeBase, MD3LightTheme as LightThemeBase } from 'react-native-paper';

export const CustomDarkTheme: any = {
  ...DarkThemeBase,
  colors: {
    ...DarkThemeBase.colors,
    primary: '#00D1FF',
    secondary: '#03DAC6',
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2A2A2A',
    onSurface: '#FFFFFF',
    onPrimary: '#000000',
    error: '#CF6679',
  },
};

export const CustomLightTheme: any = {
  ...LightThemeBase,
  colors: {
    ...LightThemeBase.colors,
    primary: '#005F73',
    secondary: '#94D2BD',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceVariant: '#E6E6E6',
    onSurface: '#000000',
    onPrimary: '#FFFFFF',
    error: '#B00020',
  },
};
