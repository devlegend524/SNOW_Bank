import React, { useRef } from "react";
import { useTable } from "uikit";
import Row from "./Table/Row";
import SnowBox from "./Table/SnowBox";

export default function FarmTables(props) {
  const tableWrapperEl = useRef();

  const { data, columns, userDataReady } = props;
  const { rows } = useTable(columns, data, {
    sortable: true,
    sortColumn: "farm",
  });

  return (
    <>
      <div className="grid grid-cols-1  sm:grid-cols-3 sm:gap-6 gap-3">
        {rows.map((row, key) => {
          return (
            <SnowBox
              {...row.original}
              userDataReady={userDataReady}
              index={key}
            />
          );
        })}
      </div>
    </>
  );
}
