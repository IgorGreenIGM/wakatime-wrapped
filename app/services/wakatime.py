import os
import requests

from app.utils.adders import *
from app.utils.statistics import *
from app.utils.extractors import *
from .card import generate_card

class Wakatime:
    def __init__(self, access_token: str) -> None:
        self.access_token = access_token
        self.session = requests.Session()
        self.headers = {"Authorization": f"Bearer {self.access_token}"}

    def __fetch_this_year_stats(self):
        url = "https://wakatime.com/api/v1/users/current/stats/last_year"
        response = self.session.get(url=url, headers=self.headers)
        response.raise_for_status()
        return response.json()['data']

    def __fetch_last_year_stats(self):
        url = f"https://wakatime.com/api/v1/users/current/stats/{2024-1}"
        response = self.session.get(url=url, headers=self.headers)
        response.raise_for_status()
        return response.json()['data']
    
    def __fetch_daily_stats(self):
        url = "https://wakatime.com/api/v1/users/current/insights/days/last_year"
        response = self.session.get(url=url, headers=self.headers)
        response.raise_for_status()
        return response.json()['data']
    
    def __fetch_programming_languages_datas(self):
        url = "https://wakatime.com/api/v1/program_languages"
        response = self.session.get(url=url, headers=self.headers)
        response.raise_for_status()
        return response.json()['data']
    
    def __fetch_editors_datas(self):
        url = "https://wakatime.com/api/v1/editors"
        response = self.session.get(url=url, headers=self.headers)
        response.raise_for_status()
        return response.json()['data']
    
    def __fetch_user_infos(self, user_id: str):
        url = f"https://wakatime.com/api/v1/users/{user_id}"
        response = self.session.get(url=url, headers=self.headers)
        response.raise_for_status()
        return response.json()['data']

    def fetch_yearly_stats(self):
        # Rest of the method remains the same
        daily_stats = self.__fetch_daily_stats()
        this_year_datas = self.__fetch_this_year_stats()
        last_year_datas = self.__fetch_last_year_stats()
        print(last_year_datas)
        programming_languages_datas = self.__fetch_programming_languages_datas()
        editors_datas = self.__fetch_editors_datas()
        user_infos = self.__fetch_user_infos(this_year_datas['user_id'])

        this_year_datas["best_day"]["time_in_days"] = this_year_datas["best_day"]["total_seconds"] / 86400
        stats = {
            "username": this_year_datas["username"],
            "profile_picture_url": user_infos["photo"] if user_infos['photo_public'] else "",
            "best_day": this_year_datas["best_day"],
            "total_time": this_year_datas["human_readable_total"],
            "daily_average": this_year_datas["human_readable_daily_average"],
            "top_languages": add_programming_language_colors(extract_top_languages(this_year_datas['languages']), programming_languages_datas),
            "top_projects": extract_top_projects(this_year_datas["projects"]),
            "top_editors": add_editor_colors(extract_top_editors(this_year_datas["editors"]), editors_datas),
            "top_os": extract_top_os(this_year_datas["operating_systems"]),
            "best_week": get_best_week(daily_stats),
            "best_month": get_best_month(daily_stats),
            "longest_streak": get_longest_streak(daily_stats),
            "year_on_year_comp": get_year_on_year_comp(this_year_datas, last_year_datas),
            "new_projects_started": get_new_projects_started(this_year_datas, last_year_datas),
            "new_languages_learned": add_programming_language_colors(get_new_languages_learned(this_year_datas, last_year_datas), programming_languages_datas),
            "milestone": get_milestones(daily_stats, this_year_datas['total_seconds']),
            "total_days_coded": get_total_days_coded(daily_stats),
        }

        if (not os.path.exists(f'app/cards/{self.access_token}.png')):
            # generate and save stats card
            card = generate_card(stats)
            card.save(f'app/cards/{self.access_token}.png')

        return stats