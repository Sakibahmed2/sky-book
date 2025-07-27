import { ReactNode } from "react";

export type TChildren = {
  children: ReactNode;
};

export type TFlight = {
  _id: string;
  origin: string;
  destination: string;
  airline: string;
  date: string;
  price: number;
  time: string;
};
