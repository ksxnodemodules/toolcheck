# toolcheck

Alert if user does not have required executables

## Usage

### Configuration Files

This package uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) to load configuration, therefore user can write configuration into `.toolcheckrc`, `.toolcheckrc.yaml`, `.toolcheckrc.json` or field `"toolcheck"` of `package.json`.

### Configration Object Structure

```typescript
interface Configration {
  names: string[]
}
```

### Example

**.toolcheckrc:**

```json
{
  "names": [
    "git",
    "bash"
  ]
}
```

#### How it works?

When either `git` or `bash` is missing, `npm install` will fail and prints missing executables.

## License

[MIT](https://git.io/fxfME) © [Hoàng Văn Khải](https://github.com/KSXGitHub)
