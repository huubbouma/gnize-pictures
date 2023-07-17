#!/usr/bin/env python
"""
manage.py
- provides a command line utility for interacting with the
  application to perform interactive debugging and setup
"""
import click
from flask.cli import FlaskGroup, with_appcontext
from flask_migrate import Migrate, upgrade

from mediaserver.application import create_app
from mediaserver.models import User, db

app = create_app()
cli = FlaskGroup(app)

migrate = Migrate(app, db)

# cli.add_command('db', MigrateCommand)


@cli.command("db_upgrade")
def db_upgrade():
    """Upgrade the database to the latest migration."""
    with app.app_context():
        upgrade(directory="migrations")  # Specify the migrations directory if necessary


@app.shell_context_processor
def shell_ctx():
    return dict(
        app=app,
        db=db,
        User=User,
    )


@cli.command("create_tables")
@with_appcontext
def create_tables():
    db.create_all()
    click.echo("Tables created successfully.")


if __name__ == "__main__":
    cli()
