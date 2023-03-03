import FetchUtil from '../utils/fetchUtil.js';
import Command from './Command.js';

class LoginApiCommand extends Command {
    constructor(data) {
        super();
        this.data = data;
    }

    async execute() {
        this.savedData = await FetchUtil.fetchData(
            "http://127.0.0.1:4000/api/v1/auth/signup",
            "POST",
            this.data
        );
    }

    async undo() {
        if (!this.savedData) throw new Error("No data to undo");
        await FetchUtil.fetchData(
            "http://127.0.0.1:4000/api/v1/auth/signup",
            "DELETE",
            this.savedData
        );
    }
}

export default LoginApiCommand;
