if (sessionStorage.getItem('customerName')) {
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const inputName = sessionStorage.getItem('customerName');
    const capitalizedString = capitalizeFirstLetter(inputName);
    $('#no-offer-title span').text(capitalizedString.split(" ")[0]);
} else {
    $('#no-offer-title span').text('Customer')
}
