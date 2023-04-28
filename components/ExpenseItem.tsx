import { currencyFormatter } from '@/lib/utils';
import ViewExpenseModal from './modals/ViewExpenseModal';
import { useState } from 'react';

type ExpenseItemProp = {
  expense: ExpenseEntry;
};

type ExpenseEntry = {
  id: string;
  color: string;
  title: string;
  total: number;
  items: ExpenseEntryItem[];
};

type ExpenseEntryItem = {
  amount: number;
  createdAt: Date;
  id: string;
};

const ExpenseItem = ({ expense }: ExpenseItemProp) => {
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);

  return (
    <>
      <ViewExpenseModal
        show={showViewExpenseModal}
        onClose={setShowViewExpenseModal}
        expense={expense}
      />
      <button onClick={() => setShowViewExpenseModal(true)}>
        <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
          <div className="flex items-center gap-2">
            <div
              className="rounded-full w-[25px] h-[25px]"
              style={{ backgroundColor: expense.color }}
            />
            <h4 className="capitalize">{expense.title}</h4>
          </div>
          <p>{currencyFormatter(expense.total)}</p>
        </div>
      </button>
    </>
  );
};

export default ExpenseItem;
