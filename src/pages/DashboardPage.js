import { $ } from '@core/dom';
import { Page } from '@core/page/Page';
import { createRecordsTable } from '../shared/dashboard.function';

export class DashboardPage extends Page {
    getRoot() {
        const now = Date.now().toString();

        return $.create('div', 'db').html(`
        <div class="db">

            <div class="db__header">
                <h1>Excel Панель Управления</h1>
            </div>
            
            <div class="db__new">
                <div class="db__view db_flex">
                    <a href="#excel/${ now }/intro " class="db__create">
                        Интро
                    </a>

                    <a href="#excel/${ now }" class="db__create">
                        Новая <br /> Таблица
                    </a>
                </div>
                
            </div>

            <div class="db__table db__view">
                ${ createRecordsTable() }
            </div>
        </div>`);
    }
}
