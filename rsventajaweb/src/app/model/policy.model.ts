import { Name } from './name.model';

export class Policy {
    policyId: number;
    customerName: Name;
    additionalInfo: string;
    startDate: Date;
    endDate: Date;
    renewalStarted: boolean;
    insurer: string;
    fileName: string;
}