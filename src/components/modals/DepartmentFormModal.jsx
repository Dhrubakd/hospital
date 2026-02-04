import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const DepartmentFormModal = ({ isOpen, onClose, department, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    head_doctor: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (department) {
        setFormData({
          name: department.name || "",
          description: department.description || "",
          head_doctor: department.head_doctor || "",
        });
      } else {
        setFormData({
          name: "",
          description: "",
          head_doctor: "",
        });
      }
    }
  }, [isOpen, department]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      if (department) {
        // Update existing department
        await axios.put(`/departments/${department.id}`, formData);
        toast.success("Department updated successfully");
      } else {
        // Create new department
        await axios.post("/departments", formData);
        toast.success("Department added successfully");
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
          maxWidth: "550px",
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
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            color: "white",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>
            {department ? "Edit Department" : "Add New Department"}
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
          <div style={{ display: "grid", gap: "1.5rem" }}>
            {/* Name */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--dark)" }}>
                Department Name <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Cardiology, Neurology"
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  border: "2px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "all 0.2s",
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--dark)" }}>
                Description <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Enter department description..."
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  border: "2px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {/* Head Doctor */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--dark)" }}>
                Head Doctor <span style={{ fontSize: "0.875rem", color: "var(--gray)", fontWeight: "400" }}>(Optional)</span>
              </label>
              <input
                type="text"
                name="head_doctor"
                value={formData.head_doctor}
                onChange={handleChange}
                placeholder="e.g., Dr. John Smith"
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  border: "2px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
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
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "white",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Saving..." : department ? "Update Department" : "Add Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentFormModal;
