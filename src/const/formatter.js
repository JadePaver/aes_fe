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
  