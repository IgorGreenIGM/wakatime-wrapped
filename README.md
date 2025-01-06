<div align="center">
  <img src="public/wakatime-white-logo.svg" alt="WakaTime Logo" height="80" style="margin-right: 20px">
  <h1>WakaTime Wrapped</h1>
</div>

<p align='center'>
A stunning visualization of your wakatime yearly coding stats.
</p>

<p align="center" style="margin-bottom:25px">
<img src="https://img.shields.io/badge/WakaTime-1f77b4?style=for-the-badge&logo=WakaTime&logoColor=white" alt="wakatime badge" />
&nbsp;
<img src="https://img.shields.io/badge/Vercel-000000?&style=for-the-badge&logo=vercel&logoColor=white" alt="vercel badge" />
&nbsp;
<img src="https://img.shields.io/badge/Amazon_AWS-FF9900?&style=for-the-badge&logo=amazonaws&logoColor=white" alt="aws badge" />
&nbsp;
<img src="https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white" alt="redis badge" />
&nbsp;
<img src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" alt="license" />
</p>

## 🚀 Overview
As a passionate WakaTime user, I wanted a fun way to relive my coding journey over the year—just like Spotify Wrapped does for music. That’s why I created WakaTime Wrapped, a platform to turn yearly coding stats into stunning animations, interactive displays, and shareable videos or cards.

## ✨ Features  
<table> <tr> <td> <strong>Yearly Coding Bests</strong><br> <img src="readme_res/coding_bests.jpg" alt="Yearly Coding Bests" width="100%"><br> Highlights your top coding moments, including best day, most productive week, and achievements. </td> <td> <strong>Productivity Insights</strong><br> <img src="readme_res/productivity.jpg" alt="Productivity Insights" width="100%"><br> Provides a detailed breakdown of your productivity trends, such as coding activity across days and hours. </td> </tr> <tr> <td> <strong>Tools and OS Overview</strong><br> <img src="readme_res/tools_and_os.jpg" alt="Tools and OS Overview" width="100%"><br> Displays your most-used tools and operating systems throughout the year. </td> <td> <strong>Top Languages</strong><br> <img src="readme_res/top_languages.jpg" alt="Top Languages" width="100%"><br> Showcases your most-used programming languages and their respective contributions . </td> </tr> <tr> <td colspan="2"> <strong>Top Projects</strong><br> <img src="readme_res/top_projects.jpg" alt="Top Projects" width="100%"><br> Highlights your most time-intensive or impactful projects from the year. </td> </tr> </table>


## 🎯 Demo

### Video example
https://github.com/user-attachments/assets/1c19c722-be51-402f-b423-eb1ed0942f1f

### Card Examples
<p align="left">
  <img src="readme_res/IgorGrennIGM.png" alt="WakaTime Card Example 1" width="49.65%">
  <img src="readme_res/Nameless.png" alt="WakaTime Card Example 1" width="49%">
</p>

## 🛠️ Technologies Used  

### Frontend  
- **React + Vite**:  
  Built the user interface, and backend fetch logic. Used as container for the video player.  
- **[Remotion](https://github.com/remotion-dev/remotion)**:  
  THe library that made this possible : For programmatically build videos.

### Backend  
- **Python + Flask**:  
  Developed a lightweight and efficient backend API for processing and managing user data.  
- **Redis**:  
  Utilized for temporary data caching and speeding up backend operations.

### Cloud Services  
- **AWS Lambda**:  
  Serverless functions to handle video rendering tasks efficiently, cause Remotion doesn't supports client side rendering.  


## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.