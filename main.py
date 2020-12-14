import os
import csv
from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import constants

app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)

parsed_data = []
categories = {
    "Microsoft Edge": constants.OTHERS,
    "Command Prompt": constants.PROGRAMMING,
    "Windows Explorer": constants.PRODUCTIVITY,
    "Notepad": constants.PRODUCTIVITY,
    "Git Bash": constants.PROGRAMMING,
    "Atom": constants.PROGRAMMING,
    "Overwatch": constants.GAMES,
    "PyCharm": constants.PROGRAMMING,
    "Application Frame Host": constants.OTHERS,
    "Webstorm": constants.PROGRAMMING
}


@app.route('/', methods=["GET"])
def index():
    return app.send_static_file('index.html')


@app.route('/data', methods=["GET"])
def get_data():
    return jsonify({'result': parsed_data})


def parse_data():
    filename = "arbttlog.csv"
    with open(filename, 'r') as data:
        header = []
        i = 0
        for line in csv.reader(data):
            if i == 0:
                # parse header
                header = line
            else:
                row = {}
                for i in range(len(header)):
                    row[header[i]] = line[i]
                    if header[i] == 'Tag':
                        row['Category'] = categories[line[i]]
                parsed_data.append(row)
            i += 1


if __name__ == "__main__":
    # Only for debugging while developing
    parse_data()
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))