// Function to add field UI block
function addFormField(container, label, type, value = '', options = []) {
    const fieldId = 'field-' + Math.random().toString(36).substr(2, 9);
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'bg-gray-50 p-4 rounded-md border border-gray-300 relative';
    fieldDiv.setAttribute('data-type', type);

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none';
    removeBtn.setAttribute('aria-label', 'Remove field');
    removeBtn.innerHTML = '&times;';
    removeBtn.addEventListener('click', () => {
        fieldDiv.remove();
    });
    fieldDiv.appendChild(removeBtn);

    // Label input
    const labelLabel = document.createElement('label');
    labelLabel.setAttribute('for', fieldId + '-label');
    labelLabel.className = 'block font-medium text-gray-700 mb-1';
    labelLabel.textContent = 'Field Label';
    fieldDiv.appendChild(labelLabel);

    const labelInput = document.createElement('input');
    labelInput.type = 'text';
    labelInput.id = fieldId + '-label';
    labelInput.name = 'fieldLabel[]';
    labelInput.value = label;
    labelInput.required = true;
    labelInput.className = 'w-full rounded-md border border-gray-300 px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500';
    fieldDiv.appendChild(labelInput);

    // Field type display (non-editable text)
    const typeP = document.createElement('p');
    typeP.className = 'text-gray-600 mb-2';
    typeP.textContent = 'Field Type: ' + type.charAt(0).toUpperCase() + type.slice(1);
    fieldDiv.appendChild(typeP);

    // Additional UI for radio or select: multiple standalone option inputs with add option button
    if (type === 'radio' || type === 'select') {
        // Options container
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'space-y-2 mb-3';
        optionsContainer.setAttribute('aria-label', 'Field options container');
        fieldDiv.appendChild(optionsContainer);

        // Add each existing option if provided
        if (options.length > 0) {
            options.forEach(opt => {
                addOptionInput(optionsContainer, opt);
            });
        } else {
            // Add one empty option input by default
            addOptionInput(optionsContainer, '');
        }

        // Button to add more options
        const addOptionBtn = document.createElement('button');
        addOptionBtn.type = 'button';
        addOptionBtn.className = 'bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500';
        addOptionBtn.textContent = 'Add Option';
        addOptionBtn.addEventListener('click', () => {
            addOptionInput(optionsContainer, '');
        });
        fieldDiv.appendChild(addOptionBtn);
    } else {
        // Add a hidden input for options for consistency
        const hiddenOptionsInput = document.createElement('input');
        hiddenOptionsInput.type = 'hidden';
        hiddenOptionsInput.name = 'fieldOptions[]';
        hiddenOptionsInput.value = '';
        fieldDiv.appendChild(hiddenOptionsInput);
    }

    // Hidden input for field type to submit
    const hiddenTypeInput = document.createElement('input');
    hiddenTypeInput.type = 'hidden';
    hiddenTypeInput.name = 'fieldType[]';
    hiddenTypeInput.value = type;
    fieldDiv.appendChild(hiddenTypeInput);

    // Append to container
    container.appendChild(fieldDiv);
}

// Helper to add a single option input with remove button
function addOptionInput(container, value = '') {
    const optionWrapper = document.createElement('div');
    optionWrapper.className = 'flex items-center space-x-2';

    const optionInput = document.createElement('input');
    optionInput.type = 'text';
    optionInput.name = 'fieldOptionValues[]';
    optionInput.value = value;
    optionInput.placeholder = 'Option value';
    optionInput.required = true;
    optionInput.className = 'flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500';

    const removeOptionBtn = document.createElement('button');
    removeOptionBtn.type = 'button';
    removeOptionBtn.className = 'text-red-500 hover:text-red-700 focus:outline-none';
    removeOptionBtn.setAttribute('aria-label', 'Remove option');
    removeOptionBtn.innerHTML = '&times;';
    removeOptionBtn.addEventListener('click', () => {
        optionWrapper.remove();
    });

    optionWrapper.appendChild(optionInput);
    optionWrapper.appendChild(removeOptionBtn);
    container.appendChild(optionWrapper);
}

// Clear fields container helper
function clearFieldsContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}