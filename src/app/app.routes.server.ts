import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // صفحات رئيسية وديناميكية
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'signup', renderMode: RenderMode.Prerender },
  { path: 'forgotpassword', renderMode: RenderMode.Prerender },
  { path: 'resetpassword', renderMode: RenderMode.Prerender },
  { path: 'twofactor', renderMode: RenderMode.Prerender },

  // صفحات buyer خارجية
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'aboutus2', renderMode: RenderMode.Prerender },
  { path: 'contact2', renderMode: RenderMode.Prerender },
  { path: 'properties-list2', renderMode: RenderMode.Prerender },
  { path: 'properties-grid2', renderMode: RenderMode.Prerender },
  { path: 'location2', renderMode: RenderMode.Prerender },
  { path: 'agent-list2', renderMode: RenderMode.Prerender },
  { path: 'agent-grid2', renderMode: RenderMode.Prerender },
  { path: 'agent-details2', renderMode: RenderMode.Prerender },
  { path: 'properties-details2', renderMode: RenderMode.Prerender },

  // مسارات buyerHome
  { path: 'buyerHome', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/aboutus', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/contact', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/properties-list', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/properties-grid', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/buyerproperties', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/location', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/agent-list', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/agent-grid', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/profail-buyer', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/settings', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/favorite', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/notification-buyer', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/maseege-buyer', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/505', renderMode: RenderMode.Prerender },
  { path: 'buyerHome/404', renderMode: RenderMode.Prerender },
  {path:  '**', renderMode: RenderMode.Prerender },

  // المسارات الديناميكية فقط server
  { path: 'buyerHome/agent-details/:id', renderMode: RenderMode.Server },
  { path: 'buyerHome/properties-details/:id', renderMode: RenderMode.Server },

  // مسارات admin-dashboard
  { path: 'admin-dashboard', renderMode: RenderMode.Prerender },
  { path: 'admin-dashboard/manage-reviews', renderMode: RenderMode.Prerender },
  { path: 'admin-dashboard/user-requests-admin', renderMode: RenderMode.Prerender },
  { path: 'admin-dashboard/remove-admin', renderMode: RenderMode.Prerender },
  { path: 'admin-dashboard/account-admin', renderMode: RenderMode.Prerender },
  { path: 'admin-dashboard/changepassword-admin', renderMode: RenderMode.Prerender },
  { path: 'admin-dashboard/profail-admin', renderMode: RenderMode.Prerender },
  { path: 'admin-dashboard/allproperties', renderMode: RenderMode.Prerender },
  { path: 'admin-dashboard/notification-admin', renderMode: RenderMode.Prerender },

  // مسارات agent-dashboard
  { path: 'agent-dashboard', renderMode: RenderMode.Prerender },
  { path: 'agent-dashboard/addproperty', renderMode: RenderMode.Prerender },
  { path: 'agent-dashboard/message', renderMode: RenderMode.Prerender },
  { path: 'agent-dashboard/myproperties-agent', renderMode: RenderMode.Prerender },
  { path: 'agent-dashboard/account-settings', renderMode: RenderMode.Prerender },
  { path: 'agent-dashboard/changepassword-agent', renderMode: RenderMode.Prerender },
  { path: 'agent-dashboard/reviews-agent', renderMode: RenderMode.Prerender },
  { path: 'agent-dashboard/profail-agent', renderMode: RenderMode.Prerender },
  { path: 'agent-dashboard/notification-agent', renderMode: RenderMode.Prerender },
  { path: 'agent-dashboard/received', renderMode: RenderMode.Prerender },

  // fallback
  { path: '', renderMode: RenderMode.Prerender }
];
