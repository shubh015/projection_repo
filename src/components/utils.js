// Function to get hex color based on intensity
export const getHexColorByIntensity = (baseColor, intensity) => {
  if (intensity === 0) return '#808080'; // Neutral gray

  const colors = {
    red: {
      light: '#ffb3b3', // 1-25%
      medium: '#ff6666', // 26-50%
      dark: '#de0026', // 51-75%
      intense: '#b30020', // 76-100%
    },
    yellow: {
      light: '#f5d982', // 1-25%
      medium: '#f0c649', // 26-50%
      dark: '#de9000', // 51-75%
      intense: '#b87600', // 76-100%
    },
    green: {
      light: '#a8e6c1', // 1-25%
      medium: '#6dd894', // 26-50%
      dark: '#048b43', // 51-75%
      intense: '#036635', // 76-100%
    },
    blue: {
      light: '#a8b3e6', // 1-25%
      medium: '#6d7ddd', // 26-50%
      dark: '#3849be', // 51-75%
      intense: '#2d3a9a', // 76-100%
    },
  };

  if (intensity <= 25) return colors[baseColor].light;
  if (intensity <= 50) return colors[baseColor].medium;
  if (intensity <= 75) return colors[baseColor].dark;
  return colors[baseColor].intense;
};

export const emotionData = [
  {
    key: 'red',
    label: 'Anger',
    color: '#de0026',
    gradientFrom: '#d69191fc',
    gradientTo: '#ff0000',
    threadImage: '/images/red_thread.png',
    yarnImage: '/images/red_knot.png',
    sliderColor: '#fb0a0a',
  },
  {
    key: 'yellow',
    label: 'Greed',
    color: '#de9000',
    gradientFrom: '#de9000',
    gradientTo: '#de9000',
    threadImage: '/images/yellow_thread.png',
    yarnImage: '/images/yellow_knot.png',
    sliderColor: '#fcaa01',
  },
  {
    key: 'green',
    label: 'Maya',
    color: '#048b43',
    gradientFrom: '#8ed5af',
    gradientTo: '#048b43',
    threadImage: '/images/green_thread.png',
    yarnImage: '/images/green_knot.png',
    sliderColor: '#00ad56',
  },
  {
    key: 'blue',
    label: 'Maan',
    color: '#3849be',
    gradientFrom: '#8f99df',
    gradientTo: '#3849be',
    threadImage: '/images/blue_thread.png',
    yarnImage: '/images/blue_knot.png',
    sliderColor: '#0e2ca8',
  },
];
