import { TransactionCategoryEnum } from "../meta/enums/expense-tracker/category";
import { TransactionTypeEnum } from "../meta/enums/expense-tracker/type";
import type { ITransaction } from "../meta/i-transaction";

class Transaction implements ITransaction {
  id: string;
  title: string;
  amount: string;
  type: TransactionTypeEnum;
  category: TransactionCategoryEnum;
  date: string;

  constructor(
    id = "",
    title = "",
    amount = "",
    type = null,
    category = null,
    date = "",
  ) {
    this.id = id;
    this.title = title;
    this.amount = amount;
    this.type = type;
    this.category = category;
    this.date = date;
  }
}

export { Transaction };
