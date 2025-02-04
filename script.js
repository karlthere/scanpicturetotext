/** @format */

const input = document.getElementById("image-input");
const output = document.getElementById("output");
const copyButton = document.getElementById("copy-btn");

// Loader
const loader = document.createElement("div");
loader.textContent = "Processing image...";
loader.classList.add("loader");

input.addEventListener("change", function (event) {
	const file = event.target.files[0];
	if (file) {
		output.innerHTML = "";
		output.appendChild(loader);

		const reader = new FileReader();
		reader.onload = function (e) {
			const imageSrc = e.target.result;

			Tesseract.recognize(imageSrc, "eng", { logger: (m) => console.log(m) })
				.then(({ data: { text } }) => {
					output.innerHTML = "<pre>" + text + "</pre>";
					copyButton.style.display = "block";

					copyButton.onclick = function () {
						copyToClipboard(text);
					};
				})
				.catch((error) => {
					output.innerHTML = "Error: " + error.message;
				});
		};
		reader.readAsDataURL(file);
	}
});

// Fungsi Copy Text
function copyToClipboard(text) {
	const textarea = document.createElement("textarea");
	textarea.value = text;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	alert("Text copied to clipboard!");
}
