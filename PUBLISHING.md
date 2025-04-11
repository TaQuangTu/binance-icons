# Publishing to NPM

This document outlines the steps to publish the `tradexai-binance-icons` package to the NPM registry.

## Prerequisites

- Node.js installed on your machine
- An NPM account (create one at https://www.npmjs.com/signup if you don't have one)
- Logged in to NPM from your terminal

## Steps to Publish

1. **Login to NPM** (if you haven't already):

```bash
npm login
```

Follow the prompts to enter your username, password, and email.

2. **Prepare the package**:

Make sure you've made all necessary changes to the package. The package includes:

- All icons in the `crypto` and `currency` folders
- The `manifest.json` file
- The core library files: `index.js` and `index.d.ts`
- Documentation: `README.md` and `LICENSE`

3. **Test the package locally**:

```bash
node example.js
```

Verify that all icons can be accessed correctly.

4. **Update the version** (if needed):

If you're making changes to an existing package, update the version in `package.json` following semantic versioning:

```bash
# For patch updates (bug fixes)
npm version patch

# For minor updates (new features, backward compatible)
npm version minor

# For major updates (breaking changes)
npm version major
```

5. **Publish to NPM**:

```bash
npm publish
```

This will run the `prepublishOnly` script automatically and then publish the package to NPM.

6. **Verify the published package**:

Visit `https://www.npmjs.com/package/tradexai-binance-icons` to verify that your package has been published successfully.

## Unpublish/Deprecate

If needed, you can unpublish the package within 72 hours of publishing:

```bash
npm unpublish tradexai-binance-icons
```

Or you can deprecate it if it's no longer maintained:

```bash
npm deprecate tradexai-binance-icons "This package is no longer maintained"
```

## Troubleshooting

- If you get a 403 error, make sure you're logged in to the correct NPM account and have the right permissions.
- If the package name is already taken, choose a different name.
- Make sure your `.npmignore` file is correctly set up to exclude any unnecessary files.
