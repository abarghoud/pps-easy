export const isValidEventDate = (dateString: string): boolean => {
  const regex = /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;

  if (!regex.test(dateString)) return false;

  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  const isValidDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  if (isValidDate) {
    const today = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);
    return date <= threeMonthsFromNow;
  }

  return false;
};

export const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
