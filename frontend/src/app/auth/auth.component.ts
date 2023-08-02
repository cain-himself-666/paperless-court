import { ChangeDetectorRef, Component, ViewEncapsulation } from "@angular/core";
import { slider } from "../shared/animation/router-animation";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-auth-component',
    templateUrl: './auth.component.html',
    styles: [`
        @font-face {
            font-family: 'averia';
            src: url('../../assets/fonts/averia.ttf');
        }
        .img{
            background-color: #499ad9;
            /* background-image: url("../../assets/images/e-certified.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover; */
        }
        .form-control{
            border-right: 0;
            border-left: 0;
            border-top: 0;
        }  
        .card{
            border:none;
        }
        .back{
            background: linear-gradient(140deg, rgba(239,247,251,1) 50%, rgba(52,123,179,1) 50%);
        }
        span{
            color: #347bb3;
        }
        .auth{
            position: relative;
        }
        h2, h4, h5{
            font-family: 'averia';
            letter-spacing: 4px;
            color: #347bb3;
        }
    `],
    encapsulation: ViewEncapsulation.None,
    animations: [
        slider
    ]
})
export class AuthComponent{
    constructor(private cdr: ChangeDetectorRef){}
    prepareOutlet(outlet: RouterOutlet){
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
    ngAfterContentChecked(){
        this.cdr.detectChanges();
    }
}