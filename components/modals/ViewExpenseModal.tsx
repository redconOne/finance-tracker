import Modal from '@/components/Modal';
import { useContext } from 'react';
import { financeContext } from '@/lib/store/finance-context';
import { currencyFormatter } from '@/lib/utils';
import { FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
type ViewExpenseModalProps = {
  show: boolean;
  onClose: Function;
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
  createdAt: any;
  id: string;
};

function ViewExpenseModal({ show, onClose, expense }: ViewExpenseModalProps) {
  const { removeExpenseItem, removeCategory } = useContext(financeContext);

  const deleteExpenseItemHandler = async (item: ExpenseEntryItem) => {
    try {
      const updatedItems = expense.items.filter((i) => i.id !== item.id);

      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - item.amount,
      };

      await removeExpenseItem(updatedExpense, expense.id);
      toast.success('Expense item deleted!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };
  const deleteExpenseHandler = async () => {
    try {
      await removeCategory(expense.id);
      toast.success('Expense category deleted!');
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
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">{expense.title}</h2>
        <button
          className="btn btn-danger"
          onClick={deleteExpenseHandler}
        >
          Delete
        </button>
      </div>

      <div>
        <h3 className="my-4 text-2xl">Expense History</h3>
        {expense.items.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-between"
            >
              <small>
                {item.createdAt.toMillis
                  ? new Date(item.createdAt.toMillis()).toISOString()
                  : item.createdAt.toISOString()}
              </small>

              <p className="flex items-center gap-2">
                {currencyFormatter(item.amount)}
                <button onClick={() => deleteExpenseItemHandler(item)}>
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default ViewExpenseModal;
