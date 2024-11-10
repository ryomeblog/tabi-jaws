# 旅ジョーズ

## 環境構築資料

### 1. 必要条件

- **Node.js**: バージョン20以上  
- **npm**: バージョン10以上

```bash
> node -v
v20.17.0
> npm -v
10.8.2
```

### 2. プロジェクトのクローン

プロジェクトのクローンを行います。

```bash
git clone https://github.com/ryomeblog/tabi-jaws.git
cd tabi-jaws
```

### 3. 依存関係のインストール

依存関係を解決します。

```bash
npm ci --legacy-peer-deps
```

> **Note:** `npm ci`コマンドは`package-lock.json`に従ってクリーンインストールを行うため、依存関係のバージョンの整合性が保証されます。

### 4. 開発サーバーの起動

依存関係のインストールが完了したら、開発サーバーを起動します。

```bash
npm start
```

- 正常に起動すると、ブラウザが自動的に`http://localhost:3000`で開発用アプリケーションを表示します。

### 5. ディレクトリ構成

プロジェクトの基本的なディレクトリ構成は以下の通りです。

```
tabi-jaws/
├── public/               # 静的ファイル
├── src/                  # ソースコード
│   ├── components/       # コンポーネント
│   ├── pages/            # 各ページ
│   ├── index.js          # エントリーポイント
│   └── ...
├── package.json          # プロジェクト設定と依存関係
└── ...
```
