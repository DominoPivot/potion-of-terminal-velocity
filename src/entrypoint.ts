import { ref, refArray } from "./utils.js";
import { createTerminal } from "./terminal.js";
import { createGame } from "./game.js";

export const rootClassList = document.documentElement.classList;

ref(".settings [name=reduced-motion]", HTMLInputElement)
	.addEventListener("change", function onReducedMotionChange (event: Event) {
		if (this.checked) {
			rootClassList.add("reduced-motion");
		} else {
			rootClassList.remove("reduced-motion");
		}
	}, { passive: true });

refArray(".settings [name=color-scheme]", HTMLInputElement)
	.forEach(el =>
		el.addEventListener("change", onColorSchemeChange, { passive: true }));

function onColorSchemeChange (this: HTMLInputElement) {
	Array.from(rootClassList)
		.filter(name => name.startsWith("theme-"))
		.forEach(name => rootClassList.remove(name));
	rootClassList.add(`theme-${this.value}`);
}

const terminal = createTerminal({
	inputElement: ref(".command-input", HTMLInputElement),
	outputElement: ref(".output-log", HTMLElement),
	promptElement: ref(".command-prompt", HTMLElement),
	onUserInput (userInput: string) {
		game.runCommand(terminal, userInput);
	},
});

const game = createGame();
