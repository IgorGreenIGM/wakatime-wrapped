import { useVideoConfig, useCurrentFrame } from 'remotion';

const ParticlesBackground = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  
  // Create an evenly distributed grid of particles
  const numRows = 12;
  const numCols = 15;
  const particles = [];
  
  // Calculate spacing between particles
  const spacingX = width / (numCols + 1);
  const spacingY = height / (numRows + 1);
  
  // Create particles in a grid pattern with slight randomization
  for (let row = 1; row <= numRows; row++) {
    for (let col = 1; col <= numCols; col++) {
      // Base position in grid
      const baseX = col * spacingX;
      const baseY = row * spacingY;
      
      // Add slight randomization to make it look more natural
      const randomOffsetX = (Math.sin(row * col * 432.43) * 0.5) * spacingX * 0.3;
      const randomOffsetY = (Math.cos(row * col * 234.32) * 0.5) * spacingY * 0.3;
      
      const particle = {
        initialX: baseX + randomOffsetX,
        initialY: baseY + randomOffsetY,
        radius: (Math.sin(row * col * 543.32) * 0.5 + 0.5) * 3 + 2, // Radius between 1-4
        speed: (Math.sin(row * col * 323.32) * 0.5 + 0.5) * 1.5 + 0.5, // Variable speed
        angle: Math.sin(row * col * 654.23) * Math.PI * 2, // Different angle for each
      };
      
      particles.push(particle);
    }
  }

  // Calculate current positions based on frame
  const currentParticles = particles.map((p) => {
    // Create circular motion with some drift
    const time = frame * (p.speed * 0.01);
    const radius = 30; // Reduced radius of circular motion
    
    let x = p.initialX + Math.cos(time + p.angle) * radius;
    let y = p.initialY + Math.sin(time + p.angle) * radius;
    
    // Wrap around screen edges
    x = ((x % width) + width) % width;
    y = ((y % height) + height) % height;
    
    return {
      x,
      y,
      radius: p.radius,
    };
  });

  return (
    <svg 
      width={width} 
      height={height} 
      className="absolute top-0 left-0"
      style={{
        backgroundColor: 'transparent'
      }}
    >
      {currentParticles.map((particle, index) => (
        <circle
          key={index}
          cx={particle.x}
          cy={particle.y}
          r={particle.radius}
          fill="rgba(0, 149, 255, 0.3)"
        />
      ))}
    </svg>
  );
};

export default ParticlesBackground;