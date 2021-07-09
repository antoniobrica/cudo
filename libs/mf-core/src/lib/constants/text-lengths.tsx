interface ITextMaxLength {
    maxLength: string;
}

export const TEXT_MAXLENGTHS: { [key: string]: ITextMaxLength } = {

    "project_name": {
        maxLength: "40"
    },
    "address_line_1": {
        maxLength: "100"
    },
    "address_line_2": {
        maxLength: "100"
    },
    "city": {
        maxLength: "50"
    },
    "state": {
        maxLength: "50"
    },
    "zip": {
        maxLength: "20"
    },
}