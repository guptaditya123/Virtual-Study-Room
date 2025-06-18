import { useEffect, useRef, useState } from "react";

function WhiteBoard({ socket, roomId }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  const lastPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctxRef.current = ctx;

    socket.on("draw", ({ x, y, lx, ly, color, size, isEraser }) => {
      const ctx = ctxRef.current;
      ctx.strokeStyle = isEraser ? "#ffffff" : color;
      ctx.lineWidth = size;
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    socket.on("clear", () => clearCanvas(false));

    return () => {
      socket.off("draw");
      socket.off("clear");
    };
  }, [socket]);

  const startDraw = ({ nativeEvent }) => {
    const rect = canvasRef.current.getBoundingClientRect();
    lastPoint.current = {
      x: nativeEvent.clientX - rect.left,
      y: nativeEvent.clientY - rect.top,
    };
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = nativeEvent.clientX - rect.left;
    const y = nativeEvent.clientY - rect.top;
    const { x: lx, y: ly } = lastPoint.current;

    const ctx = ctxRef.current;
    ctx.strokeStyle = isEraser ? "#ffffff" : color;
    ctx.lineWidth = brushSize;
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.lineTo(x, y);
    ctx.stroke();

    socket.emit("draw", { roomId, x, y, lx, ly, color, size: brushSize, isEraser });
    lastPoint.current = { x, y };
  };

  const clearCanvas = (emit = true) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (emit) socket.emit("clear", { roomId });
  };

  const toggleEraser = () => setIsEraser((prev) => !prev);

  const downloadCanvas = () => {
    const link = document.createElement("a");
    link.download = `whiteboard-${roomId}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3 flex justify-between items-center text-sm text-gray-300">
        <div className="flex gap-3 items-center">
          <label className="flex items-center gap-1">
            Color:
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </label>
          <label className="flex items-center gap-1">
            Size:
            <input type="range" min="1" max="30" value={brushSize} onChange={(e) => setBrushSize(+e.target.value)} />
            <span>{brushSize}</span>
          </label>
        </div>
        <div className="flex gap-2">
          <button onClick={toggleEraser} className={`px-3 py-1 rounded-md text-xs font-semibold ${isEraser ? 'bg-red-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}>
            {isEraser ? "Eraser On" : "Brush"}
          </button>
          <button onClick={clearCanvas} className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-semibold">
            Clear
          </button>
          <button onClick={downloadCanvas} className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-semibold">
            Save
          </button>
        </div>
      </div>

      <div className="flex-1 border border-gray-600 rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}
          className="w-full h-full touch-none"
        />
      </div>
    </div>
  );
}

export default WhiteBoard;
