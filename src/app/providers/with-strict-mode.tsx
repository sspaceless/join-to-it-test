import React, { ReactNode } from "react";

export const withStrictMode = (Component: () => ReactNode) => {
  const WithStrictMode = () => (
    <React.StrictMode>
      <Component />
    </React.StrictMode>
  );
  return WithStrictMode;
};
