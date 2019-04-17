import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BsModalRef} from "ngx-bootstrap";
import {DataProviderService} from "../../Services/data-provider.service";

@Component({
    selector: 'app-detail-view',
    templateUrl: './detail-view.component.html',
    styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
    
    ImageId :string;
    Image : any;
    constructor(private  http: HttpClient,public bsModalRef: BsModalRef,private data: DataProviderService) {
    }
    clickPrev() {
        this.ImageId = this.data.GetPrevImageId(this.ImageId);
        this.data.GetImageById(this.ImageId).then((i)=> {
            this.Image  = i;
        })
    }
    clickNext() {
        this.ImageId = this.data.GetNextImageId(this.ImageId);
        this.data.GetImageById(this.ImageId).then((i)=> {
            this.Image  = i;
        })
    }
    ngOnInit() {
        this.data.GetImageById(this.ImageId).then((i)=> {
            this.Image  = i;
        })   
    }
    

}
