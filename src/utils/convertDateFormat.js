// Utility function to convert month number to words
function monthToWords(monthNumber) {
    const months = [
        '', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber];
}

// Convert numeric YYYY-MM-DD date to desired format
function convertDateFormat(numericDate) {
    const [year, month, day] = numericDate.split('-').map(Number);
    const monthWord = monthToWords(month);

    return `${day} ${monthWord}, ${year}`;
}

export default convertDateFormat