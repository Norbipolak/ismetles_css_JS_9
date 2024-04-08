function validateDate(dateStr) {
    const datePattern = /^(?:19|20)\d\d-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/;
    return datePattern.test(dateStr);
}

//Example usage
const date = "2024-04-08";
if (validateDate(date)) {
    console.log("Valid date format");
} else {
    console.log("Invalid date format");
}

/*
^ asserts the start of the string.
(?:19|20)\d\d matches a four-digit year starting with either '19' or '20'.
-(?:0[1-9]|1[0-2]) matches the hyphen separator followed by a two-digit month between '01' and '12'.
-(?:0[1-9]|[12][0-9]|3[01]) matches the hyphen separator followed by a two-digit day between '01' and '31', 
with specific attention to valid day ranges for each month.
$ asserts the end of the string.
*/