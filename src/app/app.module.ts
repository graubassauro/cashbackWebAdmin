import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy, HashLocationStrategy, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorBoxComponent } from './components/alerts/error-box/error-box.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AlertComponent } from './modals/alertas/alert/alert.component';
import { ConfirmStatusComponent } from './modals/alertas/confirm-status/confirm-status.component';
import { EraseAlertComponent } from './modals/alertas/erase-alert/erase-alert.component';
import { DashComponent } from './page/dash/dash.component';
import { HomeComponent } from './page/dash/home/home.component';
import { LoginComponent } from './page/user/login/login/login.component';
import { RecoverypasswordComponent } from './page/user/recoverypassword/recoverypassword.component';
import { ErrorMessagePipe } from './pipes/error-message/error-message.pipe';
import { ErroAlertService } from './services/errorAlert/erro-alert.service';
import { FiltrarService } from './services/filtrar/filtrar.service';
import { HttpService } from './services/http/http.service';
import { PaginationService } from './services/pagination/pagination.service';
import { SpinnerService } from './services/spinner/spinner.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteItemDirective } from './directives/alerts/deleteAlert/delete-item.directive';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NewpasswordComponent } from './page/user/newpassword/newpassword.component';
import { ConfirmedpasswordComponent } from './page/user/confirmedpassword/confirmedpassword.component';
import { ListProdutosComponent } from './page/produtos/list-produtos/list-produtos.component';
import { GraficsDataComponent } from './page/analistics/grafics-data/grafics-data.component';
import { AudienceComponent } from './page/analistics/audience/audience.component';
import { ConfigurationComponent } from './page/configuration/configuration.component';


const maskConfig: Partial<IConfig> = {
  validation: false,
};

const imports = [
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  AppRoutingModule,
  NgbModule,
  NgxSpinnerModule,
  NgChartsModule,
  NgxMaskModule.forRoot(),
]

const providers: any[] = [
  AuthGuard,
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  CurrencyPipe,
  DatePipe,
  HttpService,
  PaginationService,
  FiltrarService,
  SpinnerService,
  ErroAlertService,
  NgxImageCompressService,
];

const modals: any[] = [
  EraseAlertComponent,
  ConfirmStatusComponent,
  AlertComponent,
];

const components: any[] = [
  ErrorBoxComponent,
  HeaderComponent
];

const pipes: any[] = [ErrorMessagePipe];
const directive: any[] = [
  DeleteItemDirective,
];

const pages = [
  AppComponent,
  LoginComponent,
  RecoverypasswordComponent,
  NewpasswordComponent,
  ConfirmedpasswordComponent,
  DashComponent,
  HomeComponent,
  ListProdutosComponent,
  GraficsDataComponent,
  AudienceComponent,
  ConfigurationComponent,


];

@NgModule({
  declarations: [
    pages,
    modals,
    components,
    pages,
    pipes,
    directive,
    ],
  entryComponents: [modals],
  imports: imports,
  providers: providers,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [pipes, directive],
  bootstrap: [AppComponent]
})
export class AppModule { }
