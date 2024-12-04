//timeFormatter
export const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

// dateFormatter.js
export function formatDate(dateString) {
    // Convert the string to a Date object if it's not already a Date
    const date = new Date(dateString);
    
    // Define options for the formatting
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    
    // Create a formatter with US locale
    const formatter = new Intl.DateTimeFormat('en-US', options);
    
    // Format the date and return it in MM/DD/YYYY format
    return formatter.format(date);
  }

// dateFormatter.js
export function formatDateTime(dateTimeString) {
  // Convert the string to a Date object
  const date = new Date(dateTimeString);

  // Define options for the formatting (including time)
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Use 24-hour format
  };

  // Create a formatter with US locale
  const formatter = new Intl.DateTimeFormat('en-US', options);

  // Format the date and time
  const formattedParts = formatter.formatToParts(date);

  // Combine parts into a desired format, e.g., "MM/DD/YYYY HH:mm:ss"
  const formattedDateTime = `${formattedParts.find(p => p.type === 'month').value}/${formattedParts.find(p => p.type === 'day').value}/${formattedParts.find(p => p.type === 'year').value} ${formattedParts.find(p => p.type === 'hour').value}:${formattedParts.find(p => p.type === 'minute').value} ${formattedParts.find(p => p.type === 'dayPeriod').value}`;

  return formattedDateTime;
}
