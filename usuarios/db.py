import os
import psycopg2 as psql

DB_URL = os.environ['DATABASE_URL']

def conectar():
  return psql.connect(DB_URL, sslmode='require')

def executarUm(conn, sql):
  with conn:
    with conn.cursor() as cur:
      cur.execute(sql)
      valor = cur.fetchone()
      cur.close()

  return valor
