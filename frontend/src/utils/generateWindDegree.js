export default function generateWindDegree(deg) {
    if (deg == null || Number.isNaN(deg)) return '-';

    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const step = 360 / directions.length;

    const resolvedDirection = Math.round((((deg % 360) + 360) % 360) / step) % directions.length;
    return directions[resolvedDirection];
}