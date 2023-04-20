import ExpenseItem from '@/components/ExpenseItem';
import { currencyFormatter } from '@/lib/utils';

const TEST_DATA = [
  {
    id: 1,
    title: 'Rent',
    color: '#000',
    amount: 1000,
  },
  {
    id: 2,
    title: 'Groceries',
    color: '#123',
    amount: 500,
  },
  {
    id: 3,
    title: 'Fuel',
    color: '#321',
    amount: 250,
  },
  {
    id: 4,
    title: 'Entertainment',
    color: '#567',
    amount: 125,
  },
];

export default function Home() {
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <section className="py-3 ">
        <small className="text-gray-400 text-md">My Balance</small>
        <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
      </section>

      <section className="flex items-center gap-2 py-3">
        <button className="btn btn-primary">+ Expenses</button>
        <button className="btn btn-primary-outline">+ Income</button>
      </section>

      {/* Expenses */}
      <section className="py-6">
        <h3 className="text-2xl">My Expenses</h3>
        <div className="flex flex-col gap-4 mt-6">
          {TEST_DATA.map((expense) => {
            return (
              <ExpenseItem
                color={expense.color}
                title={expense.title}
                amount={expense.amount}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
