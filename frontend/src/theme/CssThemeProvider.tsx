import { CssBaseline, ThemeProvider } from "@mui/material";

import { theme } from './theme';

interface Props {
    children: React.ReactNode;
  }

export default function CssThemeProvider({ children }: Props) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            {children}
        </ThemeProvider>
    );
  }