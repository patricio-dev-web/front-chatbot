import React from "react";
import Menu from "./Menu"; 

function BaseLayout({ children }) {
  return (
    <>
      <Menu />
      {children}
    </>
  );
}

export default BaseLayout;
