// An utility to get date based on count. This helps to get currency based on history.
// For now the past days is five days. 
export default function getDateBeforeDays(days = 0) {
  const date = new Date();
  const pastDate = date.getDate() - days;
  date.setDate(pastDate);
  return date.toJSON().slice(0, 10);
}
