import React from 'react';

export const TableHead = (props: PropsType) => {
  return (
    <thead>
      <tr>
        <th>{props.tableTitle.table1}</th>
        <th>{props.tableTitle.table2}</th>
        <th>{props.tableTitle.table3}</th>
        <th>{props.tableTitle.table4}</th>
        <th>{props.tableTitle.table5}</th>
        {props.tableTitle.table6 ? <th>{props.tableTitle.table6}</th> : ''}
      </tr>
    </thead>
  );
};

type PropsType = {
  tableTitle: TableTitleType;
};

export type TableTitleType = {
  table1: string;
  table2: string;
  table3: string;
  table4: string;
  table5: string;
  table6?: string;
};
