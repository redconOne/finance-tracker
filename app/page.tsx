'use client';
import ExpenseItem from '@/components/ExpenseItem';
import Modal from '@/components/Modal';
import { currencyFormatter } from '@/lib/utils';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const TEST_DATA = [
  {
    id: 1,
    title: 'Rent',
    color: '#000',
    total: 1000,
  },
  {
    id: 2,
    title: 'Groceries',
    color: '#009',
    total: 500,
  },
  {
    id: 3,
    title: 'Fuel',
    color: '#321',
    total: 250,
  },
  {
    id: 4,
    title: 'Entertainment',
    color: '#567',
    total: 125,
  },
];

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      {/* Modal */}
      <Modal
        show={modalIsOpen}
        onClose={setModalIsOpen}
      >
        <h3>I am a modelling modal.</h3>
      </Modal>

      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3 ">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            className="btn btn-primary"
            onClick={() => setModalIsOpen(true)}
          >
            + Expenses
          </button>
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
                  total={expense.total}
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
                labels: TEST_DATA.map((expense) => expense.title),
                datasets: [
                  {
                    label: 'Expenses',
                    data: TEST_DATA.map((expense) => expense.total),
                    backgroundColor: TEST_DATA.map((expense) => expense.color),
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
