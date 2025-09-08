## 開発メモ

### 前提
- Node >= 18（推奨: 20 以上）
- パッケージマネージャ: npm（`package-lock.json` 利用）

### よく使うコマンド
- 開発: `npm run dev`
- 型/検査: `npm run check`
- 本番ビルド: `npm run build`
- プレビュー: `npm run preview`
- 新規記事: `npm run new -- "タイトル"`（`-m`=MDX, `-d`=Draft, `-f`=フォルダ）
- 整形/静的解析: `npm run format` / `npm run lint`

### ディレクトリ構成（要点）
- `src/pages/`: ルーティング（`index.astro`, `blog`, `docs`, `search` 等）
- `src/content/`: コンテンツコレクション（`blog/` 等）
- `src/site.config.ts`: サイト設定（タイトル/メニュー/検索/コメントなど）
- `public/`: 静的アセット（favicon 等）

### 設定
- 静的出力: `astro.config.ts`（アダプタ未指定＝static）。SSR/API は使わない方針。
- 検索: `src/site.config.ts` の `integ.pagefind: true`。ビルド時に Pagefind が走ります。
- コメント: `integ.waline`。不要なら `enable: false`。

### 記事の frontmatter 例
```yaml
title: 記事タイトル
description: 説明
publishDate: 2025-09-08 12:00:00
tags: [Example]
draft: false
lang: ja
```

### チェックリスト（PR/変更時）
- `npm run build` が成功する（`dist/` 生成、エラーなし）
- `/search` で検索できる（`npm run preview`）
- 主要ページ（トップ/ブログ/タグ/検索/404）が表示できる
- 必要に応じて `src/site.config.ts` を更新し、README の確認事項も反映

