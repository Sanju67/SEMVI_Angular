export class Test {

    public test_id! : string ;
	public patient_name! :string ;
	public doctor_name! : string ;
    public prescription_file! : File;
	public contactno! : string ; 
    public test_location! : string ;
    public address! : string;
    public test_type! : string ;
    public test_date! : string ;

	constructor( test_id : string , patient_name :string , doctor_name : string ,prescription_file : File,
        contactno :string , test_location : string ,address : string ,
        test_type : string ,test_date : string) {

	}
}

