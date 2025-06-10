import React from "react";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <header>Header</header>

      <main>
        <Outlet></Outlet>
      </main>

      <footer>Footer</footer>
    </div>
  );
};

export default RootLayout;
