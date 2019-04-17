import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    BrowserModule,
    BrowserTransferStateModule
} from '@angular/platform-browser';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {ORIGIN_URL} from '@nguniversal/aspnetcore-engine/tokens';
import {TransferHttpCacheModule} from '@nguniversal/common';
// i18n support
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AccordionModule, BsModalService, ModalModule} from 'ngx-bootstrap';
import {AppComponent} from './app.component';
import {LinkService} from './shared/link.service';
import {UserService} from './shared/user.service';
import {PreviewTileComponent} from './components/preview-tile/preview-tile.component';
import {PreviewPaneComponent} from './components/preview-pane/preview-pane.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';



@NgModule({
    declarations: [
        AppComponent,
        PreviewTileComponent,
        PreviewPaneComponent,
        DetailViewComponent
    ],
    imports: [
        CommonModule,
        ModalModule.forRoot(),
        HttpClientModule, 
        FormsModule,
        ReactiveFormsModule,
        AccordionModule.forRoot(), // You could also split this up if you don't want the Entire Module imported



       
    ],
    entryComponents: [DetailViewComponent],
    providers: [LinkService, UserService,BsModalService,HttpClient],
    bootstrap: [AppComponent]
})
export class AppModuleShared {
}
