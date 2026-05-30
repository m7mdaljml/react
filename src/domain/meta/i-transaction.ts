import type { TransactionCategoryEnum } from "./enums/expense-tracker/category";
import type { TransactionTypeEnum } from "./enums/expense-tracker/type";

interface ITransaction {
  id: string;
  title: string;
  amount: string;
  type: TransactionTypeEnum;
  category: TransactionCategoryEnum;
  date: string;
}

export type { ITransaction };
