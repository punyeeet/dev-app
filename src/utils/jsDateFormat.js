function jsDateFormat(numericDate) {
    const [year, month, day] = numericDate.split('-').map(Number);

    return `${month}/${day}/${year}`;
}

export default jsDateFormat;