
class FrontResponseWrapper<T> 
{
    //#region Properties

    private _isLogicError: boolean;
    private _message : string;
    private _data: T;

    //#endregion


    //#region Methods

    constructor(responseData : any);
    constructor(responseData : any, dataConstructor : (data : any) => T);
    constructor(responseData : any, dataConstructor? : (data : any) => T) 
    {

        this._isLogicError = responseData._isLogicError;
        this._message = responseData._message;

        if (dataConstructor)
            this._data = dataConstructor(responseData._data);
        else
            this._data = responseData._data;
    }

    //#endregion


    //#region Accessors

    get data()
    { return this._data; }
    set data(value)
    { this._data = value; }

    get message()
    { return this._message; }
    set message(value)
    { this._message = value; }

    get isLogicError()
    { return this._isLogicError; }
    set isLogicError(value)
    { this._isLogicError = value; }

    //#endregion
}

export { FrontResponseWrapper }