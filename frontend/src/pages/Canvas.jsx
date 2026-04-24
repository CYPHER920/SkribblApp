import React, { useRef, useState, useEffect } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const containerRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [color, setColor] = useState("#000000"); // Default color

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Set a responsive width based on container, but a much smaller fixed height
    // to prevent it from going too far down the screen.
    const width = container.clientWidth || 600;
    const height = 400; // Smaller height

    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

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

  const colors = ["#000000", "#EF4444", "#22C55E", "#3B82F6", "#EAB308", "#A855F7", "#EC4899"];

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center p-2">
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap justify-center items-center gap-3 bg-slate-800/50 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/10">

        {/* Color Palette */}
        <div className="flex gap-2 items-center">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => selectColor(c)}
              className={`w-8 h-8 rounded-full shadow-sm transition-transform hover:scale-110 ${color === c && !isEraser ? 'ring-4 ring-pink-500/50 scale-110' : 'border border-white/20'}`}
              style={{ backgroundColor: c }}
              title="Select Color"
            />
          ))}
        </div>

        <div className="w-px h-8 bg-white/20 mx-2" />

        {/* Tools */}
        <button
          onClick={() => setIsEraser(true)}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${isEraser ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border border-white/10'}`}
        >
          🧽 Eraser
        </button>

        <button
          onClick={clearAll}
          className="px-4 py-2 rounded-xl font-bold text-sm bg-slate-700 text-rose-400 border border-white/10 hover:bg-slate-600 hover:text-rose-300 shadow-sm transition-all flex items-center gap-2"
        >
          🗑️ Clear
        </button>
      </div>

      {/* Canvas Area */}
      <div className="rounded-[1.5rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-white">
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          onMouseLeave={finishDrawing}
          ref={canvasRef}
          className={`touch-none ${isEraser ? "cursor-cell" : "cursor-crosshair"}`}
        />
      </div>
    </div>
  );
};

export default Canvas;