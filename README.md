## このリポジトリについて

Astro とテーマ「cworld1/astro-theme-pure」を用いた静的ブログです。Node 18 以上を前提とし、SSR/API は使用しません（必要になれば後から `@astrojs/vercel` を追加）。

テーマの既定機能（検索、MDX、Shiki、UnoCSS、Sitemap/RSS、Waline 等）を活かした構成です。

## セットアップ

```bash
# Node 18+ を推奨
node -v

# 依存関係の導入（初回）
npm install

# 開発サーバ
npm run dev
```

ポートはデフォルトで 4321（`astro.config.ts:56` の `server.host` を参照）です。

## 記事追加方法

- スクリプトで作成（推奨）
  - Markdown: `npm run new "はじめての記事"`
  - MDX: `npm run new -- -m "MDX 記事"`
  - 下書き: `npm run new -- -d "下書きの記事"`
  - フォルダで作成: `npm run new -- -f "画像付き記事"`（`index.md|mdx` が生成）

- 手動で作成
  - `src/content/blog/` 配下に `my-post.md` もしくは `my-post.mdx` を作成し、以下のフロントマターを書きます。

```mdx
---
title: タイトル
description: 説明
publishDate: 2025-09-08 12:34:56
tags: [Example, Technology]
draft: false
lang: ja
---

本文や <MyComponent /> などの MDX が書けます。
```

## MDX の使い方（要点）
- `.mdx` でコンポーネントや JSX 表現が利用可能。
- コードハイライトは Shiki で有効。タイトル/コピー/差分表示に対応。
- 数式は `remark-math` + `rehype-katex` が有効（`$...$`, `$$...$$`）。

## ビルド / プレビュー / デプロイ

```bash
# 型チェック + 本番ビルド（pagefind で検索インデックスも生成）
npm run build

# 本番ビルドのプレビュー
npm run preview
```

デプロイの詳細（GitHub Pages / Vercel Static / Cloudflare Pages など）は `DEPLOY.md` を参照してください。

## トラブルシュート

- 検索が効かない
  - `npm run dev` 中はインデックスが未生成のためヒットしないことがあります。`npm run build && npm run preview` で確認してください。
  - `dist/pagefind/` がデプロイ対象に含まれているか確認。
  - サブパス配信（例: `https://example.com/blog/`）では `astro.config.ts:13` の `base` を有効化して正しいサブパスを設定。
  - ホスティングが `*.wasm` に適切な MIME を返しているか確認（`application/wasm`）。

- 画像最適化が失敗する
  - `sharp` のバイナリ問題が出た場合は `rm -rf node_modules && npm ci` を実施し、再ビルド。

- コメントが表示されない
  - `src/site.config.ts:103` 付近の Waline 設定が有効か、`server` が正しいかを確認。不要なら `enable: false` に。

## 開発者向け情報

- コードスタイル: `npm run format`（Prettier）、`npm run lint`（ESLint）
- 主要設定: `astro.config.ts:1`, `src/site.config.ts:1`
- ディレクトリ: `src/pages`, `src/content`, `public`
- 追加の開発メモは `docs/DEVELOPMENT.md` を参照。

---

ライセンス: 本テーマは MIT（上流 LICENSE を参照）。

