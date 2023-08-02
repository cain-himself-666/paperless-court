export interface ProfileDetails{
    applicant_name: string;
    applicant_contact: string;
    application_date: string;
    issued_date?:string;
    collected_date?: string;
    mode: string;
    user_type?: string;
    is_accused: boolean;
    total_pages: number;
    total_cost: number;
    reason: string;
    remarks: string;
    copies: number;
    applicant_id: any;
    bar_id: any;
    application_status: string;
}