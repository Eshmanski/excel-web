export function shouldResize(event) {
    return event.target.dataset.resize;
}

export function isCell(event) {
    return event.target.dataset.type === 'cell';
}

export function getArrayOfIds(firstEl, secondEl) {
    firstEl = firstEl.split(':').map((item) => Number(item));
    secondEl = secondEl.split(':').map((item) => Number(item));

    const rowIds = normalizeId(firstEl[0], secondEl[0]);
    const colIds = normalizeId(firstEl[1], secondEl[1]);

    const elIds = [];
    for (let i = rowIds.start; i <= rowIds.end; i++) {
        for (let j = colIds.start; j <= colIds.end; j++) {
        elIds.push(`${i}:${j}`);
        }
    }

    return elIds;
}

function normalizeId(firstNum, secondNum) {
    if (firstNum < secondNum) return {start: firstNum, end: secondNum};
    else return {start: secondNum, end: firstNum};
}
