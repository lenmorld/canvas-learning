let chars = [];

for (let i=0; i< 26; i++) {
	const char = String.fromCharCode(i+97);
	chars.push(char);
	chars.push(char.toUpperCase());
}

const extras = "{}!@#$%^&*()_+=-?><[]";

chars = chars.concat(extras.split(''));


export default chars;
