import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class EventService {

    private readonly _scrollToTop = new Subject();
    public readonly scrollToTop$ = this._scrollToTop.asObservable();

    scrollToTop() {
        this._scrollToTop.next(null);
    }
}