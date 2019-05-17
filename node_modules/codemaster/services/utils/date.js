const max = (dateArray) => {
  let max = new Date(dateArray[0]);
  for (let i = 0; i < dateArray.length; i++) {
    const currentDate = new Date(dateArray[i]);
    if (currentDate.getTime() > max.getTime()) max = currentDate;
  }
  return max;
};


module.exports = {
  max,
};
