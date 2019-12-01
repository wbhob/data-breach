// const defaultTimeout = 50;
// const slowTimeout = 100;

const defaultTimeout = 0.2;
const slowTimeout = 0.2;

export function type(script, onSet) {
  return new Promise((resolve) => {
    let texts = [""];

    let i = 0;
    let textIndex = 0;
    let timeout = defaultTimeout;

    const interval = setInterval(() => {
      let nextChar = script[i];

      switch (nextChar) {
        case "\n":
          textIndex++;
          texts[textIndex] = "";

        case ".":
          timeout = slowTimeout;
          break;

        default:
          timeout = defaultTimeout;
      }

      if (nextChar) {
        texts[textIndex] += nextChar;
      }
      i++;

      onSet(texts);

      if (i == script.length) {
        clearInterval(interval);
        resolve();
      }
    }, timeout);
  });
}
