export function convertToLocalTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    return date.toLocaleString(undefined, options);
}

export const decodeUrlString = (encodedStr: string): string => {
    return decodeURIComponent(encodedStr);
};