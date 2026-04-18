import React, { useRef, useState, useEffect } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [color, setColor] = useState("black"); // Default color is black

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  // Handle color and mode changes
  useEffect(() => {
    if (contextRef.current) {
      if (isEraser) {
        contextRef.current.globalCompositeOperation = "destination-out";
      } else {
        contextRef.current.globalCompositeOperation = "source-over";
        contextRef.current.strokeStyle = color;
      }
    }
  }, [color, isEraser]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearAll = () => {
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Helper to change color and ensure eraser is turned off
  const selectColor = (newColor) => {
    setColor(newColor);
    setIsEraser(false);
  };

  const colors = ["black", "red", "green", "blue", "yellow"];

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
        
        {/* Color Palette */}
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => selectColor(c)}
            style={{
              backgroundColor: c,
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              border: color === c && !isEraser ? '3px solid #333' : '1px solid #ccc',
              cursor: 'pointer'
            }}
            title={c}
          />
        ))}

        <div style={{ width: '2px', height: '30px', background: '#ccc', margin: '0 10px' }} />

        {/* Tools */}
        <button 
          onClick={() => setIsEraser(true)} 
          style={{ 
            padding: '8px 12px',
            backgroundColor: isEraser ? '#ddd' : '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🧽 Eraser
        </button>

        <button 
          onClick={clearAll} 
          style={{ 
            padding: '8px 12px',
            backgroundColor: '#fff',
            color: 'red',
            border: '1px solid red',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🗑️ Clear All
        </button>
      </div>

      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing} // Stop drawing if mouse leaves canvas
        ref={canvasRef}
        style={{ 
          border: "2px solid #333", 
          cursor: isEraser ? "cell" : "crosshair",
          backgroundColor: "white",
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );
};

export default Canvas;