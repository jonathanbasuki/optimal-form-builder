const formContainer = document.getElementById('form-data-container');
const formDataString = formContainer.getAttribute('data-form');
const formData = JSON.parse(formDataString);

// Helper function for safe IDs
function sanitizeId(text) {
    return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
}

// Container to hold steps
const stepsContainer = document.getElementById("stepsContainer");

// Steps array references
let steps = [];

// Current step index
let currentStep = 0;

let currentFieldValue = 0;
let inputOptions = [];


// Render the start (intro) step: title, subtitle and Start button
function renderIntroStep() {
    const stepDiv = document.createElement("section");
    stepDiv.classList.add("step");
    stepDiv.dataset.step = "intro";
    stepDiv.setAttribute("aria-hidden", "false");
    stepDiv.setAttribute("aria-label", "Introductory Screen");
    stepDiv.innerHTML = `
        <h1 class="text-5xl font-extrabold text-center mb-4 select-none">${formData.title}</h1>
        <p class="text-center text-lg text-purple-200 mb-8">${formData.subtitle}</p>
        <div class="flex justify-center">
            <button type="button" id="startBtn" class="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400">Start</button>
        </div>
        `;

    stepsContainer.appendChild(stepDiv);
    steps.push(stepDiv);

    // Start button event
    stepDiv.querySelector("#startBtn").addEventListener("click", () => {
        currentStep++;
        showStep(currentStep);
    });
}

function renderCloseForm() {
    const stepDiv = document.createElement("section");
    stepDiv.classList.add("step");
    stepDiv.dataset.step = "closed";
    stepDiv.setAttribute("aria-hidden", "false");
    stepDiv.setAttribute("aria-label", "Closed Form");
    stepDiv.innerHTML = `
        <h1 class="text-5xl font-extrabold text-center mb-4 select-none">${formData.title}</h1>
        <p class="text-center text-lg text-purple-200 mb-8">Sorry, this form is no longer accepting responses!</p>
        `;

    stepsContainer.appendChild(stepDiv);
    steps.push(stepDiv);
}

// Render form field dynamically depending on type and field data
function renderFieldStep(field, index) {
    const idSafe = sanitizeId(field.field_name);
    const stepDiv = document.createElement("section");

    stepDiv.classList.add("step", "hidden", "flex", "flex-col");
    stepDiv.dataset.step = index.toString();
    stepDiv.setAttribute("aria-hidden", "true");
    stepDiv.setAttribute("aria-label", `Step ${index}: ${field.field_name}`);

    // accessibility required attribute string
    const requiredAttr = field.is_required ? "required" : "";

    // Field-label HTML string
    const labelHtml = `<label for="${idSafe}" class="block text-lg font-bold mb-3 text-white">${field.field_name}<span class="is-required">${field.is_required ? " *" : ""}</span></label>`;

    // Input HTML string builder per field type
    let inputHtml = "";

    switch (field.field_type) {
        case "Short Text":
            inputHtml = `<input type="text" id="${idSafe}" name="${idSafe}" data-field-id="${field.field_id}" data-response-type="${field.field_type}" placeholder="Your answer here" ${requiredAttr}
            aria-required="${field.is_required ? "true" : "false"}"
            class="w-full border-2 border-gray-600 rounded-lg p-3 text-lg bg-transparent placeholder-gray-400 text-white focus:bg-transparent focus:border-purple-400 focus:outline-none transition" autocomplete="off" />`;
            break;

        case "Long Text":
            inputHtml = `<textarea id="${idSafe}" name="${idSafe}" data-field-id="${field.field_id}" data-response-type="${field.field_type}" rows="3" placeholder="Your detailed answer here" ${requiredAttr}
            aria-required="${field.is_required ? "true" : "false"}"
            class="w-full border-2 border-gray-600 rounded-lg p-3 text-lg bg-transparent placeholder-gray-400 text-white focus:border-purple-400 focus:outline-none transition resize-y min-h-[6rem]" ></textarea>`;
            break;

        case "Number":
            inputHtml = `<input type="number" id="${idSafe}" name="${idSafe}" data-field-id="${field.field_id}" data-response-type="${field.field_type}" placeholder="Enter a number" min="0" max="100" ${requiredAttr}
            aria-required="${field.is_required ? "true" : "false"}"
            class="w-full border-2 border-gray-600 rounded-lg p-3 text-lg bg-transparent placeholder-gray-400 text-white focus:border-purple-400 focus:outline-none transition" />`;
            break;

        case "Date":
            inputHtml = `<input type="date" id="${idSafe}" name="${idSafe}" data-field-id="${field.field_id}" data-response-type="${field.field_type}" ${requiredAttr}
            aria-required="${field.is_required ? "true" : "false"}"
            class="w-full border-2 border-gray-600 rounded-lg p-3 text-lg bg-transparent placeholder-gray-400 text-white focus:border-purple-400 focus:outline-none transition" />`;
            break;

        case "Rating": {
            // stars for rating
            inputHtml = `
            <fieldset aria-label="Rating" class="mb-4">
                <div id="${idSafe}Stars" class="flex gap-3" role="radiogroup" aria-required="${field.is_required ? "true" : "false"}" tabindex="0">
                    <span class="star" data-value="1" role="radio" aria-checked="false" tabindex="-1" aria-label="1 star">&#9733;</span>
                    <span class="star" data-value="2" role="radio" aria-checked="false" tabindex="-1" aria-label="2 stars">&#9733;</span>
                    <span class="star" data-value="3" role="radio" aria-checked="false" tabindex="-1" aria-label="3 stars">&#9733;</span>
                    <span class="star" data-value="4" role="radio" aria-checked="false" tabindex="-1" aria-label="4 stars">&#9733;</span>
                    <span class="star" data-value="5" role="radio" aria-checked="false" tabindex="-1" aria-label="5 stars">&#9733;</span>
                </div>
                <input type="hidden" id="${idSafe}" name="${idSafe}" data-field-id="${field.field_id}" data-response-type="${field.field_type}" ${requiredAttr} aria-required="${field.is_required ? "true" : "false"}" />
            </fieldset>
            `;

            break;
        }

        case "Yes/No":
            inputHtml = `
            <label for="${idSafe}" class="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" id="${idSafe}" name="${idSafe}" data-field-id="${field.field_id}" data-response-type="${field.field_type}" class="sr-only peer" />
                <div class="w-14 h-8 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-400 peer-checked:bg-purple-600 transition-colors">
                </div>
                <div class="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform peer-checked:translate-x-6">
                </div>
            </label>
            `;
            break;

        case "Multiple Choice":
            if (Array.isArray(field.field_value)) {
                inputOptions = field.field_value;
            } else if (typeof field.field_value === "string") {
                try {
                    inputOptions = JSON.parse(field.field_value);
                } catch (e) {
                    inputOptions = field.field_value.split('|~');
                }
            }


            inputHtml = `<div class="flex flex-col gap-4">`;

            inputOptions.forEach((option) => {
                inputHtml += `
                    <label class="custom-radio">
                            <input type="radio" name="radio" value="${option}" data-field-id="${field.field_id}" data-response-type="${field.field_type}" />
                            ${option}
                            <span class="checkmark"></span>
                        </label>
                `;
            });

            inputHtml += `</div>`;

            break;

        case "Checkbox":
            if (Array.isArray(field.field_value)) {
                inputOptions = field.field_value;
            } else if (typeof field.field_value === "string") {
                try {
                    inputOptions = JSON.parse(field.field_value);
                } catch (e) {
                    inputOptions = field.field_value.split('|~');
                }
            }


            inputHtml = `<fieldset class="mb-1"><div class="flex flex-col gap-4">`;

            inputOptions.forEach((option) => {
                const optionId = `${idSafe}-${sanitizeId(option)}`;

                inputHtml += `
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="${optionId}" name="${idSafe}[]" value="${option}" data-field-id="${field.field_id}" data-response-type="${field.field_type}" class="styled-checkbox" />
                        <span class="select-none">${option}</span>
                    </label>
                `;
            });

            inputHtml += `</div></fieldset>`;

            break;

        case "Dropdown":
            if (Array.isArray(field.field_value)) {
                inputOptions = field.field_value;
            } else if (typeof field.field_value === "string") {
                try {
                    inputOptions = JSON.parse(field.field_value);
                } catch (e) {
                    inputOptions = field.field_value.split('|~');
                }
            }


            inputHtml = `<select id="${idSafe}" name="${idSafe}" data-field-id="${field.field_id}" data-response-type="${field.field_type}" required class="styled-select w-full">
                <option value="" disabled selected>Select your option</option>
            `;

            inputOptions.forEach((option) => {
                inputHtml += `<option value="${option}">${option}</option>`;
            });

            inputHtml += `</select>`;

            break;

        case "Scale":
            let minValue = 0;
            let maxValue = 0;

            inputOptions = [];

            if (Array.isArray(field.field_value)) {
                [minValue, maxValue] = field.field_value.map(Number);
            } else if (typeof field.field_value === "string") {
                try {
                    [minValue, maxValue] = field.field_value.split("-").map(Number);
                } catch (e) {
                    console.error("Invalid scale format:", field.field_value);
                }
            }

            inputHtml = `
                <div class="flex items-center gap-3">
                    <span class="text-yellow-300 font-semibold select-none">${minValue}</span>
                    <input type="range" id="${idSafe}" name="${idSafe}" data-field-id="${field.field_id}" data-response-type="${field.field_type}" min="${minValue}" max="${maxValue}" step="1" value="${minValue}" required
                        class="w-full cursor-pointer accent-yellow-400"
                        oninput="document.getElementById('scaleValue').textContent = this.value" />
                    <span class="text-yellow-300 font-semibold select-none">${maxValue}</span>
                </div>
                <span class="text-center font-bold text-white">Your answer: <span id="scaleValue" class="text-center font-bold text-yellow-400">${minValue}</span></span>
            `;
            break;

        case "File Upload":
            inputHtml = `
                <input type="file" id="${idSafe}" name="${idSafe}" data-field-id="${field.field_id}" data-response-type="${field.field_type}"
                    class="block w-full border-2 border-gray-600 rounded-lg p-2 cursor-pointer file:border-0 file:bg-purple-600 file:text-white file:rounded-lg file:font-semibold file:cursor-pointer hover:file:bg-purple-700 transition bg-transparent text-white" />
            `;
            break;

        default:
            inputHtml = `<p class="text-indigo-400">Unsupported field type: ${field.field_type}</p>`;
    }

    stepDiv.innerHTML = labelHtml + inputHtml;
    stepsContainer.appendChild(stepDiv);
    steps.push(stepDiv);

    // After rendering the rating step, add interactive star rating behavior
    if (field.field_type === "Rating") {
        const starContainer = stepDiv.querySelector(`#${idSafe}Stars`);
        const hiddenInput = stepDiv.querySelector(`input[type=hidden]`);

        let currentRating = 0;

        function setRating(r) {
            currentRating = r;
            hiddenInput.value = r;
            const stars = starContainer.querySelectorAll(".star");
            stars.forEach((star, idx) => {
                if (idx < r) {
                    star.classList.add("filled");
                    star.setAttribute("aria-checked", "true");
                    star.tabIndex = 0;
                } else {
                    star.classList.remove("filled");
                    star.setAttribute("aria-checked", "false");
                    star.tabIndex = -1;
                }
            });
        }

        starContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("star")) {
                const val = Number(e.target.dataset.value);
                setRating(val);
            }
        });

        starContainer.addEventListener("keydown", (e) => {
            const stars = Array.from(starContainer.querySelectorAll(".star"));
            const index = stars.findIndex((star) => star === document.activeElement);
            if (e.key === "ArrowRight") {
                e.preventDefault();
                if (index < stars.length - 1) {
                    stars[index + 1].focus();
                }
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                if (index > 0) {
                    stars[index - 1].focus();
                }
            } else if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                if (document.activeElement.classList.contains("star")) {
                    const val = Number(document.activeElement.dataset.value);
                    setRating(val);
                }
            }
        });

        // Initialize rating to 0
        setRating(0);
    }
}

// Render the final confirmation step with message and restart button
function renderConfirmationStep() {
    const stepDiv = document.createElement("section");
    stepDiv.classList.add("step", "hidden", "flex", "flex-col", "items-center", "text-center");
    stepDiv.dataset.step = "confirmation";
    stepDiv.setAttribute("aria-hidden", "true");

    stepDiv.innerHTML = `
        <h2 class="text-4xl font-extrabold mb-6 text-center">${formData.confirmation_message}</h2>
                <a href="${formData.confirmation_action}" target="_blank" rel="noopener noreferrer" id="contactBtn"
                    class="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400">
                    Contact PIC
                </a>
    `;

    stepsContainer.appendChild(stepDiv);
    steps.push(stepDiv);

    stepDiv.querySelector("#contactBtn").addEventListener("click", () => {
        dynamicForm.reset();
        // reset rating fields manually since they're custom inputs
        steps.forEach((step) => {
            const ratingInput = step.querySelector("input[type=hidden]");
            if (ratingInput) ratingInput.value = "";
            // also clear stars fill
            const stars = step.querySelectorAll(".star.filled");
            stars.forEach((s) => s.classList.remove("filled"));
        });
        document.querySelectorAll('input[type="range"]').forEach(el => {
            el.value = 5;
            if (el.nextElementSibling) el.nextElementSibling.textContent = "5";
        });
        currentStep = 0;
        showStep(currentStep);
    });
}

// Show specified step, hiding others and update button states
function showStep(stepIndex) {
    steps.forEach((step, idx) => {
        if (idx === stepIndex) {
            step.classList.remove("hidden");
            step.setAttribute("aria-hidden", "false");

            // Focus first input or button within
            const focusable = step.querySelector(
                "input, textarea, select, button, [tabindex]:not([tabindex='-1'])"
            );
            if (focusable) focusable.focus();
        } else {
            step.classList.add("hidden");
            step.setAttribute("aria-hidden", "true");
        }
    });

    // Navigation buttons visibility
    if (stepIndex === 0) {
        // Intro step: show only Next (start) btn. But we use a start button within intro screen, so hide nav buttons
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        submitBtn.style.display = "none";
    } else if (stepIndex === steps.length - 1) {
        // Confirmation step: show only restart button (inside step), hide nav buttons
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        submitBtn.style.display = "none";
    } else if (stepIndex === steps.length - 2) {
        // Last question step: show prev and submit buttons
        prevBtn.style.display = "inline-block";
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block";
    } else {
        // Middle steps: show prev and next buttons
        prevBtn.style.display = "inline-block";
        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    }

    // Disable prev on first question step
    prevBtn.disabled = stepIndex <= 1;
    prevBtn.setAttribute("aria-disabled", prevBtn.disabled.toString());
}

// Validate current step inputs before moving next or submitting
function validateCurrentStep() {
    const step = steps[currentStep];
    if (!step) return false;

    // For rating hidden input, check value
    const hiddenRating = step.querySelector("input[type=hidden]");
    if (hiddenRating && hiddenRating.hasAttribute("required") && !hiddenRating.value) {
        return false;
    }

    // Normal inputs, selects, textareas
    const inputs = Array.from(
        step.querySelectorAll("input, select, textarea")
    ).filter((el) => el.offsetParent !== null);

    // For checkboxes with name same - at least one checked if required
    const groupedCheckboxes = {};
    for (const input of inputs) {
        if (input.type === "checkbox" && input.name) {
            groupedCheckboxes[input.name] = groupedCheckboxes[input.name] || [];
            groupedCheckboxes[input.name].push(input);
        }
    }

    for (const name in groupedCheckboxes) {
        const inputsGroup = groupedCheckboxes[name];
        const anyRequired = inputsGroup.some(i => i.hasAttribute("required"));
        const anyChecked = inputsGroup.some(i => i.checked);
        if (anyRequired && !anyChecked) return false;
    }

    for (const input of inputs) {
        if (input.required) {
            if (input.type === "checkbox") {
                // covered by groupedCheckboxes check
                continue;
            } else if (input.type === "radio") {
                const radios = step.querySelectorAll(`input[name="${input.name}"]`);
                const anyChecked = Array.from(radios).some(r => r.checked);
                if (!anyChecked) return false;
            } else if (input.type === "hidden" && input.name.includes("rating")) {
                if (!input.value) return false;
            } else if (input.value.trim() === "") {
                return false;
            }
            // Email validation
            if (input.type === "email" && input.value) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regex.test(input.value.trim())) return false;
            }
        }
    }
    return true;
}

// Initialize the form rendering and logic
function init() {
    if (formData.is_open === 1) {
        renderIntroStep();

        formData.fields.forEach((field, idx) => {
            renderFieldStep(field, idx + 1);
        });

        renderConfirmationStep();

        showStep(currentStep);
    } else {
        renderCloseForm();
    }
}

// Form controls & events
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const dynamicForm = document.getElementById("optimal-form");

dynamicForm.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
});

nextBtn.addEventListener("click", () => {
    if (!validateCurrentStep()) {
        const step = steps[currentStep];
        (step.querySelector("input:invalid, select:invalid, textarea:invalid") || step.querySelector("input[aria-required='true'], select[aria-required='true'], textarea[aria-required='true']")).focus();
        return;
    }
    currentStep++;
    showStep(currentStep);
});

prevBtn.addEventListener("click", () => {
    currentStep--;
    showStep(currentStep);

});

dynamicForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateCurrentStep()) {
        const step = steps[currentStep];
        (step.querySelector("input:invalid, select:invalid, textarea:invalid") || step.querySelector("input[aria-required='true'], select[aria-required='true'], textarea[aria-required='true']")).focus();
        return;
    }
    // Submit simulated by showing confirmation step
    currentStep++;
    showStep(currentStep);

    // Handle form submission
    const inputs = dynamicForm.querySelectorAll("input, textarea, select");
    const answers = [];
    const processedFieldIds = new Set(); // Untuk hindari duplikat checkbox/radio

    inputs.forEach((input) => {
        const fieldId = parseInt(input.dataset.fieldId);
        const responseType = input.dataset.responseType;

        if (!fieldId || !responseType) return;

        if (processedFieldIds.has(fieldId)) return;

        let responseValue;

        if (input.type === "checkbox") {
            const checkboxes = dynamicForm.querySelectorAll(`input[name="${input.name}"]:checked`);
            const values = Array.from(checkboxes).map(cb => cb.value);
            responseValue = values.join("|~");
        } else if (input.type === "radio") {
            const checked = dynamicForm.querySelector(`input[name="${input.name}"]:checked`);
            responseValue = checked ? checked.value : null;
        } else if (input.type === "file") {
            responseValue = input.files[0] ? input.files[0].name : "";
        } else {
            responseValue = input.value;
        }

        if (responseType === "Yes/No") {
            (responseValue == "on") ? responseValue = "1" : responseValue = "0";
        }

        answers.push({
            field_id: fieldId,
            response_value: responseValue,
            response_type: responseType
        });

        processedFieldIds.add(fieldId);
    });

    const payload = {
        form_id: formData.form_id,
        answers: answers
    };

    try {
        const res = await fetch("/api/responses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            const data = await res.json();

            console.log(data);
        } else {
            const err = await res.json();
            console.log("Error " + (err.message || res.status));
        }
    } catch (err) {
        console.error(err);
    }
});

window.addEventListener("DOMContentLoaded", () => {
    init();
});