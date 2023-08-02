export class PageCalculator{
    totalPage: number = 0;
    public countTotalPages(page: number, key:string){
        key === 'add' ? this.totalPage += page : this.totalPage -= page;
        return this.totalPage;
    }   
}