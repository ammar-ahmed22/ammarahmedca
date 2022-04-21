const typeResolver = {
  TextOrImage: {
    __resolveType(obj, context, info) {

      if (obj.annotations) {
        return "Text";
      } else if (obj.url) {
        return "Image";
      } else {
        return null;
      }
    }
}
};

export default typeResolver