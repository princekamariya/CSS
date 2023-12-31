function calculateTimeGap(startTime, endTime) {
  const startTimeArray = startTime.split(' ');
  const endTimeArray = endTime.split(' ');

  const startHour = parseInt(startTimeArray[0].split(':')[0]);
  const startMinute = parseInt(startTimeArray[0].split(':')[1]);
  const startPeriod = startTimeArray[1];

  const endHour = parseInt(endTimeArray[0].split(':')[0]);
  const endMinute = parseInt(endTimeArray[0].split(':')[1]);
  const endPeriod = endTimeArray[1];

  let totalMinutes = 0;
  if(startPeriod !== endPeriod && endHour === 12 && startHour !== endHour){
    totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
  } else if(startPeriod === endPeriod && endHour === 12 && startHour !== endHour){
    totalMinutes = (endHour - startHour+12) * 60 + (endMinute - startMinute);
  } else if(startPeriod === endPeriod && startHour === 12 && startHour !== endHour){
    console.log("H");
    totalMinutes = Math.abs(12-startHour - endHour) * 60 + (endMinute - startMinute);
  } else if(startPeriod !== endPeriod && startHour === 12 && startHour !== endHour){
      totalMinutes = (12+endHour)*60 + (endMinute - startMinute);
  } else if(startPeriod !== endPeriod && startHour === 12 && endHour === 12){
      totalMinutes = (12)*60 + (endMinute - startMinute);
  }
  else if (startPeriod === endPeriod) {
    // Same period (AM or PM)
    totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
  } else {
    // Different periods
    totalMinutes = (endHour + 12 * (endPeriod === 'AM') - startHour - 12 * (startPeriod === 'AM')) * 60 +
                   (endMinute - startMinute);
  }

  // Handle cases where the result is 24:00 or 0:00
  if (totalMinutes < 0) {
    totalMinutes += 24 * 60;
  }

  // Convert total minutes to hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Format the result
  const result = `${hours === 0 && minutes === 0 ? '24' : hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return result;
}

// Test cases
console.log(calculateTimeGap('12:00 AM', '2:00 AM')); // Output: 2:00
console.log(calculateTimeGap('10:00 AM', '12:00 AM')); // Output: 14:00
console.log(calculateTimeGap('9:00 PM', '12:00 AM')); // Output: 3:00
console.log(calculateTimeGap('12:00 PM', '5:00 PM'));
console.log(calculateTimeGap('12:10 AM', '12:05 PM'));



// Test case
// console.log(calculateTimeGap('10:00 AM', '12:00 PM')); // Output: 2:00


// // Test cases
// console.log(calculateTimeGap('10:00 AM', '12:00 AM')); // Output: 2:00
// console.log(calculateTimeGap('10:00 PM', '9:00 PM')); // Output: 23:00
// console.log(calculateTimeGap('10:00 AM', '2:00 PM')); // Output: 4:00
// console.log(calculateTimeGap('10:00 PM', '10:00 PM')); // Output: 6:00
// console.log(calculateTimeGap('1:00 AM', '1:00 AM')); // Output: 24:00
