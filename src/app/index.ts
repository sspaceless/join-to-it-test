import { App as RawApp } from "./components";
import { withProviders } from "./providers";

export const App = withProviders(RawApp);
