// Get the form and the task list
const form = document.querySelector('form');
const taskList = document.querySelector('#task-list');

// Add a new task to the list
function addTask(task) {
	// Create a new list item
	const li = document.createElement('li');

	// Add the task text to the list item
	const taskText = document.createTextNode(task);
	li.appendChild(taskText);

	// Add the edit and delete buttons to the list item
	const editButton = document.createElement('button');
	editButton.textContent = 'Edit';
	editButton.classList.add('edit');
	li.appendChild(editButton);

	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.classList.add('delete');
	li.appendChild(deleteButton);

	// Add the list item to the task list
	taskList.appendChild(li);
}

// Handle form submission
form.addEventListener('submit', (event) => {
	// Prevent the form from submitting
	event.preventDefault();

	// Get the task input
	const taskInput = document.querySelector('#task');

	// Get the task text
	const task = document.querySelector('input').value;
    // Check if the task input is not empty
    if (taskInput.value.trim() !== '') {
    // Add the task to the task list
    addTask(taskInput.value);
    	// Reset the task input
	taskInput.value = '';
    }
});

// Handle edit and delete button clicks
taskList.addEventListener('click', (event) => {
    // Get the target button
    const button = event.target;
    // Check if the target button is an edit button
if (button.classList.contains('edit')) {
	// Get the list item
	const li = button.parentNode;

	// Get the task text
	const taskText = li.firstChild.textContent;

	// Create an input element
	const input = document.createElement('input');
	input.type = 'text';
	input.value = taskText;

	// Replace the task text with the input element
	li.replaceChild(input, li.firstChild);

	// Change the edit button to a save button
	button.textContent = 'Save';
	button.classList.remove('edit');
	button.classList.add('save');
}
// Check if the target button is a save button
else if (button.classList.contains('save')) {
	// Get the list item
	const li = button.parentNode;

	// Get the input element
	const input = li.firstChild;

	// Get the new task text
	const taskText = input.value;

	// Create a new text node with the new task text
	const newTaskText = document.createTextNode(taskText);

	// Replace the input element with the new task text
	li.replaceChild(newTaskText, input);

	// Change the save button back to an edit button
	button.textContent = 'Edit';
	button.classList.remove('save');
	button.classList.add('edit');
}
// Check if the target button is a delete button
else if (button.classList.contains('delete')) {
	// Get the list item
	const li = button.parentNode;

	// Remove the list item from the task list
	taskList.removeChild(li);
}
});