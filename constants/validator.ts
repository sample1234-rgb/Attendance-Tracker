class Validator {
    // private _rules : string;
    // public get rules() : string {
    //     return this._rules;
    // }
    // public set rules(v : string) {
    //     this._rules = v;
    // }
    constructor() {
        this._rule = '';
    }
    validate = (value: string) => false;
    hasError = (value: string) => this.validate(value);
}
export class EmailValidator extends Validator {
    constructor(){
        super();
    }
    _rule = /^[a-zA-Z0-9]@[a-zA-Z].[a-zA-Z]$/;
    validate = (value: string) => this._rule.test(value) ?? true;
}
export default {
    emailValidator: new EmailValidator(),
}