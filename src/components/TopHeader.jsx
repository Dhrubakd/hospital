import { useState, useEffect } from "react";
import { FaPhone, FaClock, FaMapMarkerAlt, FaAmbulance } from "react-icons/fa";

const TopHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
        color: "white",
        padding: "0.75rem 0",
        fontSize: "0.875rem",
        position: "fixed",
        top: isVisible ? "0" : "-100px",
        left: 0,
        right: 0,
        zIndex: 1001,
        transition: "top 0.3s ease-in-out",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Emergency */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              background: "rgba(239, 68, 68, 0.9)",
              padding: "0.375rem 0.625rem",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: "600",
            }}
          >
            <FaPhone style={{ fontSize: "0.875rem" }} />
            <span>EMERGENCY</span>
          </div>
          <a
            href="tel:01-5971606"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "1rem",
            }}
          >
            01-5971606
          </a>
        </div>

        {/* Working Hours */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <FaClock style={{ fontSize: "1rem", color: "#fbbf24" }} />
          <span style={{ fontWeight: "500" }}>
            <strong>WORKING HOURS</strong>
          </span>
          <span style={{ opacity: "0.9", marginLeft: "0.25rem" }}>
            Sunday-Friday 07:00 AM-07:00 PM
          </span>
        </div>

        {/* Location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <FaMapMarkerAlt style={{ fontSize: "1rem", color: "#10b981" }} />
          <span style={{ fontWeight: "500" }}>
            <strong>LOCATION</strong>
          </span>
          <span style={{ opacity: "0.9", marginLeft: "0.25rem" }}>
            Chabahil Chowk, Kathmandu, Nepal
          </span>
        </div>

        {/* Emergency Services */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <FaAmbulance style={{ fontSize: "1rem", color: "#ef4444" }} />
          <span
            style={{
              fontWeight: "700",
              color: "#fbbf24",
              fontSize: "1rem",
            }}
          >
            EMERGENCY SERVICES 24 Hours
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
