export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function getFourthDigit(value: string): string {
  return value.slice(-4);
}

export function getDate(): string {
  const date = new Date();
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();

  // Hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${month} ${date.getDate()}, ${year} ${hours}:${minutes} ${ampm}`;
}

export function transformDate(date: Date): string {
  const newDate = new Date(date);
  const month = newDate.toLocaleDateString('en-US', { month: 'long' });
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  return `${month} ${day}, ${year}`;
}

export function shortHoursAndMinutes(date: Date): string {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}