export function mk(strings: TemplateStringsArray, ...expr: string[]): string {
    if (expr.length > 0) {
        console.warn("Please don't use expressions here");
    }

    const str = strings[0];
    return `msg-##-${str}`;
}