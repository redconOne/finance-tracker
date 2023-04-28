'use client';

import React, { createContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
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
  addExpenseItem: Function;
  removeExpenseItem: Function;
  addCategory: Function;
  removeCategory: Function;
};

export const financeContext = createContext<financeContextType>({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  removeExpenseItem: async () => {},
  addCategory: async () => {},
  removeCategory: async () => {},
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

  const addExpenseItem = async (expenseCategoryId: any, newExpense: any) => {
    const docRef = doc(db, 'expenses', expenseCategoryId);

    try {
      await updateDoc(docRef, {
        color: newExpense.color,
        title: newExpense.title,
        total: newExpense.total,
        items: newExpense.items,
      });

      setExpenses((prevState) => {
        const updatedExpenses = [...prevState];

        const foundIndex = updatedExpenses.findIndex(
          (expense) => expense.id === expenseCategoryId
        );

        updatedExpenses[foundIndex] = {
          id: expenseCategoryId,
          color: newExpense.color,
          title: newExpense.title,
          total: newExpense.total,
          items: newExpense.items,
        };

        return updatedExpenses;
      });
    } catch (err) {
      throw err;
    }
  };
  const addCategory = async (category: any) => {
    try {
      const collectionRef = collection(db, 'expenses');

      const docSnapshot = await addDoc(collectionRef, {
        ...category,
        items: [],
      });

      setExpenses((prevExpenses) => {
        return [
          ...prevExpenses,
          {
            id: docSnapshot.id,
            items: [],
            ...category,
          },
        ];
      });
    } catch (err) {
      throw err;
    }
  };

  const removeCategory = async (categoryId: string) => {
    try {
      const docRef = doc(db, 'expenses', categoryId);
      await deleteDoc(docRef);

      setExpenses((prevExpenses) => {
        const updatedExpenses = prevExpenses.filter(
          (expense) => expense.id !== categoryId
        );

        return [...updatedExpenses];
      });
    } catch (err) {
      throw err;
    }
  };

  const removeExpenseItem = async (
    updatedExpense: ExpenseEntry,
    expenseCategoryId: string
  ) => {
    try {
      const docRef = doc(db, 'expenses', expenseCategoryId);
      await updateDoc(docRef, {
        ...updatedExpense,
      });

      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];

        const foundIndex = updatedExpenses.findIndex(
          (expense) => expense.id === expenseCategoryId
        );
        updatedExpenses[foundIndex].items = [...updatedExpense.items];
        updatedExpenses[foundIndex].total = updatedExpense.total;

        return updatedExpenses;
      });
    } catch (err) {
      throw err;
    }
  };

  const values = {
    income,
    expenses,
    addIncomeItem,
    removeIncomeItem,
    addExpenseItem,
    removeExpenseItem,
    addCategory,
    removeCategory,
  };

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
