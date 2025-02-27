
export class UserModel {
    constructor(
        public email:string,
        public birthdate:string,
        public names:string,
        public first_lastname:string,
        public second_lastname:string,
        public profession:string,
        public nationality:string,
        public phone_code:string,
        public phone_number:string,
        public address_street:string,
        public address_neighborhood:string,
        public address_ext_number:number,
        public address_int_number:string,
        public address_state:string,
        public address_zipcode:string,
        public curp:string,
        public id_suarmi:string,
        public password:string,
        public username:string,
        public cintervancaria:string,
        public isAcceptTerms:boolean,
        public document_number:string,
        public secondPassword:string,
        public document_type:string,
        public code_reference:string,
        public gender:string,
        public bank_code:string,
        public id_identification:string,
        public identification_type:string,
        public address_city:string,
        public source_of_founds:string ,
        public use_identification_current_address: boolean,
        public beneficiary_self:boolean,
        public beneficiary_full_name:string|null,
        public beneficiary_email:string|null,
        public beneficiary_phone:string|null,
    ) { }
}