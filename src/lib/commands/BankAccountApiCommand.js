import Command from './Command.js';

class BankAccountApiCommand extends Command {
    constructor(data) {
        super();
        this.data = data;
        this.response = null;
    }

    async execute() {
        try {
            const result = await fetch("http://127.0.0.1:4000/api/v1/banks", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.data)
            });
            if (!result.ok) throw await result;
            this.response = await result.json();
            console.log("BankAccount API executed successfully.");
            return this.response.bankAccount.uuid;
        } catch (error) {
            const errorMessage = error.status === undefined ? error.message : (await error.json()).message;
            if (errorMessage === "fetch failed") {
                console.error("BankAccount execution failed: Network error.");
                throw new Error(`BankAccount execution failed: Network error.`);
            } else {
                console.error(`API ERROR: ${errorMessage}`);
                throw new Error(`API ERROR: ${errorMessage}`);
            }
        }
    }

    async undo() {
        try {
            if (this.response === null) return;
            console.log(" --> Undoing BankAccount...");

            const uuid = await this.response.bankAccount.uuid;
            const result = await fetch(`http://127.0.0.1:4000/api/v1/banks/${uuid}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!result.ok) throw await result;
            console.log("BankAccount undoed successfully.");
        } catch (error) {
            const errorMessage = error.status === undefined ? error.message : (await error.json()).message;
            if (errorMessage === "fetch failed") {
                console.error("LoginData undo command failed: Network error.");
            } else {
                console.error(`LoginData undo command failed: ${errorMessage}`);
            }
        }
    }
}

export default BankAccountApiCommand;
