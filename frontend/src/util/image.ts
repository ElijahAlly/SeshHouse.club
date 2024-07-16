export const getRandomPlaceholderImage = () => {
    const images = [
        'blue-party-64',
        'party-black-icon-96',
        'party-calender-icon-64',
        'party-silver-icon-96',
    ];

    return '/images/' + getRandomElement(images) + '.png'
}

const getRandomElement = (arr: any[]) => {
    if (arr.length === 0) {
        return undefined;
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};