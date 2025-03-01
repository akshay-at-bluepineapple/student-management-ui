import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewStudent } from "../../redux/slices/student/studentSlice";

const NewAdmission = () => {
  const navigate = useNavigate();
  //dispatch action
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullname: "",
    class_enrolled: "",
    age: "",
    email: "",
    course: "",
    phoneNumber: "",
    address: "",
    enrollment_date: "",
    academic_year: "2023-24",
    is_active: true,
  });

  const classOptions = [
    { id: 1, name: "1st" },
    { id: 2, name: "2nd" },
    { id: 3, name: "3rd" },
    { id: 4, name: "4th" },
    { id: 5, name: "5th" },
    { id: 6, name: "6th" },
    { id: 7, name: "7th" },
    { id: 8, name: "8th" },
    { id: 9, name: "9th" },
    { id: 10, name: "10th" },
    { id: 11, name: "12th" },
    { id: 12, name: "BBA" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "is_active") {
      const isActive = value === "true" ? true : false;
      setFormData((prev) => ({ ...prev, [name]: isActive }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (!formData[key]) {
        alert("All fields are required!");
        return;
      }
    }

    const selectedClass = classOptions.find(
      (c) => c.name === formData.class_enrolled
    );
    const classId = selectedClass ? selectedClass.id : null;

    if (!classId) {
      alert("Please select a valid class.");
      return;
    }

    const formattedData = {
      ...formData,
      class_enrolled: classId,
    };

    try {
      await dispatch(createNewStudent(formattedData)).unwrap();
      navigate("/student-list");
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  return (
    <section className="max-w-full p-8 mx-8 mt-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-center">New Admission</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          name="fullname"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        {/* Class Enrolled Dropdown */}
        <select
          className="w-full p-2 border rounded"
          name="class_enrolled"
          onChange={handleChange}
          required
        >
          <option value="">Select Class Enrolled</option>
          {classOptions.map((cls) => (
            <option key={cls.id} value={cls.name}>
              {cls.name}
            </option>
          ))}
        </select>

        <input
          className="w-full p-2 border rounded"
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          name="course"
          placeholder="Course"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="number"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="date"
          name="enrollment_date"
          onChange={handleChange}
          required
        />

        {/* Is Active Radio Buttons */}
        <div className="flex items-center space-x-4">
          <label className="font-semibold">Is Active:</label>
          <label>
            <input
              type="radio"
              name="is_active"
              value="true"
              onChange={handleChange}
              checked
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="is_active"
              value="false"
              onChange={handleChange}
            />{" "}
            No
          </label>
        </div>

        <button className="w-full px-4 py-2 text-white bg-green-500 rounded shadow">
          Submit
        </button>
      </form>
    </section>
  );
};

export default NewAdmission;
