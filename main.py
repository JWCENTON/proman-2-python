from urllib import request
from flask import Flask,  request, render_template, url_for, session, redirect
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries
import re

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        # get user by username and password match
        account = {}
        if account:
            session['loggedin'] = True
            session['id'] = account['id']
            session['username'] = account['username']
            return redirect(url_for('index'))
        else:
            print("Incorrect username / password !")
    return render_template('signin.html')


@app.route("/logout")
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('login'))


@app.route("/register", methods=['GET', 'POST'])
def register():

    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        account = {}  # get user by username/ validation of username in db
        if account:
            print('Account already exists !')
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            print('Invalid email address !')
        elif not re.match(r'[A-Za-z0-9]+', username):
            print('Username must contain only characters and numbers !')
        elif not username or not password or not email:
            print('Please fill out the form !')
        else:
            # add user to db function here
            print("Success!")

    return render_template('signup.html')


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule(
            '/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
