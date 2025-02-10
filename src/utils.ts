export function formatDuration(ms: number): string {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function getFormattedDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getFormattedTime(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

// Holiday list for 2025 (example)
const HOLIDAYS: Record<string, string[]> = {
  '1/1': ['New Year\'s Day'],
  '1/20': ['Martin Luther King Jr. Day'],
  '2/14': ['Valentine\'s Day'],
  '2/17': ['Presidents\' Day'],
  '5/26': ['Memorial Day'],
  '7/4': ['Independence Day'],
  '9/1': ['Labor Day'],
  '10/31': ['Halloween'],
  '11/27': ['Thanksgiving Day'],
  '12/25': ['Christmas Day'],
  '12/31': ['New Year\'s Eve']
};

export function getHolidays(): string[] {
  const today = new Date();
  const key = `${today.getMonth() + 1}/${today.getDate()}`;
  return HOLIDAYS[key] || [];
}