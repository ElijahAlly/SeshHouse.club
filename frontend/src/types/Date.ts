export type Hour = {
    formatted: `${number} AM` | `${number} PM`,
    numberValue: number,
};

export type FullHoursRange = Hour[];
