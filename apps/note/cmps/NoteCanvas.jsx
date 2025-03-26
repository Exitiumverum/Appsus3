const { useRef, useState, useEffect } = React

export function NoteCanvas({ note, onUpdateNote }) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const savedDataUrl = note.info.dataUrl;

        if (savedDataUrl) {
            const img = new Image();
            img.src = savedDataUrl;
            img.onload = () => ctx.drawImage(img, 0, 0);
        }
    }, [note.info.dataUrl]);

    function startDrawing(e) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    }

    function draw(e) {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function stopDrawing() {
        setIsDrawing(false);

        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL();
        const updatedNote = { ...note, info: { ...note.info, dataUrl } };
        onUpdateNote(updatedNote); // Save the drawing to the note
    }

    function clearCanvas() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const updatedNote = { ...note, info: { ...note.info, dataUrl: '' } };
        onUpdateNote(updatedNote);
    }

    return (
        <div className="note-canvas">
            <h3>{note.info.title || 'Canvas Note'}</h3>
            <canvas
                ref={canvasRef}
                width={300}
                height={300}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="drawing-canvas"
            ></canvas>
            <div className="note-canvas-buttons">
                <button onClick={clearCanvas}>Clear</button>
            </div>
        </div>
    );
}
