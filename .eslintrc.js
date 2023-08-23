module.exports = {
    parser: "@typescript-eslint",
    extends: [
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
    },
    rules: {},
};