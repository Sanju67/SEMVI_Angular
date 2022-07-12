export class Test {
    public test_id!:number ;
	public patientName! :string ;
	public doctorName! : string ;
    public prescriptionFile! : string;
	public contactno! : string ; 
    public testType! : string ;
    public testDate! : string ;
    public testLocation! : string;
    public address! : string;
    public testStatus!: string;
    public user_id! : number ;

	constructor( patient_name :string , doctor_name : string ,prescription_file : string,
        contactno :string ,testType : string ,testDate : string , testlocation : string ,address : string,testStatus : string) {

	}
}

