from PIL import Image, ImageDraw, ImageFont, ImageOps
import numpy as np
import datetime
import os
import math
import random

# Constants remain the same
WIDTH = 1920
HEIGHT = 2400
BACKGROUND_COLOR = (10, 10, 10, 255)
PARTICLE_COLOR = (0, 149, 255, 76)
TEXT_COLOR = (255, 255, 255)
CARD_BORDER_COLOR = (0, 149, 255, 51)
ACCENT_COLOR = (0, 149, 255)

# Project colors remain the same
PROJECT_COLORS = [
    "#FF5733",  # Red
    "#8D33FF",  # Purple
    "#3357FF",  # Blue
    "#FF33A1",  # Pink
    "#FFC133",  # Yellow
    "#33FFF5",  # Cyan
    "#FF8C33",  # Orange
]

OS_COLORS = [
    "#FFC133",  # iOS Yellow
    "#3357FF",  # macOS Blue
    "#FF5733",  # Linux Red Hat
    "#FF33A1",  # Android Pink
    "#8D33FF",  # Windows Purple
    "#33FFF5",  # ChromeOS Cyan
    "#FF8C33",  # Unix Orange
]

def create_circle_mask(size):
    mask = Image.new('L', size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0) + size, fill=255)
    return mask

def draw_background(image, draw):
    return image

def draw_header(image, draw, data, margin=50):
    logo_size = (100, 100)
    logo = Image.open("app/services/card-res/logo-wakatime.png")
    logo = logo.resize(logo_size)
    logo = logo.convert("RGBA")
    
    logo_x, logo_y = margin, margin
    image.paste(logo, (logo_x, logo_y), logo)
    
    font = ImageFont.truetype("app/services/card-res/Poppins-Bold.ttf", 70)
    text = "WakaTime Wrapped 2024"
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    
    text_x = margin + logo_size[0] + margin/2
    text_y = margin + (logo_size[1] - text_bbox[3] + text_bbox[1]) // 2
    draw.text((text_x, text_y), text, fill=TEXT_COLOR, font=font)
    
    return logo_y + logo_size[1] + margin

def draw_stats_section(image, draw, data, start_y, margin=50):
    font_bold = ImageFont.truetype("app/services/card-res/Poppins-Bold.ttf", 80)
    font_regular = ImageFont.truetype("app/services/card-res/Poppins-Regular.ttf", 60)
    
    box_width = (WIDTH - margin * 3) // 2
    box_height = 120*2
    padding = 20
    radius = 12
    
    stats = [
        {"label": "Total Time Coded", "value": data['total_time']},
        {"label": "Daily Average", "value": data['daily_average']},
        {"label": "Days Coded", "value": f"{data['total_days_coded']}/365 days"},
        {"label": "Best Day", "value": data['best_day']['text']},
    ]
    
    for i, stat in enumerate(stats):
        x = margin + (i % 2) * (box_width + margin)
        y = start_y + (i // 2) * (box_height + margin//2)
        
        for offset in range(3):
            draw.rounded_rectangle(
                [x + offset, y + offset, x + box_width - offset, y + box_height - offset],
                radius=radius,
                outline=(*ACCENT_COLOR, 128),
                width=1
            )
        
        draw.text((x + padding, y + padding), stat["label"],
                 fill=TEXT_COLOR, font=font_regular)
        draw.text((x + padding, y + padding*3.1 + font_regular.size),
                 stat["value"], fill=ACCENT_COLOR, font=font_bold)
    
    return start_y + (box_height + margin//2) * 2 + margin

def draw_vertical_band_chart(draw, data, x, y, width, height, title, items):
    font_bold = ImageFont.truetype("app/services/card-res/Poppins-Bold.ttf", 45)
    font_regular = ImageFont.truetype("app/services/card-res/Poppins-Regular.ttf", 35)
    
    # Draw title
    draw.text((x, y - 40), title, fill=TEXT_COLOR, font=font_bold)
    
    # Calculate total
    total = sum(item['percent'] for item in items)
    
    # Draw vertical bands
    bar_y = y + 50
    bar_height = height
    band_spacing = 2
    band_x = x  # Store initial x position
    
    # Draw the bands
    colors = {}
    for i, item in enumerate(items):
        band_width = (item['percent'] / total) * width
        color = item.get('color', OS_COLORS[i % len(OS_COLORS)])
        if isinstance(color, str):
            color = tuple(int(color.lstrip('#')[i:i+2], 16) for i in (0, 2, 4)) + (255,)
        
        draw.rectangle(
            [band_x, bar_y, band_x + band_width, bar_y + bar_height],
            fill=color
        )
        band_x += band_width + band_spacing
        colors[item['name']] = color
    
    # Draw legends with justified alignment
    legend_y = bar_y + bar_height + 20
    square_size = 20
    legend_spacing = 30  # Vertical spacing between legend items
    
    # Split items into left and right columns
    left_items = items[:len(items)//2]
    right_items = items[len(items)//2:]
    
    # Draw left-aligned legends
    for i, item in enumerate(left_items):
        legend_x = x
        current_legend_y = legend_y + i * legend_spacing
        
        color = colors[item['name']]
        if isinstance(color, str):
            color = tuple(int(color.lstrip('#')[i:i+2], 16) for i in (0, 2, 4)) + (255,)
        
        draw.rounded_rectangle(
            [legend_x, current_legend_y + 15, legend_x + square_size, current_legend_y + 15 + square_size],
            radius=4,
            fill=color
        )
        
        text = f"{item['name']} ({item['percent']:.1f}%)"
        draw.text((legend_x + square_size + 10, current_legend_y), text, 
                 fill=TEXT_COLOR, font=font_regular)
    
    # Draw right-aligned legends
    for i, item in enumerate(right_items):
        text = f"{item['name']} ({item['percent']:.1f}%)"
        text_width = draw.textlength(text, font=font_regular)
        
        legend_x = x + width - text_width - square_size - 10
        current_legend_y = legend_y + (0 if i==0 else 1)*20 + i * legend_spacing
        
        color = colors[item['name']]
        if isinstance(color, str):
            color = tuple(int(color.lstrip('#')[i:i+2], 16) for i in (0, 2, 4)) + (255,)
        
        draw.rounded_rectangle(
            [legend_x, current_legend_y + 15, legend_x + square_size, current_legend_y + 15 + square_size],
            radius=4,
            fill=color
        )
        
        draw.text((legend_x + square_size + 10, current_legend_y), text, 
                 fill=TEXT_COLOR, font=font_regular)
    
    return legend_y + max(len(left_items), len(right_items)) * legend_spacing

def draw_milestone_section(draw, data, x, y, width, margin=50):
    font_bold = ImageFont.truetype("app/services/card-res/Poppins-Bold.ttf", 45)
    font_regular = ImageFont.truetype("app/services/card-res/Poppins-Regular.ttf", 35)
    
    # Draw section title
    draw.text((x, y), "Coding Milestones", fill=TEXT_COLOR, font=font_bold)
    y += 80
    
    # Sort milestones by hours
    milestones = sorted(data['milestone'], key=lambda x: x['milestone_hours'])
    
    # Calculate bar dimensions
    bar_height = 40
    spacing = 60
    max_width = width - 200  # Leave space for text
    
    for i, milestone in enumerate(milestones):
        current_y = y + i * spacing
        hours = milestone['milestone_hours']
        date = milestone['milestone_date']
        
        # Calculate width based on hours (use log scale for better visualization)
        bar_width = (math.log10(hours) / math.log10(max(m['milestone_hours'] for m in milestones))) * max_width
        
        # Draw milestone bar
        draw.rounded_rectangle(
            [x, current_y, x + bar_width, current_y + bar_height],
            radius=6,
            fill=ACCENT_COLOR
        )
        
        # Draw text
        text = f"{hours}h - {date.strftime('%B %d, %Y')}"
        draw.text((x + bar_width + 20, current_y + (bar_height - font_regular.size) // 2),
                 text, fill=TEXT_COLOR, font=font_regular)
    
    return y + len(milestones) * spacing + margin

def draw_items_list(draw, data, x, y, width, title, items, max_items=5):
    font_bold = ImageFont.truetype("app/services/card-res/Poppins-Bold.ttf", 45)
    font_regular = ImageFont.truetype("app/services/card-res/Poppins-Regular.ttf", 35)
    
    # Draw title
    draw.text((x, y), title, fill=TEXT_COLOR, font=font_bold)
    y += 100
    
    # Calculate total for percentage
    total = sum(item['total_seconds'] for item in items)
    
    # Square dimensions
    square_size = 40
    spacing = 30
    
    for i, item in enumerate(items[:max_items]):
        current_y = y + i * (square_size + spacing)
        
        color = item.get('color', PROJECT_COLORS[i % len(PROJECT_COLORS)])
        if isinstance(color, str):
            color = tuple(int(color.lstrip('#')[i:i+2], 16) for i in (0, 2, 4)) + (255,)
        
        draw.rounded_rectangle(
            [x, current_y, x + square_size, current_y + square_size],
            radius=10,
            fill=color
        )
        
        name_text = f"{item['name']}"
        percentage = item['total_seconds'] / total * 100
        time_text = f"{item['time']} ({percentage:.1f}%)"
        
        text_x = x + square_size + 20
        text_y = current_y + (square_size - font_regular.size) // 2
        
        draw.text((text_x, text_y), name_text, fill=TEXT_COLOR, font=font_regular)
        
        time_width = draw.textlength(time_text, font=font_regular)
        time_x = x + width - time_width
        draw.text((time_x, text_y), time_text, fill=TEXT_COLOR, font=font_regular)
    
    return y + max_items * (square_size + spacing)

def draw_charts_section(image, draw, data, start_y, margin=50):
    section_width = (WIDTH - margin * 3) // 2
    
    languages_y = draw_items_list(draw, data, margin, start_y,
                                section_width, "Top Languages",
                                data['top_languages'])
    
    projects_y = draw_items_list(draw, data, margin + section_width + margin,
                               start_y, section_width, "Top Projects",
                               data['top_projects'])
    
    band_chart_y = max(languages_y, projects_y) + margin * 2
    band_height = 60
    
    # Draw vertical band charts
    editors_y = draw_vertical_band_chart(draw, data,
                                       margin, band_chart_y,
                                       section_width, band_height,
                                       "Top Editors", data['top_editors'])
    
    os_y = draw_vertical_band_chart(draw, data,
                                  margin + section_width + margin, band_chart_y,
                                  section_width, band_height,
                                  "Operating Systems", data['top_os'])
    
    # Add milestone section with proper spacing
    milestone_y = max(editors_y, os_y) + margin * 2
    final_y = draw_milestone_section(draw, data, margin, milestone_y, WIDTH - 200 - margin * 2)
    
    return final_y

def draw_footer(image, draw, data, x, y, width, margin=50):
    font_regular = ImageFont.truetype("app/services/card-res/Poppins-Regular.ttf", 70)
    
    # Draw username on the left
    username_text = f"@{data['username']}"
    draw.text((x, y), username_text, fill=TEXT_COLOR, font=font_regular)
    
    # Draw project name and GitHub logo on the right
    project_text = "wakatime-wrapped"
    project_width = draw.textlength(project_text, font=font_regular)
    
    # Load and resize GitHub logo
    github_logo_size = (110, 110)
    github_logo = Image.open("app/services/card-res/github-white.png")  # Make sure to have this image
    github_logo = github_logo.resize(github_logo_size)
    github_logo = github_logo.convert("RGBA")
    
    # Calculate positions for right-aligned elements
    github_x = x + width - github_logo_size[0]
    project_x = github_x - project_width - 20  # 20px spacing between text and logo
    
    # Draw project name and GitHub logo
    draw.text((project_x, y), project_text, fill=TEXT_COLOR, font=font_regular)
    image.paste(github_logo, (github_x, y), github_logo)
    
    return y + max(font_regular.size, github_logo_size[1]) + margin

def generate_card(data):
    image = Image.new("RGBA", (WIDTH, HEIGHT), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(image)
    
    draw_background(image, draw)
    current_y = draw_header(image, draw, data)
    current_y = draw_stats_section(image, draw, data, current_y + 50)
    current_y -= 40
    current_y = draw_charts_section(image, draw, data, current_y + 50)
    current_y = draw_footer(image, draw, data, 50, current_y + 50, WIDTH - 50 * 2)
    
    bbox = Image.new('RGBA', (WIDTH, HEIGHT), BACKGROUND_COLOR)
    bbox.paste(image, (0, 0))
    bbox = bbox.crop((0, 0, WIDTH, current_y - 10))
    bbox = ImageOps.expand(bbox, (40, 40), fill=BACKGROUND_COLOR)
    
    return bbox