import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentById, insertStudentFeeRecord } from "../../redux/slices/student/studentSlice";
import ReceiptModal from "../Recipt/ReceiptModal";
import AddPaymentModal from "../Recipt/AddPaymentModal ";

const decryptId = (encryptedId) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      decodeURIComponent(encryptedId),
      "secretKey"
    );
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Error decrypting ID:", error);
    return null;
  }
};

const StudentDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encryptedId = queryParams.get("studentId");

  const [filterYear, setFilterYear] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [paymentData, setPaymentData] = useState({
    payment_date: "",
    amount: "",
    payment_type: "monthly",
  });

  useEffect(() => {
    if (encryptedId) {
      fetchStudentDetails()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStudentDetails = () =>{
    const studentId = decryptId(encryptedId);
      dispatch(fetchStudentById(studentId));
  }

  const studentDetail = useSelector((state) => state?.student);
  const { isLoading, studentData, error } = studentDetail;
  console.log("studentData: ", studentData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewReceipt = (payment) => {
    setReceiptData(payment);
  };

  const handleSavePayment = async () => {
    const data = {
      ...paymentData,
      student: decryptId(encryptedId)
    }
    try {
      const response = await dispatch(insertStudentFeeRecord(data)).unwrap();
  
      if (response) {
        await dispatch(fetchStudentById(decryptId(encryptedId)));
      }
  
      setShowModal(false);
    } catch (error) {
      console.error("Error inserting fee record:", error);
    }
  };

  const handleDownloadReceipt = (studentId, paymentId ) => {
    const apiUrl = `${import.meta.env.VITE_BE_URL}/generate-receipt/${studentId}/${paymentId}/`;

    // Create a hidden link element to trigger download
    const link = document.createElement("a");
    link.href = apiUrl;
    link.setAttribute("download", `receipt_${paymentId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!studentData)
    return <p className="text-center text-red-500">Student not found.</p>;


  // **Error State**
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-red-500">⚠️ Error: {error}</p>
        <button
          className="px-4 py-2 mt-4 text-white bg-red-500 rounded shadow"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-full p-8 m-10 bg-white rounded-lg shadow-lg md:p-6 sm:p-4">
        <h2 className="mb-6 text-2xl font-bold text-center">Student Info</h2>

        <div className="flex flex-col items-center pb-6 space-y-6 border-b md:flex-row md:space-y-0 md:space-x-6">
          <img
            className="w-32 h-32 rounded-full shadow-md"
            src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
          />
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse border-gray-300">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold bg-gray-100">
                    Full Name:
                  </td>
                  <td className="px-4 py-2">{studentData.fullname}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold bg-gray-100">
                    Reg. No:
                  </td>
                  <td className="px-4 py-2">{studentData.registrationNo}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold bg-gray-100">Age:</td>
                  <td className="px-4 py-2">{studentData.age}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold bg-gray-100">
                    Email:
                  </td>
                  <td className="px-4 py-2">{studentData.email}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold bg-gray-100">
                    Phone:
                  </td>
                  <td className="px-4 py-2">{studentData.phoneNumber}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold bg-gray-100">
                    Address:
                  </td>
                  <td className="px-4 py-2">{studentData.address}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold bg-gray-100">
                    Status:
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`w-full md:w-auto px-4 py-2 text-white text-lg text-center rounded-full ${
                        studentData.is_active ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {studentData.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="mb-2 text-lg font-semibold">Academic Details</h3>
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse border-gray-300">
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold bg-gray-100">
                      Course:
                    </td>
                    <td className="px-4 py-2">{studentData.course}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold bg-gray-100">
                      Class Enrolled:
                    </td>
                    <td className="px-4 py-2">{studentData.class_enrolled}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold bg-gray-100">
                      Academic Year:
                    </td>
                    <td className="px-4 py-2">{studentData.academic_year}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold bg-gray-100">
                      Enrollment Date:
                    </td>
                    <td className="px-4 py-2">{studentData.enrollment_date}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="mb-2 text-lg font-semibold">Fee Details</h3>
            <table className="w-full border-collapse border-gray-300">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold bg-gray-100">
                    Total Fees:
                  </td>
                  <td className="px-4 py-2">{studentData.total_fees}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold bg-gray-100">
                    Total Fees Paid
                  </td>
                  <td className="px-4 py-2">{studentData.total_fees_paid}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold bg-gray-100">
                    Pending Fees:
                  </td>
                  <td className="px-4 py-2">{studentData.pen_fees}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Payment History</h3>
        <div className="flex flex-col items-center justify-between mt-4 space-x-2 space-y-2 md:flex-row md:space-y-0">
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="">All Years</option>
            {[
              ...new Set(
                studentData.fee_payments.map(
                  (p) => p.payment_date.split("/")[2]
                )
              ),
            ].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button
            className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow"
            onClick={() => setShowModal(true)}
          >
            Add Fee
          </button>
          <button className="w-full px-4 py-2 text-white bg-green-500 rounded shadow" disabled={studentData.fee_payments.length === 0}>
            Download Receipt (Range)
          </button>
        </div>
        <table className="w-full mt-4 text-sm border rounded-lg bg-gray-50">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="px-4 py-2 text-left">Payment Date</th>
              <th className="px-4 py-2 text-left">Amount Paid</th>
              <th className="px-4 py-2 text-left">Payment Type</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentData.fee_payments
              .filter((p) => !filterYear || p.paymentDate.includes(filterYear))
              .map((payment, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{payment.payment_date}</td>
                  <td className="px-4 py-2">${payment.amount}</td>
                  <td className="px-4 py-2">{payment.payment_type}</td>
                  <td className="flex gap-2 px-4 py-2">
                    <button
                      className="px-3 py-1 text-white bg-green-500 rounded"
                      onClick={() => handleViewReceipt(payment)}
                    >
                      View Receipt
                    </button>
                    <button className="px-3 py-1 text-white bg-blue-500 rounded" onClick={() => handleDownloadReceipt(studentData.id, payment.id)}>
                      Download Receipt
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Receipt Modal Component */}
      {receiptData && (
        <ReceiptModal
          receiptData={receiptData}
          studentData={studentData}
          onClose={() => setReceiptData(null)}
        />
      )}

      {/* Add fee Payment */}
      <AddPaymentModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        paymentData={paymentData}
        handleInputChange={handleInputChange}
        handleSave={handleSavePayment}
      />
    </>
  );
};

export default StudentDetail;
