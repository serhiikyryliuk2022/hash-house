import { Injectable, OnDestroy } from "@angular/core";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";

@Injectable()
export class LoaderService implements OnDestroy {

    subscription: Subscription;

    private readonly animationTransitionMS = 500;
    private readonly loadingTimeoutMS = 200;
    private loadingTimeout!: ReturnType<typeof setTimeout>;

    private readonly _isShowLoading = new BehaviorSubject<boolean>(false);
    public readonly isShowLoading$ = this._isShowLoading.asObservable();

    private readonly _isLoadingAnimationShow = new BehaviorSubject<boolean>(false);
    public readonly isLoadingAnimationShow$ = this._isLoadingAnimationShow.asObservable();

    private readonly _isLoadingAnimationHide = new BehaviorSubject<boolean>(false);
    public readonly isLoadingAnimationHide$ = this._isLoadingAnimationHide.asObservable();

    constructor(private router: Router) {
        this.subscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.show()
            } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
                this.hide();
            }
        });
    }

    show() {
        this.loadingTimeout = setTimeout(() => {
            this._isLoadingAnimationShow.next(true);

            setTimeout(() => {
                this._isShowLoading.next(true);
                this._isLoadingAnimationShow.next(false);
            }, this.animationTransitionMS);

        }, this.loadingTimeoutMS);
    }

    hide() {
        clearTimeout(this.loadingTimeout);

        if (!this._isLoadingAnimationShow.value && !this._isShowLoading.value) return;

        this._isLoadingAnimationHide.next(true);

        setTimeout(() => {
            this._isShowLoading.next(false);
            this._isLoadingAnimationHide.next(false);
        }, this.animationTransitionMS);
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}