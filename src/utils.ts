/** Selects an element in the document and assert its type. */
export function ref<T extends HTMLElement> (selector: string, constructor: { new(): T; }) {
	const el = document.querySelector(selector);
	if (!el)
		throw Error(`No match for selector: ${selector}`);
	if (!(el instanceof constructor))
		throw Error(`Expected ${constructor.name} but found ${el.constructor.name} for selector: ${selector}`);
	return el;
}

/** Selects elements in the document and assert their type. */
export function refArray<T extends HTMLElement> (selector: string, constructor: { new(): T; }) {
	const arr = Array.from(document.querySelectorAll(selector));
	if (!arr.length)
		throw Error(`No match for selector: ${selector}`);
	const intruder = arr.find(el => !(el instanceof constructor));
	if (intruder)
		throw Error(`Expected ${constructor.name} but found ${intruder.constructor.name} for selector: ${selector}`);
	return arr;
}
