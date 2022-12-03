export const isContentArray = (test: any[]): test is IContent[] => {
  for (let i = 0; i < test.length; i++) {
    const block = test[i];
    if (block === undefined) {
      return false;
    }
    if (!block.type) {
      return false;
    }

    if (!block.content) {
      return false;
    }

    block.content.forEach((item: any) => {
      if (!isText(item) || !isImage(item)) {
        return false;
      }
    });
  }

  return true;
};

export const isText = (block: any): block is IText => {
  if (typeof block.plainText === "string" && block.annotations) {
    return true;
  }

  return false;
};

export const isImage = (block: any): block is IImage => {
  if (typeof block.caption === "string" && typeof block.url === "string") {
    return true;
  }

  return false;
};
