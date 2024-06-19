document.getElementById("load-video").addEventListener("click", function () {
	const videoUrl = document.getElementById("video-url").value;
	const video = document.getElementById("video");

	if (videoUrl) {
		video.src = videoUrl;
		video.load(); // Explicitly load the video
		video.addEventListener("error", function (e) {
			alert("Failed to load the video. Please check the URL and try again.");
		});
	} else {
		alert("Please enter a valid video URL.");
	}
});

const captions = [];

document.getElementById("add-caption").addEventListener("click", function () {
	const captionText = document.getElementById("caption-text").value;
	const timestamp = document.getElementById("timestamp").value;
	if (captionText && timestamp) {
		captions.push({ text: captionText, time: parseFloat(timestamp) });
		updateCaptionList();
		document.getElementById("caption-text").value = "";
		document.getElementById("timestamp").value = "";
	}
});

function updateCaptionList() {
	const captionList = document.getElementById("caption-list");
	captionList.innerHTML = "";
	captions.forEach((caption, index) => {
		const li = document.createElement("li");
		li.textContent = `(${caption.time}s) ${caption.text}`;
		captionList.appendChild(li);
	});
}

const video = document.getElementById("video");
const captionDisplay = document.createElement("div");
captionDisplay.className = "caption-display";
document.querySelector(".video-section").appendChild(captionDisplay);

video.addEventListener("timeupdate", function () {
	const currentTime = video.currentTime;
	const caption = captions.find(
		(c) => c.time <= currentTime && c.time + 2 > currentTime
	);
	if (caption) {
		captionDisplay.textContent = caption.text;
	} else {
		captionDisplay.textContent = "";
	}
});
