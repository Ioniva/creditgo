import Command from './Command.js';
import FetchUtil from '../utils/fetchUtil.js';

class PersonalApiCommand extends Command {
    constructor(data) {
        super();
        this.data = data;
        this.savedData = null;
    }

    async execute() {
        this.savedData = await FetchUtil.fetchData(
            "https://api.example.com/data",
            "POST",
            this.data
        );
    }

    async undo() {
        if (!this.savedData) throw new Error("No data to undo");
        await FetchUtil.fetchData(
            "https://api.example.com/data",
            "DELETE",
            this.savedData
        );
    }
}

export default PersonalApiCommand;
