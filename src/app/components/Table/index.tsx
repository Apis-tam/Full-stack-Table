'use client';
import { CellProps, Data } from '@/app/types/data';

import { memo, ReactNode } from 'react';
import { TableHeader } from './TableHeader';

type Props = {
  data: Data[];
  cell: (arg: CellProps) => ReactNode;
  actionSlots?: (row: Data) => ReactNode;
};

export const Table = memo(({ data, cell, actionSlots }: Props) => {
  if (!data || !data[0]) {
    return null;
  }

  const columns = Object.keys(data[0] as Data).filter((name) => name !== 'id') as Array<
    keyof Omit<Data, 'id'>
  >;

  const gridColumnsClass = !!actionSlots ? `grid-cols-7` : `grid-cols-5`;
  return (
    <>
      <div className="flex flex-col gap-3  w-[100%] p-1 rounded shadow md:hidden ">
        {data.map((row, rowIndex) => (
          <div
            data-row={rowIndex}
            key={row.id + 'row'}
            className={`flex flex-col w-[100%] gap-2 border-2 border-gray-500  p-1 rounnded`}
          >
            {columns.map((column, cellIndex) => (
              <div key={column + '-field'} className="border-b-2 border-b-gray-700 pb-1">
                <p className="p-1 align-middle">{column}:</p>
                {cell({
                  item: row[column],
                  column,
                  rowIndex,
                  cellIndex,
                  rowId: row.id,
                })}
              </div>
            ))}
            {!!actionSlots ? (
              <div data-index={`row-${rowIndex}-cell-delete`} className="p-1 flex align-middle col-span-2">
                {actionSlots(row)}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="hidden md:block  border-2 w-[100%] p-1 rounded shadow ">
        <TableHeader className={gridColumnsClass} columns={columns} withEditColumns={!!actionSlots} />

        {data.map((row, rowIndex) => (
          <div data-row={rowIndex} key={rowIndex} className={`grid ${gridColumnsClass} gap-1`}>
            {columns.map((column, cellIndex) =>
              cell({
                item: row[column],
                column,
                rowIndex,
                cellIndex,
                rowId: row.id,
              }),
            )}
            {!!actionSlots ? (
              <div
                data-index={`row-${rowIndex}-cell-delete`}
                className="p-1 flex justify-center align-middle col-span-2"
              >
                {actionSlots(row)}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
});

Table.displayName = 'Table';
