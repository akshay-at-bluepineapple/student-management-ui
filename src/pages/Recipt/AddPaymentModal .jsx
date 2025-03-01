/* eslint-disable react/prop-types */
const AddPaymentModal = ({ showModal, onClose, paymentData, handleInputChange, handleSave }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Add Payment</h2>

        <label className="block mb-2">Payment Date:</label>
        <input
          type="date"
          name="payment_date"
          value={paymentData.payment_date}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />

        <label className="block mt-4 mb-2">Amount:</label>
        <input
          type="number"
          name="amount"
          value={paymentData.amount}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />

        <label className="block mt-4 mb-2">Payment Type:</label>
        <select
          name="payment_type"
          value={paymentData.payment_type}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <div className="flex justify-end mt-4 space-x-2">
          <button className="px-4 py-2 text-white bg-gray-500 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 text-white bg-green-500 rounded" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentModal;
