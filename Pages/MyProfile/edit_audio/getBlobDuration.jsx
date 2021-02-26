export default async function getBlobDuration(blob) {
  const tempVideoEl = document.createElement("video");

  const durationP = new Promise((resolve) =>
    tempVideoEl.addEventListener("loadedmetadata", () => {
      // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
      if (tempVideoEl.duration === Infinity) {
        tempVideoEl.currentTime = Number.MAX_SAFE_INTEGER;
        tempVideoEl.ontimeupdate = () => {
          tempVideoEl.ontimeupdate = null;
          resolve(tempVideoEl.duration);
          tempVideoEl.currentTime = 0;
        };
      }
      // Normal behavior
      else resolve(tempVideoEl.duration);
    })
  );

  tempVideoEl.src =
    typeof blob === "string" || blob instanceof String
      ? blob
      : window.URL.createObjectURL(blob);

  return durationP;
}
