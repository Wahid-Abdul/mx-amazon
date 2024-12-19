type RawText = string | null | undefined;

interface Dictionary {
    [key: string]: string;
}
interface SelectorsType {
    Classes: Dictionary;
    IDs: Dictionary;
    Tags: Dictionary;
}

interface Product {
    title: string;
    link: string;
    price: string
    date?: string;
}

export type {
    RawText,
    SelectorsType,
    Product
}
