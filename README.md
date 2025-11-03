# NOISE XENERATOR

ようこそ！ `NOISE XENERATOR` は、ブラウザ上で様々な種類のノイズを生成し、再生、保存、そして視覚的に楽しむことができるWebアプリケーションです。

## 主な機能

- **ノイズ生成**: ホワイトノイズ、ピンクノイズ、ブラウンノイズなど、様々な種類のノイズを生成できます。
- **音声再生**: 生成したノイズをブラウザ上で再生できます。
- **保存機能**: 気に入ったノイズをブラウザのストレージに保存し、いつでも再生できます。
- **キーボード演奏**: 保存したノイズをキーボードに割り当て、演奏することができます。
- **ビジュアライザー**: 2Dおよび3Dのビジュアライザーで、音を視覚的に楽しむことができます。
- **ダウンロード**: 保存したノイズをWAVファイルとしてダウンロードできます。

## 技術スタック

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - JavaScriptへの静的型付け
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - Three.jsのためのReactレンダラ
- [Kuma UI](https://www.kuma-ui.com/) - CSS-in-JSライブラリ
- [Dexie.js](https://dexie.org/) - IndexedDBのラッパー

## セットアップ

プロジェクトをローカルで実行するには、以下の手順に従ってください。

1. **リポジトリのクローン:**
   ```bash
   git clone <このリポジトリのURL>
   cd noise-generator
   ```

2. **依存関係のインストール:**
   ```bash
   npm install
   ```

3. **開発サーバーの起動:**
   ```bash
   npm run dev
   ```

   ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、アプリケーションが表示されます。

## 使い方

アプリケーションの詳しい使い方は、ページ右上の `help` ボタンからユーザーガイドをご覧ください。

## ライセンス

このプロジェクトはMITライセンスです。
