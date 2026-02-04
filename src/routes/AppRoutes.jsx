import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Doctors from "../pages/public/Doctors";
import Departments from "../pages/public/Departments";
import Contact from "../pages/public/Contact";
import Services from "../pages/public/Services";

// Auth Pages
import Login from "../auth/Login";
import Register from "../auth/Register";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminDoctors from "../pages/admin/Doctors";
import AdminAppointments from "../pages/admin/Appointments";
import AdminDepartments from "../pages/admin/Departments";
import AdminReceptionists from "../pages/admin/Receptionists";
import AdminBills from "../pages/admin/Bills";
import ContactMessages from "../pages/admin/ContactMessages";

// Doctor Pages
import DoctorDashboard from "../pages/doctor/Dashboard";
import DoctorAppointments from "../pages/doctor/Appointments";
import Prescription from "../pages/doctor/Prescription";

// Patient Pages
import PatientDashboard from "../pages/patient/Dashboard";
import PatientBookAppointment from "../pages/patient/BookAppointment";
import MyAppointments from "../pages/patient/MyAppointments";
import MyBills from "../pages/patient/MyBills";
import MyMedicalRecords from "../pages/patient/MyMedicalRecords";
import MyPrescriptions from "../pages/patient/MyPrescriptions";

// Receptionist Pages
import ReceptionistDashboard from "../pages/receptionist/Dashboard";
import ReceptionistBills from "../pages/receptionist/Bills";
import ReceptionistAppointments from "../pages/receptionist/Appointments";
import ReceptionistDoctors from "../pages/receptionist/Doctors";

// Layout wrapper for public pages
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/doctors" element={<PublicLayout><Doctors /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/departments" element={<PublicLayout><Departments /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      
      {/* Auth Routes - Keep for direct access/bookmarks */}
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/doctors"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDoctors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/appointments"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/departments"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDepartments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/receptionists"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminReceptionists />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/bills"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminBills />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/contact-messages"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ContactMessages />
          </ProtectedRoute>
        }
      />

      {/* Doctor Routes */}
      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/appointments"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/prescriptions"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Prescription />
          </ProtectedRoute>
        }
      />

      {/* Patient Routes */}
      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/bills"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyBills />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/medical-records"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyMedicalRecords />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/book-appointment"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientBookAppointment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/appointments"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/prescriptions"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyPrescriptions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/bills"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyBills />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/medical-records"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyMedicalRecords />
          </ProtectedRoute>
        }
      />

      {/* Receptionist Routes */}
      <Route
        path="/receptionist/dashboard"
        element={
          <ProtectedRoute allowedRoles={["receptionist"]}>
            <ReceptionistDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/receptionist/appointments"
        element={
          <ProtectedRoute allowedRoles={["receptionist"]}>
            <ReceptionistAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/receptionist/doctors"
        element={
          <ProtectedRoute allowedRoles={["receptionist"]}>
            <ReceptionistDoctors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/receptionist/bills"
        element={
          <ProtectedRoute allowedRoles={["receptionist"]}>
            <ReceptionistBills />
          </ProtectedRoute>
        }
      />

      {/* Default Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
