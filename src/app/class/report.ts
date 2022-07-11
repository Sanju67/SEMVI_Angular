export class Report {
    public report_id!: number ; 
	public patientName!: string;
    public testType!: string;
	public reportDate!: string;
	public reportFile!: string;
    public user_id!: number;

    constructor( report_id : number , patientName :string , testType : string ,
        reportDate :string , reportFile : string ) {

}
}
