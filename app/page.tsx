'use client';
import ExpenseItem from '@/components/ExpenseItem';
import AddIncomeModal from '@/components/modals/AddIncomeModal';
import AddExpenseModal from '@/components/modals/AddExpenseModal';
import SignIn from '@/components/SignIn';
import { currencyFormatter } from '@/lib/utils';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useContext, useEffect } from 'react';
import { financeContext } from '@/lib/store/finance-context';
import { authContext } from '@/lib/store/auth-context';

ChartJS.register(ArcElement, Tooltip, Legend);

type IncomeEntry = {
  id: string;
  amount: number;
  createdAt: Date;
  description: string | undefined;
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

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const { expenses, income } = useContext(financeContext);
  const { user, loading } = useContext(authContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const totalIncome = income.reduce((total: number, i: IncomeEntry) => {
      return total + i.amount;
    }, 0);
    const totalExpenses = expenses.reduce((total: number, e: ExpenseEntry) => {
      return total + e.total;
    }, 0);

    setBalance(totalIncome - totalExpenses);
  }, [expenses, income]);

  if (!user) {
    return <SignIn />;
  }
  return (
    <>
      {/* Add Income Modal */}
      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      />

      {/* Add Expense Modal */}
      <AddExpenseModal
        show={showAddExpenseModal}
        onClose={setShowAddExpenseModal}
      />

      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3 ">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            className="btn btn-primary"
            onClick={() => setShowAddExpenseModal(true)}
          >
            + Expenses
          </button>
          <button
            className="btn btn-primary-outline"
            onClick={() => setShowAddIncomeModal(true)}
          >
            + Income
          </button>
        </section>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense: ExpenseEntry) => {
              return (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                />
              );
            })}
          </div>
        </section>

        {/* Chart */}
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((expense: ExpenseEntry) => expense.title),
                datasets: [
                  {
                    label: 'Expenses',
                    data: expenses.map(
                      (expense: ExpenseEntry) => expense.total
                    ),
                    backgroundColor: expenses.map(
                      (expense: ExpenseEntry) => expense.color
                    ),
                    borderColor: ['#18181B'],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
