import React, { CSSProperties, ReactNode } from 'react';

interface SeatLayoutHOCProps {
  gatePosition: 'left' | 'right' | 'bottom' | 'top';
  children: ReactNode;
}

const SeatLayoutHOC: React.FC<SeatLayoutHOCProps> = ({ gatePosition, children }) => {
  // Define styles for positioning the gate
  const gateStyles: CSSProperties = {
    position: 'absolute',
    backgroundColor: 'grey', // Example color for the gate
    width: '10px', // Example width of the gate
    height: '50px', // Example height of the gate
  };

  // Adjust gate positioning based on specified position
  switch (gatePosition) {
    case 'left':
      gateStyles.left = '0';
      gateStyles.top = '50%';
      gateStyles.transform = 'translateY(-50%)';
      break;
    case 'right':
      gateStyles.right = '0';
      gateStyles.top = '50%';
      gateStyles.transform = 'translateY(-50%)';
      break;
    case 'bottom':
      gateStyles.bottom = '0';
      gateStyles.left = '50%';
      gateStyles.transform = 'translateX(-50%)';
      gateStyles.width = '50px';
      gateStyles.height = '10px';
      break;
    case 'top':
      gateStyles.top = '0';
      gateStyles.left = '50%';
      gateStyles.transform = 'translateX(-50%)';
      gateStyles.width = '50px';
      gateStyles.height = '10px';
      break;
    default:
      break;
  }

  return (
    <div className="seat-layout" style={{ position: 'relative', textAlign: 'center' }}>
      <div style={gateStyles}></div>
      {children}
    </div>
  );
};

export default SeatLayoutHOC;
