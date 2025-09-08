## AGENTS ガイド（Codex 用）

目的: このリポジトリを継続運用するための手順・テスト・禁止事項を明確化します。

### 前提
- Astro + `cworld1/astro-theme-pure`
- Node >= 18、npm 利用（`package-lock.json`）
- 静的サイト方針（SSR/API は使わない）

### 開発手順（標準）
1. 変更計画を `update_plan` で共有（小さな TODO 単位）。
2. 依存導入/変更がある場合は `npm install` 実行。
3. 実装 → `npm run build` で本番ビルド確認。
4. `npm run preview` で検索（/search）や主要ページの表示確認。
5. ドキュメント更新（README/DEPLOY/docs/DEVELOPMENT.md）。

### テスト手順（最小）
- 型/静的検査: `npm run check`
- 本番ビルド: `npm run build`（Pagefind インデックス生成を含む）
- プレビュー確認: `npm run preview` を起動し、トップ/ブログ/タグ/検索/404 を確認。

### コード/設定の原則
- 既定のテーマ機能を尊重し、余計な依存を増やさない。
- 出力は常に static。アダプタは未指定（必要時のみ後付け）。
- `src/site.config.ts` に集約された設定を優先的に変更/拡張する。
- パッケージマネージャは npm を維持（ロックファイルは `package-lock.json`）。

### 禁止事項
- SSR/Server 出力や API ルートの有効化（`output: 'server'` 等）
- 機能無断削除（検索 Pagefind、MDX、Sitemap、UnoCSS、Shiki など）
- 機密情報の直書きコミット（API キー等）。必要時は環境変数とシークレット管理を使用。
- 長時間ブロッキングするコマンドの常時実行（CI/自動化時は必要最小限の時間で）。
- lockfile の無断切替（npm → pnpm/yarn 等）。

### よくある作業の手引き
- 記事追加: `npm run new -- "タイトル"`（MDX は `-m`）。
- サイト設定変更: `src/site.config.ts`（タイトル/メニュー/ロケール/コメント等）。
- Vercel Static に後付けしたい: `npm i -D @astrojs/vercel` → `astro.config.ts` に `import vercelStatic from '@astrojs/vercel/static'` と `adapter: vercelStatic()` を追加。

### 変更時のチェックリスト
- [ ] `npm run build` が成功する

- [ ] 重要設定の差分（`astro.config.ts`, `src/site.config.ts`）をレビュー
- [ ] README / DEPLOY / docs を更新

