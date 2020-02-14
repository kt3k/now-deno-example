# now-deno-demo

Very simple BBS written in Deno, running in Zeit [Now][].

# Architecture

- Runs in Zeit [Now][], which means each endpoints run as AWS Lambda.
- Written in [Deno][].
- Stores the data in Postgres DB.
- Single Page App, written in vanilla JS.

# How to run this demo

You need postgres DB instance to run this demo. You can get a free instance from generous database hosting services such as AWS RDS, ElephantSQL, etc.

You need [Now][] and need to set the following information in `now secrets`

```
now secrets add pguser <The postgres user name>
now secrets add pgpassword <The postgres user name>
now secrets add pghost <The postgres db hostname>
now secrets add pgdatabase <The postgres databasename>
now secrets add pgport <The postgres port>
```

You need to create a database in your postgres DB:

```sql
CREATE DATABASE bbs ENCODING 'UTF-8';
```

You need to create the following table:

```sql
CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  body TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

I recommend you insert some of rows before starting:

```sql
INSERT INTO posts (name, body) VALUES ('alice', 'hi')
INSERT INTO posts (name, body) VALUES ('alice', 'anyone here?');
INSERT INTO posts (name, body) VALUES ('bob', 'hey');
INSERT INTO posts (name, body) VALUES ('bob', 'anyone?');
```

Then hit the command `now` and that should run the this app in your now account.

# License

MIT

[Now]: https://github.com/zeit/now
