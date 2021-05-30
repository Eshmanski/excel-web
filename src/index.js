import { DashboardPage } from './pages/DashboardPage';
import { Router } from '@core/routes/routes';
import '@/scss/index.scss';
import { ExcelPage } from './pages/ExcelPage';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});

