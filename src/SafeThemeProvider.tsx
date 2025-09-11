import { ThemeProvider as MuiThemeProvider, Theme } from "@mui/material/styles";
import { ReactNode } from "react";

interface SafeThemeProviderProps {
  theme: Theme;
  children: ReactNode;
  [key: string]: any;
}

const SafeThemeProvider = ({ theme, children, ...props }: SafeThemeProviderProps) => {
  // Strip out unwanted data-* props that cause warnings
  const {
    ["data-lov-id"]: _id,
    ["data-lov-name"]: _name,
    ["data-component-path"]: _path,
    ["data-component-line"]: _line,
    ["data-component-file"]: _file,
    ["data-component-name"]: _compName,
    ["data-component-content"]: _content,
    ...rest
  } = props;

  return (
    <MuiThemeProvider theme={theme} {...rest}>
      {children}
    </MuiThemeProvider>
  );
};

export default SafeThemeProvider;
