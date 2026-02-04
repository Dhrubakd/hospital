import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaEnvelopeOpen, FaReply, FaTrash } from "react-icons/fa";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredMessages(messages);
    } else {
      setFilteredMessages(messages.filter(msg => msg.status === filter));
    }
  }, [filter, messages]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("/api/contact");
      if (response.data.success) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      toast.error("Failed to fetch messages");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/contact/${id}/status`, { status });
      toast.success("Status updated successfully");
      fetchMessages();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await axios.delete(`/api/contact/${id}`);
      toast.success("Message deleted successfully");
      fetchMessages();
      setSelectedMessage(null);
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new": return { bg: "linear-gradient(135deg, #fef3c7, #fde047)", color: "#854d0e", border: "#facc15" };
      case "read": return { bg: "linear-gradient(135deg, #dbeafe, #93c5fd)", color: "#1e40af", border: "#60a5fa" };
      case "replied": return { bg: "linear-gradient(135deg, #d1fae5, #6ee7b7)", color: "#065f46", border: "#34d399" };
      default: return { bg: "#e5e7eb", color: "#6b7280", border: "#d1d5db" };
    }
  };

  return (
    <AdminLayout>
      <div>
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            📧 Contact Messages
          </h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.1rem', fontWeight: '500' }}>
            View and manage messages from the contact form
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[
            { value: "all", label: "All Messages", icon: "📬" },
            { value: "new", label: "New", icon: "🆕" },
            { value: "read", label: "Read", icon: "👁️" },
            { value: "replied", label: "Replied", icon: "✅" }
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              style={{
                padding: '0.875rem 1.75rem',
                background: filter === tab.value 
                  ? 'linear-gradient(135deg, #3b82f6, #2563eb)' 
                  : 'white',
                color: filter === tab.value ? 'white' : '#6b7280',
                border: filter === tab.value ? 'none' : '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: filter === tab.value 
                  ? '0 4px 12px rgba(59, 130, 246, 0.3)' 
                  : '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}
              onMouseOver={(e) => {
                if (filter !== tab.value) {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.color = '#3b82f6';
                }
              }}
              onMouseOut={(e) => {
                if (filter !== tab.value) {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.color = '#6b7280';
                }
              }}
            >
              {tab.icon} {tab.label} {tab.value === "all" ? `(${messages.length})` : `(${messages.filter(m => m.status === tab.value).length})`}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selectedMessage ? '1fr 1.5fr' : '1fr', gap: '2rem' }}>
          {/* Messages List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => {
                const statusStyle = getStatusColor(message.status);
                return (
                  <div
                    key={message.id}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (message.status === 'new') {
                        updateStatus(message.id, 'read');
                      }
                    }}
                    style={{
                      padding: '1.5rem',
                      background: selectedMessage?.id === message.id 
                        ? 'linear-gradient(to right, #eff6ff, #dbeafe)' 
                        : 'white',
                      border: selectedMessage?.id === message.id 
                        ? '2px solid #3b82f6' 
                        : '2px solid #e5e7eb',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: selectedMessage?.id === message.id 
                        ? '0 8px 20px rgba(59, 130, 246, 0.2)' 
                        : '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseOver={(e) => {
                      if (selectedMessage?.id !== message.id) {
                        e.currentTarget.style.borderColor = '#3b82f6';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.15)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedMessage?.id !== message.id) {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {message.status === 'new' ? <FaEnvelope style={{ color: '#3b82f6' }} /> : <FaEnvelopeOpen style={{ color: '#6b7280' }} />}
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--dark)' }}>
                          {message.name}
                        </h3>
                      </div>
                      <span
                        style={{
                          padding: '0.375rem 0.875rem',
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          border: `2px solid ${statusStyle.border}`,
                          borderRadius: '16px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          textTransform: 'uppercase'
                        }}
                      >
                        {message.status}
                      </span>
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      {message.email} {message.phone && `• ${message.phone}`}
                    </p>
                    <p style={{ fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      {message.subject || "No subject"}
                    </p>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '0.875rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {message.message}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.75rem' }}>
                      {formatDate(message.created_at)} {formatTime(message.created_at.split('T')[1]?.slice(0, 5) || '00:00')}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
                <p style={{ fontSize: '1.25rem', color: 'var(--gray)', fontWeight: '600' }}>
                  No messages found
                </p>
              </div>
            )}
          </div>

          {/* Message Detail */}
          {selectedMessage && (
            <div className="card" style={{ padding: '2rem', maxHeight: '80vh', overflowY: 'auto' }}>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>
                      {selectedMessage.name}
                    </h2>
                    <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                      📧 {selectedMessage.email}
                    </p>
                    {selectedMessage.phone && (
                      <p style={{ color: '#6b7280' }}>
                        📱 {selectedMessage.phone}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#f3f4f6',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      color: '#6b7280'
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: '#374151' }}>
                    Subject
                  </h3>
                  <p style={{ color: '#6b7280' }}>
                    {selectedMessage.subject || "No subject"}
                  </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', color: '#374151' }}>
                    Message
                  </h3>
                  <div style={{ 
                    padding: '1.5rem', 
                    background: '#f9fafb', 
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <p style={{ color: '#374151', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '2rem' }}>
                  Received: {formatDate(selectedMessage.created_at)} at {formatTime(selectedMessage.created_at.split('T')[1]?.slice(0, 5) || '00:00')}
                </p>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {selectedMessage.status !== 'replied' && (
                    <button
                      onClick={() => updateStatus(selectedMessage.id, 'replied')}
                      style={{
                        flex: 1,
                        padding: '0.875rem',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                      }}
                    >
                      <FaReply /> Mark as Replied
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    style={{
                      padding: '0.875rem 1.5rem',
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
                    }}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactMessages;
