export function formatDate(inputDate) {
  const date = new Date(inputDate);
  const currentDate = new Date();
  const timeDifference = Math.floor((currentDate - date) / 1000);

  if (timeDifference < 120) {
    return 'Just now';
  } else if (timeDifference < 3600) {
    return `${Math.floor(timeDifference / 60)} minute${Math.floor(timeDifference / 60) > 1 ? 's' : ''} ago`;
  } else if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    return `${Math.floor(timeDifference / 3600)} hour${Math.floor(timeDifference / 3600) > 1 ? 's' : ''} ago`;
  } else if (
    date.getDate() === currentDate.getDate() - 1 &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    return 'Yesterday';
  } else {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}, ${date.getFullYear()}`;
  }
}