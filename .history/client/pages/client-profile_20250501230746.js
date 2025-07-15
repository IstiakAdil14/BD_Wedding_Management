import React from "react";
import Navbar from "../components/Navbar";
import ClientPersonalDetailsForm from "../components/ClientPersonalDetailsForm";

export default function ClientProfilePage() {
  return (
    <>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Client Personal Details</h1>
        <ClientPersonalDetailsForm />
      </main>
    </>
  );
}
