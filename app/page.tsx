'use client';
import ExpenseItem from '@/components/ExpenseItem';
import Modal from '@/components/Modal';
import { currencyFormatter } from '@/lib/utils';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useRef, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';

ChartJS.register(ArcElement, Tooltip, Legend);

type IncomeEntry = {
  id: string;
  amount: number;
  createdAt: Date;
  description: string | undefined;
};

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
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [income, setIncome] = useState<IncomeEntry[]>([]);

  const amountRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  // Handler Function
  const addIncomeHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current?.value ? +amountRef.current?.value : 0,
      description: descriptionRef.current?.value,
      createdAt: new Date(),
    };

    const collectionRef = collection(db, 'income');

    try {
      const docSnapshot = await addDoc(collectionRef, newIncome);

      setIncome((prevState): IncomeEntry[] => {
        return [
          ...prevState,
          {
            id: docSnapshot.id,
            amount: newIncome.amount,
            description: newIncome.description,
            createdAt: newIncome.createdAt,
          },
        ];
      });
    } catch (err) {
      console.error(err);
    }
  };
  const deleteIncomeEntryHandler = async (incomeId: string) => {
    const docRef = doc(db, 'income', incomeId);
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
        return prevState.filter((entry) => entry.id !== incomeId);
      });

      if (descriptionRef.current) descriptionRef.current.value = '';
      if (amountRef.current) amountRef.current.value = '';
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, 'income');
      const docSnapshot = await getDocs(collectionRef);

      const data = docSnapshot.docs.map((doc) => {
        const newEntry = {
          id: doc.id,
          amount: doc.data().amount,
          description: doc.data().description,
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };

        return newEntry;
      });

      setIncome(data);
    };

    getIncomeData();
  }, []);

  return (
    <>
      {/* Add Income Modal */}
      <Modal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      >
        <form
          onSubmit={addIncomeHandler}
          className="input-group"
        >
          <div className="input-group">
            <label htmlFor="amount">Income Amount</label>
            <input
              type="number"
              name="amount"
              ref={amountRef}
              min={0.01}
              step={0.01}
              placeholder="Enter income amount"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              ref={descriptionRef}
              placeholder="Enter income description"
              required
            />
          </div>
          <button
            className="btn btn-primary"
            type="submit"
          >
            Add Entry
          </button>
        </form>

        <div className="input-group mt-6">
          <h3 className="text-2xl font-bold">Income History</h3>

          {income.map((entry) => {
            return (
              <div
                className="flex justify-between item-center"
                key={entry.id}
              >
                <div>
                  <p className="font-semibold">{entry.description}</p>
                  <small>{entry.createdAt.toString()}</small>
                </div>
                <p className="flex items-center gap-2">
                  {currencyFormatter(entry.amount)}
                  <button onClick={() => deleteIncomeEntryHandler(entry.id)}>
                    <FaRegTrashAlt />
                  </button>
                </p>
              </div>
            );
          })}
        </div>
      </Modal>

      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3 ">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button className="btn btn-primary">+ Expenses</button>
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
            {TEST_DATA.map((expense) => {
              return (
                <ExpenseItem
                  key={expense.id}
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
