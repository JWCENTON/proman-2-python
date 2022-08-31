import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """, {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """, {"board_id": board_id})

    return matching_cards


def get_user_by_username(username):
    """
    Find the first status matching the given username

    """
    matching_account = data_manager.execute_select(
        """SELECT * FROM users
        WHERE username= %(username)s ; """, {"username": username}, False
    )
    return matching_account


def insert_user(user):
    data_manager.execute_insert(
        """
    INSERT INTO users
     VALUES (DEFAULT, %s, %s, %s );
    """, (user['username'], user['email'], user['password']))


def insert_new_board_title(board_title):
    data_manager.execute_insert(
        """
        INSERT INTO boards (title) VALUES (%(b_t)s);
        """, {'b_t': board_title}
    )
