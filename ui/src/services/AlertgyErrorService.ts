class AlertgyError extends Error {
    constructor(m: string) {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, AlertgyError.prototype);
    }
}

export default AlertgyError;