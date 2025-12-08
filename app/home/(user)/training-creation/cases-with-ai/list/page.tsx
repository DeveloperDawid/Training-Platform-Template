import { loadAllCases } from "@/app/lib/cases/server/loaders/cases.loader";
import React, { use } from "react";
import CasesTable from "./_components/casesTable";

const ListCases = () => {
  const cases = use(loadAllCases());

  return (
    <>
      <CasesTable cases={cases} />
    </>
  );
};

export default ListCases;
