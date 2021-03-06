import os
import psycopg2 as psql

DB_URL = os.environ['DATABASE_URL']

def conectar():
  return psql.connect(DB_URL, sslmode='require')

def contar(conn, sql, param):
  with conn:
    with conn.cursor() as cur:
      cur.execute(sql, param)
      quantidade = cur.fetchone()[0]

  return quantidade

def executar(conn, sql, param):
  with conn:
    with conn.cursor() as cur:
      cur.execute(sql, param)
      cur.close()

def retornar(conn, sql, param):
  with conn:
    with conn.cursor() as cur:
      cur.execute(sql, param)
      valor = [dict((cur.description[i][0], value) for i, value in enumerate(row)) for row in cur.fetchall()]
      cur.close()

  return valor