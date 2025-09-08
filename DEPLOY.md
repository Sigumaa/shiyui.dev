## デプロイ手順（静的サイト）

このプロジェクトは静的出力（`dist/`）です。`npm run build` で生成したファイル一式を任意の静的ホスティングへ配置してください。

前提
- Node 18 以上
- 本番ビルド: `npm run build`
- 動作確認: `npm run preview`

### 1) GitHub Pages（推奨: リポジトリ専用ページ）

1. GitHub Actions で `dist/` を公開するワークフローを作成（pages 用テンプレート or below）。
2. 設定 → Pages → Branch を `gh-pages` に設定。

サンプル `/.github/workflows/deploy.yml`
```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
```

サブパスで公開（`https://<user>.github.io/<repo>/`）する場合は `astro.config.ts` の `base` を有効化し `base: '/<repo>/'` を設定してください（`astro.config.ts:11` 付近のコメント参照）。

### 2) Vercel（Static）

このリポジトリはアダプタ未指定＝静的出力です。そのまま Vercel にインポートし、
- Framework Preset: Astro
- Build Command: `npm run build`
- Output Directory: `dist`

で動作します。将来的に Vercel 固有の最適化を使いたい場合のみ、以下を後付けしてください。

```bash
npm i -D @astrojs/vercel
```

`astro.config.ts` に static アダプタを追加:

```ts
import vercelStatic from '@astrojs/vercel/static'
export default defineConfig({
  adapter: vercelStatic()
})
```

### 3) Cloudflare Pages / Netlify / その他

- Build Command: `npm run build`
- Output Directory: `dist`

特別なアダプタ設定は不要です。

### 検索（Pagefind）が動かない場合のチェックリスト

- `npm run build` を実行したか（`dist/pagefind/` が存在するか）。
- `dist/` 以下を丸ごと公開しているか（`_astro/` と `pagefind/` を省かない）。
- サブパス公開時は `astro.config.ts` の `base` を正しく設定したか。
- ホスティングが `*.wasm` を `application/wasm` で配信しているか。

