import { currencyFormatter } from '@/lib/utils';

type expenseItem = {
  title: string;
  color: string;
  amount: number;
};

const ExpenseItem = ({ title, color, amount }: expenseItem) => {
  return (
    <button>
      <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
        <div className="flex items-center gap-2">
          <div
            className="rounded-full w-[25px] h-[25px]"
            style={{ backgroundColor: color }}
          />
          <h4 className="capitalize">{title}</h4>
        </div>
        <p>{currencyFormatter(amount)}</p>
      </div>
    </button>
  );
};

export default ExpenseItem;
