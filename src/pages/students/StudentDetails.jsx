import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";

const students = [
  {
    regNo: "1001",
    name: "Sufyan",
    age: 22,
    email: "sufyan@example.com",
    course: "Computer Science",
    phone: "123-456-7890",
    address: "123 Main St, City",
    totalFeesPaid: 5000,
    pendingFees: 2000,
    classEnrolledId: "12A",
    totalFees: 7000,
    academicYear: "2023-2024",
    enrollmentDate: "6/10/2018",
    isActive: true,
    profilePhoto:
      "https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    paymentHistory: [
      {
        paymentDate: "01/01/2023",
        amountPaid: 2000,
        paymentType: "Credit Card",
      },
      {
        paymentDate: "06/05/2023",
        amountPaid: 3000,
        paymentType: "Bank Transfer",
      },
    ],
  },
];

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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encryptedId = queryParams.get("studentId");

  const [student, setStudent] = useState(null);
  const [filterYear, setFilterYear] = useState("");

  useEffect(() => {
    if (encryptedId) {
      const studentId = decryptId(encryptedId);
      const foundStudent = students.find((s) => s.regNo === studentId);
      setStudent(foundStudent);
    }
  }, [encryptedId]);

  if (!student)
    return <p className="text-center text-red-500">Student not found.</p>;

  return (
    <div className="max-w-5xl p-8 mx-auto my-10 bg-white rounded-lg shadow-lg md:p-6 sm:p-4">
      <div className="flex flex-col items-center pb-6 space-y-6 border-b md:flex-row md:space-y-0 md:space-x-6">
        <img
          className="w-32 h-32 rounded-full shadow-md"
          src={student.profilePhoto}
          alt="Profile"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold">{student.name}</h2>
          <p className="text-gray-600">Reg. No: {student.regNo}</p>
          <p className="text-gray-600">Age: {student.age}</p>
          <p className="text-gray-600">Email: {student.email}</p>
          <p className="text-gray-600">Phone: {student.phone}</p>
          <p className="text-gray-600">Address: {student.address}</p>
        </div>
        <div className="flex flex-col w-full mt-4 space-y-2 md:flex-row md:space-x-4 md:space-y-0">
          <button className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow md:w-auto">
            Update
          </button>
          <span
            className={`w-full md:w-auto px-4 py-2 text-white text-lg text-center rounded-full ${
              student.isActive ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {student.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h3 className="mb-2 text-lg font-semibold">Academic Details</h3>
          <p>Course: {student.course}</p>
          <p>Class Enrolled: {student.classEnrolledId}</p>
          <p>Academic Year: {student.academicYear}</p>
          <p>Enrollment Date: {student.enrollmentDate}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h3 className="mb-2 text-lg font-semibold">Fee Details</h3>
          <p>Total Fees: ${student.totalFees}</p>
          <p>Fees Paid: ${student.totalFeesPaid}</p>
          <p>Pending Fees: ${student.pendingFees}</p>
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
              student.paymentHistory.map((p) => p.paymentDate.split("/")[2])
            ),
          ].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button className="w-full px-4 py-2 text-white bg-green-500 rounded shadow">
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
          {student.paymentHistory
            .filter((p) => !filterYear || p.paymentDate.includes(filterYear))
            .map((payment, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{payment.paymentDate}</td>
                <td className="px-4 py-2">${payment.amountPaid}</td>
                <td className="px-4 py-2">{payment.paymentType}</td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 text-white bg-blue-500 rounded">
                    Download Receipt
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetail;
