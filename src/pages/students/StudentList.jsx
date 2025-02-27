import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const StudentList = () => {
  const navigate = useNavigate();

  const data = [
    { regNo: "1001", name: "Sufyan", age: 22, class: "12A", phone: "123-456-7890", feeStatus: "Paid", dob: "6/4/2000", enrollmentDate: "6/10/2018", isActive: true },
    { regNo: "1002", name: "Stevens", age: 27, class: "Graduate", phone: "987-654-3210", feeStatus: "Pending", dob: "6/10/1995", enrollmentDate: "6/10/2016", isActive: true },
    { regNo: "1003", name: "Nora", age: 17, class: "11B", phone: "456-789-1230", feeStatus: "Unpaid", dob: "6/10/2005", enrollmentDate: "6/10/2021", isActive: false },
    { regNo: "1004", name: "Ali", age: 23, class: "Graduate", phone: "321-654-9870", feeStatus: "Paid", dob: "6/10/1999", enrollmentDate: "6/10/2017", isActive: true },
  ];

  const encryptId = (id) => {
    return encodeURIComponent(CryptoJS.AES.encrypt(id, "secretKey").toString());
  };

  const handleRowClick = (regNo) => {
    const encryptedId = encryptId(regNo);
    navigate(`/student-details?studentId=${encryptedId}`);
  };

  return (
    <section className="container p-6 mx-auto mt-8 font-mono">
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
                <th className="px-4 py-3">DOB</th>
                <th className="px-4 py-3">Enrollment Date</th>
                <th className="px-4 py-3">Is Active</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((person, index) => (
                <tr
                  className="text-gray-700 cursor-pointer hover:bg-gray-100"
                  key={index}
                  onClick={() => handleRowClick(person.regNo)}
                >
                  <td className="px-4 py-3 border">{person.regNo}</td>
                  <td className="px-4 py-3 border">{person.name}</td>
                  <td className="px-4 py-3 border">{person.age}</td>
                  <td className="px-4 py-3 border">{person.class}</td>
                  <td className="px-4 py-3 border">{person.phone}</td>
                  <td className="px-4 py-3 border">{person.feeStatus}</td>
                  <td className="px-4 py-3 border">{person.dob}</td>
                  <td className="px-4 py-3 border">{person.enrollmentDate}</td>
                  <td className="px-4 py-3 border">{person.isActive ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default StudentList;
