type RawText = string | null | undefined;
interface SelectorsType {
    Classes: {
        [key: string]: string;
    }
    IDs: {
        [key: string]: string;
    }
}
export type {
    RawText,
    SelectorsType
}