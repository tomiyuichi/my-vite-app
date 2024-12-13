# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```sql
CREATE DATABASE myviteapp;
SHOW DATABASES;
SELECT user FROM mysql.user;
SELECT host FROM mysql.user;
-- confirm existing users and hosts
CREATE USER myviteapp_user@localhost;
-- SET PASSWORD FOR myviteapp_user@localhost IDENTIFIED BY myviteapp_user; --not work
-- set password for myviteapp_user@localhost = myviteapp_user; --not work
-- ALTER USER myviteapp_user@localhost IDENTIFIED BY myviteapp_user; -- not work
ALTER USER myviteapp_user@localhost IDENTIFIED BY 'myviteapp_user'; -- fine
SHOW GRANTS FOR myviteapp_user@localhost;
+----------------------------------------------------+
| Grants for myviteapp_user@localhost                |
+----------------------------------------------------+
| GRANT USAGE ON *.* TO `myviteapp_user`@`localhost` |
+----------------------------------------------------+
-- 1 row in set (0.000 sec)
GRANT ALL ON myviteapp.* TO myviteapp_user@localhost;
SHOW GRANTS FOR myviteapp_user@localhost;
+----------------------------------------------------+
| Grants for myviteapp_user@localhost                |
+----------------------------------------------------+
| GRANT USAGE ON *.* TO `myviteapp_user`@`localhost` |
+----------------------------------------------------+
```

### 権限の種類

- `ALL`　全て
- `CREATE` データベースおよびテーブルの作成ができる権限
- `SELECT / UPDATE / INSERT / DELETE`　よくあるやつ
- `USAGE` 権限無し

### 権限のレベル

```sql
GRANT 権限 ON *.* TO myviteapp_user;                          -- global level
GRANT 権限 ON db_name.* TO myviteapp_user;                    -- database level
GRANT 権限 ON db_name.table_name TO myviteapp_user;           -- table level
GRANT 権限  (カラム名) ON db_name.table_name TO myviteapp_user; -- column level
```

