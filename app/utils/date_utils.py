from datetime import date, timedelta

def daterange(start_date: date, end_date:date):
    days = int((end_date - start_date).days)
    for n in range(days):
        yield start_date + timedelta(n)