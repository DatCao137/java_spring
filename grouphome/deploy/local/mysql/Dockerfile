FROM mysql:8.0
LABEL maintainer="ucan-lab <yes@u-can.pro>"
ENV TZ="Asia/Tokyo"

EXPOSE 3306
# 設定ファイルをコンテナにコピー
COPY deploy/local/mysql/my.cnf /etc/mysql/my.cnf
# 設定ファイルの権限を変更
RUN chmod 644 /etc/mysql/my.cnf
# データの初期化を行うDDLをコンテナにコピー
#COPY ./sql_init /docker-entrypoint-initdb.d
