'use client';

import React, { createContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';

type Props = {
  children: React.ReactNode;
};

type IncomeEntry = {
  id: string;
  amount: number;
  createdAt: Date;
  description: string | undefined;
};

type ExpenseEntryItem = {
  amount: number;
  createdAt: Date;
  id: string;
};

type ExpenseEntry = {
  id: string;
  color: string;
  title: string;
  total: number;
  items: ExpenseEntryItem[];
};

type financeContextType = {
  income: any;
  expenses: any;
  addIncomeItem: Function;
  removeIncomeItem: Function;
};

export const financeContext = createContext<financeContextType>({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
});

export default function FinanceContextProvider({ children }: Props) {
  const [income, setIncome] = useState<IncomeEntry[]>([]);
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([]);

  const addIncomeItem = async (newIncome: IncomeEntry) => {
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
      throw err;
    }
  };
  const removeIncomeItem = async (incomeId: string) => {
    const docRef = doc(db, 'income', incomeId);
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
        return prevState.filter((entry) => entry.id !== incomeId);
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const values = { income, expenses, addIncomeItem, removeIncomeItem };

  useEffect(() => {
    const getIncomedata = async () => {
      const collectionRef = collection(db, 'income');
      const docsSnapshot = await getDocs(collectionRef);

      const data = docsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          amount: doc.data().amount,
          description: doc.data().description,
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(data);
    };

    const getExpensesData = async () => {
      const collectionRef = collection(db, 'expenses');
      const docSnapshot = await getDocs(collectionRef);

      const data = docSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          color: doc.data().color,
          title: doc.data().title,
          total: doc.data().total,
          items: doc.data().items,
        };
      });
      setExpenses(data);
    };

    getIncomedata();
    getExpensesData();
  }, []);

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
