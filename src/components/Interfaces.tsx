import { Year } from "./types";
import { NetInc } from "./types";
import { AmntRev } from "./types";

export interface ApiProps {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
}

export interface FilterObject {
  searchTerm: string;
  date: Year[];
  revenue: AmntRev[];
  netIncome: NetInc[];
}

export interface FetchDataProps {
  data: ApiProps[]; //Accept filtered data as prop
}
