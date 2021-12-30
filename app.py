from flask import Flask
from flask import render_template

app = Flask(__name__)

app.config['TESTING'] = True
app.config['TEMPLATES_AUTO_RELOAD'] = True


# @app.route('/')
# def cchs_chart():
#     return render_template('index.html', title='CCHS Usual intakes from food, 2015')


@app.route('/en/nutrition/usual-intakes')
def about():
    return render_template('cchs_usual_intakes_about-en.html', title='CCHS Usual Intakes From Food, 2015')


# @app.route('/about')
# def about():
#     return render_template('cchs_usual_intakes_about-en.html', title='CCHS Usual Intakes From Food, 2015')
#

@app.route('/en/nutrition/usual-intakes/data-table')
def data_table():
    return render_template('cchs_usual_intakes_table-en.html', title='Data Table - CCHS Usual Intakes From Food, 2015')


@app.route('/en/nutrition/usual-intakes/distribution')
def distribution():
    return render_template('cchs_usual_intakes_distribution-en.html',
                           title='Distribution Curves - CCHS Usual Intakes From Food, 2015')


@app.route('/en/nutrition/usual-intakes/geographic')
def geographic():
    return render_template('cchs_usual_intakes_geographic-en.html',
                           title='Geographic Comparison - CCHS Usual Intakes From Food, 2015')

@app.route('/en/nutrition/usual-intakes/technical-notes')
def technical_notes():
    return render_template('cchs_usual_intakes_technical_notes-en.html',
                           title='Technical Notes - CCHS Usual Intakes From Food, 2015')

# French
@app.route('/fr/nutrition/apports-usuels')
def a_propos():
    return render_template('escc_a_propos-fr.html', title='ESCC – Nutrition 2015')

@app.route('/fr/nutrition/apports-usuels/distribution')
def distribution_fr():
    return render_template('escc_distribution-fr.html',
                           title='Courbes de distribution - ESCC – Nutrition 2015')


@app.route('/fr/nutrition/apports-usuels/geographique')
def geographique():
    return render_template('escc_geographique-fr.html',
                           title='Comparaison géographique - ESCC – Nutrition 2015')

@app.route('/fr/nutrition/apports-usuels/tableau')
def tableau():
    return render_template('escc_tableau-fr.html',
                           title='Tableau de données - ESCC – Nutrition 2015')

@app.route('/fr/nutrition/apports-usuels/notes-techniques')
def notes_techniques():
    return render_template('escc_notes_techniques-fr.html',
                           title='Notes techniques - ESCC – Nutrition 2015')

if __name__ == '__main__':
    app.run(host='0.0.0.0')
