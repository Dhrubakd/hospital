// Date formatting - returns only date (YYYY-MM-DD format or localized)
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  // Return in YYYY-MM-DD format
  return date.toLocaleDateString('en-CA'); // en-CA gives YYYY-MM-DD format
};

// Time formatting - returns 12-hour format with AM/PM
export const formatTime = (timeString) => {
  if (!timeString) return '';
  
  // If timeString is already in HH:MM format
  const [hours, minutes] = timeString.split(':');
  let hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12; // Convert to 12-hour format
  
  return `${hour}:${minutes} ${ampm}`;
};

// DateTime formatting - returns date and time separately
export const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return { date: '', time: '' };
  const dateTime = new Date(dateTimeString);
  
  return {
    date: dateTime.toLocaleDateString('en-CA'),
    time: dateTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  };
};

// Currency formatting for NPR
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return 'NPR 0.00';
  return `NPR ${parseFloat(amount).toFixed(2)}`;
};

// Short currency format for NPR
export const formatCurrencyShort = (amount) => {
  if (!amount && amount !== 0) return 'Rs. 0';
  return `Rs. ${parseFloat(amount).toLocaleString('en-NP')}`;
};
