import { FullHoursRange, Hour } from "@/types/Date";

export const getExpiredDate = () => {
    const d = new Date(); 
    d.setFullYear(1000); 
    return d;
}

export const formatDateYYYYMMDD = (dateStr: string) => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const getFullHoursRange = (openingHour: Hour, closingHour: Hour): FullHoursRange => {
    const result: FullHoursRange = [];

    if (openingHour.formatted.includes('AM')) {
        Array.from({ length: 12 - openingHour.numberValue }, (_, index) => openingHour.numberValue + index)
            .map((time: number) => {
                result.push({
                    formatted: `${time} AM`,
                    numberValue: time,
                })
            });
    } else {
        if (closingHour.formatted.includes('PM')) {
            if (openingHour.numberValue === 12) {
                Array.from({ length: closingHour.numberValue + 1 }, (_, index) => index === 0 ? 12 : index)
                    .map((time: number) => {
                        result.push({
                            formatted: `${time} PM`,
                            numberValue: time,
                        })
                    });
            } else {
                Array.from({ length: closingHour.numberValue - openingHour.numberValue + 1 }, (_, index) => openingHour.numberValue + index)
                    .map((time: number) => {
                        result.push({
                            formatted: `${time} PM`,
                            numberValue: time,
                        })
                    });
            }
        } else {
            if (openingHour.numberValue === 12) {
                Array.from({ length: 12 }, (_, index) => index === 0 ? 12 : index)
                    .map((time: number) => {
                        result.push({
                            formatted: `${time} PM`,
                            numberValue: time,
                        })
                    });
            } else {
                Array.from({ length: 12 - openingHour.numberValue }, (_, index) => openingHour.numberValue + index)
                    .map((time: number) => {
                        result.push({
                            formatted: `${time} PM`,
                            numberValue: time,
                        })
                    });
            }
        }
    }

    if (openingHour.formatted.includes('AM')) {
        if (closingHour.formatted.includes('PM')) {
            Array.from({ length: closingHour.numberValue + 1 }, (_, index) => index === 0 ? 12 : index)
            .map((time: number) => {
                result.push({
                    formatted: `${time} PM`,
                    numberValue: time,
                })
            });
        } else {
            [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                .map((time: number) => {
                    result.push({
                        formatted: `${time} PM`,
                        numberValue: time
                    })
                })
        }
    }

    if (closingHour.formatted.includes('AM')) {
        Array.from({ length: closingHour.numberValue + 1 }, (_, index) => index === 0 ? 12 : index)
            .map((time: number) => {
                result.push({
                    formatted: `${time} AM`,
                    numberValue: time,
                })
            });
    }
    return result;
}

export const getHoursForDayOfWeek = (date: Date): { openingHour: Hour, closingHour: Hour } => {
    const openingHour: Hour = {
        formatted: `9 AM`,
        numberValue: 9
    };

    const closingHour: Hour = {
        formatted: `5 PM`,
        numberValue: 5
    };

    switch (date.getDay()) {
        case 0:
            openingHour.formatted = '11 AM';
            openingHour.numberValue = 11;
            closingHour.formatted = '4 PM';
            closingHour.numberValue = 4;
            break;

        case 1:

            break;

        case 2:

            break;

        case 3:

            break;

        case 4:

            break;

        case 5:

            break;

        case 6:
            openingHour.formatted = '1 PM';
            openingHour.numberValue = 1;
            closingHour.formatted = '2 AM';
            closingHour.numberValue = 2;
            break;

        default:
            break;
    }

    return { openingHour, closingHour }
}
