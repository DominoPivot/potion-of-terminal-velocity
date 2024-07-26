export type TerminalConfig = {
	promptElement: HTMLElement,
	inputElement: HTMLInputElement,
	outputElement: HTMLElement,
	onUserInput: (userInput: string) => void,
};

export type Terminal = {
	prompt: string
	readonly log: (message: string, loglevel?: "log" | "error") => void;
};

export function createTerminal ({ promptElement, inputElement, outputElement, onUserInput }: TerminalConfig) {
	let samp: HTMLElement | undefined;
	let prompt: string = promptElement.textContent ?? "";

	function echo (userInput: string) {
		const kbdElement = document.createElement("kbd");
		kbdElement.textContent = userInput;

		samp = document.createElement("samp");
		samp.append(prompt, kbdElement, "\n");
		outputElement.appendChild(samp);
	}

	function log (message: string, loglevel: "log" | "error" = "log") {
		if (message === "") {
			samp = undefined;
			return;
		}
		if (!message.endsWith("\n")) {
			message += "\n";
		}
		const span = document.createElement("span");
		span.className = loglevel;
		span.textContent = message;

		samp ??= document.createElement("samp");
		samp.appendChild(span);
		outputElement.appendChild(samp);
		samp = undefined;
	}

	inputElement.addEventListener("keydown", function onCommandLineKeyDown (event: KeyboardEvent) {
		if (event.key === "Enter") {
			const userInputString = this.value;
			this.value = "";
			echo(userInputString);
			onUserInput(userInputString);
			this.scrollIntoView({ behavior: "instant" });
		}
	}, { passive: true });

	return Object.freeze({
		log,
		set prompt (value: string) {
			promptElement.textContent = prompt = value;
		},
		get prompt () {{
			return prompt;
		}},
	});
}
