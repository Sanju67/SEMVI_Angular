export class Patient {

	public firstName! : string ;
	public lastName! :string ;
	public email! : string ;
	public password! :string ;
	public contactno! : string ; 

	constructor( firstName : string , lastName :string , email : string ,
					password :string , contactno : string ) {

	}

	getpatientFirstName() : string {
		return this.firstName ;
	}

	setpatientFirstname(name : string) {
		this.firstName = name ;
	}
}
