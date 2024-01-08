function updateURL(urlString: string) {
  if (urlString.includes("https")) {
    return urlString;
  }

  if (!urlString.includes("http")) {
    return urlString;
  }

  return urlString.replace("http", "https");
}

export default updateURL;
