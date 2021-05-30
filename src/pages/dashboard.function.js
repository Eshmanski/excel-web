import { getAllKeys, storage } from '@core/utils';

function toHTML(key) {
    const { createdAt, title } = storage(key);
    const path = key.split(':');

    return `
    <li class="db__record">
        <a href="#${ path[0] }/${ path[1] }">${ title }</a>
        <strong>${ createdAt }</strong>
    </li>
    `;
}

export function createRecordsTable() {
    const keys = getAllKeys();

    if (!keys.length) {
        return `<p>Вы пока не создали ни одной таблицы</p>`;
    }

    return `
    <div class="db__list-header">
    <span>Название</span>
    <span>Дата открытия</span>
    </div>

    <ul class="db__list">
        ${keys.map(toHTML).join('')}
    </ul>
    `;
}

