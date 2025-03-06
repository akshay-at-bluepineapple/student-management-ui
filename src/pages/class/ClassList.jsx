import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllClass,
  insertClassRecord,
  updateClassFees,
} from "../../redux/slices/student/studentSlice";

const ClassList = () => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [className, setClassName] = useState("");
  const [totalFees, setTotalFees] = useState("");
  const [selectedClassId, setSelectedClassId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllClass());
  }, [dispatch]);

  const { classList, isLoading, error } = useSelector((state) => state.student);
  console.log("error: ", error);
  console.log("isLoading: ", isLoading);
  console.log("classList: ", classList);

  const handleAddClass = () => {
    const data = { class_name: className, total_fees: totalFees };
    dispatch(insertClassRecord(data));
    dispatch(fetchAllClass());
    setIsModalOpen(false);
    setClassName("");
    setTotalFees("");
  };

  const handleRowClick = (classItem) => {
    setSelectedClassId(classItem.id);
    setClassName(classItem.class_name);
    setTotalFees(classItem.total_fees);
    setIsEditModalOpen(true);
  };

  const handleUpdateClass = async () => {
    if (selectedClassId !== null) {
      await dispatch(
        updateClassFees({ class_id: selectedClassId, total_fees: totalFees })
      );
      dispatch(fetchAllClass());
      setIsEditModalOpen(false);
    }
  };

  return (
    <section className="p-6 mx-auto mt-8 font-mono">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Class List</h2>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          ➕ Add Class
        </button>
      </div>

      {isLoading ? (
        <p className="text-center text-blue-500">Loading classes...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="font-semibold tracking-wide text-left text-gray-900 uppercase bg-gray-100 border-b border-gray-600 text-md">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Class Name</th>
                  <th className="px-4 py-3">Total Fees</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {classList?.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="py-4 text-center text-gray-500">
                      No classes found.
                    </td>
                  </tr>
                ) : (
                  classList?.map((classItem) => (
                    <tr
                      className="text-gray-700 cursor-pointer hover:bg-gray-100"
                      key={classItem.id}
                      onClick={() => handleRowClick(classItem)}
                    >
                      <td className="px-4 py-3 border">{classItem.id}</td>
                      <td className="px-4 py-3 border">
                        {classItem.class_name}
                      </td>
                      <td className="px-4 py-3 border">
                        {classItem.total_fees}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded shadow-lg w-96">
            <h3 className="mb-4 text-lg font-bold">Add New Class</h3>
            <input
              type="text"
              placeholder="Class Name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="number"
              placeholder="Total Fees"
              value={totalFees}
              onChange={(e) => setTotalFees(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 text-white bg-gray-500 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded"
                onClick={handleAddClass}
              >
                Add Class
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded shadow-lg w-96">
            <h3 className="mb-4 text-lg font-bold">Update Class Fees</h3>
            <input
              type="text"
              value={className}
              disabled
              className="w-full p-2 mb-4 bg-gray-100 border rounded"
            />
            <input
              type="number"
              placeholder="Total Fees"
              value={totalFees}
              onChange={(e) => setTotalFees(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 text-white bg-gray-500 rounded"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded"
                onClick={handleUpdateClass}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClassList;
