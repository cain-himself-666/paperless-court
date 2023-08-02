import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const slideComp =
    trigger('componentAnimation', [
        transition(':enter', [
            style({transform: 'translateX(100%)',position: 'absolute', width: '100%'}),
            animate('600ms ease-in', style({transform: 'translateX(0)'})),
        ]),
        transition(':leave', [
            style({transform: 'translateX(0)',position: 'absolute', width: '100%'}),
            animate('600ms ease-in', style({transform: 'translateX(-100%)'}))
        ])
    ]);