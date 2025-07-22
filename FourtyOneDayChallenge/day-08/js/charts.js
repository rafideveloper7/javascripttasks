// js/charts.js
import { formatCurrency } from './utils.js';

let expenseChartInstance = null; // Store the Chart.js instance

export const renderCategoryChart = (categoryData, canvasElement) => {
    if (!canvasElement) {
        console.error("Canvas element for chart not found.");
        return;
    }

    const ctx = canvasElement.getContext('2d');

    // Destroy existing chart instance if it exists
    if (expenseChartInstance) {
        expenseChartInstance.destroy();
    }

    if (categoryData.length === 0) {
        // No data, hide canvas and potentially show a message
        canvasElement.style.display = 'none';
        return;
    } else {
        canvasElement.style.display = 'block'; // Show canvas if there's data
    }

    expenseChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categoryData.map(item => item.category),
            datasets: [{
                data: categoryData.map(item => item.amount),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#8c564b', '#7f7f7f', '#bcbd22', '#17becf',
                    '#A52A2A', '#DDA0DD', '#F08080', '#ADD8E6', '#90EE90' // More colors
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Allows flexible sizing
            plugins: {
                legend: {
                    position: 'right', // Place legend on the right
                    labels: {
                        color: 'var(--text-color)', // Use CSS variable for text color
                        font: {
                            size: 14 // Adjust font size for readability
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += formatCurrency(context.parsed);
                                const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                                const percentage = (context.parsed / total * 100).toFixed(1);
                                label += ` (${percentage}%)`;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
};

export const clearChart = (canvasElement) => {
    if (expenseChartInstance) {
        expenseChartInstance.destroy();
        expenseChartInstance = null;
    }
    if (canvasElement) {
        canvasElement.style.display = 'none';
    }
};

// Function to render fallback bars if Chart.js is not used or no data
export const renderFallbackCategoryBars = (categoryData, containerElement) => {
    containerElement.innerHTML = ''; // Clear existing bars

    if (categoryData.length === 0) {
        containerElement.innerHTML = '<p>No spending recorded for this month.</p>';
        return;
    }

    const totalSpentThisMonth = categoryData.reduce((sum, item) => sum + item.amount, 0);
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6', '#34495e', '#1abc9c', '#d35400', '#c0392b', '#2980b9', '#A52A2A', '#DDA0DD', '#F08080', '#ADD8E6', '#90EE90'];

    categoryData.forEach((item, index) => {
        const bar = document.createElement('div');
        bar.classList.add('category-bar');
        const percentage = (item.amount / totalSpentThisMonth) * 100;
        // Ensure a minimum width for small percentages for visibility
        bar.style.width = `${Math.max(5, percentage)}%`;
        bar.style.backgroundColor = colors[index % colors.length];
        bar.innerHTML = `
            <span>${item.category}</span>
            <span>${formatCurrency(item.amount)} (${percentage.toFixed(1)}%)</span>
        `;
        containerElement.appendChild(bar);
    });
};