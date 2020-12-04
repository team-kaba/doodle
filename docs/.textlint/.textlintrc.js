module.exports = {
  filters: {
    comments: true,
  },
  rules: {
    "preset-ja-technical-writing": {
      "sentence-length": {
        max: 100,
        exclusionPatterns: ["/\\(.*\\)/"],
      },
    },
    "spellcheck-tech-word": true,
    "textlint-rule-preset-ja-spacing": true,
    prh: {
      rulePaths: ["./prh.yaml"],
    },
    "no-dead-link": {
      checkRelative: true,
    },
  },
};
