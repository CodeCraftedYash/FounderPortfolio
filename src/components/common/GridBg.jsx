export default function GridBg({
    cellSize = 80,
    lineColor = "rgba(255,255,255,0.1)",
}) {
    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                backgroundImage: `
                    linear-gradient(
                        to right,
                        ${lineColor} 1px,
                        transparent 1px
                    ),
                    linear-gradient(
                        to bottom,
                        ${lineColor} 1px,
                        transparent 1px
                    )
                `,
                backgroundSize: `${cellSize}px ${cellSize}px`,
            }}
        />
    );
}