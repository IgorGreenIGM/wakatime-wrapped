import { AbsoluteFill } from 'remotion';
import { 
  buildStatsData,
  buildLanguagesData,
  buildNewLanguagesData,
  buildProjectsData,
  buildNewProjectsData,
  buildDevelopmentToolsData,
  buildEnvironmentsData,
  buildTimelineData
} from './dataTransformers';
import { getIconComponent } from './IconUtils';

import Greeting from './Greeting/Greetings';
import ParticlesBackground from './Common/ParticlesBackground';
import ProductivitySummary from './Productivity/ProductivitySummary';
import LanguageUsage from './Language/LanguageUsage';
import ProjectContributions from './Projects/ProjectContributions';
import CodingBests from './CodingBests/CodingBests';
import ToolsAndEnvironments from './ToolsAndEnvironments/ToolsAndEnvironments';
import Thanks from './Thanks/Thanks';

import RectangleTransition from './Common/RectangleTransition';
import CircleTransition from './Common/CircleTransition';
import CirclesTransition from './Common/CirclesTransition';
import MotionRevealTransition from './Common/MotionRevealTransition';

const WakatimeWrapped = ({backendData}) => {
  // Transform backend data into required formats using our utility functions
  const stats = buildStatsData(backendData);
  const languages = buildLanguagesData(backendData, getIconComponent);
  const newLanguages = buildNewLanguagesData(backendData, getIconComponent);
  const projects = buildProjectsData(backendData, getIconComponent);
  const newProjects = buildNewProjectsData(backendData, getIconComponent);
  const developmentTools = buildDevelopmentToolsData(backendData);
  const environments = buildEnvironmentsData(backendData);
  const timelineData = buildTimelineData(backendData);

  return (
    <AbsoluteFill className="bg-[#0a0a0a] flex flex-col items-center justify-center">
      <ParticlesBackground />
      <Greeting />
      
      <CirclesTransition from={160} to={210} />
      
      <ProductivitySummary 
        from={220}  
        stats={stats} 
      />
      
      <LanguageUsage 
        from={630}
        languages={languages}
        newLanguages={newLanguages}
      />
      
      <MotionRevealTransition 
        direction="left"
        from={920}
        to={940}
        type="slide"
        segments={5}
        stagger={3}
        blur={true}
        rotation={true}
        color='var(--accent-color)'
      />
      
      <ProjectContributions 
        from={980}
        projects={projects}
        newProjects={newProjects}
      />
      
      <CircleTransition from={1280} to={1330} />
      
      <CodingBests 
        from={1330}
        bestDay={timelineData.bestDay}
        bestWeek={timelineData.bestWeek}
        bestMonth={timelineData.bestMonth}
        yearlyAverage={timelineData.yearlyAverage}
        milestones={timelineData.milestones}
      />
      
      <RectangleTransition from={1700} to={1740} direction='left' />
      
      <ToolsAndEnvironments 
        from={1750}
        developmentTools={developmentTools}
        environments={environments}
      />
      
      <CirclesTransition from={2090} to={2140} />
      
      <Thanks from={2140} />
    </AbsoluteFill>
  );
};

export default WakatimeWrapped;