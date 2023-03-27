// import { LANGUAGES, TOOLS, METHODS } from '../lang/en-gb';

const TAG_TYPES = {
	// LANGUAGES,
	// TOOLS,
	// METHODS,
};

export const parseTags = (log) => {
	const tags = [];
	if (!log) return tags;

	const logValue = log.toLowerCase();

	Object.keys(TAG_TYPES).forEach((tagKey) => {
		TAG_TYPES[tagKey].forEach((item) => {
			if (logValue.includes(item)) {
				tags.push({
					type: tagKey,
					value: item
				})
			}
		})
	})

	return tags;
}
