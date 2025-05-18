import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

// استورد المكونات الخاصة بالصفحات
import { HomeComponent } from './buyer/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TowFactorComponent } from './auth/tow-factor/tow-factor.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AboutUsComponent } from './buyer/about-us/about-us.component';
import { AddPropertyComponent } from './agentandsellers/add-property/add-property.component';
import { AgentComponent } from './buyer/agent/agent.component';
import { AgentListComponent } from './buyer/agent/agent-list/agent-list.component';
import { AgentGridComponent } from './buyer/agent/agent-grid/agent-grid.component';
import { AgentDetailsComponent } from './buyer/agent-details/agent-details.component';
import { ContactComponent } from './buyer/contact/contact.component';
import { Erorr404Component } from './erorr/erorr-404/erorr-404.component';
import { Erorr505Component } from './erorr/erorr-505/erorr-505.component';
import { LocationComponent } from './buyer/location/location.component';
import { PropertiesComponent } from './buyer/properties/properties.component';

import { PropertyListComponent } from './buyer/properties/property-list/property-list.component';
import { PropertyGridComponent } from './buyer/properties/property-grid/property-grid.component';
import { AccountSettingsComponent } from './agentandsellers/account-settings/account-settings.component';
import { ReviewsAgentComponent } from './agentandsellers/reviews-agent/reviews-agent.component';
import { DashboardAgentComponent } from './agentandsellers/dashboard-agent/dashboard-agent.component';
import { MessageComponent } from './agentandsellers/message/message.component';
import { MypropertiesAgentComponent } from './agentandsellers/myproperties-agent/myproperties-agent.component';
import { ProfailAgentComponent } from './agentandsellers/profail-agent/profail-agent.component';
import { AgentandsellersComponent } from './agentandsellers/agentandsellers.component';
import { ChangepasswordAgentComponent } from './agentandsellers/changepassword-agent/changepassword-agent.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { UserRequestsAdminComponent } from './admin/user-requests-admin/user-requests-admin.component';
import { RemoveAdminComponent } from './admin/remove-admin/remove-admin.component';
import { ManageReviewsComponent } from './admin/manage-reviews/manage-reviews.component';
import { AuthComponent } from './auth/auth.component';
import { BuyerComponent } from './buyer/buyer.component';

import { AuthGuard } from './auth/auth.guard';
import { PropertiesDetailsComponent } from './buyer/properties-details/properties-details.component';

import { ProfailBuyerComponent } from './buyer/profail-buyer/profail-buyer.component';
import { SettingsComponent } from './buyer/settings/settings.component';
import { FavoriteComponent } from './buyer/favorite/favorite.component';
import { AccountAdminComponent } from './admin/account-admin/account-admin.component';
import { ChangepasswordAdminComponent } from './admin/changepassword-admin/changepassword-admin.component';
import { ProfailAdminComponent } from './admin/profail-admin/profail-admin.component';
import { AllpropertiesComponent } from './admin/allproperties/allproperties.component';

import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NotificationAdminComponent } from './admin/notification-admin/notification-admin.component';
import { NotificationAgentComponent } from './agentandsellers/notification-agent/notification-agent.component';
import { NotificationBuyerComponent } from './buyer/notification-buyer/notification-buyer.component';
import { MaseegeBuyerComponent } from './buyer/maseege-buyer/maseege-buyer.component';






const routes: Routes = [



  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgotpassword', component: ForgotPasswordComponent },
      { path: 'twofactor', component: TowFactorComponent },
      { path: 'home', component: HomeComponent },
      { path: 'aboutus2', component: AboutUsComponent },
      { path: 'contact2', component: ContactComponent },
      { path: 'properties-list2', component: PropertyListComponent },
      { path: 'properties-grid2', component: PropertyGridComponent },
      { path: 'location2', component: LocationComponent },
      { path: 'agent-list2', component: AgentListComponent },
      { path: 'agent-grid2', component: AgentGridComponent },
      {path:'resetpassword', component: ResetPasswordComponent},


      { path: 'agent-details2', component: AgentDetailsComponent },
      { path: 'properties-details2', component: PropertiesDetailsComponent },

    ]
  },{
    path: 'admin-dashboard',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardAdminComponent },

      { path: 'manage-reviews', component: ManageReviewsComponent },
      { path: 'user-requests-admin', component: UserRequestsAdminComponent },

      { path: 'remove-admin', component: RemoveAdminComponent },
      { path: 'account-admin', component: AccountAdminComponent },
      { path: 'changepassword-admin', component: ChangepasswordAdminComponent },
      { path: 'profail-admin', component: ProfailAdminComponent },
      { path: 'allproperties', component: AllpropertiesComponent },
      { path: 'notification-admin', component: NotificationAdminComponent },


    ]
  },
  {
    path: 'agent-dashboard',
    component: AgentandsellersComponent,
    canActivate: [AuthGuard],
    children: [

      { path: '', component: DashboardAgentComponent },

      { path: 'addproperty', component: AddPropertyComponent },
      { path: 'message', component: MessageComponent },
      { path: 'myproperties-agent', component: MypropertiesAgentComponent },
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'changepassword-agent', component: ChangepasswordAgentComponent },
      { path:'reviews-agent', component: ReviewsAgentComponent },
      { path: 'profail-agent', component: ProfailAgentComponent },
      { path: 'notification-agent', component: NotificationAgentComponent },


    ]
  },
  {
    path: 'buyerHome',
    component: BuyerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'aboutus', component: AboutUsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'properties-list', component: PropertyListComponent },
      { path: 'properties-grid', component: PropertyGridComponent },
      { path: 'location', component: LocationComponent },
      { path: 'agent-list', component: AgentListComponent },
      { path: 'agent-grid', component: AgentGridComponent },
      { path: 'agent-details', component: AgentDetailsComponent },
      { path: 'properties-details', component: PropertiesDetailsComponent },
      { path: 'profail-buyer', component: ProfailBuyerComponent },
      { path:'settings', component: SettingsComponent },
      { path: 'favorite', component: FavoriteComponent },
      { path: 'property-details/:id', component: PropertiesDetailsComponent },

      { path: 'notification-buyer', component: NotificationBuyerComponent },

      { path:'maseege-buyer', component: MaseegeBuyerComponent },
        {path:'505', component: Erorr505Component},
        {path:'404', component: Erorr404Component},

    ]
  },
  { path: '**', component: Erorr404Component }



  //...


  //...







  //...



  //...




];
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled', 
  anchorScrolling: 'enabled'
};
@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
