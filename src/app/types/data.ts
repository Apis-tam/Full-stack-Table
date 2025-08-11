import { ReactNode } from 'react';

export type ApiError = {
  message: string;
  status: string;
};

export type DataResponse = {
  message: string;
  status: string;
  data: {
    page: string;
    pageSize: 10;
    result: Data[];
    total: number;
  };
};

export type Data = {
  id: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  logText: string;
};

export type CellProps = {
  item: ReactNode;
  column: keyof Data;
  rowIndex: number;
  cellIndex: number;
  rowId: string;
};

export type User = {
  userName: string;
  password: string;
  email: string;
};

export type AccessResponse = {
  accessToken: string;
  refreshToken: string;
};

export type AuthUserResponse = {
  data: AccessResponse;
  message: string;
  status: string;
};
