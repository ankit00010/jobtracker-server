class ThrowError extends Error {

    title: string;
    code: number;


    constructor(code: number,title: string, message: string) {
        super(message);

        this.title = title;
        this.code = code;
        Object.setPrototypeOf(this, ThrowError.prototype)

    }

}



export default ThrowError;