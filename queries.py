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


def get_board(board_id):
    """
    Returns board by its id
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        WHERE id = %s
        ;
        """, [board_id],  # Execute select function requires list/dict
        fetchall=False

    )


def update_board(board_data):
    """
    Updates board, eg. change title
    """
    data_manager.execute_insert(
        """
        UPDATE boards SET title = %(title)s
         WHERE id = %(id)s
        """,
        board_data
    )


def get_cards_for_board(board_id):

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """, {"board_id": board_id})

    return matching_cards


def get_card(board_id, card_id):
    """
    Returns board by its id
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s 
        AND id = %(card_id)s
        ;
        """, {"board_id": board_id, "card_id": card_id},  # Execute select function requires list/dict
        fetchall=False
    )


def update_card(card_data):
    """
    Updates board, eg. change title
    """
    data_manager.execute_insert(
        """
        UPDATE cards SET title = %(title)s
        WHERE board_id = %(boardId)s 
        AND id = %(id)s
        """, card_data
    )


def get_user_by_username(username):
    """
    Find the first status matching the given username

    """
    matching_account = data_manager.execute_select(
        """SELECT * FROM users
        WHERE username= %(username)s ; """, {"username": username}, False
    )
    return matching_account


def get_statuses():

    statuses = data_manager.execute_select(
        """
        SELECT * FROM statuses
        """
    )
    return statuses


def insert_sataus(status):
    data_manager.execute_insert(
        """
        INSERT INTO statuses VALUES (DEFAULT, %s,%s,%s);
        """, (status['title'], status['status_id'], status['board_id'])
    )


def insert_user(user):
    data_manager.execute_insert(
        """
    INSERT INTO users
     VALUES (DEFAULT, %s, %s, %s );
    """, (user['username'], user['email'], user['password']))


def insert_new_board_title(data):
    data_manager.execute_insert(
        """
        INSERT INTO boards
         VALUES (DEFAULT, %s, %s, %s);
        """, (data['title'], data['user_id'], data['is_private'])
    )


def delete_status(status_id):
    data_manager.execute_delete(
        """
        DELETE FROM statuses WHERE id = '{0}'
        """.format(status_id)
    )


def update_status_title(status_id, status_title):
    data_manager.execute_update(
        """
     UPDATE statuses SET title = %s
         WHERE id = %s
    """, (status_title, status_id))


def get_card_order_n(card):
    card_orders = data_manager.execute_select("""
    SELECT card_order FROM cards WHERE (status_id = 1 AND board_id = %(b_i)s) GROUP BY card_order
    """, {'b_i': int(card['board_id'])}
    )
    return card_orders


def add_new_card(card, new_card_order_id):
    data_manager.execute_insert(
        """
        INSERT INTO cards (board_id, status_id, title, card_order) VALUES ( %(b_i)s,  %(s_i)s, %(t_e)s, %(c_o)s)
        """, {'b_i': int(card['board_id']),
              's_i': int(card['status_id']),
              't_e': card['title'],
              'c_o': new_card_order_id}
    )


def delete_card(card_id):
    data_manager.execute_delete(
        """
        DELETE FROM cards WHERE id = '{0}'
        """.format(card_id)
    )


def delete_board(board_id):
    data_manager.execute_delete(
        """
        DELETE FROM boards WHERE id = '{0}'
        """.format(board_id)
    )
