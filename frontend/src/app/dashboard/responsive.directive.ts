import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[responsive]',
})
export class ResponsiveDirective{
    screenWidth:any;
    toggleValue: boolean = false;
    backgroundActivate: boolean = false;
    mobileActivate: boolean = false;
    @Output() onToggle = new EventEmitter<boolean>();
    @Output() sendStatus = new EventEmitter<{mobileActive:boolean, backgroundActive: boolean}>();
    @HostListener('window:resize', ['$event'])
    onResize(event:any) {  
        this.screenWidth = window.innerWidth;
        if(this.screenWidth > 1136 || this.screenWidth < 1136){
            this.toggleValue = false;
            this.mobileActivate = this.screenWidth > 1136 ? false : true;
            this.backgroundActivate = this.screenWidth > 1136 ? false : true;
        }
        this.onToggle.emit(this.toggleValue);
        this.sendStatus.emit({mobileActive: this.mobileActivate, backgroundActive: this.backgroundActivate})
    }
}