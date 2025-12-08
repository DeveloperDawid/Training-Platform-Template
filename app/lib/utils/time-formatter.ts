/**
 * Format time in milliseconds to MM:SS display format
 * @param timeMs Time in milliseconds
 * @returns Formatted time string (MM:SS)
 */
export const formatTime = (timeMs: number): string => {
  const totalSeconds = Math.floor(timeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Format time in seconds to human readable format (e.g. "1h 30m 45s")
 * @param seconds Time in seconds
 * @returns Formatted time string
 */
export const formatTimeFromSeconds = (seconds: number | null): string => {
  if (seconds === null || seconds === undefined) return "0m";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
};

/**
 * Format date string to localized date format
 * @param dateString ISO date string or null
 * @returns Formatted date string or "Never" if null
 */
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "Never";
  return new Date(dateString).toLocaleDateString();
};
