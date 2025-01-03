from typing import Dict, List

def extract_top_languages(languages: List, limit: int = 5) -> List[Dict]:
    extracted_languages = []
    for i in range(min(limit, len(languages))):
        extracted_languages.append({
            "name" : languages[i]['name'],
            "percent" : languages[i]['percent'],
            "total_seconds" : languages[i]['total_seconds'],
            "time" : languages[i]['text']
        })

    return extracted_languages

def extract_top_projects(projects: List, limit: int = 5) -> List[Dict]:
    extracted_projects = []
    for i in range(min(limit, len(projects))):
        extracted_projects.append({
            "name" : projects[i]['name'],
            "percent" : projects[i]['percent'],
            "total_seconds" : projects[i]['total_seconds'],
            "time" : projects[i]['text']
        })

    return extracted_projects

def extract_top_editors(editors: List, limit: int = 5) -> List[Dict]:
    extracted_editors = []
    for i in range(min(limit, len(editors))):
        extracted_editors.append({
            "name" : editors[i]['name'],
            "percent" : editors[i]['percent'],
            "total_seconds" : editors[i]['total_seconds'],
            "time" : editors[i]['text']
        })

    return extracted_editors

def extract_top_os(os: List, limit: int = 5) -> List[Dict]:
    extracted_os = []
    for i in range(min(limit, len(os))):
        extracted_os.append({
            "name" : os[i]['name'],
            "percent" : os[i]['percent'],
            "total_seconds" : os[i]['total_seconds'],
            "time" : os[i]['text']
        })

    return extracted_os