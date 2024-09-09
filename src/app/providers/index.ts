import compose from "compose-function";
import { FC } from "react";

import { withStrictMode } from "./with-strict-mode";

export const withProviders = compose<FC>(withStrictMode);
