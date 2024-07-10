const truncateTitle = (title, charLength = 18) => {
  return title.length > 18 ? title.substring(0, charLength) + "..." : title;
};

export default truncateTitle;
