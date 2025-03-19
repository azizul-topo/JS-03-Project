document.addEventListener("DOMContentLoaded", fetchQuote);

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-quote");
const tweetBtn = document.getElementById("tweet-quote");
const exportBtn = document.getElementById("export-quote");

const apiUrl = "https://api.freeapi.app/api/v1/public/quotes/quote/random";

// Fetch and display a new quote
async function fetchQuote() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    quoteText.textContent = `"${data.data.content}"`;
    quoteAuthor.textContent = `- ${data.data.author}`;
    setRandomBackground();
  } catch (error) {
    quoteText.textContent = "Oops! Could not fetch a quote.";
    quoteAuthor.textContent = "";
  }
}

// Set a random background image
async function setRandomBackground() {
  try {
    const randomImageUrl = `https://api.unsplash.com/photos/random/?client_id=vMPWP2iGRujsFV6yKR8IStA-oGxfTcXUVY-mmaupHUw`;
    const response = await fetch(randomImageUrl);
    const randomImage = await response.json();
    const imaContainer = randomImage.urls.regular;
    document.body.style.backgroundImage = `url(${imaContainer})`;
  } catch (error) {
    console.log(error);
  }
}

// Copy quote to clipboard
copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(`${quoteText.textContent} ${quoteAuthor.textContent}`)
    .then(() => alert("Quote copied to clipboard!"))
    .catch((err) => console.error("Error copying text: ", err));
});

// Share quote on Twitter
tweetBtn.addEventListener("click", () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quoteText.textContent + " " + quoteAuthor.textContent
  )}`;
  window.open(twitterUrl, "_blank");
});

// Export quote as image (FIXED)
exportBtn.addEventListener("click", () => {
  const quoteContainer = document.getElementById("quote-container");

  html2canvas(quoteContainer, { backgroundColor: null }).then((canvas) => {
    let link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "quote.png";
    link.click();
  });
});

// Get a new quote on button click
newQuoteBtn.addEventListener("click", fetchQuote);
