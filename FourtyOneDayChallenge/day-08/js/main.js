// main.js
import {
    getLocalStorageItem,
    setLocalStorageItem,
    clearLocalStorageItem,
    formatCurrency,
    formatDate,
    getCurrentMonthYear,
    exportToCsv
} from './utils.js';
import { renderCategoryChart, renderFallbackCategoryBars, clearChart } from './charts.js'; // Import chart functions

// DOM Elements
const navLinks = document.querySelectorAll('.sidebar nav ul li a');
const contentSections = document.querySelectorAll('.content-section');
const expenseForm = document.getElementById('expense-form');
const expenseDateInput = document.getElementById('expense-date');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategorySelect = document.getElementById('expense-category');
const expenseNotesInput = document.getElementById('expense-notes');
const addExpenseBtn = document.getElementById('add-expense-btn'); // New ID
const expenseTableBody = document.querySelector('#expense-table tbody');
const currentDailyTotalSpan = document.getElementById('current-daily-total');
const monthlyTotalSpentSpan = document.getElementById('monthly-total-spent');
const budgetLeftSpan = document.getElementById('budget-left');
const monthlyBudgetLeftSpan = document.getElementById('monthly-budget-left');
const currentBudgetSpan = document.getElementById('current-budget');
const budgetWarningMessage = document.getElementById('budget-warning-message');
const monthlyBudgetInput = document.getElementById('monthly-budget-input');
const saveBudgetBtn = document.getElementById('save-budget-btn');
const clearDataBtn = document.getElementById('clear-data-btn');
const topNavbarMonth = document.querySelector('.current-month');
const filterCategorySelect = document.getElementById('filter-category');
const sortByCategorySelect = document.getElementById('sort-by');
const addCategoryForm = document.getElementById('add-category-form');
const newCategoryNameInput = document.getElementById('new-category-name');
const categoryListUl = document.getElementById('category-list');
const categoryChartCanvas = document.getElementById('category-chart');
const categoryBarsContainer = document.getElementById('category-bars');
const exportReportBtn = document.getElementById('export-report-btn');
const printReportBtn = document.getElementById('print-report-btn');
const darkModeToggleSidebar = document.getElementById('dark-mode-toggle'); // Sidebar toggle
const darkModeToggleSettings = document.getElementById('dark-mode-toggle-settings'); // Settings toggle

// Global State
let expenses = [];
let categories = ['Food', 'Bills', 'Shopping', 'Transport', 'Entertainment', 'Health', 'Education', 'Other'];
let monthlyBudget = 0;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    loadStateFromLocalStorage();
    renderUI();
    setupEventListeners();
    updateDateTime();
    // Set current date for daily entry form
    expenseDateInput.value = new Date().toISOString().split('T')[0];
});

const loadStateFromLocalStorage = () => {
    expenses = getLocalStorageItem('expenses', []);
    categories = getLocalStorageItem('categories', categories); // Load custom categories
    monthlyBudget = getLocalStorageItem('monthlyBudget', 0);
    // Ensure monthlyBudgetInput reflects the loaded budget
    monthlyBudgetInput.value = monthlyBudget.toFixed(2);

    // Apply dark mode preference
    const isDarkMode = getLocalStorageItem('darkMode', false);
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
};

const saveStateToLocalStorage = () => {
    setLocalStorageItem('expenses', expenses);
    setLocalStorageItem('categories', categories);
    setLocalStorageItem('monthlyBudget', monthlyBudget);
    setLocalStorageItem('darkMode', document.body.classList.contains('dark-mode'));
};

const updateDateTime = () => {
    topNavbarMonth.textContent = getCurrentMonthYear();
};

const renderUI = () => {
    populateCategorySelects();
    renderExpenseList();
    updateSummary();
    renderCategoryBreakdown(); // This will use charts.js
    renderCategoryManagementList();
};

const setupEventListeners = () => {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSectionId = e.currentTarget.id.replace('nav-', '') + '-section';
            showSection(targetSectionId);
            navLinks.forEach(nav => nav.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });

    expenseForm.addEventListener('submit', handleExpenseFormSubmit); // Consolidated submit handler
    filterCategorySelect.addEventListener('change', renderExpenseList);
    sortByCategorySelect.addEventListener('change', renderExpenseList);
    // Listen for date input change to update daily total specific to that date
    expenseDateInput.addEventListener('change', updateDailyTotalForSelectedDate);

    saveBudgetBtn.addEventListener('click', saveMonthlyBudget);
    clearDataBtn.addEventListener('click', confirmClearData);
    addCategoryForm.addEventListener('submit', addCustomCategory);
    exportReportBtn.addEventListener('click', exportMonthlyReport);
    printReportBtn.addEventListener('click', () => window.print());

    darkModeToggleSidebar.addEventListener('click', toggleDarkMode);
    darkModeToggleSettings.addEventListener('click', toggleDarkMode);
};

const showSection = (id) => {
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');

    // Re-render certain sections when they become active to ensure freshness
    if (id === 'monthly-summary-section') {
        updateSummary();
        renderCategoryBreakdown();
    } else if (id === 'categories-section') {
        renderCategoryManagementList();
    } else if (id === 'daily-entries-section') {
        renderExpenseList(); // To ensure filters/sorts are applied
        updateDailyTotalForSelectedDate(); // Update daily total for current date input
    }
};

const populateCategorySelects = () => {
    // Clear existing options first
    expenseCategorySelect.innerHTML = '<option value="">Select Category</option>';
    filterCategorySelect.innerHTML = '<option value="all">All</option>'; // Always include 'All' option for filtering

    // Sort categories alphabetically for consistent display in dropdowns
    const sortedCategories = [...categories].sort();

    sortedCategories.forEach(category => {
        // For expense entry select
        const option1 = document.createElement('option');
        option1.value = category;
        option1.textContent = category;
        expenseCategorySelect.appendChild(option1);

        // For filter select
        const option2 = document.createElement('option');
        option2.value = category;
        option2.textContent = category;
        filterCategorySelect.appendChild(option2);
    });
};

const handleExpenseFormSubmit = (e) => {
    e.preventDefault();

    const date = expenseDateInput.value;
    const amount = parseFloat(expenseAmountInput.value);
    const category = expenseCategorySelect.value;
    const notes = expenseNotesInput.value.trim();
    const isEditMode = addExpenseBtn.dataset.mode === 'edit';
    const editId = parseInt(addExpenseBtn.dataset.editId);

    if (!date || isNaN(amount) || amount <= 0 || !category) {
        alert('Please fill in all required fields (Date, Amount, Category) with valid values.');
        return;
    }

    if (isEditMode) {
        updateExistingExpense(editId, date, amount, category, notes);
    } else {
        addNewExpense(date, amount, category, notes);
    }

    // Reset form and button after add/update
    expenseForm.reset();
    expenseDateInput.value = new Date().toISOString().split('T')[0]; // Reset date to today
    addExpenseBtn.textContent = 'Add Expense';
    addExpenseBtn.dataset.mode = 'add';
    delete addExpenseBtn.dataset.editId;
};

const addNewExpense = (date, amount, category, notes) => {
    const newExpense = {
        id: Date.now(), // Unique ID
        date,
        amount,
        category,
        notes
    };

    expenses.push(newExpense);
    saveStateToLocalStorage();
    renderExpenseList();
    updateSummary();
    renderCategoryBreakdown();
    updateDailyTotalForSelectedDate(); // Update daily total for the current date input
};

const updateExistingExpense = (id, date, amount, category, notes) => {
    expenses = expenses.map(exp => {
        if (exp.id === id) {
            return {
                ...exp,
                date,
                amount,
                category,
                notes
            };
        }
        return exp;
    });
    saveStateToLocalStorage();
    renderExpenseList();
    updateSummary();
    renderCategoryBreakdown();
    updateDailyTotalForSelectedDate(); // Update daily total for the current date input
};


const renderExpenseList = () => {
    expenseTableBody.innerHTML = ''; // Clear current list

    // Get current filter and sort values directly from the selects
    const selectedFilterCategory = filterCategorySelect.value;
    const selectedSortBy = sortByCategorySelect.value;

    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const isCurrentMonth = expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
        const isFilteredCategory = selectedFilterCategory === 'all' || expense.category === selectedFilterCategory;
        return isCurrentMonth && isFilteredCategory;
    });

    const sortedExpenses = [...filteredExpenses].sort((a, b) => {
        if (selectedSortBy === 'date-desc') {
            return new Date(b.date) - new Date(a.date);
        } else if (selectedSortBy === 'date-asc') {
            return new Date(a.date) - new Date(b.date);
        } else if (selectedSortBy === 'amount-desc') {
            return b.amount - a.amount;
        } else if (selectedSortBy === 'amount-asc') {
            return a.amount - b.amount;
        }
        return 0;
    });

    if (sortedExpenses.length === 0) {
        const row = expenseTableBody.insertRow();
        row.innerHTML = `<td colspan="5" style="text-align: center; padding: 20px;">No expenses recorded for this month or matching the filter.</td>`;
        currentDailyTotalSpan.textContent = formatCurrency(0); // Reset daily total if no expenses
        return;
    }

    sortedExpenses.forEach(expense => {
        const row = expenseTableBody.insertRow();
        row.innerHTML = `
            <td>${formatDate(expense.date)}</td>
            <td>${formatCurrency(expense.amount)}</td>
            <td>${expense.category}</td>
            <td>${expense.notes}</td>
            <td class="action-buttons">
                <button data-id="${expense.id}" class="edit-expense-btn">Edit</button>
                <button data-id="${expense.id}" class="delete-expense-btn">Delete</button>
            </td>
        `;
    });

    // Attach event listeners for edit and delete buttons after rendering
    document.querySelectorAll('.delete-expense-btn').forEach(button => {
        button.addEventListener('click', deleteExpense);
    });
    document.querySelectorAll('.edit-expense-btn').forEach(button => {
        button.addEventListener('click', prepareEditExpense);
    });

    updateDailyTotalForSelectedDate(); // Ensure the daily total is always correct for the date in the input
};

const updateDailyTotalForSelectedDate = () => {
    const selectedDate = expenseDateInput.value;
    const dailyExpenses = expenses.filter(expense => expense.date === selectedDate);
    const totalForDay = dailyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    currentDailyTotalSpan.textContent = formatCurrency(totalForDay);
};

const prepareEditExpense = (e) => {
    const expenseId = parseInt(e.target.dataset.id);
    const expenseToEdit = expenses.find(exp => exp.id === expenseId);

    if (expenseToEdit) {
        // Populate the form with the expense data
        expenseDateInput.value = expenseToEdit.date;
        expenseAmountInput.value = expenseToEdit.amount;
        expenseCategorySelect.value = expenseToEdit.category;
        expenseNotesInput.value = expenseToEdit.notes;

        // Change form submit button to 'Update' and set edit mode
        addExpenseBtn.textContent = 'Update Expense';
        addExpenseBtn.dataset.mode = 'edit';
        addExpenseBtn.dataset.editId = expenseId;

        // Scroll to top of form for convenience
        expenseForm.scrollIntoView({ behavior: 'smooth' });
    }
};

const deleteExpense = (e) => {
    const expenseId = parseInt(e.target.dataset.id);
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses = expenses.filter(expense => expense.id !== expenseId);
        saveStateToLocalStorage();
        renderExpenseList();
        updateSummary();
        renderCategoryBreakdown();
        updateDailyTotalForSelectedDate();
    }
};

const updateSummary = () => {
    const expensesThisMonth = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const totalSpent = expensesThisMonth.reduce((sum, expense) => sum + expense.amount, 0);
    const budgetLeft = monthlyBudget - totalSpent;

    monthlyTotalSpentSpan.textContent = formatCurrency(totalSpent);
    currentBudgetSpan.textContent = formatCurrency(monthlyBudget);
    budgetLeftSpan.textContent = formatCurrency(budgetLeft); // Top nav bar
    monthlyBudgetLeftSpan.textContent = formatCurrency(budgetLeft); // Monthly summary section

    // Budget warning
    if (monthlyBudget > 0) {
        const percentageSpent = (totalSpent / monthlyBudget) * 100;
        if (percentageSpent >= 100) {
            budgetWarningMessage.textContent = "Budget exceeded!";
            budgetWarningMessage.style.color = 'var(--accent-color)'; // Use CSS variable
        } else if (percentageSpent >= 80) {
            budgetWarningMessage.textContent = "Nearing budget limit!";
            budgetWarningMessage.style.color = 'orange';
        } else {
            budgetWarningMessage.textContent = "";
            budgetWarningMessage.style.color = ''; // Reset color
        }
    } else {
        budgetWarningMessage.textContent = "";
        budgetWarningMessage.style.color = ''; // Reset color
    }
};

const saveMonthlyBudget = () => {
    const newBudget = parseFloat(monthlyBudgetInput.value);
    if (!isNaN(newBudget) && newBudget >= 0) {
        monthlyBudget = newBudget;
        saveStateToLocalStorage();
        updateSummary();
        alert('Monthly budget saved!');
    } else {
        alert('Please enter a valid positive number for the budget.');
        monthlyBudgetInput.value = monthlyBudget.toFixed(2); // Reset to current value
    }
};

const addCustomCategory = (e) => {
    e.preventDefault();
    const newCategory = newCategoryNameInput.value.trim();
    if (newCategory) {
        // Case-insensitive check for duplicates
        const normalizedNewCategory = newCategory.toLowerCase();
        const categoryExists = categories.some(cat => cat.toLowerCase() === normalizedNewCategory);

        if (!categoryExists) {
            categories.push(newCategory); // Add with original casing
            saveStateToLocalStorage();
            populateCategorySelects(); // Update all category dropdowns
            renderCategoryManagementList();
            newCategoryNameInput.value = ''; // Clear input field
        } else {
            alert('Category already exists!');
        }
    } else {
        alert('Category name cannot be empty.');
    }
};

const renderCategoryManagementList = () => {
    categoryListUl.innerHTML = '';
    // Sort categories alphabetically for consistent display
    const sortedCategories = [...categories].sort();

    if (sortedCategories.length === 0) {
        categoryListUl.innerHTML = '<li>No categories defined. Add one above!</li>';
        return;
    }

    sortedCategories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${category}</span>
            <button data-category="${category}" class="delete-category-btn">Delete</button>
        `;
        categoryListUl.appendChild(li);
    });

    document.querySelectorAll('.delete-category-btn').forEach(button => {
        button.addEventListener('click', deleteCustomCategory);
    });
};

const deleteCustomCategory = (e) => {
    const categoryToDelete = e.target.dataset.category;

    // Prevent deleting default/essential categories or 'Other'
    const defaultCategories = ['Food', 'Bills', 'Shopping', 'Transport', 'Entertainment', 'Health', 'Education', 'Other'];
    if (defaultCategories.map(c => c.toLowerCase()).includes(categoryToDelete.toLowerCase())) { // Case-insensitive check
        alert(`The default category "${categoryToDelete}" cannot be deleted.`);
        return;
    }

    if (confirm(`Are you sure you want to delete the category "${categoryToDelete}"? All expenses currently in this category will be reassigned to 'Other'.`)) {
        categories = categories.filter(cat => cat !== categoryToDelete);
        // Ensure 'Other' category exists for reassignment
        if (!categories.includes('Other')) {
            categories.push('Other');
        }
        // Reassign expenses from deleted category to 'Other'
        expenses.forEach(expense => {
            if (expense.category === categoryToDelete) {
                expense.category = 'Other';
            }
        });
        saveStateToLocalStorage();
        populateCategorySelects(); // Update all category dropdowns
        renderCategoryManagementList();
        renderExpenseList(); // Re-render expense list to reflect category changes
        updateSummary();
        renderCategoryBreakdown();
    }
};

const renderCategoryBreakdown = () => {
    const expensesThisMonth = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const categorySpending = {};
    categories.forEach(cat => categorySpending[cat] = 0); // Initialize all categories to 0

    expensesThisMonth.forEach(expense => {
        categorySpending[expense.category] = (categorySpending[expense.category] || 0) + expense.amount;
    });

    // Convert to array for charting/display
    const categoryData = Object.entries(categorySpending)
        .filter(([, amount]) => amount > 0) // Only show categories with spending
        .map(([category, amount]) => ({ category, amount }))
        .sort((a, b) => b.amount - a.amount); // Sort by amount descending

    // Use Chart.js functions
    if (typeof Chart !== 'undefined' && categoryChartCanvas) {
        renderCategoryChart(categoryData, categoryChartCanvas);
        categoryBarsContainer.style.display = 'none'; // Hide fallback bars
    } else {
        // Fallback to simple colored bars if Chart.js is not loaded/available
        renderFallbackCategoryBars(categoryData, categoryBarsContainer);
        categoryChartCanvas.style.display = 'none'; // Hide chart canvas
        categoryBarsContainer.style.display = 'flex'; // Show fallback bars
    }
};


const exportMonthlyReport = () => {
    const expensesThisMonth = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    if (expensesThisMonth.length === 0) {
        alert("No expenses to export for the current month.");
        return;
    }

    const headers = ["Date", "Amount", "Category", "Notes"];
    const rows = expensesThisMonth.map(exp => [
        formatDate(exp.date),
        exp.amount.toFixed(2), // Ensure consistent formatting in CSV
        `"${exp.category.replace(/"/g, '""')}"`, // Handle commas/quotes in category names
        `"${exp.notes.replace(/"/g, '""')}"` // Handle commas/quotes in notes to prevent CSV issues
    ]);

    const csvData = [headers, ...rows];
    const monthYear = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    exportToCsv(`Expense_Report_${monthYear}.csv`, csvData);
};

const confirmClearData = () => {
    if (confirm('Are you absolutely sure you want to clear ALL expense data and settings? This action cannot be undone.')) {
        clearLocalStorageItem('expenses');
        setLocalStorageItem('categories', ['Food', 'Bills', 'Shopping', 'Transport', 'Entertainment', 'Health', 'Education', 'Other']);
        clearLocalStorageItem('monthlyBudget');
        clearLocalStorageItem('darkMode');
        alert('All data has been cleared. The application will now reload.');
        location.reload();
    }
};

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    saveStateToLocalStorage();
    // Re-render chart to update colors based on new theme
    renderCategoryBreakdown();
};

// Initial section display on page load
showSection('daily-entries-section');