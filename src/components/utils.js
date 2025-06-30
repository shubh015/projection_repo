 // Function to get hex color based on intensity
 export const getHexColorByIntensity = (baseColor, intensity) => {
    if (intensity === 0) return '#808080'; // Neutral gray

    const colors = {
      anger: {
        light: '#ffb3b3', // 1-25%
        medium: '#ff6666', // 26-50%
        dark: '#de0026', // 51-75%
        intense: '#b30020', // 76-100%
      },
      greed: {
        light: '#f5d982', // 1-25%
        medium: '#f0c649', // 26-50%
        dark: '#de9000', // 51-75%
        intense: '#b87600', // 76-100%
      },
      maya: {
        light: '#a8e6c1', // 1-25%
        medium: '#6dd894', // 26-50%
        dark: '#048b43', // 51-75%
        intense: '#036635', // 76-100%
      },
      maan: {
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
      key: 'anger',
      label: 'Anger',
      color: '#de0026',
      gradientFrom: '#d69191fc',
      gradientTo: '#ff0000',
      progressImage: '/images/img_test_1.png',
      sliderColor: '#fb0a0a',
    },
    {
      key: 'greed',
      label: 'Greed',
      color: '#de9000',
      gradientFrom: '#de9000',
      gradientTo: '#de9000',
      progressImage: '/images/img_yelloe_progress_bar_1.png',
      sliderColor: '#fcaa01',
    },
    {
      key: 'maya',
      label: 'Maya',
      color: '#048b43',
      gradientFrom: '#8ed5af',
      gradientTo: '#048b43',
      progressImage: '/images/img_green_progress_bar_1.png',
      sliderColor: '#00ad56',
    },
    {
      key: 'maan',
      label: 'Maan',
      color: '#3849be',
      gradientFrom: '#8f99df',
      gradientTo: '#3849be',
      progressImage: '/images/img_blue_progress_bar_1.png',
      sliderColor: '#0e2ca8',
    },
  ];