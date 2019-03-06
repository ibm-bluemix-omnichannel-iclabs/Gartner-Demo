import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WatsonConfig } from './watson.config';
import { Headers, Http, RequestOptions, Response, HttpModule } from '@angular/http';
import { map, catchError } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class watsonToneAnalyzer {
    private tokenValue: string;
    constructor(
        private http: Http,
    ) {
        this.tokenValue = '';
    }

    private getAuthheader(): Observable<any> {

        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': `application/json`
            })
        });
        let body = "grant_type=" + WatsonConfig.iamAuth.iamJson.iamtype + "&apikey=" + WatsonConfig.watsonAuth.watsonToneAnalyzer.apikey;
        let link = WatsonConfig.iamAuth.iamJson.iamLink;

        return this.http.post(link, body, options) // ...using post request
            .pipe(map((res: Response) => res.json()),
                catchError((error: any) => {
                    console.log(error);
                    return Observable.throw(error.json().error || 'Server error');
                }));
    }

    public initWatson() {
        this.getAuthheader().subscribe((data) => {
            if (data.access_token) {
                this.tokenValue = 'Bearer ' + data.access_token;
            } else {
                console.log('Error while getting token : no token received');
            }
        }, (error) => {
            console.log('Error while getting token : ' + error);
        })
    }

    public analyzeToneOnGivenText(text: string): Observable<any> {

        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.tokenValue
            })
        });

        const link = WatsonConfig.watsonAuth.watsonToneAnalyzer.baseLink + WatsonConfig.watsonAuth.watsonToneAnalyzer.version_date;
        const bodyObject = {
            text: text
        };
        return this.http.post(link, bodyObject, options)
            .pipe(map((res: Response) => res.json()),
                catchError((error: any) => {
                    console.log(error);
                    return Observable.throw(error.json().error || 'Server error');
                }));
    }
}