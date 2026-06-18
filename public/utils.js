function capitalize(text) {
  return text.replaceAll(
    /\w+/g,
    (word) => word[0].toUpperCase() + word.slice(1),
  );
}

export { capitalize };
