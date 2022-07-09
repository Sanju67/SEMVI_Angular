export class Test {
	public patientName! :string ;
	public doctorName! : string ;
    public prescriptionFile! : File;
	public contactno! : string ; 
    public testType! : string ;
    public testDate! : string ;
    public testLocation! : string;
    public address! : string;
    public testStatus!: string;

	constructor( patient_name :string , doctor_name : string ,prescription_file : File,
        contactno :string ,testType : string ,testDate : string , testlocation : string ,address : string,testStatus : string) {

	}
}

