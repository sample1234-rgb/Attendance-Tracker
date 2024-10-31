export default interface Topic {
    name: string;
    info: string;
    time: string;
    id: string;
    count: number;
    days: Array<string>;
    markedDates: Array<string>;
    missedDates: Array<string>;
    extraClasses: Array<string>;
}