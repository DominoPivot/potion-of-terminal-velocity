import type { Terminal } from "./terminal";

export function createGame () {
	function runCommand (terminal: Terminal, userInput: string) {
		userInput = userInput.trim().replace(/\s+/g, " ");
		if (userInput === "") {
			terminal.log("");
			return;
		}

		for (const command of commands) {
			const match = userInput.match(command.pattern);
			if (match) {
				command.run(terminal, ...match);
				return;
			}
		}
		terminal.log("Unknown command.", "error");
	}

	return Object.freeze({
		runCommand,
	});
}

export type Command = {
	name: string,
	pattern: Parameters<typeof String.prototype.match>[0],
	run: (terminal: Terminal, ...match: string[]) => void,
};

export const commands: Command[] = [
	{
		name: "look around",
		pattern: /^look around$/i,
		run (terminal) {
			terminal.log("There isn't much to see yet.");
		},
	},
	{
		name: "add ITEM",
		pattern: /^(add|put|drop)(.*)/i,
		run (terminal, match, verb, item) {
			terminal.log(`You ${verb} ${item.trim()} in the cauldron. For flavor.`);
		},
	},
	{
		name: "borrow ITEM",
		pattern: /^(borrow|fetch|grab|pick(?:up)?|retrieve|steal|take|yoink)(.*)/i,
		run (terminal, match, verb, item) {
			item = item.trim() || "something";
			const itemExists = true;

			if (itemExists) {
				terminal.log(`You ${verb === "yoink" ? "pretend you're Homer Simpsons and yoink" : verb} some ${item} from the chest.`);
			} else {
				terminal.log(`You can't find any ${item} in the chest.`);
			}
		},
	},
	{
		name: "help",
		pattern: /^help\b/i,
		run (terminal) {
			terminal.log("\n      b u t    n o b o d y    c a m e.\n\n");
			const hack = document.querySelector(".command-input") as HTMLInputElement;
			hack.disabled = true;

			setTimeout(() => {
				terminal.log([
					"...fine, printing list of available commands.",
					...commands.map(c => "    " + c.name),
				].join("\n"));
				hack.disabled = false;
				hack.scrollIntoView();
				hack.focus();
			}, 3000);
		}
	},
	{
		name: "make me a sandwich",
		pattern: /^(sudo )?make me a sandwich$/i,
		run (terminal, match, sudo) {
			if (sudo) {
				terminal.log("Poof, you're a sandwich.");
				terminal.prompt = "🥪 ";
			} else {
				terminal.log("no.");
			}
		},
	},
	{
		name: "bash",
		pattern: /^bash\b|sh\b/i,
		run (terminal) {
			terminal.prompt = terminal.prompt === "🥪 " ? "sandwich@chasm:~$ " : "alchemist@chasm:~$ ";
		},
	},
	{
		name: "fortune",
		pattern: /^fortune\b/i,
		run (terminal) {
			terminal.log(
				"Q: How many pirates does it take to change a lightbulb?\nA: No more than 5, but they'll leave you 2 weeks in the dark first."
			);
		},
	},
];
