/* eslint-disable react/prop-types */

const ReceiptModal = ({ receiptData, studentData, onClose }) => {
  if (!receiptData || !studentData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-1/2 p-6 mx-12 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-center">Payment Receipt</h2>

        <div className="p-4 bg-gray-100 rounded-lg shadow">
          {/* Organization Name */}
          <div className="mb-4 text-center">
            <h3 className="text-lg font-bold">🏫 ABC Institution</h3>
            <p className="text-sm text-gray-600">123 Main Street, City, Country</p>
          </div>

          <div className="my-2 border-t border-gray-300"></div>

          {/* Receipt Table */}
          <table className="w-full text-sm border border-collapse border-gray-300">
            <tbody>
              <tr>
                <td className="px-4 py-2 font-semibold bg-gray-200 border">Student Name:</td>
                <td className="px-4 py-2 border">{studentData.fullname}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold bg-gray-200 border">Receipt No:</td>
                <td className="px-4 py-2 border">#{receiptData.id || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold bg-gray-200 border">Reg No:</td>
                <td className="px-4 py-2 border">{studentData.registrationNo}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold bg-gray-200 border">Class:</td>
                <td className="px-4 py-2 border">{studentData.class_enrolled}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold bg-gray-200 border">Date of Payment:</td>
                <td className="px-4 py-2 border">{receiptData.payment_date}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold bg-gray-200 border">Total Fees:</td>
                <td className="px-4 py-2 border">${studentData.total_fees}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold bg-gray-200 border">Paid Fees:</td>
                <td className="px-4 py-2 border">${receiptData.amount}</td>
              </tr>
            </tbody>
          </table>

          <div className="my-4 border-t border-gray-300"></div>

          {/* Footer Message */}
          <div className="text-center">
            <p className="text-sm text-gray-500">Thank you for your payment!</p>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-4 space-x-2">
          <button className="px-4 py-2 text-white bg-gray-500 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
