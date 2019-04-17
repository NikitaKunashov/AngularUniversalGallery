import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {PreviewRecord} from "../../preview-record";
import {DetailViewComponent} from "../detail-view/detail-view.component";

@Component({
    selector: 'app-preview-tile',
    templateUrl: './preview-tile.component.html',
    styleUrls: ['./preview-tile.component.css']
})
export class PreviewTileComponent implements OnInit {
    @Input()
    public ImageString: PreviewRecord;
    clickHandler() {
        this.openModal()
    }
    constructor(private modalService: BsModalService) {
        
    }
    modalRef: BsModalRef;

    openModal() {
        const initialState = {
            ImageId: this.ImageString.id,
            
        }; 
        this.modalRef = this.modalService.show(DetailViewComponent,{initialState});
    }
    ngOnInit() {
    }

}
