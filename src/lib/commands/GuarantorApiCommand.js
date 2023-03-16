import Command from './Command.js';

class GuarantorApiCommand extends Command {
    constructor(data) {
        super();
        this.data = data;
        this.response = null;
    }

    async execute() {
        try {
            const result = await fetch("http://127.0.0.1:4000/api/v1/guarantors", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.data)
            });
            if (!result.ok) throw await result;
            this.response = await result.json();
            console.log("Guarantor Api executed successfully.");
            return this.response.guarantor.uuid;
        } catch (error) {
            const errorMessage = error.status === undefined ? error.message : (await error.json()).message;
            if (errorMessage === "fetch failed") {
                console.error("Guarantor execution failed: Network error.");
                throw new Error(`Guarantor execution failed: Network error.`);
            } else {
                console.error(`API ERROR: ${errorMessage}`);
                throw new Error(`API ERROR: ${errorMessage}`);
            }
        }
    }

    async undo() {
        try {
            if (this.response === null) return;
            console.log(" --> Undoing Guarantor...");

            const uuid = await this.response.guarantor.uuid;
            const result = await fetch(`http://127.0.0.1:4000/api/v1/guarantors/${uuid}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!result.ok) throw await result;
            console.log("Guarantor undoed successfully.");
        } catch (error) {
            const errorMessage = error.status === undefined ? error.message : (await error.json()).message;
            if (errorMessage === "fetch failed") {
                console.error("Guarantor undo command failed: Network error.");
            } else {
                console.error(`Guarantor undo command failed: ${errorMessage}`);
            }
        }
    }
}

export default GuarantorApiCommand;
