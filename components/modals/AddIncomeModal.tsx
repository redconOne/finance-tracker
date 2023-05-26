import { useRef, useContext } from 'react';
import { currencyFormatter } from '@/lib/utils';
import { financeContext } from '@/lib/store/finance-context';
import { authContext } from '@/lib/store/auth-context';
import { FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Modal from '@/components/Modal';

interface ModalProps {
  show: boolean;
  onClose: Function;
}

type IncomeEntry = {
  id: string;
  amount: number;
  createdAt: Date;
  description: string | undefined;
};

function AddIncomeModal({ show, onClose }: ModalProps) {
  const amountRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const { income, addIncomeItem, removeIncomeItem } =
    useContext(financeContext);
  const { user } = useContext(authContext);

  const addIncomeHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const newIncome = {
      uid: user.uid,
      amount: amountRef.current?.value ? +amountRef.current?.value : 0,
      description: descriptionRef.current?.value,
      createdAt: new Date(),
    };

    try {
      await addIncomeItem(newIncome);
      if (descriptionRef.current) descriptionRef.current.value = '';
      if (amountRef.current) amountRef.current.value = '';
      toast.success('Income added!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const deleteIncomeEntryHandler = async (incomeId: string) => {
    try {
      await removeIncomeItem(incomeId);
      if (descriptionRef.current) descriptionRef.current.value = '';
      if (amountRef.current) amountRef.current.value = '';
      toast.success('Income deleted!');
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

        {income.map((entry: IncomeEntry) => {
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
  );
}

export default AddIncomeModal;
