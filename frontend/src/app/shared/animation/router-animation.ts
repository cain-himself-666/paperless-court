import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const slider = 
    trigger('routerAnimation', [
        transition('* => isRight', slideTo('right')),
        transition('* => isLeft', slideTo('left')),
        transition('isLeft => *', slideTo('right')),
        transition('isRight => *', slideTo('left')),
    ]);

export const slide = 
    trigger('routerAnimation', [
        transition('* <=> *', slideTo('right')),
    ]);

function slideTo(direction:string){
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                [direction]: 0,
                width: '100%',
                top:0,
            })
        ], optional),
        query(':enter', [
            style({
                [direction]: '-100%',
                minHeight: '100vh',
            })
        ]),
        group([
            query(':leave', [
                animate('600ms ease', style({ [direction]: '100%'}))    
            ], optional),
            query(':enter', [
                animate('600ms ease', style({ [direction]: 0}))    
            ])
        ])
        
    ];
}