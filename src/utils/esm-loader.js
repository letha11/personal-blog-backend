// https://github.com/nodejs/node/issues/30927#issuecomment-1460695604
export const resolve = (specifier, context, nextResolve) => {
  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    if (
      !(
        specifier.endsWith(".js") ||
        specifier.endsWith(".mjs") ||
        specifier.endsWith(".cjs")
      )
    ) {
      const newSpecifier = specifier + ".js";
      return nextResolve(newSpecifier, context);
    }
  }
  return nextResolve(specifier, context);
};
