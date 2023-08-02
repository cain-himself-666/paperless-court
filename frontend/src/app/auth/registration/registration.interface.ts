import { AdvocateDetails } from "./adv-details.interface";

export interface Registration{
    status: boolean;
    ackMessage?:string;
    contact?: string;
    user_type?: string;
    details?: AdvocateDetails;
}