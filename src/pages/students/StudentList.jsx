import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { fetchAllStudents } from "../../redux/slices/student/studentSlice";

const StudentList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllStudents());
  }, [dispatch]);

  const { studentList, isLoading, error } = useSelector(
    (state) => state.student
  );

  const encryptId = (id) => {
    return encodeURIComponent(
      CryptoJS.AES.encrypt(id.toString(), "secretKey").toString()
    );
  };

  const handleRowClick = (id) => {
    const encryptedId = encryptId(id);
    navigate(`/student-details?studentId=${encryptedId}`);
  };

  return (
    <section className="p-6 mx-auto mt-8 font-mono">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Student List</h2>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
          onClick={() => navigate("/new-admission")}
        >
          ➕ New Admission
        </button>
      </div>

      {isLoading ? (
        <p className="text-center text-blue-500">Loading students...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="font-semibold tracking-wide text-left text-gray-900 uppercase bg-gray-100 border-b border-gray-600 text-md">
                  <th className="px-4 py-3">Reg. No</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Phone Number</th>
                  <th className="px-4 py-3">Fee Status</th>
                  <th className="px-4 py-3">Paid Fees</th>
                  <th className="px-4 py-3">Pending Fees Fees</th>
                  <th className="px-4 py-3">Total Fees</th>
                  <th className="px-4 py-3">DOB</th>
                  <th className="px-4 py-3">Enrollment Date</th>
                  <th className="px-4 py-3">Is Active</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {studentList.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="py-4 text-center text-gray-500">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  studentList.map((student) => (
                    <tr
                      className="text-gray-700 cursor-pointer hover:bg-gray-100"
                      key={student.id}
                      onClick={() => handleRowClick(student.id)}
                    >
                      <td className="px-4 py-3 border">
                        {student.registrationNo}
                      </td>
                      <td className="px-4 py-3 border">{student.fullname}</td>
                      <td className="px-4 py-3 border">{student.age}</td>
                      <td className="px-4 py-3 border">
                        {student.class_enrolled}
                      </td>
                      <td className="px-4 py-3 border">
                        {student.phoneNumber}
                      </td>
                      <td className="px-4 py-3 border">
                        {student.pen_fees === "0.00" ? "Paid" : "Pending"}
                      </td>
                      <td className="px-4 py-3 border">
                        {student.total_fees_paid}
                      </td>
                      <td className="px-4 py-3 border">{student.pen_fees}</td>
                      <td className="px-4 py-3 border">{student.total_fees}</td>
                      <td className="px-4 py-3 border">
                        {student.academic_year}
                      </td>
                      <td className="px-4 py-3 border">
                        {student.enrollment_date}
                      </td>
                      <td className="px-4 py-3 border">
                        {student.is_active ? (
                          <span className="px-2 py-1 text-green-700 bg-green-100 rounded">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-red-700 bg-red-100 rounded">
                            Inactive
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default StudentList;
