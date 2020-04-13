class timeUtil {
  static calcTimeDifference(epoch) {
    const years = Math.floor(epoch / 31556926000);
    const totalMonths = epoch % 31556926000;

    const months = Math.floor(totalMonths / 2628000000);
    const totalDays = totalMonths % 2628000000;

    const days = Math.floor(totalDays / 86400000);
    const totalHours = totalDays % 86400000;

    const hours = Math.floor(totalHours / 3600000);
    const totalMinutes = totalHours % 3600000;

    const minutes = Math.floor(totalMinutes / 60000);
    const totalSeconds = totalMinutes % 60000;

    const seconds = Math.floor(totalSeconds / 1000);

    return { years, months, days, hours, minutes, seconds };
  }
}

module.exports = timeUtil;
