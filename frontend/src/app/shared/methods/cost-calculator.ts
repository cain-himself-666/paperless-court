export class CostCalculator{
    totalCost: number = 0;
    public calculateCost(copies: number, pages: any, mode:string, is_accused: boolean, physicalCost: number, onlineCost: number){
        if(is_accused){
            this.totalCost = 0;
        }
        else{
            this.totalCost = 0;
            switch(mode){
                case 'Physical':
                    this.totalCost = copies * pages * physicalCost;
                    break;
                case 'Email':
                    this.totalCost += copies * pages * onlineCost;
                    break;
                case 'Both':
                    this.totalCost = copies * pages * (onlineCost + physicalCost);
                    break;
                default:
                    this.totalCost = 0
                    break;
            }
        }
        return this.totalCost;
    }
}