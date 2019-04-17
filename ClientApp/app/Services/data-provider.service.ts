import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PreviewRecord} from "../preview-record";

@Injectable({
    providedIn: 'root'
})
export class DataProviderService {
    private Records: PreviewRecord[];

    constructor(private http: HttpClient) {

    }

    public GetPreviewInfo() {
        let promise = this.http.get("./GetPreviewImages").toPromise();
        promise.then((i: PreviewRecord[]) => {
            this.Records = i;
        });
        return promise;
    }
    public GetNextImageId(id: string) {
        let current = this.Records.map(i=>i.id).indexOf(id);
        let nextIndex = ((current+ 1)  < this.Records.length)? current + 1 : 0;
        return this.Records[nextIndex].id;
    }
    public GetPrevImageId(id: string) {
        let current = this.Records.map(i=>i.id).indexOf(id);
        let nextIndex = (current-1) >=0 ? current - 1 : this.Records.length;
        return this.Records[nextIndex].id;
    }
    public GetImageById(id: string){
        return this.http.get(`./GetFullById?Id=${id}`).toPromise();
    }
    
}
