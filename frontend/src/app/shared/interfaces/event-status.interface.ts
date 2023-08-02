import { CaseDetails } from "src/app/dashboard/certified-copy/general/apply/search/interfaces/case-detail.interface";

export interface Apply{
    status:boolean;
    details?: CaseDetails;
    selected?: Array<any>;
    application_id?:string;
    pages?: number;
    cnr?:string;
    key?: string;
    forwarded_to?: string;
}