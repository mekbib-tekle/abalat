export const getWeekMap = (dateStr: string): string => {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      return "";
    }

    const today = new Date();
  
    // Calculate the difference in milliseconds
    const diffInMs = today.getTime() - date.getTime();
  
    // Convert milliseconds to weeks (rounded down)
    const weeksAgo = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
  
    let mapping: string;
    if (weeksAgo === 0) {
      mapping = "this week";
    } else if (weeksAgo === 1) {
      mapping = "last week";
    } else if (weeksAgo <= 4) {
      mapping = `${weeksAgo} weeks ago`;
    } else {
      mapping = "> 4 weeks ago";
    }
  
    return mapping;
  }