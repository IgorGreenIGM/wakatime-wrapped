from typing import List, Dict

def add_programming_language_colors(languages: List[Dict], programming_languages_datas: List[Dict]):
    for language in languages:
        for programming_language in programming_languages_datas:
            if language['name'] == programming_language['name']:
                language['color'] = programming_language['color']
                break
    return languages

def add_editor_colors(editors: List[Dict], editors_datas: List[Dict]):
    for editor in editors:
        for editor_data in editors_datas:
            if editor['name'] == editor_data['name']:
                editor['color'] = editor_data['color']
                break
    return editors