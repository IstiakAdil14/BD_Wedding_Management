import React from "react";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";
import ServicesPage from "./service-packages";

const ServicePackagesPage = () => {
  return (
    <div className="flex">
      <ManagementMenu />
      <HamburgerMenu />
      <main className="flex-grow p-6">
        <ServicesPage />
      </main>
    </div>
  );
};

export default ServicePackagesPage;
