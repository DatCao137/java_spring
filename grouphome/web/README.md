## React frontend dev in grouphome project
  
## 開発環境構築  
npm run devでのローカル開発時  
grouphome/web へ移動しコンテナビルド&起動  
docker compose up -d --build  
(起動のみ: docker compose up -d)  
  
バックエンドのSpringと連携する際はモックサーバーは停止し、  
grouphpme全体のREADMEを参考にSpringのコンテナを起動→Spring起動  
  
# ディレクトリ構成  
bulletproofreactをベースにしています  
https://github.com/alan2207/bulletproof-react?tab=readme-ov-file  


    .env.example        # 環境変数ファイルサンプル  
    vite.config.ts      # vite設定  
    vite-env.d.ts       # vite環境変数用デフォルト型定義  
    index.html          # id=root  
    public              # 公開フォルダ  
    dist                # vite buildの出力先（デフォルト）  
    src             # アプリケーション本体  
    ├── main.tsx    # createRoot  
    ├── index.css   # tailwind css  
    ├── app  
    │    ├── index.tsx          # App() : main application component  
    │    ├── main-provider.tsx  # アプリ全体をラップする  
    │    └── routes             # ルーティング  
    │           ├── app                 # app内機能別画面のroute  
    │           │     ├── root.tsx      # 各機能の親route  
    │           │     ├── dashboard.tsx # top画面  
    │           │     └── ...  
    │           ├── auth  
    │           │     └── login.tsx # login画面route  
    │           └── index.tsx       # ルーティング設定ファイル  
    ├── assets                  # static files  
    ├── components              # 全体で共用するコンポーネント  
    │       ├── errors          # エラー表示コンポーネント  
    │       ├── layouts  
    │       │       ├── index.ts             # エントリポイント  
    │       │       ├── aside.tsx            # サイドバー  
    │       │       ├── auth-layout.tsx      # auth画面  
    │       │       ├── content-layout.tsx   # dashboard内のコンテンツ部分  
    │       │       ├── dashboard-layout.tsx # dashboard(ログイン後top画面 (/app))  
    │       │       ├── footer.tsx           # footer  
    │       │       └── header.tsx           # header  
    │       └── ui              # 各種uiコンポーネント  
    │           ├── button      # 各フォルダはコンポーネントとエントリポイントを含む  
    │           │      ├── button.tsx   # コンポーネント  
    │           │      └── index.ts     # エントリポイント  
    │           ├── form  
    │           │     ├── ...  
    │           │     ├── ...  
    │           │     └── index.ts  
    │           ├── ...  
    │  
    ├── config  
    │      └── env.ts   # envファイルから環境変数を設定したオブジェクトを作る  
    ├── features        # 機能別モジュール;以下のフォルダは一例;モジュール毎に必要なものだけ追加してファイルを分ける  
    │       ├── ...  
    │       ├── ...  
    │       └── auth    # 例：auth関係（login）モジュール  
    │             ├── api           # モジュールに関わるapi宣言や呼び出し  
    │             ├── assets        # モジュール用static files  
    │             ├── components    # モジュールのコンポーネント  
    │             ├── hooks         # モジュール用hooks  
    │             ├── stores        # モジュール用状態保存  
    │             ├── types         # モジュール用typescript type宣言  
    │             └── utils         # モジュール用utility function  
    ├── hooks           # 全体用hooks  
    ├── lib             # app全体で何度も参照する関数や変数  
    ├── testing         # モックサーバーやテスト用設定  
    ├── types           # 全体で使用するtype宣言  
    ├── utils           # 全体で使用するutility function  
    └── vite-env.d.ts   # vite環境変数用デフォルト型定義  
  
# vite環境変数について  
  
https://vitejs.dev/guide/env-and-mode.html 公式英語  
https://ja.vitejs.dev/guide/env-and-mode　公式日本語  
  
"""引用  
.env # 全ての場合に読み込まれる  
.env.local # 全ての場合に読み込まれ、gitには無視される  
.env.[mode] # 指定されたモードでのみ読み込まれる  
.env.[mode].local # 指定されたモードでのみ読み込まれ、gitには無視される  
  
env 読み込みの優先度  
特定のモードの env ファイル（例: .env.production）は、汎用の env ファイル（例: .env）よりも優先されます。  
"""  
.env.production はvite build時に読み込まれる  
ローカルでビルドを試す時は .env.production.local を編集  
  
# 主なライブラリ  
  
css: tailwind  
https://tailwindcss.com/  
  
ui: radix-ui  
https://www.radix-ui.com/  
  
フォーム状態管理: React Hook Form  
https://react-hook-form.com/  
  
状態管理: zustand  
https://docs.pmnd.rs/zustand/getting-started/introduction  
  
非同期状態管理, fetching, cashing: TanStack Query  
https://tanstack.com/query/latest  
  
input validation: zod  
https://github.com/colinhacks/zod  
