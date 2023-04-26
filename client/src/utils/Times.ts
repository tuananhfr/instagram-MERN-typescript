export function getTimesToWeekAgoString(date: string): string {
  const now = new Date();
  const createAt: Date = new Date(date);
  const diff = now.getTime() - createAt.getTime(); // Difference in milliseconds
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks >= 1) {
    return `${weeks}${weeks >= 1 ? "w" : ""} `;
  } else if (days >= 1) {
    return `${days}${days >= 1 ? "d" : ""} `;
  } else if (hours >= 1) {
    return `${hours}${hours >= 1 ? "h" : ""} `;
  } else if (minutes >= 1) {
    return `${minutes}${minutes >= 1 ? "m" : ""} `;
  } else {
    return `${seconds}${seconds >= 1 ? "s" : ""}`;
  }
}

export function getTimesString_1(date: string): string {
  const createAt: Date = new Date(date);

  const dateString: string = createAt.toLocaleDateString(undefined, {
    year: "numeric",

    month: "short",
    day: "numeric",
  });
  return dateString;
}

export function getTimesString_2(date: string): string {
  const createAt: Date = new Date(date);

  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName: string = monthNames[createAt.getMonth()];
  const day: number = createAt.getDate();
  const year: number = createAt.getFullYear();

  return `${monthName} ${day}, ${year}`;
}

export function getTimesToWeekAgoAndGetTimesString(date: string): string {
  const now = new Date();
  const createAt: Date = new Date(date);
  const diff = now.getTime() - createAt.getTime(); // Difference in milliseconds
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName: string = monthNames[createAt.getMonth()];
  const day: number = createAt.getDate();
  const year: number = createAt.getFullYear();
  if (weeks > 4) {
    return `${monthName} ${day}, ${year}`;
  } else if (weeks >= 1 && weeks <= 4) {
    return `${weeks} ${weeks >= 1 ? "weeks ago" : ""} `;
  } else if (days >= 1) {
    return `${days} ${days >= 1 ? "days ago" : ""} `;
  } else if (hours >= 1) {
    return `${hours} ${hours >= 1 ? "hours ago" : ""} `;
  } else if (minutes >= 1) {
    return `${minutes} ${minutes >= 1 ? "minutes ago" : ""} `;
  } else {
    return `${seconds} ${seconds >= 1 ? "seconds ago" : ""}`;
  }
}

export function getTimesMessagesString(date: string): string {
  const now = new Date();
  const createdAt = new Date(date);

  if (now.getTime() - createdAt.getTime() < 24 * 60 * 60 * 1000) {
    // Less than a day ago
    const hours = createdAt.getHours();
    const minutes = createdAt.getMinutes();
    const amPm = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${amPm}`;
  } else if (now.getTime() - createdAt.getTime() < 2 * 24 * 60 * 60 * 1000) {
    // Yesterday
    const hours = createdAt.getHours();
    const minutes = createdAt.getMinutes();
    const amPm = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `Yesterday ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${amPm}`;
  } else if (now.getTime() - createdAt.getTime() < 7 * 24 * 60 * 60 * 1000) {
    // Within the last week
    const dayOfWeekNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = dayOfWeekNames[createdAt.getDay()];
    const hours = createdAt.getHours();
    const minutes = createdAt.getMinutes();
    const amPm = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${dayOfWeek} ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${amPm}`;
  } else {
    // More than a week ago
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[createdAt.getMonth()];
    const day = createdAt.getDate();
    const year = createdAt.getFullYear();
    const hours = createdAt.getHours();
    const minutes = createdAt.getMinutes();
    const amPm = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${monthName} ${day}, ${year} ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${amPm}`;
  }
}
