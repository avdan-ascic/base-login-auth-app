import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/styles";

import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
