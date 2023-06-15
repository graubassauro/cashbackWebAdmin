import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';
import { DashComponent } from './page/dash/dash.component';
import { HomeComponent } from './page/dash/home/home.component';
import { LoginComponent } from './page/user/login/login/login.component';
import { RecoverypasswordComponent } from './page/user/recoverypassword/recoverypassword.component';
import { NewpasswordComponent } from './page/user/newpassword/newpassword.component';
import { ConfirmedpasswordComponent } from './page/user/confirmedpassword/confirmedpassword.component';
import { ListProdutosComponent } from './page/produtos/list-produtos/list-produtos.component';
import { GraficsDataComponent } from './page/analistics/grafics-data/grafics-data.component';
import { AudienceComponent } from './page/analistics/audience/audience.component';
import { ConfigurationComponent } from './page/configuration/configuration.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  { path: 'login', component: LoginComponent },
  { path: 'recovery', component: RecoverypasswordComponent },
  { path: 'newpassword', component: NewpasswordComponent },
  { path: 'confirmednewpassword', component: ConfirmedpasswordComponent },


  {
    path: 'dash', component: DashComponent,
  //  canActivate: [ AuthGuard ],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home',   component: HomeComponent },   
      { path: 'products',   component: ListProdutosComponent },   
      
      
      { path: 'report/grafics',   component: GraficsDataComponent },   
      { path: 'report/audience',   component: AudienceComponent },   
     
     
     
      { path: 'settings',   component: ConfigurationComponent },   

 
 




    ]
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
