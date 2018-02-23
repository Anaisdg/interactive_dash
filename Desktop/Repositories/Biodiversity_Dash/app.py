from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo
import belly_button
import json


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/names')
def names():
    names_data = belly_button.names()
    # return render_template("names.html", names_data=names_data)
    return jsonify(names_data)

@app.route('/otu')
def otu():
    otu_data = belly_button.otu_list()
    return jsonify(otu_data)

@app.route('/metadata/<sample>')
def metadata(sample):
    metadata_data  = belly_button.json(sample)
    values = list(metadata_data.values())
    keys = list(metadata_data.keys())
    metadata_dict = {"keys":keys, "values":values, "data":metadata_data}
    return jsonify(metadata_dict)

@app.route('/wfreq/<sample2>')
def wfreq(sample2):
    wfreq_data  = belly_button.washing()[sample2]
    return jsonify(wfreq_data)

@app.route('/samples/<sample3>')
def samples(sample3):
    samples_data = belly_button.samples_data(sample3)
    return jsonify(samples_data)

if __name__ == "__main__":
    app.run(debug=True)
