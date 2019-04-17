import {
    Component,
    Injector,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

    constructor() {

    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }

}
