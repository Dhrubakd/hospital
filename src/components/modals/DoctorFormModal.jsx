import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const DoctorFormModal = ({ isOpen, onClose, doctor, onSuccess }) => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department_id: "",
    specialization: "",
    consultation_fee: "",
    experience_years: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchDepartments();
      if (doctor) {
        setFormData({
          name: doctor.name || "",
          email: doctor.email || "",
          password: "",
          phone: doctor.phone || "",
          department_id: doctor.department_id || "",
          specialization: doctor.specialization || "",
          consultation_fee: doctor.consultation_fee || "",
          experience_years: doctor.experience_years || "",
        });
      } else {
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          department_id: "",
          specialization: "",
          consultation_fee: "",
          experience_years: "",
        });
      }
    }
  }, [isOpen, doctor]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("/departments");
      setDepartments(response.data.departments || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.department_id || !formData.specialization) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!doctor && !formData.password) {
      toast.error("Password is required for new doctors");
      return;
    }

    setLoading(true);
    try {
      if (doctor) {
        // Update existing doctor
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password;
        }
        await axios.put(`/doctors/${doctor.id}`, updateData);
        toast.success("Doctor updated successfully");
      } else {
        // Create new doctor
        await axios.post("/doctors", formData);
        toast.success("Doctor added successfully");
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          maxWidth: "600px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.5rem",
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "white",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>
            {doctor ? "Edit Doctor" : "Add New Doctor"}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "white",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1.25rem",
              transition: "all 0.2s",
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
          <div style={{ display: "grid", gap: "1.25rem" }}>
            {/* Name */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--dark)" }}>
                Full Name <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "all 0.2s",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--dark)" }}>
                Email <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--dark)" }}>
                Password {!doctor && <span style={{ color: "#ef4444" }}>*</span>}
                {doctor && <span style={{ fontSize: "0.875rem", color: "var(--gray)", fontWeight: "400" }}> (Leave blank to keep current)</span>}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={!doctor}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--dark)" }}>
                Phone <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Department */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--dark)" }}>
                Department <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  backgroundColor: "white",
                }}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialization */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--dark)" }}>
                Specialization <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Two column grid for fee and experience */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {/* Consultation Fee */}
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--dark)" }}>
                  Consultation Fee
                </label>
                <input
                  type="number"
                  name="consultation_fee"
                  value={formData.consultation_fee}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                />
              </div>

              {/* Experience Years */}
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--dark)" }}>
                  Experience (Years)
                </label>
                <input
                  type="number"
                  name="experience_years"
                  value={formData.experience_years}
                  onChange={handleChange}
                  min="0"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                flex: 1,
                padding: "0.875rem",
                border: "2px solid var(--border)",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                backgroundColor: "white",
                color: "var(--dark)",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: "0.875rem",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: "white",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Saving..." : doctor ? "Update Doctor" : "Add Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorFormModal;
