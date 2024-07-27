// Mock data (replace with actual API calls in a real application)
const mockData = {
    totalUsage: 4350,
    totalLeakage: 190,
    efficiency: 95.6,
    waterUsage: [
        { date: '2024-01', usage: 1000, leakage: 50 },
        { date: '2024-02', usage: 1100, leakage: 45 },
        { date: '2024-03', usage: 1050, leakage: 55 },
        { date: '2024-04', usage: 1200, leakage: 40 },
    ]
};

// Initialize chart
let waterChart;

// DOM elements
const totalUsageElement = document.getElementById('totalUsage');
const totalLeakageElement = document.getElementById('totalLeakage');
const efficiencyElement = document.getElementById('efficiency');
const wardSelect = document.getElementById('wardSelect');
const metricSelect = document.getElementById('metricSelect');
const generateReportButton = document.getElementById('generateReport');
const usageForm = document.getElementById('usageForm');
const leakageForm = document.getElementById('leakageForm');

// Update metrics
function updateMetrics() {
    totalUsageElement.textContent = `${mockData.totalUsage} KL`;
    totalLeakageElement.textContent = `${mockData.totalLeakage} KL`;
    efficiencyElement.textContent = `${mockData.efficiency}%`;
}

// Create or update chart
function updateChart() {
    const ctx = document.getElementById('waterChart').getContext('2d');
    const selectedMetric = metricSelect.value;
    
    const chartData = {
        labels: mockData.waterUsage.map(d => d.date),
        datasets: [{
            label: selectedMetric === 'usage' ? 'Water Usage (KL)' : 'Water Leakage (KL)',
            data: mockData.waterUsage.map(d => d[selectedMetric]),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    if (waterChart) {
        waterChart.data = chartData;
        waterChart.update();
    } else {
        waterChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Event listeners
wardSelect.addEventListener('change', updateChart);
metricSelect.addEventListener('change', updateChart);
generateReportButton.addEventListener('click', () => {
    alert('Report generated! (This is a placeholder for actual report generation)');
});

usageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ward = document.getElementById('usageWard').value;
    const amount = document.getElementById('usageAmount').value;
    const date = document.getElementById('usageDate').value;
    alert(`Water usage reported: Ward ${ward}, Amount: ${amount} KL, Date: ${date}`);
    usageForm.reset();
});

leakageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ward = document.getElementById('leakageWard').value;
    const amount = document.getElementById('leakageAmount').value;
    const location = document.getElementById('leakageLocation').value;
    const date = document.getElementById('leakageDate').value;
    alert(`Leakage reported: Ward ${ward}, Amount: ${amount} KL, Location: ${location}, Date: ${date}`);
    leakageForm.reset();
});

// Initial setup
updateMetrics();
updateChart();