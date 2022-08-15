
export function calculateIconsPositions(screenSize, totalMenuIcons, iconWidth, iconHeight, iconVisibileWidth, iconVisibileHeight, horizontalSpace = 0, verticalSpace = 0) {
    // centered

    let positions = [];

    positions.push([]);
    const oddPositionRow = positions[0];

    const numberOfMenuIcons = totalMenuIcons;

    const isOdd = !!(numberOfMenuIcons % 2);
    const numberOfMenuIconsEachSide = Math.floor(numberOfMenuIcons / 2);

    const screenPixel = screenSize;
    const middlePixel = screenPixel / 2;

    if (isOdd) {
       const middleIconOffset = Math.floor(iconWidth / 2);
       oddPositionRow.push(middlePixel - middleIconOffset);
    }

    const iconWidthPixel = iconVisibileWidth;

    const horizontalOffset = iconWidthPixel + horizontalSpace;

    for (let i = 0; i < numberOfMenuIconsEachSide; i ++) {
        let currentFirstPosition =  middlePixel;

        if (oddPositionRow.length > 0) {
            currentFirstPosition = oddPositionRow[0];
        }

        const leftIconPixel = currentFirstPosition - horizontalOffset;

        oddPositionRow.unshift(leftIconPixel);
    }

    for (let i = 0; i < numberOfMenuIconsEachSide; i ++) {
        const currentLastPosition = oddPositionRow[oddPositionRow.length - 1];

        const rightIconPixel = currentLastPosition + horizontalOffset;

        oddPositionRow.push(rightIconPixel);
    }

    positions.push([]);
    const evenPositionRow = positions[positions.length - 1];

    const startingPixel = Math.floor((oddPositionRow[1] + oddPositionRow[0]) / 2);

    const firstEvenPosition = startingPixel - horizontalOffset;
    evenPositionRow.push(firstEvenPosition);

    for(let i = 0; i < oddPositionRow.length; i++) {
        const currentEvenPosition = evenPositionRow[evenPositionRow.length - 1];

        evenPositionRow.push(currentEvenPosition + horizontalOffset);
    }

    // const iconHeightPixel = iconVisibileHeight;

    // const horizontalOffset = - ( iconWidth / 2);

    return positions;
}
