import type { CardsTypes } from "../types";

export function detectedTarget(number: string) : CardsTypes {
    const n = number.replace(/\s+/g, '');

    if(/4/.test(n)) return "visa";
    if(/5[1-5]/.test(n)) return "mastercard";
    if(/3[47]/.test(n)) return "amex";
    if(/6(?:011|5)/.test(n)) return "discover";
    if(/35(2[89]|[3-8][0-9])/.test(n)) return "jcb";
    if(/3(?:0[0-5]|[68])/.test(n)) return "dinersclub";
    return "unknown";
}