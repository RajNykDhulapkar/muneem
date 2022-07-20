/**
 *
 * @param text [string] name of the resource with spaces between individual words
 * @param textCase [string] "TITLECASE" | "SNAKECASE" | "CAMELCASE" --default "TITLECASE"
 * @returns [string]
 */
const transformCase = (
    text: string,
    textCase: "TITLECASE" | "SNAKECASE" | "CAMELCASE" = "TITLECASE",
): string => {
    switch (textCase) {
        case "TITLECASE":
            const newString = text.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            return newString.trim().split(" ").join("").trim();
        case "SNAKECASE":
            return text
                .replace(/\W+/g, " ")
                .split(/ |\B(?=[A-Z])/)
                .map((word) => word.toLowerCase())
                .join("_");
        case "CAMELCASE":
            return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        default:
            return text;
    }
};

export default transformCase;
