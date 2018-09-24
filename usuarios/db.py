import os
import psycopg2 as psql

DB_URL = os.environ['DATABASE_URL']

def conectar():
  return psql.connect(DB_URL, sslmode='require')

def executar(conn, sql, param):
  with conn:
    with conn.cursor() as cur:
      cur.execute(sql, param)
      cur.close()

def retornar(conn, sql, param):
  with conn:
    with conn.cursor() as cur:
      cur.execute(sql, param)
      valor = cur.fetchone()
      cur.close()

  return valor