### Flyway Migrationの作成
プロジェクト内でデータベースマイグレーションファイルを作成するには、以下のGradleタスクを使用します。

#### マイグレーションファイルの作成

- マイグレーションファイルを作成するには、以下のコマンドを実行します:

```bash
./gradlew createMigration -Pdesc="your_description"
```

- 例:

```bash
./gradlew createMigration -Pdesc="create users table"
```

上記のコマンドを実行すると、`src/main/resources/db/migration` フォルダ内に以下のようなファイルが作成されます:

```
V20240904103030__create_users_table.sql
```

このファイルにマイグレーションのSQLを記述してください。

#### マイグレーションを実行する
- データベースに対してすべての未適用のマイグレーションを適用するには、以下のコマンドを実行します:

    ```bash
    ./gradlew flywayMigrate
    ```

このコマンドは、`src/main/resources/db/migration` フォルダ内のすべてのマイグレーションファイルを順次実行し、データベースに適用します。
