import App from '@/app';
import AuthRoute from '@routes/auth.route';
import SuperAdminAuth from '@routes/superAdminAuth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@/routes/super_admin/users.route';
import AccountsRoute from '@/routes/super_admin/accounts.route';
import SuperadminRoute from '@/routes/super_admin/superadmin.route';
import AccountUserRoute from '@/routes/super_admin/accountUser.route';
import LocaleRoute from '@/routes/app/locale.route';
import RoleRoute from '@/routes/super_admin/roles.route';
import TeamRoute from '@/routes/app/team.route';
import TeamMemberRoute from '@/routes/app/teammember.route';
import validateEnv from '@utils/validateEnv';
import NoteRoute from './routes/app/notes.route';
import LabelRoute from './routes/app/label.route';
import CannedResRoute from './routes/app/canned_res.route';
import AdminLocaleRoute from '@/routes/super_admin/Adminlocale.route';
import AppAccountsRoute from './routes/app/accounts.route';

validateEnv();

const app = new App([
  // Super_Admin
  new IndexRoute(),
  new UsersRoute(),
  new AccountsRoute(),
  new SuperAdminAuth(),
  new SuperadminRoute(),
  new AccountUserRoute(),
  new AdminLocaleRoute(),
  new RoleRoute(),
  // App
  new AuthRoute(),
  new TeamRoute(),
  new TeamMemberRoute(),
  new TeamRoute(),
  new TeamMemberRoute(),
  new CannedResRoute(),
  new NoteRoute(),
  new LabelRoute(),
  new LocaleRoute(),
  new AppAccountsRoute()
]);

app.listen();
