import App from '@/app';
import AuthRoute from '@routes/auth.route';
import SuperAdminAuth from '@routes/superAdminAuth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@/routes/super_admin/users.route';
import AccountsRoute from '@/routes/super_admin/accounts.route';
import SuperadminRoute from '@/routes/super_admin/superadmin.route';
import AccountUserRoute from '@/routes/super_admin/accountUser.route';
import AppLocaleRoute from '@/routes/app/locale.route';
import RoleRoute from '@/routes/super_admin/roles.route';
import TeamRoute from '@/routes/app/team.route';
import TeamMemberRoute from '@/routes/app/teammember.route';
import validateEnv from '@utils/validateEnv';
import NoteRoute from './routes/app/notes.route';
import LabelRoute from './routes/app/label.route';
import CannedResRoute from './routes/app/canned_res.route';
import LocaleRoute from '@/routes/super_admin/locale.route';
import AppAccountsRoute from './routes/app/accounts.route';
import CustomAttributeRoute from './routes/app/custom_attribute.route';
import CustomAttributeMappingRoute from './routes/app/custom_attributedata.mapping.route'
import InboxesRoute from './routes/app/inboxes.route';
import InboxesDetailsRoute from './routes/app/inboxes_details.route';

validateEnv();

const app = new App([
  // Super_Admin
  new IndexRoute(),
  new UsersRoute(),
  new AccountsRoute(),
  new SuperAdminAuth(),
  new SuperadminRoute(),
  new AccountUserRoute(),
  new LocaleRoute(),
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
  new AppLocaleRoute(),
  new AppAccountsRoute(),
  new CustomAttributeRoute(),
  new CustomAttributeMappingRoute(),
  new InboxesRoute(),
  new InboxesDetailsRoute()
]);

app.listen();
