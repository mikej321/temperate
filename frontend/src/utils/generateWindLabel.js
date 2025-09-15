export default function generateWindLabel(speed) {
    const roundedSpeed = Math.round(speed);
    
    switch(true) {
        case roundedSpeed < 7:
            return 'Calm'
        case roundedSpeed <= 15:
            return 'Slightly Windy'
        case roundedSpeed <= 25:
            return 'Moderately Windy'
        case roundedSpeed <= 38:
            return 'Very Windy'
        default:
            return 'Extremely Windy'
    }
};