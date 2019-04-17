import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PreviewRecord} from "../../preview-record";
import {DataProviderService} from "../../Services/data-provider.service";

@Component({
    selector: 'app-preview-pane',
    templateUrl: './preview-pane.component.html',
    styleUrls: ['./preview-pane.component.css']
})
export class PreviewPaneComponent implements OnInit {

    constructor(private data: DataProviderService) {
        var records = data.GetPreviewInfo().then((i : PreviewRecord[])=>
        {
            this.PreviewRecords.push(...i);    
        });
    }
    PreviewRecords : PreviewRecord[] = []
    ngOnInit() {
    }
    PreviewImages : string[] = []
}

