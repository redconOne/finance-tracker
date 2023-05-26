import Modal from '@/components/Modal';
import { useRef, useState, useContext } from 'react';
import { financeContext } from '@/lib/store/finance-context';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  // Context
  const { expenses, addExpenseItem, addCategory } = useContext(financeContext);
  // State
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddExpense, setShowAddExpense] = useState(false);
  // Ref
  const titleRef = useRef<HTMLInputElement | null>(null);
  const colorRef = useRef<HTMLInputElement | null>(null);

  // Handler Functions
  const addExpenseItemHandler = async () => {
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

    try {
      await addExpenseItem(selectedCategory, newExpense);
      setExpenseAmount(0);
      setSelectedCategory(null);
      onClose();
      toast.success('Expense added!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };
  const addCategoryHandler = async () => {
    const title = titleRef.current?.value || '';
    const color = colorRef.current?.value || '';

    try {
      await addCategory({ title, color, total: 0 });
      setShowAddExpense(false);
      toast.success('Category created!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
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
          <div className="flex items-center justify-between">
            <h3 className="text-2xl capitalize">Select expense category:</h3>
            <button
              className="text-lime-400"
              onClick={() => setShowAddExpense(true)}
            >
              + New Category
            </button>
          </div>

          {showAddExpense && (
            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Enter Title"
                ref={titleRef}
              />

              <label htmlFor="">Pick Color</label>
              <input
                type="color"
                ref={colorRef}
                className="w-24 h-10"
              />
              <button
                className="btn btn-primary-outline"
                onClick={addCategoryHandler}
              >
                Create
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setShowAddExpense(false)}
              >
                Cancel
              </button>
            </div>
          )}
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
