from typing import Dict, List
from datetime import date, datetime, timedelta

def get_longest_streak(daily_stats: List):
    current_streak, longest_streak = 0, 0
    current_start, current_end = None, None
    longest_start, longest_end = None, None
    duration, best_duration = 0.0, 0.0

    # Variables pour le pic d'activité
    activity_peak_day = None
    activity_peak_duration = 0.0

    year_start = date(2024, 1, 1)

    for day_stat in daily_stats['days']:
        current_day = datetime.strptime(day_stat['date'], "%Y-%m-%d").date()
        if current_day < year_start:
            continue

        day_duration = day_stat['total']

        # Mise à jour du pic d'activité
        if day_duration > activity_peak_duration:
            activity_peak_duration = day_duration
            activity_peak_day = current_day

        if day_duration > 0:  # Activity detected
            if current_streak == 0:  # Start of a new streak
                current_start = current_day

            current_end = current_day
            current_streak += 1
            duration += day_duration
        else:  # No activity detected
            if current_streak > longest_streak:  # Update longest streak
                longest_streak = current_streak
                longest_start = current_start
                longest_end = current_end
                best_duration = duration

            # Reset current streak
            current_streak = 0
            current_start = None
            current_end = None
            duration = 0.0

    # Final check in case the longest streak ends today
    if current_streak > longest_streak:
        longest_streak = current_streak
        longest_start = current_start
        longest_end = current_end
        best_duration = duration

    # Convert duration to hours and minutes
    hours, minutes = divmod(int(best_duration / 60), 60)

    peak_hours, peak_minutes = divmod(int(activity_peak_duration / 60), 60)

    return {
        "days_count": longest_streak,
        "start_date": longest_start,
        "end_date": longest_end,
        "total_seconds": best_duration,
        "time": f"{hours} hrs {minutes} min",
        "peak_day": activity_peak_day,
        "peak_duration_seconds": activity_peak_duration,
        "peak_time": f"{peak_hours} hrs {peak_minutes} min",
    }

def get_new_languages_learned(this_year_datas: Dict, last_year_datas: Dict, limit: int=5):
    language_cpt = 0
    new_languages = []
    for new_language in this_year_datas['languages']:
        is_new = True
        for old_language in last_year_datas['languages']:
            if new_language['name'] == old_language['name']:
                is_new = False
                break
        
        if is_new:
            new_languages.append({'name':new_language['name'],
                                  'time': new_language['text'],
                                  'total_seconds':new_language['total_seconds']
                                  })
            language_cpt += 1
            if language_cpt >= limit:
                break

    return new_languages
    

def get_new_projects_started(this_year_datas: Dict, last_year_datas: Dict, limit: int=5):
    project_cpt = 0
    new_projects = []
    for new_project in this_year_datas['projects']:
        is_new = True
        for old_project in last_year_datas['projects']:
            if new_project['name'] == old_project['name']:
                is_new = False
                break
        
        if is_new:
            new_projects.append({'name':new_project['name'],
                                  'time': new_project['text'],
                                  'total_seconds':new_project['total_seconds']
                                  })
            project_cpt += 1
            if project_cpt >= limit:
                break
    return new_projects

from datetime import date, datetime
from typing import List

def get_milestones(daily_stats: List, total_time: float):
    milestones_hours = [10, 100, 500, 1000]
    milestones_seconds = [h * 3600 for h in milestones_hours]  # Convertir en secondes
    achieved_milestones = []
    total = 0.0
    current_milestone_index = 0

    year_start = date(2024, 1, 1)

    for day_stat in daily_stats['days']:
        current_day = datetime.strptime(day_stat['date'], "%Y-%m-%d").date()
        if current_day < year_start:
            continue

        total += day_stat['total']

        # Vérifier si on a atteint le milestone actuel
        while current_milestone_index < len(milestones_seconds) and total >= milestones_seconds[current_milestone_index]:
            achieved_milestones.append({
                'milestone_date': current_day,
                'milestone_hours': milestones_hours[current_milestone_index]
            })
            current_milestone_index += 1  # Passer au prochain milestone

    return achieved_milestones

def get_year_on_year_comp(this_year_datas: Dict, last_year_datas: Dict):
    last_year_seconds = (this_year_datas['total_seconds'] if not last_year_datas['total_seconds'] else last_year_datas['total_seconds'])
    return {
            'ratio':this_year_datas['total_seconds']/last_year_seconds,
            'percent':((this_year_datas['total_seconds']- last_year_datas['total_seconds']))*100/last_year_seconds,
            'current_year_total':this_year_datas['total_seconds'],
            'last_year_datas':last_year_datas['total_seconds'],
            }

def get_best_week(daily_stats: List):
    reset_cpt, weekly_total = 0, 0
    best_week = {'start':None, 'end':None, 'total_seconds':0}

    year_start = date(2024, 1, 1)
    for day_stat in daily_stats['days']:
        current_day = datetime.strptime(day_stat['date'], "%Y-%m-%d").date()
        if current_day < year_start:
            continue

        weekly_total += day_stat['total']
        reset_cpt += 1
        if reset_cpt % 6 == 0:
            if weekly_total > best_week['total_seconds']:
                best_week['start'] = current_day - timedelta(6)
                best_week['end'] = current_day
                best_week['total_seconds'] = weekly_total

            weekly_total = 0
            reset_cpt = 0

    hours = int(best_week["total_seconds"]/3600)
    minutes = int((best_week["total_seconds"]/60) - hours*60)
    best_week['time'] = f"{hours} hrs {minutes} min"
    return best_week

def get_best_month(daily_stats: List):
    current_month = None
    monthly_total = .0
    best_month = {'name':'', 'name_abbr':'', 'total_seconds':0}

    year_start = date(2024, 1, 1)
    for day_stat in daily_stats['days']:
        current_day = datetime.strptime(day_stat['date'], "%Y-%m-%d").date()
        if current_day < year_start:
            continue
        
        monthly_total += day_stat['total']
        # Check for month transition
        if current_month is None:
            current_month = current_day.month

        elif current_day.month != current_month or current_day == date.today():
            # Update best month if needed
            if monthly_total > best_month["total_seconds"]:
                best_month["name"] = current_day.strftime("%B")
                best_month["name_abbr"] = current_day.strftime("%b")
                best_month["total_seconds"] = monthly_total

            # Reset for the new month
            current_month = current_day.month
            monthly_total = 0

    hours = int(best_month["total_seconds"]/3600)
    minutes = int((best_month["total_seconds"]/60) - hours*60)
    best_month['time'] = f"{hours} hrs {minutes} min"
    return best_month

def get_total_days_coded(daily_stats: List):
    total_days = 0
    year_start = date(2024, 1, 1)
    for day_stat in daily_stats['days']:
        current_day = datetime.strptime(day_stat['date'], "%Y-%m-%d").date()
        if current_day < year_start:
            continue

        if day_stat['total'] > 0:
            total_days += 1

    return total_days