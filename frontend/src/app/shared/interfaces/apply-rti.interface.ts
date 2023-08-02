export interface ApplyRTI{
    application_no:string;
    content:string;
    created_at: string;
    document_name?:string;
    document_url: string;
    id?: number;
    mailing_address: string;
    status?: string;
    user?: number;
    economic_category: string;
    economic_category_proof_url: string;
    is_sensory_disabled: boolean;
    is_concern_of_life_liberty: boolean;
    is_completed_by_hc: boolean;
}