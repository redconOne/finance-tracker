import Modal from '@/components/Modal';
import { useState, useContext } from 'react';
import { financeContext } from '@/lib/store/finance-context';
import ExpenseItem from '../ExpenseItem';
import { v4 as uuidv4 } from 'uuid';

type ModalProps = {
  show: boolean;
  onClose: Function;
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

function AddExpenseModal({ show, onClose }: ModalProps) {
  const [expenseAmount, setExpenseAmount] = useState(0);
  const { expenses } = useContext(financeContext);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Handler Functions
  const addExpenseItemHandler = () => {
    const expense = expenses.find((e: ExpenseEntry) => {
      return e.id === selectedCategory;
    });

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + expenseAmount,
      items: [
        ...expense.items,
        {
          amount: expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    setExpenseAmount(0);
    setSelectedCategory(null);
    onClose();
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
    >
      <div className="input-group">
        <label htmlFor=""> Enter an amount...</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter expense amount"
          value={+expenseAmount}
          onChange={(e) => {
            setExpenseAmount(+e.target.value);
          }}
        />
      </div>

      {/* Expense Categories */}
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl capitalize">Select expense category:</h3>
          {expenses.map((expense: ExpenseEntry) => {
            return (
              <button
                key={expense.id}
                onClick={() => setSelectedCategory(expense.id)}
              >
                <div
                  className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl"
                  style={{
                    boxShadow:
                      expense.id === selectedCategory ? '1px 1px 4px' : 'none',
                  }}
                >
                  <div className="flex items-center gap-2">
                    {/* Expense Colored Circle */}
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{ backgroundColor: expense.color }}
                    ></div>
                    <h4 className="capitalize">{expense.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button
            className="btn btn-primary"
            onClick={addExpenseItemHandler}
          >
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpenseModal;
