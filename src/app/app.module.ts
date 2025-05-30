import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { NavbarComponent } from './auth/navbar/navbar.component';
import { FooterComponent } from './auth/footer/footer.component';
import { BuyerComponent } from './buyer/buyer.component';
import { HomeComponent } from './buyer/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';






import { HeroHeaderComponent } from './buyer/home/hero-header/hero-header.component';
import { CounterContentComponent } from './buyer/home/counter-content/counter-content.component';
import { TopRegionsComponent } from './buyer/home/top-regions/top-regions.component';
import { FeaturedPropertiesComponent } from './buyer/home/featured-properties/featured-properties.component';
import { NewsletterAndBlogComponent } from './buyer/home/newsletter-and-blog/newsletter-and-blog.component';
import { TestimonialComponent } from './buyer/home/testimonial/testimonial.component';
import { PropertiesComponent } from './buyer/properties/properties.component';
import { PropertyHeaderComponent } from './buyer/properties/property-header/property-header.component';
import { PropertyListComponent } from './buyer/properties/property-list/property-list.component';
import { PropertyGridComponent } from './buyer/properties/property-grid/property-grid.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { TowFactorComponent } from './auth/tow-factor/tow-factor.component';
import { PropertiesDetailsComponent } from './buyer/properties-details/properties-details.component';
import { PropertyGalleryComponent } from './buyer/properties-details/property-gallery/property-gallery.component';


import { RelatedPropertiesComponent } from './buyer/properties-details/related-properties/related-properties.component';
import { PropertyHeaderDetailsComponent } from './buyer/properties-details/property-header-details/property-header-details.component';
import { AboutUsComponent } from './buyer/about-us/about-us.component';

import { AboutHeaderComponent } from './buyer/about-us/about-header/about-header.component';
import { AboutCounterComponent } from './buyer/about-us/about-counter/about-counter.component';
import { AboutDescriptionComponent } from './buyer/about-us/about-description/about-description.component';
import { AboutVideoComponent } from './buyer/about-us/about-video/about-video.component';
import { AboutCustomersComponent } from './buyer/about-us/about-customers/about-customers.component';
import { AboutTeamComponent } from './buyer/about-us/about-team/about-team.component';
import { AgentComponent } from './buyer/agent/agent.component';
import { AgentListComponent } from './buyer/agent/agent-list/agent-list.component';
import { AgentGridComponent } from './buyer/agent/agent-grid/agent-grid.component';
import { AgentDetailsComponent } from './buyer/agent-details/agent-details.component';
import { AgentInformationComponent } from './buyer/agent-details/agent-information/agent-information.component';
import { AgentPropartyComponent } from './buyer/agent-details/agent-proparty/agent-proparty.component';
import { AddPropertyComponent } from './agentandsellers/add-property/add-property.component';
import { LocationComponent } from './buyer/location/location.component';
import { ContactComponent } from './buyer/contact/contact.component';
import { ContactTypeComponent } from './buyer/contact/contact-type/contact-type.component';
import { ContactDirectlyComponent } from './buyer/contact/contact-directly/contact-directly.component';
import { Erorr404Component } from './erorr/erorr-404/erorr-404.component';
import { Erorr505Component } from './erorr/erorr-505/erorr-505.component';
import { AgentandsellersComponent } from './agentandsellers/agentandsellers.component';
import { SidbarNavbarComponent } from './agentandsellers/sidbar-navbar/sidbar-navbar.component';
import { NavbarAgentComponent } from './agentandsellers/navbar-agent/navbar-agent.component';
import { DashboardAgentComponent } from './agentandsellers/dashboard-agent/dashboard-agent.component';
import { MessageComponent } from './agentandsellers/message/message.component';
import { MatIconModule } from '@angular/material/icon';

import { MatChipsModule } from '@angular/material/chips';



import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { ProfailAgentComponent } from './agentandsellers/profail-agent/profail-agent.component';
import { AccountSettingsComponent } from './agentandsellers/account-settings/account-settings.component';
import { MypropertiesAgentComponent } from './agentandsellers/myproperties-agent/myproperties-agent.component';
import { ReviewsAgentComponent } from './agentandsellers/reviews-agent/reviews-agent.component';
import { ChangepasswordAgentComponent } from './agentandsellers/changepassword-agent/changepassword-agent.component';
import { AdminComponent } from './admin/admin.component';
import { NavbarAdminComponent } from './admin/navbar-admin/navbar-admin.component';
import { SidbarAdminComponent } from './admin/sidbar-admin/sidbar-admin.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { UserRequestsAdminComponent } from './admin/user-requests-admin/user-requests-admin.component';
import { RemoveAdminComponent } from './admin/remove-admin/remove-admin.component';

import { ManageReviewsComponent } from './admin/manage-reviews/manage-reviews.component';
import { FooterBuyerComponent } from './buyer/footer-buyer/footer-buyer.component';
import { NavbarBuyerComponent } from './buyer/navbar-buyer/navbar-buyer.component';
import { PropartiesInfoComponent } from './buyer/properties-details/proparties-info/proparties-info.component';
import { ErorrComponent } from './erorr/erorr.component';
import { SettingsComponent } from './buyer/settings/settings.component';

import { ProfailBuyerComponent } from './buyer/profail-buyer/profail-buyer.component';
import { FavoriteComponent } from './buyer/favorite/favorite.component';
import { AccountAdminComponent } from './admin/account-admin/account-admin.component';
import { ChangepasswordAdminComponent } from './admin/changepassword-admin/changepassword-admin.component';
import { ProfailAdminComponent } from './admin/profail-admin/profail-admin.component';
import { AllpropertiesComponent } from './admin/allproperties/allproperties.component';

import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NotificationAdminComponent } from './admin/notification-admin/notification-admin.component';

import { NotificationBuyerComponent } from './buyer/notification-buyer/notification-buyer.component';
import { MaseegeBuyerComponent } from './buyer/maseege-buyer/maseege-buyer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



import { MatListModule } from '@angular/material/list';

import { HttpClientModule } from '@angular/common/http';


// Ensure the file exists at the correct path or update the path accordingly
import {NotificationAgentComponent} from './agentandsellers/notification-agent/notification-agent.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BuyerPropertiesComponent } from './buyer/buyer-properties/buyer-properties.component';
import { ReceivedComponent } from './agentandsellers/received/received.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BuyerComponent,
    HomeComponent,
    HeroHeaderComponent,

        CounterContentComponent,
    TopRegionsComponent,
    FeaturedPropertiesComponent,
    NewsletterAndBlogComponent,
    TestimonialComponent,
    PropertiesComponent,
    PropertyHeaderComponent,
    PropertyListComponent,
    PropertyGridComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    TowFactorComponent,
    PropertiesDetailsComponent,
    PropertyGalleryComponent,
    SidbarNavbarComponent,

    RelatedPropertiesComponent,
    PropertyHeaderDetailsComponent,
    AboutUsComponent,

    AboutHeaderComponent,
    AboutCounterComponent,
    AboutDescriptionComponent,
    AboutVideoComponent,
    AboutCustomersComponent,
    AboutTeamComponent,
    AgentComponent,
    AgentListComponent,
    AgentGridComponent,
    AgentDetailsComponent,
    AgentInformationComponent,
    AgentPropartyComponent,
    AddPropertyComponent,
    LocationComponent,
    ContactComponent,
    ContactTypeComponent,
    ContactDirectlyComponent,
    Erorr404Component,
    Erorr505Component,
    AgentandsellersComponent,

    NavbarAgentComponent,
    DashboardAgentComponent,
    MessageComponent,
    ProfailAgentComponent,
    AccountSettingsComponent,

    ReviewsAgentComponent,
    ChangepasswordAgentComponent,
    AdminComponent,
    NavbarAdminComponent,
    SidbarAdminComponent,
    DashboardAdminComponent,
    UserRequestsAdminComponent,
    RemoveAdminComponent,

    FooterBuyerComponent,
    NavbarBuyerComponent,
    PropartiesInfoComponent,
    ErorrComponent,
    SettingsComponent,

    ProfailBuyerComponent,
    FavoriteComponent,
    AccountAdminComponent,
    ChangepasswordAdminComponent,
    ProfailAdminComponent,

    ResetPasswordComponent,
    NotificationAdminComponent,
    NotificationBuyerComponent,
    MaseegeBuyerComponent,
    
    ManageReviewsComponent,      
    ReceivedComponent            


  ],
  imports: [
     
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,

    MatCardModule,
    MatListModule,
    NgApexchartsModule,

    NotificationAgentComponent,

    AllpropertiesComponent,
    BuyerPropertiesComponent,


    MatListModule,
    HttpClientModule,
    ReactiveFormsModule



  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
